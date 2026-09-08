'use client';

import React, { useState, useEffect, useRef } from 'react';

interface DownloadEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  onSubmit: (email: string) => void;
  actionType?: 'view' | 'download';
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DownloadEmailModal({
  isOpen,
  onClose,
  reportTitle,
  onSubmit,
  actionType = 'download',
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
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    // Simulate minimum loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onSubmit(trimmed);
    // Keep modal open with loading state until parent closes it
  };

  // Dynamic text based on action type
  const actionText = actionType === 'view' ? 'View' : 'Download';
  const modalTitle = `${actionText} Report`;
  const modalDescription = `Enter your email to ${actionType} "${reportTitle}".`;

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
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={!isSubmitting ? onClose : undefined}
        disabled={isSubmitting}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          backdropFilter: 'blur(8px)',
        }}
      />
      
      {/* Modal */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #D4C4B0 0%, #B8A692 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8) var(--space-6)',
          maxWidth: '420px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          animation: 'slideUp 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {!isSubmitting && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 'var(--space-4)',
              right: 'var(--space-4)',
              background: 'rgba(0, 0, 0, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              fontSize: '20px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
        )}

        {/* Icon */}
        <div
          style={{
            width: '56px',
            height: '56px',
            margin: '0 auto var(--space-4)',
            background: 'linear-gradient(135deg, #FFD700, #FFC700)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: '#000' }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        <h2
          id="download-email-modal-title"
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: '#FFFFFF',
            marginBottom: 'var(--space-2)',
            fontFamily: 'var(--font-family-heading)',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          {modalTitle}
        </h2>
        
        <p
          id="download-email-modal-desc"
          style={{
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: 'var(--text-sm)',
            marginBottom: 'var(--space-6)',
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          {modalDescription}
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
            placeholder="your@email.com"
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
              border: error ? '2px solid #ff6b6b' : '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(255, 255, 255, 0.98)',
              color: '#1a1a1a',
              marginBottom: error ? 'var(--space-2)' : 'var(--space-5)',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
            onFocus={(e) => {
              if (!error) {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              }
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onBlur={(e) => {
              if (!error) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.98)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
          />
          {error && (
            <p
              role="alert"
              style={{
                color: '#ff6b6b',
                fontSize: 'var(--text-sm)',
                marginBottom: 'var(--space-5)',
                fontWeight: 'var(--font-weight-medium)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              <span>⚠️</span>
              {error}
            </p>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-5)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#000',
              background: isSubmitting
                ? 'linear-gradient(135deg, #A8A8A8, #CCCCCC)'
                : 'linear-gradient(135deg, #FFD700, #D4AF37)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(212, 175, 55, 0.4)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(212, 175, 55, 0.4)';
            }}
          >
            {isSubmitting ? (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    animation: 'spin 1s linear infinite',
                  }}
                >
                  <circle cx="12" cy="12" r="10" opacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{actionText} Report</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Privacy note */}
        <p
          style={{
            marginTop: 'var(--space-3)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          🔒 Your email is safe. We'll only use it for this report.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
