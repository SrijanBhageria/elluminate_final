'use client';

import { useState, useEffect } from 'react';

interface PrivateDocumentGateProps {
  documentId: string;
  documentTitle: string;
  children: React.ReactNode;
}

export default function PrivateDocumentGate({ 
  documentId, 
  documentTitle,
  children 
}: PrivateDocumentGateProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGate, setShowGate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already entered email for this document
    const storageKey = `doc_access_${documentId}`;
    const hasAccess = localStorage.getItem(storageKey);
    
    if (hasAccess) {
      setShowGate(false);
    }
    setIsLoading(false);
  }, [documentId]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save email to Google Sheets
      const response = await fetch('/api/save-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: documentTitle,
          action: 'document_access',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save email');
      }

      // Track in Clarity
      if (typeof window !== 'undefined' && (window as any).clarity) {
        (window as any).clarity('identify', email.trim());
        (window as any).clarity('event', 'private_document_access', {
          documentId,
          documentTitle,
        });
      }

      // Store access in localStorage
      const storageKey = `doc_access_${documentId}`;
      localStorage.setItem(storageKey, 'true');

      // Hide the gate after a brief moment
      setTimeout(() => {
        setShowGate(false);
      }, 500);
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Show loading state briefly to prevent flash
  if (isLoading) {
    return (
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        background: '#000', 
        zIndex: 9999 
      }} />
    );
  }

  return (
    <>
      {/* Content (always rendered, visible in background when gate is shown) */}
      <div style={{ 
        filter: showGate ? 'blur(4px)' : 'none',
        transition: 'filter 0.3s ease',
        pointerEvents: showGate ? 'none' : 'auto',
      }}>
        {children}
      </div>

      {/* Email Gate Overlay */}
      {showGate && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={(e) => {
            // Prevent closing by clicking outside
            e.preventDefault();
          }}
        >
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.1)',
              maxWidth: '480px',
              width: '90%',
              padding: '32px',
              animation: 'slideUp 0.4s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 24px',
                background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '12px',
                background: 'linear-gradient(135deg, #ffffff 0%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Access Required
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: 'center',
                marginBottom: '28px',
              }}
            >
              Please enter your email to view <strong style={{ color: '#d4af37' }}>{documentTitle}</strong>. 
              You&apos;ll only need to do this once.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  border: error
                    ? '1.5px solid rgba(239, 68, 68, 0.5)'
                    : '1.5px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#fff',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  marginBottom: error ? '8px' : '20px',
                }}
                onFocus={(e) => {
                  if (!error) {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!error) {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />

              {/* Error message */}
              {error && (
                <div
                  style={{
                    padding: '10px 14px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    marginBottom: '20px',
                    fontSize: '13px',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#000',
                  background: isSubmitting
                    ? 'rgba(212, 175, 55, 0.5)'
                    : 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: isSubmitting
                    ? 'none'
                    : '0 4px 12px rgba(212, 175, 55, 0.3)',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow =
                      '0 6px 20px rgba(212, 175, 55, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isSubmitting
                    ? 'none'
                    : '0 4px 12px rgba(212, 175, 55, 0.3)';
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ animation: 'spin 1s linear infinite' }}
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Privacy note */}
            <p
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.4)',
                textAlign: 'center',
                marginTop: '20px',
                lineHeight: '1.5',
              }}
            >
              🔒 We&apos;ll never share your email. Your privacy is important to us.
            </p>
          </div>

          {/* Animations */}
          <style jsx>{`
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
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
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
      )}
    </>
  );
}
