import { NextResponse } from 'next/server';
import { airwallexService } from '@/services/airwallex/client';

export interface RealDepositItem {
  id: string;
  amount: number;
  currency: string;
  status: string;
  reference?: string;
  payer_name?: string;
  source_type?: string;
  created_at: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference'); // e.g. REF-123456 hoặc company taxId

    const token = await airwallexService.getAccessToken();

    // Gọi API Live của Airwallex để lấy lịch sử nạp tiền vào tài khoản DBS SG / ANZ AU
    const res = await fetch('https://api.airwallex.com/api/v1/deposits?page_num=0&page_size=20', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ success: false, error: err }, { status: res.status });
    }

    const data = await res.json();
    const items: RealDepositItem[] = data.items || [];

    // Nếu có reference cần tìm kiếm để đối soát tự động
    let matchedDeposit: RealDepositItem | null = null;
    if (reference) {
      matchedDeposit = items.find(d => 
        (d.reference && d.reference.toUpperCase().includes(reference.toUpperCase())) ||
        (d.id && d.id.includes(reference))
      ) || null;
    }

    return NextResponse.json({
      success: true,
      totalCount: data.total_count || 0,
      matched: !!matchedDeposit,
      matchedDeposit,
      recentDeposits: items.slice(0, 5),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

