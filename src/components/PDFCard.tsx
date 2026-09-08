'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Download, ExternalLink } from 'lucide-react';
import DownloadEmailModal from './DownloadEmailModal';
import { identifyUserInClarity, trackClarityEvent, ClarityEvents } from '@/utils/clarity';

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

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format&q=80';

function getFormatLabel(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase();
  if (ext === 'html' || ext === 'htm') return 'HTML';
  if (ext === 'pdf') return 'PDF';
  return 'Report';
}

export default function PDFCard({ title, excerpt, pdfPath, imageUrl, mode = 'download' }: PDFCardProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalAction, setModalAction] = useState<'view' | 'download'>('download');

  const showView = mode === 'view' || mode === 'view-and-download';
  const showDownload = mode === 'download' || mode === 'view-and-download';
  const formatLabel = getFormatLabel(pdfPath);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfPath.split('/').pop() || 'download.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setModalAction('view');
    setShowEmailModal(true);
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setModalAction('download');
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      // 1. Save to Google Sheets via secure API route
      const response = await fetch('/api/save-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          reportTitle: title,
          action: modalAction,
        }),
      });

      if (!response.ok) {
        console.error('Failed to save email to Google Sheets');
      } else {
        console.log('✓ Email saved successfully');
      }

      // 2. Track in Microsoft Clarity
      identifyUserInClarity(email);
      trackClarityEvent(
        modalAction === 'view' ? ClarityEvents.EMAIL_CAPTURED_VIEW : ClarityEvents.EMAIL_CAPTURED_DOWNLOAD,
        {
          report: title,
          action: modalAction,
        }
      );

      // 3. Execute the intended action
      if (modalAction === 'download') {
        triggerDownload();
        trackClarityEvent(ClarityEvents.REPORT_DOWNLOADED, { report: title });
      } else {
        window.open(pdfPath, '_blank', 'noopener,noreferrer');
        trackClarityEvent(ClarityEvents.REPORT_VIEWED, { report: title });
      }

      // 4. Close modal after action completes
      setTimeout(() => {
        setShowEmailModal(false);
      }, 500);
      
    } catch (error) {
      console.error('Error handling email submission:', error);
      // Still allow the action even if tracking fails
      if (modalAction === 'download') {
        triggerDownload();
      } else {
        window.open(pdfPath, '_blank', 'noopener,noreferrer');
      }
      // Close modal
      setTimeout(() => {
        setShowEmailModal(false);
      }, 500);
    }
  };

  return (
    <article className="pdf-card">
      <div className="pdf-card-image-wrap">
        <Image
          src={imageUrl || DEFAULT_IMAGE}
          alt={title}
          fill
          className="pdf-card-image"
          sizes="(max-width: 960px) 100vw, 380px"
        />
        <span className="pdf-card-format-badge">{formatLabel}</span>
      </div>

      <div className="pdf-card-body">
        <h3 className="pdf-card-title">{title}</h3>
        <p className="pdf-card-excerpt">{excerpt}</p>

        <div className="pdf-card-actions">
          {showView && (
            <button
              type="button"
              onClick={handleViewClick}
              className="pdf-card-btn pdf-card-btn--primary"
            >
              <ExternalLink size={16} aria-hidden />
              View Report
            </button>
          )}

          {showDownload && (
            <button
              type="button"
              onClick={handleDownloadClick}
              className={`pdf-card-btn ${showView ? 'pdf-card-btn--secondary' : 'pdf-card-btn--primary'}`}
            >
              <Download size={16} aria-hidden />
              {showView ? 'Download' : 'Download Report'}
            </button>
          )}
        </div>
      </div>

      {(showView || showDownload) && (
        <DownloadEmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          reportTitle={title}
          onSubmit={handleEmailSubmit}
          actionType={modalAction}
        />
      )}
    </article>
  );
}
