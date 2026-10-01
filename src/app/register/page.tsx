'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from '../login/page.module.css'; // Reusing the same nice styles
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await register({ email, password, full_name: fullName });
    } catch (err) {
      const errorMsg = err instanceof Error 
        ? err.message 
        : (err as { message?: string })?.message || 'Registration failed. Please check your details.';
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
        <h1 className={styles.title}>Tạo tài khoản</h1>
        <p className={styles.subtitle}>Tham gia R:t để tối ưu mọi tuyến đường</p>
        
        {error && <div className={styles.errorAlert}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.label}>Họ và tên</label>
            <input
              id="fullName"
              type="text"
              className={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Nguyễn Văn A"
            />
          </div>

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
              minLength={6}
            />
          </div>
          
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
          </button>
        </form>
        
        <div className={styles.footer}>
          Đã có tài khoản? <Link href="/login" className={styles.link}>Đăng nhập</Link>
        </div>
        <div className={styles.tagline}>Đúng tuyến. Đúng thời gian. Cùng R:t.</div>
      </div>
    </div>
  );
}
