'use client';

import React, { useState, useEffect, Suspense } from 'react';
import styles from './page.module.css';
import { ShieldCheck, Building2 } from 'lucide-react';
import Link from 'next/link';

import { SUBSCRIPTION_PLANS } from '@/services/airwallex/plans';
import { CANADIAN_BANKS } from '@/services/airwallex/canadianBanks';

import { PlanSelector } from './components/PlanSelector';
import { BankSelector } from './components/BankSelector';
import { TransferMethodTabs, TransferType } from './components/TransferMethodTabs';
import { CreditCardCheckout } from './components/CreditCardCheckout';
import { BankTransferVoucher } from './components/BankTransferVoucher';
import { PaymentSuccessBanner } from './components/PaymentSuccessBanner';

function CanadaSubscriptionAppFlow() {
  // Step 1: Chọn gói (mặc định gói Starter 0.50 CAD rẻ nhất để test)
  const [selectedPlanId, setSelectedPlanId] = useState('starter');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Step 2: Chọn ngân hàng của khách (mặc định DCBank của công ty)
  const [selectedBankId, setSelectedBankId] = useState('dcb');

  // Phương thức: Interac e-Transfer, Direct EFT, hoặc Credit/Debit Card
  const [transferType, setTransferType] = useState<TransferType>('interac');

  // Trạng thái thanh toán
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [referenceCode, setReferenceCode] = useState('RAI-892143');

  useEffect(() => {
    // Tạo mã đối soát ngẫu nhiên sau khi mount
    const timer = setTimeout(() => {
      setReferenceCode(`RAI-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[0];
  const selectedBank = CANADIAN_BANKS.find(b => b.id === selectedBankId) || CANADIAN_BANKS[0];

  const discountMultiplier = billingCycle === 'yearly' ? 0.85 : 1.0;
  const totalAmountCad = Number(
    (selectedPlan.monthlyCad * discountMultiplier * (billingCycle === 'yearly' ? 12 : 1)).toFixed(2)
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.badge}>
            <ShieldCheck size={16} /> Airwallex Canada B2B • In-App Bank Switcher
          </div>
          <h1 className={styles.title}>RouteAI Canadian Fleet Subscription</h1>
          <p className={styles.subtitle}>
            Select your enterprise plan, choose your Canadian bank, copy our verified Airwallex payment credentials with 1-click, and launch your mobile banking app to complete payment.
          </p>
        </div>

        {/* BƯỚC 1: Chọn gói cước RouteAI */}
        <PlanSelector
          selectedPlanId={selectedPlanId}
          onSelectPlan={setSelectedPlanId}
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
        />

        {/* BƯỚC 2: Chọn ngân hàng & Phương thức thanh toán */}
        <div className={styles.checkoutPanel}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.4rem' }}>
            <Building2 color="#2563eb" size={26} />
            Step 2: Payment Method & Canadian Bank
          </div>

          {/* Ngân hàng Canada (Chỉ hiển thị khi chuyển khoản Interac hoặc EFT) */}
          {transferType !== 'card' && (
            <BankSelector
              selectedBankId={selectedBankId}
              onSelectBankId={setSelectedBankId}
            />
          )}

          {/* Chuyển đổi phương thức thanh toán */}
          <TransferMethodTabs
            transferType={transferType}
            onSelectTransferType={setTransferType}
          />

          {/* Form Thẻ tín dụng hoặc Voucher Chuyển khoản */}
          {transferType === 'card' ? (
            <CreditCardCheckout
              totalAmountCad={totalAmountCad}
              planName={selectedPlan.name}
              onPaymentSuccess={() => setPaymentConfirmed(true)}
            />
          ) : (
            <BankTransferVoucher
              selectedBank={selectedBank}
              transferType={transferType}
              totalAmountCad={totalAmountCad}
              referenceCode={referenceCode}
              onPaymentSuccess={() => setPaymentConfirmed(true)}
            />
          )}

          {/* Thông báo thanh toán thành công */}
          {paymentConfirmed && (
            <PaymentSuccessBanner
              bankName={selectedBank.name}
              referenceCode={referenceCode}
            />
          )}

          {/* Quay lại đăng nhập */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href="/login" style={{ color: '#64748b', fontSize: '0.88rem', textDecoration: 'none' }}>
              ← Return to RouteAI Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function PaymentTestPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem' }}>Loading Canadian Payment Gateway...</div>}>
      <CanadaSubscriptionAppFlow />
    </Suspense>
  );
}
