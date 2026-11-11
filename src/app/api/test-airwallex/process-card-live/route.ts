import { NextResponse } from 'next/server';
import { airwallexService } from '@/services/airwallex/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency, cardNumber, cardHolder, planName } = body;

    const token = await airwallexService.getAccessToken();
    const amt = Number(amount) || 1.00;
    const cur = (currency || 'CAD').toUpperCase();

    // 1. Gửi request tạo Payment Intent lên Airwallex Live
    const createIntentRes = await fetch('https://api.airwallex.com/api/v1/pa/payment_intents/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        request_id: `card_req_${Date.now()}`,
        amount: amt,
        currency: cur,
        merchant_order_id: `order_live_${Date.now()}`,
        order: {
          type: 'service',
          description: planName || 'RouteAI Enterprise Subscription Test',
        },
      }),
    });

    const intentData = await createIntentRes.json();

    // 2. Nếu Airwallex Live cho phép (khi tài khoản được kích hoạt Payment Acceptance)
    if (createIntentRes.ok && intentData.id) {
      return NextResponse.json({
        success: true,
        source: 'airwallex_live',
        intentId: intentData.id,
        status: intentData.status,
        message: 'Payment intent created on Airwallex Live.',
      });
    }

    // 3. Nếu tài khoản Live bị chặn bởi cấu hình ("Payments isn't available in your region yet")
    // Trả về thông báo giải thích rõ ràng và minh bạch cho phía Client
    return NextResponse.json({
      success: false,
      code: intentData.code || 'configuration_error',
      airwallexMessage: intentData.message || 'Invalid request against merchant configuration.',
      explanation: 'Airwallex Live Account of Tâm Việt Quang is currently approved for Global Bank Collection (Interac e-Transfer / EFT), but Online Card Acquiring (Payment Acceptance) is disabled by Airwallex compliance for Vietnam entities until you add a Singapore or US legal entity.',
      testDetails: {
        cardLast4: cardNumber ? cardNumber.slice(-4) : '****',
        cardHolder,
        amount: amt,
        currency: cur,
      }
    }, { status: 400 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

