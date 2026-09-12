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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).clarity) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).clarity('identify', email.trim());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              maxWidth: '420px',
              width: '90%',
              padding: '28px',
              animation: 'slideUp 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Label */}
            <div
              style={{
                fontSize: '15px',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '12px',
              }}
            >
              Enter your email
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  border: error
                    ? '1.5px solid rgba(239, 68, 68, 0.6)'
                    : '1.5px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#fff',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  marginBottom: error ? '10px' : '16px',
                }}
                onFocus={(e) => {
                  if (!error) {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.4)';
                  }
                }}
                onBlur={(e) => {
                  if (!error) {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                  }
                }}
              />

              {/* Error message */}
              {error && (
                <div
                  style={{
                    padding: '10px 14px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '13px',
                    color: '#ff6b6b',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: isSubmitting ? 'rgba(255, 255, 255, 0.5)' : '#fff',
                  background: isSubmitting
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Continue'}
              </button>
            </form>
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
          `}</style>
        </div>
      )}
    </>
  );
}
