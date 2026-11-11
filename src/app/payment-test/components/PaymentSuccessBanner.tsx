'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface PaymentSuccessBannerProps {
  bankName: string;
  referenceCode: string;
}

export function PaymentSuccessBanner({
  bankName,
  referenceCode,
}: PaymentSuccessBannerProps) {
  return (
    <div
      style={{
        background: '#dcfce7',
        border: '1px solid #86efac',
        borderRadius: 10,
        padding: '1.25rem',
        marginTop: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <CheckCircle2 size={32} color="#16a34a" />
      <div>
        <div style={{ fontWeight: 800, color: '#166534', fontSize: '1.1rem' }}>
          Subscription Activated Successfully!
        </div>
        <div style={{ color: '#15803d', fontSize: '0.88rem' }}>
          Airwallex has verified payment from {bankName} (Ref: {referenceCode}). Your RouteAI enterprise fleet license is now active!
        </div>
      </div>
    </div>
  );
}

