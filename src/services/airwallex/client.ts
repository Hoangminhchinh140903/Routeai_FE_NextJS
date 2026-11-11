// src/services/airwallex/client.ts
import { AirwallexAuthResponse, AirwallexPaymentIntent, CreatePaymentIntentParams } from './types';

export class AirwallexService {
  private clientId: string;
  private apiKey: string;
  private baseUrl: string;
  private tokenCache: { token: string; expiresAt: number } | null = null;

  constructor() {
    this.clientId = process.env.AIRWALLEX_CLIENT_ID || '';
    this.apiKey = process.env.AIRWALLEX_API_KEY || '';
    const env = (process.env.AIRWALLEX_ENV || 'demo').toLowerCase();
    this.baseUrl = env === 'prod' ? 'https://api.airwallex.com' : 'https://api-demo.airwallex.com';
  }

  /**
   * Lấy Bearer Token từ Airwallex API (có cache tự động làm mới khi hết hạn)
   */
  async getAccessToken(): Promise<string> {
    if (!this.clientId || !this.apiKey) {
      throw new Error('Chưa cấu hình AIRWALLEX_CLIENT_ID hoặc AIRWALLEX_API_KEY trong .env.local');
    }

    const now = Date.now();
    // Cache buffer 60 giây
    if (this.tokenCache && this.tokenCache.expiresAt > now + 60000) {
      return this.tokenCache.token;
    }

    const res = await fetch(`${this.baseUrl}/api/v1/authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': this.clientId,
        'x-api-key': this.apiKey,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Airwallex Auth failed [${res.status}]: ${errText}`);
    }

    const data: AirwallexAuthResponse = await res.json();
    const expiresAt = new Date(data.expires_at).getTime();
    this.tokenCache = { token: data.token, expiresAt };
    return data.token;
  }

  /**
   * Tạo Payment Intent (dùng cho cả Hosted Payment Page và Drop-in Element)
   */
  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<AirwallexPaymentIntent> {
    const token = await this.getAccessToken();
    const requestId = params.requestId || `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const merchantOrderId = params.merchantOrderId || `order_${Date.now()}`;

    const payload = {
      request_id: requestId,
      amount: params.amount,
      currency: params.currency.toUpperCase(),
      merchant_order_id: merchantOrderId,
      order: params.order || {
        type: 'physical_goods',
        description: 'Test Airwallex Order',
      },
      return_url: params.returnUrl,
    };

    const res = await fetch(`${this.baseUrl}/api/v1/pa/payment_intents/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Airwallex Create Payment Intent failed [${res.status}]: ${errText}`);
    }

    return await res.json();
  }

  /**
   * Tra cứu chi tiết & trạng thái Payment Intent theo ID
   */
  async getPaymentIntent(id: string): Promise<AirwallexPaymentIntent> {
    const token = await this.getAccessToken();
    const res = await fetch(`${this.baseUrl}/api/v1/pa/payment_intents/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Airwallex Query Intent failed [${res.status}]: ${errText}`);
    }

    return await res.json();
  }
}

export const airwallexService = new AirwallexService();
