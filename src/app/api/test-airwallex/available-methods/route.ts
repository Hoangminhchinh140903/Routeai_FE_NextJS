import { NextResponse } from 'next/server';
import { airwallexService } from '@/services/airwallex/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'VN';
    const currency = searchParams.get('currency') || 'VND';

    const token = await airwallexService.getAccessToken();
    const env = (process.env.AIRWALLEX_ENV || 'demo').toLowerCase();
    const baseUrl = env === 'prod' ? 'https://api.airwallex.com' : 'https://api-demo.airwallex.com';

    // Gọi API của Airwallex để lấy các payment method types được kích hoạt trên account của bạn
    const res = await fetch(`${baseUrl}/api/v1/pa/payment_method_types?country_code=${country}&transaction_currency=${currency}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // Nếu API trả về lỗi hoặc tài khoản chưa bật config, trả về danh sách fallback
      return NextResponse.json({
        success: false,
        source: 'fallback',
        items: [],
      });
    }

    const data = await res.json();
    return NextResponse.json({
      success: true,
      source: 'airwallex_live',
      items: data.items || [],
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

