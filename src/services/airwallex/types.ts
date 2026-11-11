// src/services/airwallex/types.ts

export type AirwallexEnv = 'demo' | 'prod';

export interface AirwallexAuthResponse {
  token: string;
  expires_at: string;
}

export interface CreatePaymentIntentParams {
  requestId?: string;
  amount: number;
  currency: string;
  merchantOrderId?: string;
  order?: {
    type?: string;
    description?: string;
    products?: Array<{
      name: string;
      quantity: number;
      unit_price: number;
      desc?: string;
    }>;
  };
  returnUrl?: string;
}

export interface AirwallexPaymentIntent {
  id: string;
  request_id: string;
  amount: number;
  currency: string;
  status: 'REQUIRES_PAYMENT_METHOD' | 'REQUIRES_CUSTOMER_ACTION' | 'PENDING' | 'SUCCEEDED' | 'CANCELLED';
  client_secret: string;
  next_action?: {
    type?: string;
    url?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}
