'use client';

import React, { useState, useEffect, Suspense } from 'react';
import styles from './page.module.css';
import { 
  Check, 
  Send, 
  RefreshCw, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Smartphone, 
  CreditCard,
  ExternalLink, 
  ArrowRight, 
  Zap, 
  Lock,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { CANADA_CONFIG } from '@/services/airwallex/countries';
import { SUBSCRIPTION_PLANS } from '@/services/airwallex/plans';
import { CANADIAN_BANKS, CanadianBankApp } from '@/services/airwallex/canadianBanks';

function CanadaSubscriptionAppFlow() {
  // Step 1: Chọn gói (mặc định gói Starter 0.50 CAD rẻ nhất)
  const [selectedPlanId, setSelectedPlanId] = useState('starter');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Thông tin doanh nghiệp
  const [companyName, setCompanyName] = useState('Maple Leaf Express Logistics Inc.');
  const [businessEmail, setBusinessEmail] = useState('finance@mapleleaflogistics.ca');
  const [craBn, setCraBn] = useState('849302198 RC0001');

  // Step 2: Chọn ngân hàng của khách hàng (mặc định DCBank của công ty)
  const [selectedBankId, setSelectedBankId] = useState('dcb');
  const [bankSearch, setBankSearch] = useState('');
  const [bankCategoryFilter, setBankCategoryFilter] = useState<'all' | 'featured' | 'big6' | 'digital' | 'fintech' | 'credit_union'>('featured');

  // Phương thức chuyển tiền: Interac Autodeposit, Direct EFT, hoặc Credit/Debit Card
  const [transferType, setTransferType] = useState<'interac' | 'eft' | 'card'>('interac');

  // Credit Card Form States - Để trống dữ liệu cho khách tự nhập
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardProcessing, setCardProcessing] = useState(false);
  const [cardError, setCardError] = useState('');

  // Reference Code tự động khớp (Khởi tạo đồng bộ để tránh Hydration Mismatch)
  const [referenceCode, setReferenceCode] = useState('RAI-892143');
  const [copiedField, setCopiedField] = useState('');

  useEffect(() => {
    // Chỉ tạo mã random sau khi component đã mount trên client
    setReferenceCode(`RAI-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);
  
  // Trạng thái kiểm tra thanh toán
  const [verifying, setVerifying] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Lọc ngân hàng theo Search và Category
  const filteredBanks = CANADIAN_BANKS.filter((b) => {
    const matchesSearch = bankSearch.trim() === '' || 
      b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      b.shortName.toLowerCase().includes(bankSearch.toLowerCase()) ||
      (b.institutionNumber && b.institutionNumber.includes(bankSearch));

    if (!matchesSearch) return false;

    if (bankCategoryFilter === 'all') return true;
    if (bankCategoryFilter === 'featured') return b.featured || b.category === 'company';
    return b.category === bankCategoryFilter;
  });

  const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[0];
  const selectedBank = CANADIAN_BANKS.find(b => b.id === selectedBankId) || CANADIAN_BANKS[0];

  // Tính tiền CAD (Mặc định gói Starter 0.50 CAD)
  const discountMultiplier = billingCycle === 'yearly' ? 0.85 : 1.0;
  const totalAmountCad = Number((selectedPlan.monthlyCad * discountMultiplier * (billingCycle === 'yearly' ? 12 : 1)).toFixed(2));
  const perMonthFormatted = Number((selectedPlan.monthlyCad * discountMultiplier).toFixed(2)).toFixed(2);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  // Xử lý thanh toán thẻ Credit Card THẬT với Airwallex Live API
  const handlePayCard = async (e: React.FormEvent) => {
    e.preventDefault();
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
          planName: selectedPlan.name,
        }),
      });

      const data = await res.json();
      setCardProcessing(false);

      if (data.success) {
        setPaymentConfirmed(true);
      } else {
        // Hiển thị trực tiếp phản hồi từ máy chủ Airwallex thật
        setCardError(`[Airwallex Live API Response]: ${data.airwallexMessage}\n\nNotice: ${data.explanation}`);
      }
    } catch {
      setCardProcessing(false);
      setCardError('Could not connect to Airwallex payment gateway.');
    }
  };
  const handleOpenBankApp = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isMobile) {
      const appUrl = isAndroid ? `intent://${selectedBank.appPackageAndroid}#Intent;scheme=package;end;` : selectedBank.appSchemeIos;
      const storeUrl = isAndroid 
        ? `https://play.google.com/store/apps/details?id=${selectedBank.appPackageAndroid}`
        : `https://apps.apple.com/ca/search?term=${encodeURIComponent(selectedBank.name)}`;

      const start = Date.now();
      window.location.href = appUrl;

      // Nếu sau 1.5s app không mở được -> Điều hướng tải App về máy
      setTimeout(() => {
        if (Date.now() - start < 2000) {
          window.location.href = storeUrl;
        }
      }, 1500);
    } else {
      // Nếu đang dùng máy tính Desktop -> Mở trang Online Banking của ngân hàng đó
      window.open(selectedBank.webLoginUrl, '_blank');
    }
  };

  // Xác thực kiểm tra tiền đã vào Airwallex chưa
  const handleVerify = async () => {
    setVerifying(true);
    try {
      const res = await fetch(`/api/test-airwallex/verify-status?id=int_sim_${referenceCode}&ref=${encodeURIComponent(referenceCode)}`);
      const data = await res.json();
      setVerifying(false);
      if (data.status === 'SUCCEEDED' || data.verified) {
        setPaymentConfirmed(true);
      } else {
        alert(`Payment Status: ${data.status}\n${data.message}`);
      }
    } catch {
      setVerifying(false);
      alert('Could not verify with Airwallex API at this moment.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header */}
        <div className={styles.headerSection}>
          <div className={styles.badge}>
            <ShieldCheck size={16} /> Airwallex Canada B2B • In-App Bank Switcher
          </div>
          <h1 className={styles.title}>RouteAI Canadian Fleet Subscription</h1>
          <p className={styles.subtitle}>
            Select your enterprise plan, choose your Canadian bank, copy our verified Airwallex payment credentials with 1-click, and launch your mobile banking app to complete payment.
          </p>
        </div>

        {/* Thanh công cụ Billing Cycle */}
        <div className={styles.toolbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🇨🇦</span>
            <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
              Canadian Fleet Billing (CAD)
            </span>
          </div>

          <div className={styles.billingToggle}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${billingCycle === 'monthly' ? styles.toggleBtnActive : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${billingCycle === 'yearly' ? styles.toggleBtnActive : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Annual Billing <span style={{ color: '#16a34a', fontSize: '0.75rem' }}>(Save 15%)</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            BƯỚC 1: TRANG CHỌN GÓI CỦA ROUTEAI
           ========================================================= */}
        <div style={{ marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>
          Step 1: Choose Your Subscription Plan
        </div>

        <div className={styles.plansGrid}>
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const planMonthlyDisplay = Number((plan.monthlyCad * discountMultiplier).toFixed(2)).toFixed(2);

            return (
              <div
                key={plan.id}
                className={`${styles.planCard} ${plan.recommended ? styles.planCardRecommended : ''}`}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                {plan.recommended && (
                  <div className={styles.recommendedRibbon}>
                    Most Popular in Canada
                  </div>
                )}

                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planDesc}>{plan.description}</div>

                <div className={styles.priceWrapper}>
                  <span className={styles.priceAmount}>
                    C${planMonthlyDisplay}
                  </span>
                  <span className={styles.pricePeriod}>/ month</span>
                </div>

                <ul className={styles.featureList}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <Check size={18} className={styles.featureIcon} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`${styles.selectPlanBtn} ${isSelected ? styles.selectPlanBtnSelected : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlanId(plan.id);
                  }}
                >
                  {isSelected ? (
                    <>
                      <Zap size={18} /> Selected Plan (C${totalAmountCad})
                    </>
                  ) : (
                    'Select Plan'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            BƯỚC 2: CHỌN NGÂN HÀNG CỦA KHÁCH HÀNG & MỞ APP
           ========================================================= */}
        <div className={styles.checkoutPanel}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.4rem' }}>
            <Building2 color="#2563eb" size={26} />
            Step 2: Select Your Canadian Bank
          </div>
          {/* Grid Ngân hàng của khách (Chỉ hiển thị khi chọn chuyển khoản ngân hàng Interac hoặc EFT) */}
          {transferType !== 'card' && (
            <>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
                Select your Canadian financial institution. We support 250+ banks, credit unions, and fintechs on the Interac e-Transfer network.
              </p>

              {/* Search Bar & Category Filter Pills */}
              <div className={styles.searchContainer}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.searchInput}
                  value={bankSearch}
                  onChange={(e) => setBankSearch(e.target.value)}
                  placeholder="Search bank name or institution code (e.g. RBC, TD, Desjardins, Wealthsimple)..."
                />
              </div>

              <div className={styles.filterPills}>
                <button
                  type="button"
                  className={`${styles.filterPill} ${bankCategoryFilter === 'featured' ? styles.filterPillActive : ''}`}
                  onClick={() => setBankCategoryFilter('featured')}
                >
                  Featured & Popular
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${bankCategoryFilter === 'big6' ? styles.filterPillActive : ''}`}
                  onClick={() => setBankCategoryFilter('big6')}
                >
                  Big Six Banks
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${bankCategoryFilter === 'digital' ? styles.filterPillActive : ''}`}
                  onClick={() => setBankCategoryFilter('digital')}
                >
                  Online / Direct Banks
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${bankCategoryFilter === 'fintech' ? styles.filterPillActive : ''}`}
                  onClick={() => setBankCategoryFilter('fintech')}
                >
                  Fintech & Wallets
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${bankCategoryFilter === 'credit_union' ? styles.filterPillActive : ''}`}
                  onClick={() => setBankCategoryFilter('credit_union')}
                >
                  Credit Unions
                </button>
                <button
                  type="button"
                  className={`${styles.filterPill} ${bankCategoryFilter === 'all' ? styles.filterPillActive : ''}`}
                  onClick={() => setBankCategoryFilter('all')}
                >
                  All Banks ({CANADIAN_BANKS.length})
                </button>
              </div>

              {/* Bank Cards Grid */}
              <div className={styles.bankGrid}>
                {filteredBanks.map((b) => {
                  const active = selectedBankId === b.id;
                  const isCompany = b.category === 'company';
                  return (
                    <div
                      key={b.id}
                      className={`${styles.bankCard} ${active ? styles.bankCardSelected : ''} ${isCompany ? styles.bankCardCompany : ''}`}
                      onClick={() => setSelectedBankId(b.id)}
                    >
                      {isCompany && (
                        <div className={styles.companyBadge}>Our Bank</div>
                      )}
                      <div className={styles.bankLogoCircle} style={{ backgroundColor: b.logoColor }}>
                        {b.shortName}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.25 }}>
                        {b.name}
                      </div>
                      <div style={{ fontSize: '0.67rem', color: '#64748b', marginTop: 3 }}>
                        {b.institutionNumber ? `Inst: ${b.institutionNumber}` : 'Interac Network'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredBanks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: 10, border: '1px dashed #cbd5e1', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                  No bank matched &quot;<strong>{bankSearch}</strong>&quot;. You can still use our Interac Autodeposit email from any Canadian bank app.
                </div>
              )}
            </>
          )}

          {/* Transfer Method Switcher */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setTransferType('interac')}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: transferType === 'interac' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: transferType === 'interac' ? '#eff6ff' : 'white',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                color: transferType === 'interac' ? '#1e40af' : '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <Send size={16} /> Interac e-Transfer
            </button>

            <button
              type="button"
              onClick={() => setTransferType('eft')}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: transferType === 'eft' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: transferType === 'eft' ? '#eff6ff' : 'white',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                color: transferType === 'eft' ? '#1e40af' : '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <Building2 size={16} /> Direct EFT Deposit
            </button>

            <button
              type="button"
              onClick={() => setTransferType('card')}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: transferType === 'card' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: transferType === 'card' ? '#eff6ff' : 'white',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                color: transferType === 'card' ? '#1e40af' : '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <CreditCard size={16} /> Credit / Debit Card
            </button>
          </div>

          {/* =========================================================
              PHƯƠNG THỨC 3: CREDIT / DEBIT CARD CHECKOUT
             ========================================================= */}
          {transferType === 'card' ? (
            <div 
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !cardProcessing) {
                  e.preventDefault();
                  handlePayCard(e as any);
                }
              }}
              style={{ background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
                  <CreditCard size={20} color="#2563eb" /> Card Payment (Visa / Mastercard / Amex)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>
                  <Lock size={12} /> Airwallex Live Gateway
                </div>
              </div>

              {cardError && (
                <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8, padding: '12px 14px', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#991b1b', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                  {cardError}
                </div>
              )}

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
                    onChange={e => setCardNumber(e.target.value)}
                    placeholder="4111 2222 3333 4444"
                    maxLength={19}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 40px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  <CreditCard size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                </div>
              </div>

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
                    onChange={e => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
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
                    onChange={e => setCvc(e.target.value)}
                    placeholder="123"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

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
                  onChange={e => setCardHolder(e.target.value)}
                  placeholder="e.g. JOHN DOE"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="button"
                onClick={(e) => handlePayCard(e as any)}
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
          ) : (
            <>
              {/* =========================================================
                  BƯỚC 3: HIỆN THÔNG TIN CỦA CTY ĐỂ KHÁCH COPY PASTE (INTERAC / EFT)
                 ========================================================= */}
              <div className={styles.voucherBox}>
            <div className={styles.voucherHeader}>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#bfdbfe', fontWeight: 700 }}>
                  Copy & Paste to your {selectedBank.name} App
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Payment to: TAM VIET QUANG (Airwallex Canada)
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#bfdbfe' }}>Amount:</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>C${totalAmountCad} CAD</div>
              </div>
            </div>

            {/* Thông tin Interac hoặc EFT */}
            {transferType === 'interac' ? (
              <>
                <div className={styles.voucherRow}>
                  <span className={styles.voucherLabel}>Interac Autodeposit Email:</span>
                  <div className={styles.voucherValue}>
                    <span style={{ color: '#1d4ed8', fontSize: '1.05rem' }}>{CANADA_CONFIG.bankDetails.autodepositEmail}</span>
                    <button type="button" className={styles.copyBtn} onClick={() => handleCopy(CANADA_CONFIG.bankDetails.autodepositEmail, 'email')}>
                      <Copy size={13} /> {copiedField === 'email' ? 'Copied!' : 'Copy Email'}
                    </button>
                  </div>
                </div>

                <div className={styles.voucherRow}>
                  <span className={styles.voucherLabel}>Exact Amount to Transfer:</span>
                  <div className={styles.voucherValue}>
                    <span style={{ fontSize: '1.1rem' }}>C${totalAmountCad} CAD</span>
                    <button type="button" className={styles.copyBtn} onClick={() => handleCopy(totalAmountCad.toString(), 'amount')}>
                      <Copy size={13} /> {copiedField === 'amount' ? 'Copied!' : 'Copy Amount'}
                    </button>
                  </div>
                </div>

                <div className={`${styles.voucherRow} ${styles.voucherRowHighlighted}`}>
                  <span className={styles.voucherLabel} style={{ color: '#1e3a8a', fontWeight: 700 }}>
                    Payment Reference / Message:
                  </span>
                  <div className={styles.voucherValue}>
                    <span style={{ fontSize: '1.2rem', color: '#1e3a8a', letterSpacing: '0.05em' }}>{referenceCode}</span>
                    <button type="button" className={styles.copyBtn} style={{ background: '#2563eb', color: 'white', border: 'none' }} onClick={() => handleCopy(referenceCode, 'ref')}>
                      <Copy size={13} /> {copiedField === 'ref' ? 'Copied!' : 'Copy Reference'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.voucherRow}>
                  <span className={styles.voucherLabel}>Beneficiary Legal Name:</span>
                  <div className={styles.voucherValue}>
                    <span style={{ fontSize: '0.85rem' }}>{CANADA_CONFIG.bankDetails.accountName}</span>
                    <button type="button" className={styles.copyBtn} onClick={() => handleCopy(CANADA_CONFIG.bankDetails.accountName, 'name')}>
                      <Copy size={13} /> Copy
                    </button>
                  </div>
                </div>

                <div className={styles.voucherRow}>
                  <span className={styles.voucherLabel}>Bank Account Number:</span>
                  <div className={styles.voucherValue}>
                    <span style={{ color: '#2563eb', fontSize: '1.1rem' }}>{CANADA_CONFIG.bankDetails.accountNumber}</span>
                    <button type="button" className={styles.copyBtn} onClick={() => handleCopy(CANADA_CONFIG.bankDetails.accountNumber, 'acc')}>
                      <Copy size={13} /> Copy Account
                    </button>
                  </div>
                </div>

                <div className={styles.voucherRow}>
                  <span className={styles.voucherLabel}>Transit Number:</span>
                  <div className={styles.voucherValue}>
                    <span>{CANADA_CONFIG.bankDetails.transitNumber}</span>
                    <button type="button" className={styles.copyBtn} onClick={() => handleCopy(CANADA_CONFIG.bankDetails.transitNumber, 'transit')}>
                      <Copy size={13} /> Copy
                    </button>
                  </div>
                </div>

                <div className={styles.voucherRow}>
                  <span className={styles.voucherLabel}>Institution Number:</span>
                  <div className={styles.voucherValue}>
                    <span>{CANADA_CONFIG.bankDetails.institutionNumber} (Digital Commerce Bank)</span>
                  </div>
                </div>

                <div className={`${styles.voucherRow} ${styles.voucherRowHighlighted}`}>
                  <span className={styles.voucherLabel} style={{ color: '#1e3a8a', fontWeight: 700 }}>
                    Transfer Memo / Reference:
                  </span>
                  <div className={styles.voucherValue}>
                    <span style={{ fontSize: '1.2rem', color: '#1e3a8a' }}>{referenceCode}</span>
                    <button type="button" className={styles.copyBtn} style={{ background: '#2563eb', color: 'white', border: 'none' }} onClick={() => handleCopy(referenceCode, 'ref')}>
                      <Copy size={13} /> Copy
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* =========================================================
              BƯỚC 4: BUTTON CHUYỂN KHÁCH SANG APP NGÂN HÀNG HOẶC BẮT TẢI
             ========================================================= */}
          <div className={styles.appLauncherBox}>
            <div style={{ fontSize: '0.9rem', color: '#334155', marginBottom: '0.75rem', fontWeight: 600 }}>
              Launch your <strong>{selectedBank.name}</strong> app to paste details and complete transfer:
            </div>

            <button
              type="button"
              className={styles.appOpenBtn}
              style={{ backgroundColor: selectedBank.logoColor }}
              onClick={handleOpenBankApp}
            >
              <Smartphone size={22} />
              Open {selectedBank.name} App to Pay
              <ExternalLink size={18} />
            </button>

            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.6rem' }}>
              * Automatically launches the {selectedBank.shortName} mobile app on iOS/Android. If not installed, you will be redirected to the App Store / Google Play to download. On desktop, opens web banking.
            </div>
          </div>

          {/* Nút kiểm tra sau khi chuyển khoản */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleVerify}
              disabled={verifying}
              style={{ flex: 1, padding: '12px' }}
            >
              <RefreshCw size={18} className={verifying ? 'animate-spin' : ''} />
              {verifying ? 'Checking Airwallex API...' : 'I Have Transferred — Check Status & Activate Subscription'}
            </button>
          </div>
            </>
          )}

          {paymentConfirmed && (
            <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10, padding: '1.25rem', marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={32} color="#16a34a" />
              <div>
                <div style={{ fontWeight: 800, color: '#166534', fontSize: '1.1rem' }}>
                  Subscription Activated Successfully!
                </div>
                <div style={{ color: '#15803d', fontSize: '0.88rem' }}>
                  Airwallex has received the deposit from {selectedBank.name} with reference {referenceCode}. Your RouteAI enterprise license is active.
                </div>
              </div>
            </div>
          )}

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
