'use client';

import React, { useState, useEffect, useRef } from 'react';

interface DownloadEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  onSubmit: (email: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DownloadEmailModal({
  isOpen,
  onClose,
  reportTitle,
  onSubmit,
}: DownloadEmailModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setError(null);
      setIsSubmitting(false);
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    onSubmit(trimmed);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-email-modal-title"
      aria-describedby="download-email-modal-desc"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          border: 'none',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
        }}
      />
      {/* Modal */}
      <div
        style={{
          position: 'relative',
          background: '#B3986D',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          maxWidth: '420px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="download-email-modal-title"
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: '#FFFFFF',
            marginBottom: 'var(--space-2)',
            fontFamily: 'var(--font-family-heading)',
          }}
        >
          Download Report
        </h2>
        <p
          id="download-email-modal-desc"
          style={{
            color: '#EAEAEA',
            fontSize: 'var(--text-sm)',
            marginBottom: 'var(--space-6)',
            lineHeight: 1.5,
          }}
        >
          Enter your email to download &quot;{reportTitle}&quot;.
        </p>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="download-email-input"
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            Email address
          </label>
          <input
            ref={inputRef}
            id="download-email-input"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-base)',
              border: `1px solid ${error ? '#c53030' : 'rgba(0,0,0,0.2)'}`,
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(255,255,255,0.95)',
              color: '#1a1a1a',
              marginBottom: error ? 'var(--space-2)' : 'var(--space-4)',
              outline: 'none',
            }}
          />
          {error && (
            <p
              role="alert"
              style={{
                color: '#f56565',
                fontSize: 'var(--text-sm)',
                marginBottom: 'var(--space-4)',
              }}
            >
              {error}
            </p>
          )}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: 'var(--space-3) var(--space-5)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: '#1a1a1a',
                background: 'transparent',
                border: '1px solid rgba(0,0,0,0.25)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: 'var(--space-3) var(--space-6)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#000',
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(212, 175, 55, 0.4)',
              }}
            >
              {isSubmitting ? 'Downloading…' : 'Download'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
