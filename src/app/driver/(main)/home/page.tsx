'use client';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function DriverHome() {
  const { user } = useAuth();
  const userName = user?.full_name || user?.email?.split('@')[0] || 'Nguyễn Văn A';

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Image src="/brand/icon.svg" alt="R:t" width={34} height={43} priority />
          <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Xin chào,</p>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{userName}</h2>
          </div>
        </div>
        <button style={{ padding: '0.5rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>

      {/* Active Route Card */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Đang giao hàng
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Tuyến sáng 12/05</h3>
          </div>
          <button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>25</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>điểm giao</p>
          </div>
          <div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>120<span style={{ fontSize: '1rem' }}>km</span></p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>quãng đường</p>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>
            <span>Tiến độ</span>
            <span style={{ color: 'var(--color-primary)' }}>72%</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '72%', height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}></div>
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontWeight: 'bold', fontSize: '1rem' }}>
          Tiếp tục giao
        </button>
      </div>

      {/* Upcoming Routes */}
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Tuyến sắp tới</h3>
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Tuyến chiều 12/05</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>18 điểm giao • 85 km</p>
          </div>
          <button style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.875rem' }}>
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
