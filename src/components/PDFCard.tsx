'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface PDFCardProps {
  title: string;
  excerpt: string;
  pdfPath: string;
  imageUrl?: string;
}

export default function PDFCard({ title, excerpt, pdfPath, imageUrl }: PDFCardProps) {
  const [downloadCount, setDownloadCount] = useState(0);
  const [fileSize, setFileSize] = useState('0.0');

  useEffect(() => {
    // Generate random values only on client to avoid hydration mismatch
    setDownloadCount(Math.floor(Math.random() * 5000) + 1000);
    setFileSize((Math.random() * 2 + 1).toFixed(1));
  }, []);

  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfPath.split('/').pop() || 'download.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format&q=80';

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
        
        {/* Download count */}
        <div
          style={{
            color: '#4A4A4A',
            fontSize: 'var(--text-sm)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {downloadCount.toLocaleString()} downloads
        </div>
        
        {/* Download Report Button */}
        <button
          onClick={handleDownload}
          style={{
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
            marginTop: 'auto',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
          }}
        >
          <Download size={16} />
          Download Report
        </button>
      </div>
    </article>
  );
}

