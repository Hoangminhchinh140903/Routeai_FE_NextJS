import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const paymentIntentId = searchParams.get('payment_intent_id') || searchParams.get('id');

  // Điều hướng về trang /payment-test kèm status query param
  const redirectUrl = new URL('/payment-test', request.url);
  redirectUrl.searchParams.set('checkout_status', 'success');
  if (paymentIntentId) {
    redirectUrl.searchParams.set('intent_id', paymentIntentId);
  }

  return NextResponse.redirect(redirectUrl);
}

