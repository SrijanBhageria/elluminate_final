'use client';

import { useEffect, useState } from 'react';

interface PresentationViewerProps {
  src: string;
  title: string;
}

export default function PresentationViewer({ src, title }: PresentationViewerProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
        src={src}
        title={title}
        onLoad={() => setLoaded(true)}
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
