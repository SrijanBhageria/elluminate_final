'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HeroContent } from '../types/api';

interface HeroSectionProps {
  heroContent: HeroContent | null;
  visionContent?: HeroContent | null;
  isVisible?: boolean;
}

export default function HeroSection({ heroContent, visionContent, isVisible: parentIsVisible }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ clients: 0, deals: 0, years: 0, assets: 0 });
  const [videoSectionVisible, setVideoSectionVisible] = useState(false);

  // Helper function to format animated number with API formatting
  const formatStatValue = (animatedValue: number, apiValue?: string) => {
    if (!apiValue) return animatedValue;
    
    // Extract prefix (like $), suffix (like +, B+, etc) from API value
    const numericValue = apiValue.replace(/[^0-9.]/g, '');
    const prefix = apiValue.substring(0, apiValue.indexOf(numericValue));
    const suffix = apiValue.substring(apiValue.indexOf(numericValue) + numericValue.length);
    
    return `${prefix}${animatedValue}${suffix}`;
  };

  useEffect(() => {
    setIsVisible(parentIsVisible ?? true);
    
    const targets = heroContent?.stats || { clients: 500, deals: 1200, years: 15, assets: 50 };
    
    // Animate each stat individually with staggered delays
    const animateStat = (statName: keyof typeof stats, delay: number) => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      const timeoutId = setTimeout(() => {
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          setStats(prev => ({
            ...prev,
            [statName]: Math.floor(targets[statName] * easeOut)
          }));
          
          if (step >= steps) {
            clearInterval(timer);
            // Set final value to ensure accuracy
            setStats(prev => ({
              ...prev,
              [statName]: targets[statName]
            }));
          }
        }, stepDuration);
        
        return () => clearInterval(timer);
      }, delay);
      
      return () => clearTimeout(timeoutId);
    };
    
    // Stagger each stat animation - start sooner for visibility
    const cleanup1 = animateStat('clients', 800);
    const cleanup2 = animateStat('deals', 1200);
    const cleanup3 = animateStat('years', 1600);
    const cleanup4 = animateStat('assets', 2000);
    
    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
      cleanup4();
    };
  }, [heroContent])

  // Scroll animation for video section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoSectionVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const videoSection = document.querySelector('.merged-video-section');
    if (videoSection) {
      observer.observe(videoSection);
    }

    return () => {
      if (videoSection) {
        observer.unobserve(videoSection);
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/videos/176521-855920743_small.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text-content">
            <h1 className="hero-title">
              {heroContent?.title ? (
                (() => {
                  const words = heroContent.title.split(' ');
                  return (
                    <>
                      <span className="hero-title-main">{words[0]}</span>
                      <span className="hero-title-accent">{words.slice(1, -1).join(' ')}</span>
                      <span className="hero-title-sub">{words[words.length - 1]}</span>
                    </>
                  );
                })()
              ) : (
                <>
                  <span className="hero-title-main">Elevating</span>
                  <span className="hero-title-accent">Capital Markets</span>
                  <span className="hero-title-sub">Excellence</span>
                </>
              )}
            </h1>
            
            <div className="hero-divider"></div>
            
            <p className="hero-description">
              {heroContent?.subtitle || "Empowering strategic growth through expert investment banking solutions and unparalleled financial advisory services."}
            </p>
          </div>
          
          {/* Statistics on the right */}
          <div className="hero-stats-container">
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">{formatStatValue(stats.clients, heroContent?.displayStats?.[0]?.value)}</div>
                <div className="stat-label">{heroContent?.displayStats?.[0]?.label || 'Global Clients'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{formatStatValue(stats.deals, heroContent?.displayStats?.[1]?.value)}</div>
                <div className="stat-label">{heroContent?.displayStats?.[1]?.label || 'Deals Completed'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{formatStatValue(stats.years, heroContent?.displayStats?.[2]?.value)}</div>
                <div className="stat-label">{heroContent?.displayStats?.[2]?.label || 'Years Experience'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{formatStatValue(stats.assets, heroContent?.displayStats?.[3]?.value)}</div>
                <div className="stat-label">{heroContent?.displayStats?.[3]?.label || 'Assets Under Management'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Merged Video & Insights Section */}
      <section id="insights" className="merged-video-section">
        <div className="video-background">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="background-video"
            preload="metadata"
          >
            <source src="/videos/mainvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
        
        <div className={`statue-image ${videoSectionVisible ? 'animate-slide-in-right' : ''}`} style={{ width: '45%', maxWidth: '600px' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src="/image.png" alt="Classical Statue" fill sizes="50vw" style={{ objectFit: 'contain' }} priority />
          </div>
        </div>
        
        <div className="merged-content">
          <h2 className={`merged-title ${videoSectionVisible ? 'animate-fade-in-up delay-statue' : ''}`}>
            {visionContent?.title ? (
              (() => {
                const words = visionContent.title.split(' ');
                return (
                  <>
                    {words.map((word, index) => (
                      <span key={index} className={word.toLowerCase().includes('vision') || word.toLowerCase().includes('insights') ? 'highlight' : ''}>
                        {word}{index < words.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </>
                );
              })()
            ) : (
              <>
                Where <span className="highlight">Vision</span> Meets <span className="highlight">Expert Insights</span>
              </>
            )}
          </h2>
          
          <div className={`merged-divider ${videoSectionVisible ? 'animate-expand delay-after-title' : ''}`}></div>
          
          <p className={`merged-description ${videoSectionVisible ? 'animate-fade-in-up delay-after-divider' : ''}`}>
            {visionContent?.subtitle || "Experience the power of strategic investment banking combined with comprehensive market research, cutting-edge analysis, and proven strategies that drive exceptional results across global markets."}
          </p>
        </div>
      </section>
    </>
  );
}
