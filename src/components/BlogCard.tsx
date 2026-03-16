'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Download } from 'lucide-react';
import { Blog } from '../types/blog';
import { formatDate, getReadTimeText } from '../utils/dateUtils';

interface BlogCardProps {
  blog: Blog;
  categoryName: string;
  isFeatured?: boolean;
}

export default function BlogCard({ blog, categoryName, isFeatured = false }: BlogCardProps) {
  // Check if this is Technology & Innovation section (4th section)
  console.log('BlogCard categoryName:', categoryName);
  const isReportStyle = categoryName === 'Technology & Innovation';
  console.log('isReportStyle:', isReportStyle, 'for category:', categoryName);

  // Generate file size for demo (only for report style)
  const [fileSize, setFileSize] = useState('0.0');

  useEffect(() => {
    if (isReportStyle) {
      setFileSize((Math.random() * 2 + 1).toFixed(1));
    }
  }, [isReportStyle]);

  // Generate data visualization image URL (only for report style)
  const getDataVizImage = () => {
    return `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format&q=80`;
  };

  if (isReportStyle) {
    // Report-style card for Technology & Innovation
    return (
      <article
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '1px solid var(--border-primary)',
          transition: 'all var(--transition-normal)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = 'var(--shadow-luxury), var(--shadow-purple)';
          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'var(--border-primary)';
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={getDataVizImage()}
            alt={blog.title}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              filter: 'grayscale(30%)',
              transition: 'filter var(--transition-normal)',
            }}
            loading="lazy"
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
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-3)',
              lineHeight: '1.3',
              flex: 1,
            }}
          >
            {blog.title}
          </h3>
          
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              flex: 1,
            }}
          >
            {blog.excerpt}
          </p>
          
          {/* Download Report Button */}
          <button
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

  // Original blog-style card for other sections
  return (
    <article
      style={{
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid var(--border-primary)',
        transition: 'all var(--transition-normal)',
        height: isFeatured ? 'auto' : '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={blog.image || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop'}
          alt={blog.title}
          style={{
            width: '100%',
            height: isFeatured ? '300px' : '200px',
            objectFit: 'cover',
          }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-3)',
            left: 'var(--space-3)',
            background: 'var(--color-accent)',
            color: 'var(--text-inverse)',
            padding: 'var(--space-1) var(--space-3)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {categoryName}
        </div>
      </div>
      
      <div style={{ padding: 'var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          style={{
            fontSize: isFeatured ? 'var(--text-3xl)' : 'var(--text-xl)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-3)',
            lineHeight: '1.3',
            flex: 1,
          }}
        >
          {blog.title}
        </h3>
        <p
          style={{
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            marginBottom: 'var(--space-4)',
            fontSize: isFeatured ? 'var(--text-lg)' : 'var(--text-sm)',
            flex: 1,
          }}
        >
          {blog.excerpt}
        </p>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-4)',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <User size={isFeatured ? 16 : 14} color="var(--text-accent)" />
            <span style={{ color: 'var(--text-secondary)', fontSize: isFeatured ? 'var(--text-sm)' : 'var(--text-xs)' }}>
              {blog.author}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Calendar size={isFeatured ? 16 : 14} color="var(--text-accent)" />
            <span style={{ color: 'var(--text-secondary)', fontSize: isFeatured ? 'var(--text-sm)' : 'var(--text-xs)' }}>
              {formatDate(blog.publishedAt)}
            </span>
          </div>
        </div>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <span style={{ color: 'var(--text-muted)', fontSize: isFeatured ? 'var(--text-sm)' : 'var(--text-xs)' }}>
            {getReadTimeText(blog.readTime)}
          </span>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              background: 'none',
              border: 'none',
              color: 'var(--text-accent)',
              fontSize: isFeatured ? 'var(--text-base)' : 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-accent-dark)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-accent)';
            }}
          >
            Read More
            <ArrowRight size={isFeatured ? 16 : 14} />
          </button>
        </div>
      </div>
    </article>
  );
}
