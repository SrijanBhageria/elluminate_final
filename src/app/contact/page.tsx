'use client';

import React, { useState } from 'react';
import Footer from '@/components/Footer';
import { Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // EmailJS configuration - you'll need to replace these with your actual values
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        to_email: 'bhageria.srijan@gmail.com', // Your email address
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const locations = [
    {
      city: 'Mumbai',
      address: '602, T Wing, Tower 5, Godrej Origins The Trees, Vikhroli, Mumbai'
    },
    {
      city: 'Bengaluru',
      address: '1622, Embassy Grove, Rustam Bagh, Bengaluru'
    }
  ];

  const services = [
    'Investment Advisory',
    'Capital Markets',
    'M&A Advisory',
    'Wealth Management',
    'General Inquiry'
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/4065924-uhd_4096_2160_25fps.mp4" type="video/mp4" />
      </video>
      
      {/* Black Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1,
        }}
      />

      <div style={{ paddingTop: '80px', position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <section
          style={{
            padding: 'var(--space-20) var(--space-6)',
            textAlign: 'center',
            background: '#C9A876',
          }}
        >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'var(--text-6xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#FFFFFF',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
            }}
          >
            Contact Us
          </h1>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: '#FFFFFF',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
            }}
          >
            Ready to discuss your financial goals? Get in touch with our team 
            of experts for personalized advisory services.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-12)',
            }}
          >
            {/* Contact Form */}
            <div>
              <h2
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-6)',
                  fontFamily: 'var(--font-family-heading)',
                }}
              >
                Send us a Message
              </h2>
              
              {error && (
                <div
                  style={{
                    padding: 'var(--space-4)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-6)',
                    color: '#ef4444',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  {error}
                </div>
              )}
              
              {isSubmitted ? (
                <div
                  style={{
                    padding: 'var(--space-8)',
                    background: '#B3986D',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle size={60} color="#FFFFFF" style={{ marginBottom: 'var(--space-4)' }} />
                  <h3
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#FFFFFF',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: '#EAEAEA' }}>
                    Thank you for your inquiry. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    background: 'url(/pexels-alex-andrews-271121-821754.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: 'var(--space-8)',
                    borderRadius: 'var(--radius-xl)',
                    border: '2px solid #B8956A',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 0,
                  }} />
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'var(--space-4)',
                      marginBottom: 'var(--space-6)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          color: '#FFFFFF',
                          fontWeight: 'var(--font-weight-medium)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: 'var(--space-3)',
                          border: '1px solid #D4C4B0',
                          borderRadius: 'var(--radius-md)',
                          background: 'transparent',
                          color: '#FFFFFF',
                          fontSize: 'var(--text-base)',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          color: '#FFFFFF',
                          fontWeight: 'var(--font-weight-medium)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: 'var(--space-3)',
                          border: '1px solid #D4C4B0',
                          borderRadius: 'var(--radius-md)',
                          background: 'transparent',
                          color: '#FFFFFF',
                          fontSize: 'var(--text-base)',
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'var(--space-4)',
                      marginBottom: 'var(--space-6)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          color: '#FFFFFF',
                          fontWeight: 'var(--font-weight-medium)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: 'var(--space-3)',
                          border: '1px solid #D4C4B0',
                          borderRadius: 'var(--radius-md)',
                          background: 'transparent',
                          color: '#FFFFFF',
                          fontSize: 'var(--text-base)',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          color: '#FFFFFF',
                          fontWeight: 'var(--font-weight-medium)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: 'var(--space-3)',
                          border: '1px solid #D4C4B0',
                          borderRadius: 'var(--radius-md)',
                          background: 'transparent',
                          color: '#FFFFFF',
                          fontSize: 'var(--text-base)',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)', position: 'relative', zIndex: 1 }}>
                    <label
                      style={{
                        display: 'block',
                        color: '#FFFFFF',
                        fontWeight: 'var(--font-weight-medium)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--space-3)',
                        border: '1px solid #D4C4B0',
                        borderRadius: 'var(--radius-md)',
                        background: 'transparent',
                        color: '#FFFFFF',
                        fontSize: 'var(--text-base)',
                      }}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)', position: 'relative', zIndex: 1 }}>
                    <label
                      style={{
                        display: 'block',
                        color: '#FFFFFF',
                        fontWeight: 'var(--font-weight-medium)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      style={{
                        width: '100%',
                        padding: 'var(--space-3)',
                        border: '1px solid #D4C4B0',
                        borderRadius: 'var(--radius-md)',
                        background: 'transparent',
                        color: '#FFFFFF',
                        fontSize: 'var(--text-base)',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: 'var(--space-4)',
                      background: isLoading ? '#D4C4B0' : '#E5D4C1',
                      color: '#000000',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--space-2)',
                      transition: 'all var(--transition-fast)',
                      position: 'relative',
                      zIndex: 1,
                      opacity: isLoading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.background = '#D4C4B0';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.background = '#E5D4C1';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="contact-submit-spinner" style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <Loader2 size={22} strokeWidth={2.5} />
                        </span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-6)',
                  fontFamily: 'var(--font-family-heading)',
                }}
              >
                Get in Touch
              </h2>

              <div style={{ marginBottom: 'var(--space-8)' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: '#B8956A',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Mail size={24} color="#FFFFFF" />
                  </div>
                  <div>
                    <h3
                      style={{
                        color: '#FFFFFF',
                        fontWeight: 'var(--font-weight-semibold)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Email Us
                    </h3>
                    <p style={{ color: '#FFFFFF', margin: 0, opacity: 0.8 }}>
                      info@elluminatecapital.com
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--space-8)' }}>
                  <h3
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: '#FFFFFF',
                      marginBottom: 'var(--space-6)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    Our Locations
                  </h3>
                  
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: 'var(--space-6)',
                    }}
                  >
                    {locations.map((location, index) => (
                      <div
                        key={index}
                        style={{
                          background: 'rgba(184, 149, 106, 0.1)',
                          border: '1px solid #B8956A',
                          borderRadius: 'var(--radius-xl)',
                          padding: 'var(--space-6)',
                          transition: 'all var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(184, 149, 106, 0.2)';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(184, 149, 106, 0.1)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-4)',
                            marginBottom: 'var(--space-4)',
                          }}
                        >
                          <div
                            style={{
                              width: '50px',
                              height: '50px',
                              background: '#B8956A',
                              borderRadius: 'var(--radius-lg)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <MapPin size={24} color="#FFFFFF" />
                          </div>
                          <h4
                            style={{
                              color: '#FFFFFF',
                              fontWeight: 'var(--font-weight-bold)',
                              fontSize: 'var(--text-xl)',
                              margin: 0,
                            }}
                          >
                            {location.city}
                          </h4>
                        </div>
                        <p
                          style={{
                            color: '#FFFFFF',
                            margin: 0,
                            opacity: 0.9,
                            lineHeight: '1.6',
                            fontSize: 'var(--text-base)',
                          }}
                        >
                          {location.address}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
}
