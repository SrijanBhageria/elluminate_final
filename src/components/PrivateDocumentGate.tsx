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
              background: '#1a1a1a',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
              maxWidth: '400px',
              width: '90%',
              padding: '24px',
              animation: 'slideUp 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >

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
                  padding: '12px 14px',
                  fontSize: '14px',
                  border: error
                    ? '1px solid rgba(239, 68, 68, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  marginBottom: error ? '8px' : '12px',
                }}
                onFocus={(e) => {
                  if (!error) {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }
                }}
                onBlur={(e) => {
                  if (!error) {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
              />

              {/* Error message */}
              {error && (
                <div
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    fontSize: '12px',
                    color: '#ef4444',
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
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#fff',
                  background: isSubmitting
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
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
