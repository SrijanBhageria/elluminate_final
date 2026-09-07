'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';
import DownloadEmailModal from './DownloadEmailModal';

interface PDFCardProps {
  title: string;
  excerpt: string;
  pdfPath: string;
  imageUrl?: string;
  /**
   * 'download' (default) gates the file behind the email-capture modal, then
   * triggers a browser download. 'view' opens pdfPath directly in a new tab —
   * no gate, no download prompt. Use 'view' for reports meant to be opened or
   * shared as a plain link (e.g. HTML investor memos). 'view-and-download'
   * offers both: an ungated "View Report" link plus an email-gated download of
   * the same file.
   */
  mode?: 'download' | 'view' | 'view-and-download';
}

export default function PDFCard({ title, excerpt, pdfPath, imageUrl, mode = 'download' }: PDFCardProps) {
  const [fileSize, setFileSize] = useState('0.0');
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    // Generate file size only on client to avoid hydration mismatch
    setFileSize((Math.random() * 2 + 1).toFixed(1));
  }, []);

  const showView = mode === 'view' || mode === 'view-and-download';
  const showDownload = mode === 'download' || mode === 'view-and-download';

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfPath.split('/').pop() || 'download.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewClick = () => {
    window.open(pdfPath, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadClick = () => {
    setShowEmailModal(true);
  };

  const handleEmailSubmit = (email: string) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const downloadTemplateId = process.env.NEXT_PUBLIC_EMAILJS_DOWNLOAD_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (serviceId && downloadTemplateId && publicKey) {
      emailjs
        .send(serviceId, downloadTemplateId, { article_name: title, downloader_email: email }, publicKey)
        .catch((err) => console.error('EmailJS download notification failed:', err));
    }
    triggerDownload();
  };

  const defaultImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format&q=80';

  // Gold CTA used on its own, or as the first of the two stacked actions.
  const primaryButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
    color: '#000',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-3) var(--space-6)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-bold)',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)',
    width: '100%',
  };

  // Outlined variant so two stacked CTAs don't compete for attention.
  const secondaryButtonStyle: React.CSSProperties = {
    ...primaryButtonStyle,
    background: 'transparent',
    color: '#6B4F2A',
    border: '1px solid #B8956A',
    boxShadow: 'none',
  };

  const primaryHoverProps = {
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
      e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.6)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
    },
  };

  const secondaryHoverProps = {
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.background = 'rgba(184, 149, 106, 0.22)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.background = 'transparent';
    },
  };

  return (
    <article
      style={{
        background: '#E5D4C1',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid #D4C4B0',
        transition: 'all var(--transition-normal)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(184, 149, 106, 0.3)';
        e.currentTarget.style.borderColor = '#B8956A';
        e.currentTarget.style.background = '#DCC9B3';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#D4C4B0';
        e.currentTarget.style.background = '#E5D4C1';
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <Image
          src={imageUrl || defaultImage}
          alt={title}
          fill
          style={{
            objectFit: 'cover',
            filter: 'grayscale(30%)',
            transition: 'filter var(--transition-normal)',
          }}
          sizes="(max-width: 768px) 100vw, 400px"
          className="pdf-card-image"
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'grayscale(0%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'grayscale(30%)';
          }}
        />
        
        {/* File size badge */}
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-3)',
            right: 'var(--space-3)',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: 'var(--space-1) var(--space-2)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-weight-medium)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {fileSize} MB
        </div>
      </div>
      
      <div style={{ padding: 'var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: '#B8956A',
            marginBottom: 'var(--space-3)',
            lineHeight: '1.3',
            flex: 1,
            fontFamily: 'var(--font-family-heading)',
          }}
        >
          {title}
        </h3>
        
        <p
          style={{
            color: '#4A4A4A',
            lineHeight: '1.5',
            marginBottom: 'var(--space-4)',
            fontSize: 'var(--text-sm)',
            flex: 1,
          }}
        >
          {excerpt}
        </p>
        
        {/* View / Download actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            marginTop: 'auto',
          }}
        >
          {showView && (
            <button onClick={handleViewClick} style={primaryButtonStyle} {...primaryHoverProps}>
              <ExternalLink size={16} />
              View Report
            </button>
          )}

          {showDownload && (
            <button
              onClick={handleDownloadClick}
              style={showView ? secondaryButtonStyle : primaryButtonStyle}
              {...(showView ? secondaryHoverProps : primaryHoverProps)}
            >
              <Download size={16} />
              {showView ? 'Download HTML' : 'Download Report'}
            </button>
          )}
        </div>
      </div>

      {showDownload && (
        <DownloadEmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          reportTitle={title}
          onSubmit={handleEmailSubmit}
        />
      )}
    </article>
  );
}

