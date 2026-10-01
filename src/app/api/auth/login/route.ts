import { NextResponse } from 'next/server';
import { mockUsers } from '../mockDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, full_name } = body;

    // Mock mode: accept any credentials and auto-provision the account
    const normalizedEmail =
      typeof email === 'string' && email.trim() ? email.trim().toLowerCase() : 'guest@r-t.io';

    let user = mockUsers.find(u => u.email === normalizedEmail);
    if (!user) {
      user = {
        id: `mock-user-${Date.now()}`,
        email: normalizedEmail,
        password: password || '123456',
        full_name: full_name || normalizedEmail.split('@')[0],
        role: 'driver',
        language_pref: 'vi',
      };
      mockUsers.push(user);
    }

    return NextResponse.json({
      success: true,
      data: {
        access_token: `mock_access_token_${user.id}`,
        refresh_token: 'mock_refresh_token',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

