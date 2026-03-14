'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Award, Users, BarChart3, Star, Quote, CheckCircle, ArrowRight, Download, Calendar, Building2 } from 'lucide-react';
import Footer from '../../components/Footer';
import {
  successStoriesContent,
  performanceMetricsContent,
  joinSuccessContent
} from '../../data/pageContent';
import './records-story.css';

export default function RecordsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [beliefVisible, setBeliefVisible] = useState(false);
  const [approachVisible, setApproachVisible] = useState(false);
  const [awardsVisible, setAwardsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  // Animation effect - immediate to prevent flashing
  useEffect(() => {
    setIsVisible(true);
    setHeroVisible(true); // Show hero section immediately
  }, []);

  // Scroll animations for each section
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -200px 0px'
    };

    const observers: IntersectionObserver[] = [];

    const beliefSection = document.getElementById('belief-section');
    const approachSection = document.getElementById('approach-section');
    const awardsSection = document.getElementById('awards-section');
    const ctaSection = document.getElementById('cta-section');

    if (beliefSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setBeliefVisible(true);
        });
      }, observerOptions);
      observer.observe(beliefSection);
      observers.push(observer);
    }

    if (approachSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setApproachVisible(true);
        });
      }, observerOptions);
      observer.observe(approachSection);
      observers.push(observer);
    }

    if (awardsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAwardsVisible(true);
          }
        });
      }, observerOptions);
      observer.observe(awardsSection);
      observers.push(observer);
    }

    if (ctaSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaVisible(true);
          }
        });
      }, observerOptions);
      observer.observe(ctaSection);
      observers.push(observer);
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);





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
          backgroundImage: 'url(/success.jpg)',
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
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1s ease-out',
          }}
        >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              background: 'transparent',
              border: '1px solid #ffffff',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-accent)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--space-8)',
              boxShadow: 'var(--shadow-md)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease',
            }}
          >
            <Award size={20} />
            {successStoriesContent.buttons[0]}
          </div>
          
          <h1
            style={{
              fontSize: 'var(--text-6xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#B8956A',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            {successStoriesContent.title}
          </h1>
          
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
              maxWidth: '800px',
              margin: '0 auto var(--space-8)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
            }}
          >
            {successStoriesContent.subtitle}
          </p>
        </div>
      </section>

      {/* Connecting Line */}
      <div
        className="records-connector"
        style={{
          position: 'absolute',
          left: '50%',
          top: '630px',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '180px',
          background: 'linear-gradient(180deg, rgba(184, 149, 106, 0.3), rgba(184, 149, 106, 0.8))',
          opacity: heroVisible ? 1 : 0,
          transition: 'opacity 1s ease 0.6s',
          zIndex: 100,
        }}
      >
        {/* Dot at the end with surrounding circle */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid rgba(184, 149, 106, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner solid dot */}
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#B8956A',
              boxShadow: '0 0 10px rgba(184, 149, 106, 0.5)',
            }}
          />
        </div>
      </div>

      {/* THE BELIEF Section */}
      <section
        id="belief-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          padding: 'var(--space-20) var(--space-6)',
          overflow: 'hidden',
        }}
      >
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        >
          <source src="/videos/176521-855920743_small.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 100%)',
            zIndex: 2,
          }}
          aria-hidden
        />

        {/* THE BELIEF Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 3 }}>
          <div className={`story-chapter ${beliefVisible ? 'story-section-block is-visible' : 'story-section-block'}`}>
            <div className="story-chapter-number">01</div>
            <h2 className="story-chapter-title">{performanceMetricsContent.title}</h2>

            <div className="story-card story-section-block stagger-1" style={{ opacity: beliefVisible ? 1 : 0, transform: beliefVisible ? 'translateY(0)' : 'translateY(28px)' }}>
              <p>Every transformational company begins with a bold ambition.</p>
              <p>But scaling that ambition requires the right partner — one driven by integrity, trust, and aligned purpose.</p>
            </div>

            <div className="story-section-block stagger-2" style={{ opacity: beliefVisible ? 1 : 0, transform: beliefVisible ? 'translateY(0)' : 'translateY(28px)' }}>
              <p className="story-lead">Elluminate Capital was founded with a singular belief:</p>
              <blockquote className="story-quote">
                <p className="story-quote-inner">Founders deserve more than transactional bankers — they deserve long-term allies in their journey.</p>
              </blockquote>
            </div>
          </div>

          <div className="story-divider" />

          {/* THE APPROACH */}
          <div id="approach-section" className={`story-chapter ${approachVisible ? 'story-section-block is-visible' : 'story-section-block'}`}>
            <div className="story-chapter-number">02</div>
            <h2 className="story-chapter-title">THE APPROACH</h2>

            <p className={`story-oneliner story-section-block stagger-1`} style={{ opacity: approachVisible ? 1 : 0, transform: approachVisible ? 'translateY(0)' : 'translateY(28px)' }}>
              We work differently.
            </p>

            <div className="story-card story-section-block stagger-2" style={{ opacity: approachVisible ? 1 : 0, transform: approachVisible ? 'translateY(0)' : 'translateY(28px)' }}>
              <p>Instead of running standardized processes, we build deeply tailored pathways — curated for the company, the market moment, and the founder&apos;s vision.</p>
              <p>We embed ourselves like an internal corporate development function, shaping strategy, narrative, and investor alignment long before capital meets the table. Our work is anchored in absolute discretion, built on long-standing global investor relationships, and executed with the precision of seasoned dealmakers.</p>
            </div>

            <blockquote className={`story-quote story-section-block stagger-3`} style={{ opacity: approachVisible ? 1 : 0, transform: approachVisible ? 'translateY(0)' : 'translateY(28px)' }}>
              <p className="story-quote-inner">This enables us to unlock the right capital from world-class investors — not just capital that closes a round, but capital that elevates the trajectory of the business.</p>
            </blockquote>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .records-connector { height: 90px !important; top: 560px !important; }
        }
      `}</style>

      {/* THE IMPACT & THE FUTURE */}
      <section
        id="awards-section"
        style={{
          minHeight: '70vh',
          padding: 'var(--space-20) var(--space-6)',
          position: 'relative',
        }}
      >
        <div className="story-impact-wrap" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className={`story-chapter ${awardsVisible ? 'story-section-block is-visible' : 'story-section-block'}`}>
            <div className="story-chapter-number">03</div>
            <h2 className="story-chapter-title">THE IMPACT & THE FUTURE</h2>

            <div className="story-card story-section-block stagger-1" style={{ opacity: awardsVisible ? 1 : 0, transform: awardsVisible ? 'translateY(0)' : 'translateY(28px)' }}>
              <p>We&apos;ve partnered with pioneering companies across AgriTech, CleanTech, FinTech, Consumer, EdTech, and AutoTech—helping them scale at defining moments across India and Southeast Asia.</p>
              <p>Our work goes beyond capital. We help ensure clarity, alignment, and momentum—so companies not only raise funds, but raise the right capital at the right time.</p>
            </div>

            <div className="story-section-block stagger-2" style={{ opacity: awardsVisible ? 1 : 0, transform: awardsVisible ? 'translateY(0)' : 'translateY(28px)' }}>
              <p className="story-lead">As we look ahead, our commitment remains the same:</p>
              <blockquote className="story-quote">
                <p className="story-quote-inner">to be the trusted North Star for founders and investors, guiding them through critical decisions and helping build companies that endure.</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta-section"
        style={{
          minHeight: '50vh',
          padding: 'var(--space-20) var(--space-6)',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(80px)',
          transition: 'all 1.2s ease-out',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#B8956A',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            {joinSuccessContent.title}
          </h2>
          
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
            }}
          >
            {joinSuccessContent.subtitle}
          </p>
          
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.6s',
            }}
          >
            <Link
              href="/contact/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-8)',
                background: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                fontSize: 'var(--text-lg)',
                transition: 'all var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              {joinSuccessContent.buttons[0]}
              <ArrowRight size={20} />
            </Link>
            
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </div>
  );
}
