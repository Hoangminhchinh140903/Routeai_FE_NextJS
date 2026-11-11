'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';
import { Search } from 'lucide-react';
import { CANADIAN_BANKS, CanadianBankApp } from '@/services/airwallex/canadianBanks';

type BankCategory = 'all' | 'featured' | 'big6' | 'digital' | 'fintech' | 'credit_union';

interface BankSelectorProps {
  selectedBankId: string;
  onSelectBankId: (id: string) => void;
}

export function BankSelector({
  selectedBankId,
  onSelectBankId,
}: BankSelectorProps) {
  const [bankSearch, setBankSearch] = useState('');
  const [bankCategoryFilter, setBankCategoryFilter] = useState<BankCategory>('featured');

  const filteredBanks = CANADIAN_BANKS.filter((b: CanadianBankApp) => {
    const matchesSearch =
      bankSearch.trim() === '' ||
      b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      b.shortName.toLowerCase().includes(bankSearch.toLowerCase()) ||
      (b.institutionNumber && b.institutionNumber.includes(bankSearch));

    if (!matchesSearch) return false;

    if (bankCategoryFilter === 'all') return true;
    if (bankCategoryFilter === 'featured') return b.featured || b.category === 'company';
    return b.category === bankCategoryFilter;
  });

  return (
    <>
      <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
        Select your Canadian financial institution. We support 250+ banks, credit unions, and fintechs on the Interac e-Transfer network.
      </p>

      {/* Search Bar */}
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

      {/* Filter Pills */}
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
        {filteredBanks.map((b: CanadianBankApp) => {
          const active = selectedBankId === b.id;
          const isCompany = b.category === 'company';
          return (
            <div
              key={b.id}
              className={`${styles.bankCard} ${active ? styles.bankCardSelected : ''} ${isCompany ? styles.bankCardCompany : ''}`}
              onClick={() => onSelectBankId(b.id)}
            >
              {isCompany && <div className={styles.companyBadge}>Our Bank</div>}
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
        <div
          style={{
            textAlign: 'center',
            padding: '1.5rem',
            background: '#f8fafc',
            borderRadius: 10,
            border: '1px dashed #cbd5e1',
            marginBottom: '1.5rem',
            color: '#64748b',
            fontSize: '0.9rem',
          }}
        >
          No bank matched &quot;<strong>{bankSearch}</strong>&quot;. You can still use our Interac Autodeposit email from any Canadian bank app.
        </div>
      )}
    </>
  );
}

