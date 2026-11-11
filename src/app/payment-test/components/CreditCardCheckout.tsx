'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';
import { CreditCard, Lock, RefreshCw } from 'lucide-react';

interface CreditCardCheckoutProps {
  totalAmountCad: number;
  planName: string;
  onPaymentSuccess: () => void;
}

export function CreditCardCheckout({
  totalAmountCad,
  planName,
  onPaymentSuccess,
}: CreditCardCheckoutProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardProcessing, setCardProcessing] = useState(false);
  const [cardError, setCardError] = useState('');

  const handlePayCard = async (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
    setCardProcessing(true);
    setCardError('');

    try {
      const res = await fetch('/api/test-airwallex/process-card-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmountCad,
          currency: 'CAD',
          cardNumber,
          expiry,
          cvc,
          cardHolder,
          planName,
        }),
      });

      const data = await res.json();
      setCardProcessing(false);

      if (data.success) {
        onPaymentSuccess();
      } else {
        setCardError(
          `[Airwallex Live API Response]: ${data.airwallexMessage}\n\nNotice: ${data.explanation}`
        );
      }
    } catch {
      setCardProcessing(false);
      setCardError('Could not connect to Airwallex payment gateway.');
    }
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !cardProcessing) {
          e.preventDefault();
          handlePayCard(e);
        }
      }}
      style={{
        background: '#ffffff',
        border: '1.5px solid #cbd5e1',
        borderRadius: 12,
        padding: '1.5rem',
        marginBottom: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
          <CreditCard size={20} color="#2563eb" /> Card Payment (Visa / Mastercard / Amex)
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: '0.75rem',
            color: '#16a34a',
            background: '#dcfce7',
            padding: '2px 8px',
            borderRadius: 6,
            fontWeight: 600,
          }}
        >
          <Lock size={12} /> Airwallex Live Gateway
        </div>
      </div>

      {cardError && (
        <div
          style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: 8,
            padding: '12px 14px',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
            color: '#991b1b',
            whiteSpace: 'pre-line',
            lineHeight: 1.5,
          }}
        >
          {cardError}
        </div>
      )}

      {/* Card Number */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
          Card Number
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            name="custom-card-number-field"
            autoComplete="new-password"
            data-form-type="other"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="4111 2222 3333 4444"
            maxLength={19}
            required
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: 8,
              border: '1px solid #cbd5e1',
              fontSize: '0.95rem',
              boxSizing: 'border-box',
            }}
          />
          <CreditCard size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
        </div>
      </div>

      {/* Expiry & CVC */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Expiry Date (MM/YY)
          </label>
          <input
            type="text"
            name="custom-card-expiry-field"
            autoComplete="new-password"
            data-form-type="other"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            required
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #cbd5e1',
              fontSize: '0.95rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Security Code (CVC)
          </label>
          <input
            type="password"
            name="custom-card-cvc-field"
            autoComplete="new-password"
            data-form-type="other"
            maxLength={4}
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            required
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #cbd5e1',
              fontSize: '0.95rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Cardholder Name */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
          Cardholder Name
        </label>
        <input
          type="text"
          name="custom-card-holder-field"
          autoComplete="new-password"
          data-form-type="other"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          placeholder="e.g. JOHN DOE"
          required
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            fontSize: '0.95rem',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => handlePayCard()}
        disabled={cardProcessing}
        className={styles.primaryButton}
        style={{ padding: '12px', fontSize: '1rem' }}
      >
        {cardProcessing ? (
          <>
            <RefreshCw size={18} className="animate-spin" /> Authorizing Payment...
          </>
        ) : (
          <>
            <Lock size={18} /> Pay C${totalAmountCad} CAD with Card
          </>
        )}
      </button>
    </div>
  );
}

