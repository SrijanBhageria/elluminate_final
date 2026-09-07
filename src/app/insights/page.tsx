'use client';

import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import { insightsContent } from '../../data/pageContent';
import PDFCard from '../../components/PDFCard';

export default function InsightsPage() {
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect - immediate to prevent flashing
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // PDF data for Market Analysis section
  const marketAnalysisPDFs: Array<{
    title: string;
    excerpt: string;
    pdfPath: string;
    imageUrl?: string;
    mode?: 'download' | 'view';
  }> = [
    {
      title: 'India Electronics: The Market Memo',
      excerpt: 'In-depth market memo on India’s electronics (ESDM) opportunity — the industry’s value chain, the assembly-to-design shift, and the investment case for domestic manufacturing.',
      pdfPath: '/blogs/elecbits-market-memo.html',
      mode: 'view',
    },
    {
      title: 'Residential Rooftop Solar Market in India',
      excerpt: 'Comprehensive analysis of the residential rooftop solar market in India, including market trends, growth opportunities, and investment insights.',
      pdfPath: '/blogs/Residential Rooftop Solar Market in India.pdf',
      imageUrl: '/rooftop.png',
    },
    {
      title: 'Used Tractors in India - Market Memo',
      excerpt: 'Detailed market memorandum on the used tractors market in India, covering market dynamics, key players, and strategic opportunities.',
      pdfPath: '/blogs/Used Tractors in india - Market Memo_vJan\'25.pdf',
      imageUrl: '/tractor.png',
    },
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* Fixed Background Image */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/insights.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />
      
      {/* Light Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1,
        }}
      />

      <div style={{ paddingTop: '80px', position: 'relative', zIndex: 50 }}>
        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            minHeight: '80vh',
            padding: 'var(--space-20) var(--space-6)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Content */}
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 3 }}>
            <h1
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#B8956A',
                marginBottom: 'var(--space-6)',
                fontFamily: 'var(--font-family-heading)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease 0.4s',
                lineHeight: '1.2',
              }}
            >
              {insightsContent.title}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.5',
                marginBottom: 'var(--space-8)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease 1.2s',
                fontWeight: 'var(--font-weight-normal)',
              }}
            >
              {insightsContent.subtitle}
            </p>
          </div>

          {/* Floating Arrow Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              opacity: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B8956A',
                animation: 'bounce 2s infinite',
              }}
            >
              <div style={{ fontSize: '60px' }}>↓</div>
            </div>
          </div>
        </section>

        {/* Market Analysis Section */}
        <section
          style={{
            padding: 'var(--space-20) var(--space-6)',
            background: 'transparent',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#ffffff',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-family-heading)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease 0.2s',
              }}
            >
              Market Analysis
            </h2>
            
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: 'var(--space-8)',
                maxWidth: '600px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease 0.3s',
              }}
            >
              Comprehensive market analysis reports and insights to help you make informed decisions.
            </p>
          
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--space-8)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease 0.4s',
              }}
            >
              {marketAnalysisPDFs.map((pdf, index) => (
                <PDFCard
                  key={index}
                  title={pdf.title}
                  excerpt={pdf.excerpt}
                  pdfPath={pdf.pdfPath}
                  imageUrl={pdf.imageUrl}
                  mode={pdf.mode}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
