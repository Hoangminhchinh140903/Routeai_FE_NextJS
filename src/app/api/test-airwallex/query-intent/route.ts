import { NextResponse } from 'next/server';
import { airwallexService } from '@/services/airwallex/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing payment intent id' }, { status: 400 });
    }

    // Nếu là ID mô phỏng simulator (bắt đầu bằng int_sim_)
    if (id.startsWith('int_sim_')) {
      const mockIntent = {
        id,
        amount: 149.00,
        currency: 'USD',
        status: 'SUCCEEDED',
        client_secret: `mock_secret_${id}`,
        is_simulator: true,
      };
      return NextResponse.json({ success: true, paymentIntent: mockIntent });
    }

    // Nếu là ID thật từ Airwallex Live
    const intent = await airwallexService.getPaymentIntent(id);
    return NextResponse.json({ success: true, paymentIntent: intent });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
