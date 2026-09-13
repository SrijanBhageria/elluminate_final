'use client';

import { useEffect, useState } from 'react';

interface ResponsiveIframeProps {
  src: string;
  title: string;
}

export default function ResponsiveIframe({ src, title }: ResponsiveIframeProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (mobile) {
        // Scale based on viewport width
        // Presentation seems to be designed for larger screens (1920px)
        const desktopWidth = 1920;
        const mobileScale = window.innerWidth / desktopWidth;
        setScale(mobileScale);
      } else {
        setScale(1);
      }
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
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <iframe
        src={src}
        title={title}
        style={{
          width: isMobile ? '1920px' : '100%',
          height: isMobile ? `${100 / scale}vh` : '100vh',
          border: 'none',
          display: 'block',
          transform: isMobile ? `scale(${scale})` : 'none',
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
}
