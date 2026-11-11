import { NextResponse } from 'next/server';
import { airwallexService } from '@/services/airwallex/client';

export interface PaymentVerificationResult {
  verified: boolean;
  intentId: string;
  status: 'SUCCEEDED' | 'PENDING' | 'FAILED' | 'REQUIRES_PAYMENT_METHOD' | 'UNKNOWN';
  amount?: number;
  currency?: string;
  paidAt?: string;
  methodUsed?: string;
  merchantOrderId?: string;
  message: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ 
        verified: false, 
        message: 'Missing payment intent id to validate' 
      }, { status: 400 });
    }

    // 1. Nếu là intent mô phỏng hoặc thanh toán Global Collection
    if (id.startsWith('int_sim_')) {
      const reference = searchParams.get('ref');

      // Thử gọi sang API Deposits thật của Airwallex xem tài khoản DBS/ANZ đã nhận tiền chưa
      try {
        const token = await airwallexService.getAccessToken();
        const depRes = await fetch('https://api.airwallex.com/api/v1/deposits?page_num=0&page_size=20', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (depRes.ok) {
          const depData = await depRes.json();
          const items = depData.items || [];
          if (reference) {
            const matched = items.find((d: { reference?: string; id?: string }) => 
              (d.reference && d.reference.toUpperCase().includes(reference.toUpperCase())) ||
              (d.id && d.id.includes(reference))
            );

            if (matched) {
              return NextResponse.json({
                verified: true,
                intentId: id,
                status: 'SUCCEEDED',
                amount: matched.amount,
                currency: matched.currency,
                paidAt: matched.created_at,
                methodUsed: `Real Bank Deposit (${matched.source_type || 'Direct Transfer'})`,
                message: `Real payment verified! Deposit received on Airwallex: ${matched.amount} ${matched.currency}`,
              } as PaymentVerificationResult);
            }
          }
        }
      } catch (err) {
        console.warn('Real deposit check fallback:', err);
      }

      // Nếu có reference từ chuyển khoản ngân hàng nhưng Airwallex chưa nhận được tiền thật
      if (reference) {
        return NextResponse.json({
          verified: false,
          intentId: id,
          status: 'PENDING',
          message: `Transfer submitted with reference ${reference}. Awaiting deposit settlement into Airwallex Collection Account.`,
        } as PaymentVerificationResult);
      }

      // Nếu test phương thức Card trong Demo
      return NextResponse.json({
        verified: true,
        intentId: id,
        status: 'SUCCEEDED',
        amount: 149.00,
        currency: 'USD',
        paidAt: new Date().toISOString(),
        methodUsed: 'Airwallex Demo Card Checkout',
        message: 'Payment verified successfully via Card',
      } as PaymentVerificationResult);
    }

    // 2. Nếu là intent thực tế từ Airwallex API Live
    const intent = await airwallexService.getPaymentIntent(id);

    const isSucceeded = intent.status === 'SUCCEEDED';
    let statusFormatted: PaymentVerificationResult['status'] = 'UNKNOWN';

    switch (intent.status) {
      case 'SUCCEEDED':
        statusFormatted = 'SUCCEEDED';
        break;
      case 'REQUIRES_PAYMENT_METHOD':
      case 'REQUIRES_CUSTOMER_ACTION':
        statusFormatted = 'PENDING';
        break;
      case 'CANCELLED':
        statusFormatted = 'FAILED';
        break;
      default:
        statusFormatted = 'PENDING';
        break;
    }

    const result: PaymentVerificationResult = {
      verified: isSucceeded,
      intentId: intent.id,
      status: statusFormatted,
      amount: intent.amount,
      currency: intent.currency,
      paidAt: isSucceeded ? new Date().toISOString() : undefined,
      merchantOrderId: (intent.merchant_order_id as string) || undefined,
      message: isSucceeded 
        ? 'Payment has been successfully verified on Airwallex' 
        : `Payment is currently in ${intent.status} state. Awaiting completion.`,
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown validation error';
    return NextResponse.json({ 
      verified: false, 
      status: 'FAILED',
      message: `Verification failed: ${message}` 
    }, { status: 500 });
  }
}

