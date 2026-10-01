'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login({ email, password });
    } catch (err) {
      const errorMsg = err instanceof Error 
        ? err.message 
        : (err as { message?: string })?.message || 'Login failed. Please check your credentials.';
      setError(errorMsg.replace(/^\[.*?\]\s*/, ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <Image
            src="/brand/logo.svg"
            alt="R:t — Smarter Routes. Faster Deliveries."
            width={148}
            height={89}
            priority
            className={styles.logo}
          />
        </div>
        <h1 className={styles.title}>Chào mừng trở lại</h1>
        <p className={styles.subtitle}>Đăng nhập để bắt đầu tuyến đường tối ưu của bạn</p>
        
        {error && <div className={styles.errorAlert}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Địa chỉ email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ban@r-t.io"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Mật khẩu</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        
        <div className={styles.footer}>
          Chưa có tài khoản? <Link href="/register" className={styles.link}>Đăng ký ngay</Link>
        </div>
        <div className={styles.tagline}>Đúng tuyến. Đúng thời gian. Cùng R:t.</div>
      </div>
    </div>
  );
}
