import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Xác thực chữ ký webhook từ Airwallex
 * Header x-signature được tạo bởi HMAC-SHA256(timestamp + body, webhookSecretKey)
 */
function verifyAirwallexSignature(
  rawBody: string,
  signature: string | null,
  timestamp: string | null,
  secretKey: string
): boolean {
  if (!signature || !timestamp || !secretKey) return false;
  try {
    const payload = `${timestamp}${rawBody}`;
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-signature');
    const timestamp = request.headers.get('x-timestamp');
    const rawBody = await request.text();

    const webhookSecret = process.env.AIRWALLEX_WEBHOOK_SECRET;

    // Nếu đã cấu hình secret key trong .env thì tiến hành verify chữ ký
    if (webhookSecret && webhookSecret !== 'your_webhook_secret_here') {
      const isValid = verifyAirwallexSignature(rawBody, signature, timestamp, webhookSecret);
      if (!isValid) {
        console.warn('[Airwallex Webhook] Invalid signature rejected');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);

    console.log(`[Airwallex Webhook Event Received]: ${event.name}`, {
      id: event.id,
      accountId: event.account_id,
      createdAt: event.created_at,
    });

    // Xử lý các sự kiện chính của Airwallex
    switch (event.name) {
      // 1. Khách hàng thanh toán thành công qua thẻ / HPP
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data?.object;
        console.log(`✅ [Payment Succeeded] Intent ID: ${paymentIntent?.id}, Amount: ${paymentIntent?.amount} ${paymentIntent?.currency}`);
        
        // TODO: Cập nhật trạng thái Subscription của Doanh nghiệp trong database:
        // await activateSubscription({ customerEmail: paymentIntent?.customer_id, plan: ... });
        break;
      }

      // 2. Tiền vào tài khoản ngân hàng ảo (DBS Singapore / ANZ Australia Global Collection Account)
      case 'deposit.created':
      case 'deposit.settled': {
        const deposit = event.data?.object;
        console.log(`🏦 [Bank Deposit Received via Global Account] Amount: ${deposit?.amount} ${deposit?.currency}, Reference: ${deposit?.reference}`);
        
        // TODO: Tự động đối soát mã đơn hàng và kích hoạt subscription
        break;
      }

      // 3. Khách hàng huỷ hoặc thanh toán thất bại
      case 'payment_intent.payment_failed': {
        const failedIntent = event.data?.object;
        console.warn(`❌ [Payment Failed] Intent ID: ${failedIntent?.id}, Reason: ${failedIntent?.latest_payment_attempt?.failure_message}`);
        break;
      }

      default:
        console.log(`ℹ️ [Unhandled Event] ${event.name}`);
        break;
    }

    // Luôn trả về 200 OK để Airwallex biết webhook đã được tiếp nhận
    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error('[Airwallex Webhook Error]:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
