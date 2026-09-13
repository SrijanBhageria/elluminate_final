'use client';

import { useEffect, useState } from 'react';

interface PresentationViewerProps {
  src: string;
  title: string;
}

export default function PresentationViewer({ src, title }: PresentationViewerProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showRotateHint, setShowRotateHint] = useState(false);

  useEffect(() => {
    // Check if the HTML file exists
    fetch(src, { method: 'HEAD' })
      .then(res => {
        if (!res.ok) {
          setError(true);
        }
      })
      .catch(() => setError(true));

    // Check if on mobile in portrait mode
    const checkOrientation = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowRotateHint(isMobile && isPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [src]);

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

      {showRotateHint && loaded && (
        <div style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: 10000,
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
        }}>
          📱 Rotate your device to landscape for best experience
        </div>
      )}

      <iframe
        src={src}
        title={title}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        scrolling="no"
      />
    </>
  );
}
