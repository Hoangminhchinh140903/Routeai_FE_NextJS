import { NextResponse } from 'next/server';
import { airwallexService } from '@/services/airwallex/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency, description, countryCode } = body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const cur = (currency || 'SGD').toUpperCase();
    const country = (countryCode || 'SG').toUpperCase();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const returnUrl = `${appUrl}/payment-test/return`;

    try {
      // 1. Thử gọi API Airwallex Live
      const paymentIntent = await airwallexService.createPaymentIntent({
        amount: Number(amount),
        currency: cur,
        order: {
          type: 'service',
          description: description || 'RouteAI Enterprise Subscription',
        },
        returnUrl,
      });

      return NextResponse.json({
        success: true,
        source: 'airwallex_live',
        paymentIntent,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        hppUrl: (paymentIntent.next_action as { url?: string })?.url || null,
      });
    } catch (airwallexError: unknown) {
      const errMsg = airwallexError instanceof Error ? airwallexError.message : String(airwallexError);
      
      // 2. Nếu tài khoản Live gặp configuration_error (chưa bật thẻ tại VN), fallback sang Simulator đa phương thức
      if (errMsg.includes('configuration_error') || errMsg.includes('Invalid request against merchant configuration')) {
        const mockId = `int_sim_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const mockIntent = {
          id: mockId,
          request_id: `req_sim_${Date.now()}`,
          amount: Number(amount),
          currency: cur,
          status: 'REQUIRES_PAYMENT_METHOD',
          client_secret: `mock_secret_${mockId}`,
          next_action: {
            type: 'redirect_to_url',
            url: `${appUrl}/payment-test/simulator?id=${mockId}&amount=${amount}&currency=${cur}&country=${country}&desc=${encodeURIComponent(description || 'Subscription')}`,
          },
          is_simulator: true,
        };

        return NextResponse.json({
          success: true,
          source: 'airwallex_simulator',
          paymentIntent: mockIntent,
          clientSecret: mockIntent.client_secret,
          paymentIntentId: mockIntent.id,
          hppUrl: mockIntent.next_action.url,
        });
      }

      throw airwallexError;
    }
  } catch (error: unknown) {
    console.error('Error in create-payment-intent:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
