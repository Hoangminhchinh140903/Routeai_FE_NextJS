'use client';

import React from 'react';
import { Send, Building2, CreditCard } from 'lucide-react';

export type TransferType = 'interac' | 'eft' | 'card';

interface TransferMethodTabsProps {
  transferType: TransferType;
  onSelectTransferType: (type: TransferType) => void;
}

export function TransferMethodTabs({
  transferType,
  onSelectTransferType,
}: TransferMethodTabsProps) {
  const getTabStyle = (type: TransferType) => ({
    padding: '10px 14px',
    borderRadius: 8,
    border: transferType === type ? '2px solid #2563eb' : '1px solid #cbd5e1',
    backgroundColor: transferType === type ? '#eff6ff' : 'white',
    fontWeight: 700,
    fontSize: '0.88rem',
    cursor: 'pointer',
    color: transferType === type ? '#1e40af' : '#475569',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: '1.5rem' }}>
      <button
        type="button"
        onClick={() => onSelectTransferType('interac')}
        style={getTabStyle('interac')}
      >
        <Send size={16} /> Interac e-Transfer
      </button>

      <button
        type="button"
        onClick={() => onSelectTransferType('eft')}
        style={getTabStyle('eft')}
      >
        <Building2 size={16} /> Direct EFT Deposit
      </button>

      <button
        type="button"
        onClick={() => onSelectTransferType('card')}
        style={getTabStyle('card')}
      >
        <CreditCard size={16} /> Credit / Debit Card
      </button>
    </div>
  );
}

