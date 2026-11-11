'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Send, 
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get('id') || 'int_sim_checkout';
  const amount = searchParams.get('amount') || '199.00';
  const currency = searchParams.get('currency') || 'CAD';
  const desc = searchParams.get('desc') || 'RouteAI Enterprise Subscription';

  // 3 Phương thức thanh toán in-app trực tiếp
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'eft_debit' | 'interac_request'>('eft_debit');

  // METHOD 1: CARD STATE
  const [cardNumber, setCardNumber] = useState('4532 8921 3491 5521');
  const [expiry, setExpiry] = useState('08/29');
  const [cvc, setCvc] = useState('412');
  const [cardHolder, setCardHolder] = useState('MAPLE LEAF EXPRESS CORP');

  // METHOD 2: DIRECT BANK DEBIT (EFT / ACH - Trích nợ tài khoản trực tiếp)
  const [bankInstitution, setBankInstitution] = useState('004'); // TD Canada Trust
  const [transitNumber, setTransitNumber] = useState('18921');
  const [bankAccountNumber, setBankAccountNumber] = useState('09823412');
  const [accountHolderName, setAccountHolderName] = useState('Maple Leaf Express Logistics Inc.');
  const [eftAuthorized, setEftAuthorized] = useState(true);

  // METHOD 3: INTERAC REQUEST MONEY (Yêu cầu thanh toán gửi trực tiếp về SĐT / Email ngân hàng của khách)
  const [interacCustomerContact, setInteracCustomerContact] = useState('billing@mapleleaflogistics.ca');
  const [customerBankId, setCustomerBankId] = useState('td');

  const [processing, setProcessing] = useState(false);

  const formatAmount = (val: string, cur: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    return `C$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${cur}`;
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      // Điều hướng về RouteAI với trạng thái đã hoàn tất giao dịch tự động
      router.push(`/payment-test?checkout_status=success&intent_id=${id}&method=${selectedMethod}&amount=${amount}`);
    }, 1800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: 580,
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#0f172a',
          color: 'white',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              In-App Payment Gateway • Canada 🇨🇦
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: 4 }}>
              RouteAI Enterprise Checkout
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '6px 12px',
            borderRadius: 8,
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            <Lock size={12} color="#38bdf8" /> 256-bit Encrypted
          </div>
        </div>

        {/* Order Details */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem', color: '#64748b' }}>
            <span>Subscription Order:</span>
            <span style={{ fontWeight: 600, color: '#1e293b' }}>{desc}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Total To Be Charged:</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
              {formatAmount(amount, currency)}
            </span>
          </div>
        </div>

        {/* Payment Method Selector Tabs */}
        <div style={{ padding: '1.25rem 1.5rem 0.5rem 1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 8 }}>
            Choose Direct In-App Payment Method:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            
            {/* Tab 1: Direct Bank Debit */}
            <button
              type="button"
              onClick={() => setSelectedMethod('eft_debit')}
              style={{
                padding: '10px 8px',
                borderRadius: 10,
                border: selectedMethod === 'eft_debit' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: selectedMethod === 'eft_debit' ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <Building2 size={20} color={selectedMethod === 'eft_debit' ? '#2563eb' : '#64748b'} style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedMethod === 'eft_debit' ? '#1e40af' : '#1e293b' }}>
                Bank Account
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
                EFT Direct Debit
              </div>
            </button>

            {/* Tab 2: Interac Instant Request */}
            <button
              type="button"
              onClick={() => setSelectedMethod('interac_request')}
              style={{
                padding: '10px 8px',
                borderRadius: 10,
                border: selectedMethod === 'interac_request' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: selectedMethod === 'interac_request' ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <Send size={20} color={selectedMethod === 'interac_request' ? '#2563eb' : '#64748b'} style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedMethod === 'interac_request' ? '#1e40af' : '#1e293b' }}>
                Interac Request
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
                1-Click Bank App
              </div>
            </button>

            {/* Tab 3: Credit/Debit Card */}
            <button
              type="button"
              onClick={() => setSelectedMethod('card')}
              style={{
                padding: '10px 8px',
                borderRadius: 10,
                border: selectedMethod === 'card' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: selectedMethod === 'card' ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <CreditCard size={20} color={selectedMethod === 'card' ? '#2563eb' : '#64748b'} style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedMethod === 'card' ? '#1e40af' : '#1e293b' }}>
                Credit Card
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
                Visa / Master / Amex
              </div>
            </button>

          </div>
        </div>

        {/* In-App Payment Form */}
        <form onSubmit={handleProcessPayment} style={{ padding: '1.25rem 1.5rem 1.5rem 1.5rem' }}>

          {/* METHOD A: DIRECT BANK DEBIT (EFT - Khách nhập thông tin ngân hàng của khách) */}
          {selectedMethod === 'eft_debit' && (
            <div>
              <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: '1rem', fontSize: '0.85rem', color: '#475569' }}>
                Enter your company Canadian bank account details below to authorize direct debit to <strong>TAM VIET QUANG (Airwallex Canada)</strong>.
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Financial Institution (Bank Name)
                </label>
                <select
                  value={bankInstitution}
                  onChange={e => setBankInstitution(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="004">004 - The Toronto-Dominion Bank (TD Canada Trust)</option>
                  <option value="003">003 - Royal Bank of Canada (RBC)</option>
                  <option value="002">002 - The Bank of Nova Scotia (Scotiabank)</option>
                  <option value="001">001 - Bank of Montreal (BMO)</option>
                  <option value="010">010 - Canadian Imperial Bank of Commerce (CIBC)</option>
                  <option value="815">815 - Fédération des caisses Desjardins du Québec</option>
                  <option value="614">614 - Tangerine Bank</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                    Transit Number (5 Digits)
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={transitNumber}
                    onChange={e => setTransitNumber(e.target.value)}
                    placeholder="e.g. 18921"
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

                <div style={{ flex: 1.5 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                    Account Number (7 - 12 Digits)
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={bankAccountNumber}
                    onChange={e => setBankAccountNumber(e.target.value)}
                    placeholder="e.g. 09823412"
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Bank Account Holder Name (Legal Entity)
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={e => setAccountHolderName(e.target.value)}
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

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8rem', color: '#475569', marginBottom: '1.25rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={eftAuthorized}
                  onChange={e => setEftAuthorized(e.target.checked)}
                  required
                  style={{ marginTop: 2 }}
                />
                <span>
                  I authorize RouteAI & Airwallex to initiate pre-authorized EFT debit charges to this bank account for the subscription amount.
                </span>
              </label>
            </div>
          )}

          {/* METHOD B: INTERAC REQUEST MONEY (Gửi yêu cầu thanh toán tức thời tới ngân hàng khách) */}
          {selectedMethod === 'interac_request' && (
            <div>
              <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: '1rem', fontSize: '0.85rem', color: '#475569' }}>
                Enter your Canadian bank-registered email or mobile phone number. An automated Interac Money Request will be sent immediately for 1-click authorization.
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Customer Bank-Registered Email or Mobile No.
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={interacCustomerContact}
                    onChange={e => setInteracCustomerContact(e.target.value)}
                    placeholder="e.g. accounting@company.ca or +1 416-555-0199"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  <Smartphone size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Select Your Canadian Bank (For Direct App Deep-Link)
                </label>
                <select
                  value={customerBankId}
                  onChange={e => setCustomerBankId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="td">TD Canada Trust</option>
                  <option value="rbc">RBC Royal Bank</option>
                  <option value="scotia">Scotiabank</option>
                  <option value="bmo">BMO Bank of Montreal</option>
                  <option value="cibc">CIBC</option>
                  <option value="desjardins">Desjardins</option>
                </select>
              </div>
            </div>
          )}

          {/* METHOD C: CREDIT / DEBIT CARD */}
          {selectedMethod === 'card' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Card Number
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
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
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
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
                    maxLength={4}
                    value={cvc}
                    onChange={e => setCvc(e.target.value)}
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
                  value={cardHolder}
                  onChange={e => setCardHolder(e.target.value)}
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
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={processing}
            style={{
              width: '100%',
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '14px',
              borderRadius: 8,
              fontSize: '1rem',
              fontWeight: 700,
              border: 'none',
              cursor: processing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: processing ? 0.7 : 1,
              transition: 'background-color 0.2s'
            }}
          >
            {processing ? (
              <>Authorizing & Debiting Account...</>
            ) : (
              <>
                <CheckCircle2 size={18} /> Authorize & Pay {formatAmount(amount, currency)}
              </>
            )}
          </button>
        </form>

        <div style={{ padding: '1rem 1.5rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Link href="/payment-test" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ArrowLeft size={14} /> Cancel and return to RouteAI
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SimulatorPage() {
  return (
    <Suspense fallback={<div>Loading in-app payment interface...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
