'use client';

import { useEffect, useState, useRef } from 'react';

interface PresentationViewerProps {
  src: string;
  title: string;
}

export default function PresentationViewer({ src, title }: PresentationViewerProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasReloaded = useRef(false);

  useEffect(() => {
    // Check if the HTML file exists
    fetch(src, { method: 'HEAD' })
      .then(res => {
        if (!res.ok) {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    
    // Force a single reload after initial load to fix viewport scaling on mobile
    if (!hasReloaded.current && iframeRef.current) {
      hasReloaded.current = true;
      // Small delay to ensure proper reload
      setTimeout(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.location.reload();
        }
      }, 100);
    }
  };

  if (error) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>Error Loading Presentation</h1>
          <p>Unable to load the presentation file.</p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4a9eff', textDecoration: 'underline' }}
          >
            Open presentation directly
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          color: '#fff',
          fontFamily: 'sans-serif',
          zIndex: 9999,
        }}>
          <div>Loading presentation...</div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        onLoad={handleLoad}
        onError={() => setError(true)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </>
  );
}
