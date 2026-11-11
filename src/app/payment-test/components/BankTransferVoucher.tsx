'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';
import { Copy, Smartphone, ExternalLink, RefreshCw } from 'lucide-react';
import { CANADA_CONFIG } from '@/services/airwallex/countries';
import { CanadianBankApp } from '@/services/airwallex/canadianBanks';
import { TransferType } from './TransferMethodTabs';

interface BankTransferVoucherProps {
  selectedBank: CanadianBankApp;
  transferType: TransferType;
  totalAmountCad: number;
  referenceCode: string;
  onPaymentSuccess: () => void;
}

export function BankTransferVoucher({
  selectedBank,
  transferType,
  totalAmountCad,
  referenceCode,
  onPaymentSuccess,
}: BankTransferVoucherProps) {
  const [copiedField, setCopiedField] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleOpenBankApp = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isMobile) {
      const appUrl = isAndroid
        ? `intent://${selectedBank.appPackageAndroid}#Intent;scheme=package;end;`
        : (selectedBank.appSchemeIos || selectedBank.webLoginUrl);

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
      // Nếu đang dùng máy tính Desktop -> Mở trang Online Banking
      window.open(selectedBank.webLoginUrl, '_blank');
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    try {
      const res = await fetch(
        `/api/test-airwallex/verify-status?id=int_sim_${referenceCode}&ref=${encodeURIComponent(referenceCode)}`
      );
      const data = await res.json();
      setVerifying(false);

      if (data.status === 'SUCCEEDED' || data.verified) {
        onPaymentSuccess();
      } else {
        alert(`Payment Status: ${data.status}\n${data.message}`);
      }
    } catch {
      setVerifying(false);
      alert('Could not verify with Airwallex API at this moment.');
    }
  };

  return (
    <>
      {/* Voucher Box */}
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
                <span style={{ color: '#1d4ed8', fontSize: '1.05rem' }}>
                  {CANADA_CONFIG.bankDetails.autodepositEmail}
                </span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy(CANADA_CONFIG.bankDetails.autodepositEmail, 'email')}
                >
                  <Copy size={13} /> {copiedField === 'email' ? 'Copied!' : 'Copy Email'}
                </button>
              </div>
            </div>

            <div className={styles.voucherRow}>
              <span className={styles.voucherLabel}>Exact Amount to Transfer:</span>
              <div className={styles.voucherValue}>
                <span style={{ fontSize: '1.1rem' }}>C${totalAmountCad} CAD</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy(totalAmountCad.toString(), 'amount')}
                >
                  <Copy size={13} /> {copiedField === 'amount' ? 'Copied!' : 'Copy Amount'}
                </button>
              </div>
            </div>

            <div className={`${styles.voucherRow} ${styles.voucherRowHighlighted}`}>
              <span className={styles.voucherLabel} style={{ color: '#1e3a8a', fontWeight: 700 }}>
                Payment Reference / Message:
              </span>
              <div className={styles.voucherValue}>
                <span style={{ fontSize: '1.2rem', color: '#1e3a8a', letterSpacing: '0.05em' }}>
                  {referenceCode}
                </span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  style={{ background: '#2563eb', color: 'white', border: 'none' }}
                  onClick={() => handleCopy(referenceCode, 'ref')}
                >
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
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy(CANADA_CONFIG.bankDetails.accountName, 'name')}
                >
                  <Copy size={13} /> Copy
                </button>
              </div>
            </div>

            <div className={styles.voucherRow}>
              <span className={styles.voucherLabel}>Bank Account Number:</span>
              <div className={styles.voucherValue}>
                <span style={{ color: '#2563eb', fontSize: '1.1rem' }}>
                  {CANADA_CONFIG.bankDetails.accountNumber}
                </span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy(CANADA_CONFIG.bankDetails.accountNumber, 'acc')}
                >
                  <Copy size={13} /> Copy Account
                </button>
              </div>
            </div>

            <div className={styles.voucherRow}>
              <span className={styles.voucherLabel}>Transit Number:</span>
              <div className={styles.voucherValue}>
                <span>{CANADA_CONFIG.bankDetails.transitNumber}</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy(CANADA_CONFIG.bankDetails.transitNumber, 'transit')}
                >
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
                <button
                  type="button"
                  className={styles.copyBtn}
                  style={{ background: '#2563eb', color: 'white', border: 'none' }}
                  onClick={() => handleCopy(referenceCode, 'ref')}
                >
                  <Copy size={13} /> Copy
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Button chuyển sang App Ngân hàng hoặc chuyển hướng tải */}
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
  );
}

