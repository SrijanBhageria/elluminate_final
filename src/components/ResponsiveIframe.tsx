'use client';

import { useEffect, useState } from 'react';

interface ResponsiveIframeProps {
  src: string;
  title: string;
}

export default function ResponsiveIframe({ src, title }: ResponsiveIframeProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: isMobile ? 'auto' : 'hidden',
        WebkitOverflowScrolling: 'touch',
        background: '#fff',
      }}
    >
      <iframe
        src={src}
        title={title}
        style={{
          width: '100%',
          minWidth: '100%',
          height: '100%',
          minHeight: '100vh',
          border: 'none',
          display: 'block',
        }}
      />
    </div>
  );
}
