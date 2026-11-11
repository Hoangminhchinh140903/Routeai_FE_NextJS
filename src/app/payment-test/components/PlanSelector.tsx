'use client';

import React from 'react';
import styles from '../page.module.css';
import { Check, Zap } from 'lucide-react';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '@/services/airwallex/plans';

interface PlanSelectorProps {
  selectedPlanId: string;
  onSelectPlan: (id: string) => void;
  billingCycle: 'monthly' | 'yearly';
  onBillingCycleChange: (cycle: 'monthly' | 'yearly') => void;
}

export function PlanSelector({
  selectedPlanId,
  onSelectPlan,
  billingCycle,
  onBillingCycleChange,
}: PlanSelectorProps) {
  const discountMultiplier = billingCycle === 'yearly' ? 0.85 : 1.0;

  return (
    <>
      {/* Toolbar Billing Cycle */}
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
            onClick={() => onBillingCycleChange('monthly')}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${billingCycle === 'yearly' ? styles.toggleBtnActive : ''}`}
            onClick={() => onBillingCycleChange('yearly')}
          >
            Annual Billing <span style={{ color: '#16a34a', fontSize: '0.75rem' }}>(Save 15%)</span>
          </button>
        </div>
      </div>

      {/* Title */}
      <div style={{ marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>
        Step 1: Choose Your Subscription Plan
      </div>

      {/* Plans Grid */}
      <div className={styles.plansGrid}>
        {SUBSCRIPTION_PLANS.map((plan: SubscriptionPlan) => {
          const isSelected = selectedPlanId === plan.id;
          const planMonthlyDisplay = Number((plan.monthlyCad * discountMultiplier).toFixed(2)).toFixed(2);
          const totalPlanAmount = Number(
            (plan.monthlyCad * discountMultiplier * (billingCycle === 'yearly' ? 12 : 1)).toFixed(2)
          );

          return (
            <div
              key={plan.id}
              className={`${styles.planCard} ${plan.recommended ? styles.planCardRecommended : ''}`}
              onClick={() => onSelectPlan(plan.id)}
            >
              {plan.recommended && (
                <div className={styles.recommendedRibbon}>
                  Most Popular in Canada
                </div>
              )}

              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.planDesc}>{plan.description}</div>

              <div className={styles.priceWrapper}>
                <span className={styles.priceAmount}>C${planMonthlyDisplay}</span>
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
                  onSelectPlan(plan.id);
                }}
              >
                {isSelected ? (
                  <>
                    <Zap size={18} /> Selected Plan (C${totalPlanAmount})
                  </>
                ) : (
                  'Select Plan'
                )}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

