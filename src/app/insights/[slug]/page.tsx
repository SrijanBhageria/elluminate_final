import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import Footer from '@/components/Footer';

// Simple chart using SVG to avoid bringing a heavy charting lib
function LineChart({ data }: { data: Array<{ x: number; y: number }> }) {
  const width = 800;
  const height = 240;
  const padding = 32;
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scaleX = (x: number) => padding + ((x - minX) / (maxX - minX || 1)) * (width - padding * 2);
  const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY || 1)) * (height - padding * 2);
  const path = data
    .map((d, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(d.x)} ${scaleY(d.y)}`)
    .join(' ');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)' }}>
      <path d={path} fill="none" stroke="var(--text-accent)" strokeWidth={2} />
      {data.map((d, i) => (
        <circle key={i} cx={scaleX(d.x)} cy={scaleY(d.y)} r={3} fill="var(--text-accent)" />
      ))}
    </svg>
  );
}

const articles = [
  {
    slug: 'future-of-sustainable-investing',
    title: 'The Future of Sustainable Investing',
    author: 'David Chen',
    date: 'December 10, 2023',
    readTime: '12 min read',
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Executive Overview',
        body:
          'Sustainable investing has progressed from values-based exclusions to a rigorous, data-informed discipline embedded in institutional portfolios. This article frames ESG integration as a source of risk mitigation, opportunity capture, and stakeholder alignment. We outline how governance quality affects downside protection, why emissions and resource intensity increasingly price into cash flows, and how social factors influence license-to-operate risk. We also map implementation pathways across active, passive, private markets, and real assets, with practical design choices that separate robust programs from marketing optics.',
        image:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
        caption: 'Long-horizon capital allocation increasingly incorporates ESG risk vectors.'
      },
      {
        heading: 'Performance, Factors, and Materiality',
        body:
          'Meta-analyses suggest ESG integration can be performance-neutral to positive when materiality is respected and unintended factor tilts are controlled. The key is to isolate truly material, sector-specific metrics (e.g., methane intensity for energy, product safety for healthcare) rather than broad composite scores. We discuss portfolio construction techniques to neutralize style drifts (quality, growth) and isolate ESG premia; we also examine dispersion in third‑party ratings and strategies to triangulate a signal amidst methodological noise.',
        image:
          'https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1920&auto=format&fit=crop',
        caption: 'Materiality mapping helps focus on what truly drives cash flows and risk.'
      },
      {
        heading: 'Data Architecture and Stewardship',
        body:
          'Data remains the biggest execution risk. Leading allocators create a data architecture that combines company disclosures, modeled estimates, satellite and supplier data, and event-based signals. Stewardship (proxy voting, engagement) complements security selection by shaping management incentives over multi-year horizons. We propose a governance playbook with clear escalation paths, thematic priorities, and transparent reporting that ties engagement outcomes to portfolio-level KPIs.',
        video:
          'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
        caption: 'Stewardship outcomes compound over time when paired with credible escalation.'
      },
      {
        heading: 'Implementation Roadmap',
        body:
          'A pragmatic rollout starts with a policy statement, data vendor pilots, and a small integration sleeve to validate signal efficacy. Next, scale across asset classes with risk controls and quarterly governance checkpoints. Finally, embed stewardship targets into manager guidelines and incentive structures. Success is measured not only by returns, but by improved risk diagnostics, higher quality of earnings, and resilience across macro regimes.',
        image:
          'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?q=80&w=1920&auto=format&fit=crop',
        caption: 'Iterative implementation reduces execution risk while building internal buy‑in.'
      },
    ],
  },
  {
    slug: 'market-outlook-2024',
    title: 'Market Outlook 2024: Navigating Economic Uncertainty',
    author: 'Sarah Mitchell',
    date: 'December 15, 2023',
    readTime: '14 min read',
    cover: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Executive Summary',
        body:
          'We frame 2024 around three intertwined forces: disinflation without recession, policy divergence across regions, and earnings breadth recovery. Our scenarios map the interaction between rates, credit spreads, and equity style leadership, with allocations for base, upside, and downside paths. The goal is not forecasting precision, but resilient positioning across plausible regimes.',
        image:
          'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1920&auto=format&fit=crop',
        caption: 'Macro regimes are defined by the interplay of growth, inflation, and policy.'
      },
      {
        heading: 'Macro Landscape',
        body:
          'Disinflation continues as supply chains normalize and housing components reset, while services inflation remains sticky. We compare regional trajectories (US, EU, EM), noting currency implications and policy lags. In rates, duration works as a diversifier again — but convexity management and curve views matter. In credit, carry is attractive with careful sector selection and downgrade risk management.',
        video:
          'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4',
        caption: 'Policy divergence and growth differentials create relative value across regions.'
      },
      {
        heading: 'Equities and Style Leadership',
        body:
          'Earnings breadth widens beyond early leaders. Quality balance sheets and cash flow discipline remain rewarded. We discuss factor rotations and sector dynamics under different rate paths, and the role of shareholder yield (buybacks + dividends) in total return. For small caps, the key gating factor is financing access and refinancing walls.',
        image:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop',
        caption: 'Style leadership evolves with the rate cycle and earnings breadth.'
      },
      {
        heading: 'Alternatives and Real Assets',
        body:
          'Real assets hedge regime uncertainty. We review infrastructure exposures tied to electrification, data centers, and logistics, plus private credit opportunities arising from bank disintermediation. In real estate, we separate secularly challenged segments from beneficiaries of onshoring and specialized demand. Commodity exposures require disciplined risk budgets given path dependency.',
        image:
          'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1920&auto=format&fit=crop',
        caption: 'Real assets help balance macro and inflation risks.'
      },
      {
        heading: 'Portfolio Playbook',
        body:
          'We conclude with a practical allocation blueprint: modest duration extension; selective credit with an eye on downgrade cycles; barbell equity positioning across quality compounders and targeted cyclicals; and calibrated allocations to alternatives that monetize structural themes. We include risk controls, hedging tactics, and trigger points for scenario pivots.',
        image:
          'https://images.unsplash.com/photo-1518084823714-2f97cc9b5dc0?q=80&w=1920&auto=format&fit=crop',
        caption: 'Resilient portfolios emphasize balance, quality, and optionality.'
      },
    ],
  },
  {
    slug: 'private-equity-trends-2024',
    title: 'Private Equity Trends in 2024',
    author: 'Emily Rodriguez',
    date: 'December 8, 2023',
    readTime: '10 min read',
    cover: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=1920&auto=format&fit=crop',
    sections: [
      {
        heading: 'Dry Powder, Cost of Capital, and Exit Windows',
        body:
          'Elevated dry powder meets a structurally higher cost of capital. That combination compresses underwriting cushions and lengthens hold periods. Managers respond by prioritizing operational value creation over multiple expansion, with heavier emphasis on pricing power, procurement, and working capital. We examine sector pockets where multiples remain defensible due to scarcity value or consolidation logic.',
        image:
          'https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=1920&auto=format&fit=crop',
        caption: 'Operational alpha dominates when multiple expansion is capped.'
      },
      {
        heading: 'Secondaries and NAV Facilities',
        body:
          'Secondary volumes and NAV financing reshape liquidity management. We outline risk controls to avoid cross‑fund contagion and conflicts, along with governance considerations for board oversight. For LPs, secondaries offer pacing flexibility; for GPs, they provide portfolio duration management — but require robust transparency and alignment to safeguard outcomes.',
        image:
          'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1920&auto=format&fit=crop',
        caption: 'Liquidity tools must be paired with robust governance.'
      },
    ],
  },
];

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  const chartData = Array.from({ length: 20 }).map((_, i) => ({ x: i, y: 50 + Math.sin(i / 2) * 20 + i }));

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Cover */}
      <section style={{ position: 'relative', height: '360px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
        <Image src={article.cover} alt={article.title} fill style={{ objectFit: 'cover', filter: 'brightness(0.8)' }} sizes="100vw" priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,15,26,0.9), rgba(26,15,26,0.2))' }} />
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', width: 'min(1100px, 92%)' }}>
          <h1 style={{ color: 'var(--text-inverse)', fontSize: 'var(--text-5xl)', marginBottom: 8 }}>{article.title}</h1>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'var(--text-inverse)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><User size={16} /> {article.author}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Calendar size={16} /> {article.date}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Clock size={16} /> {article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '40px 0', background: 'var(--bg-primary)' }}>
        <div className="article-grid" style={{ width: 'min(1100px, 92%)', margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 32 }}>
          <article>
            {article.sections.map((s, idx) => (
              <div key={idx} style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 12 }}>{s.heading}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>{s.body}</p>
                {s.image && (
                  <figure style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-primary)', marginBottom: 8, background: 'var(--bg-secondary)' }}>
                    <Image src={s.image} alt={s.heading} width={800} height={450} style={{ width: '100%', height: 'auto', display: 'block' }} sizes="(min-width: 1100px) 800px, 92vw" />
                    {s.caption && (
                      <figcaption style={{ padding: 12, color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{s.caption}</figcaption>
                    )}
                  </figure>
                )}
                {s.video && (
                  <figure style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-primary)', marginBottom: 8, background: 'var(--bg-secondary)' }}>
                    <video src={s.video} controls style={{ width: '100%', height: 'auto', display: 'block' }} />
                    {s.caption && (
                      <figcaption style={{ padding: 12, color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{s.caption}</figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}

            <div style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 12 }}>Market Trend Illustration</h2>
              <LineChart data={chartData} />
            </div>
          </article>

          <aside>
            <div style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ShareButton title={article.title} />
              <div style={{ padding: 16, border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-secondary)' }}>
                <h3 style={{ marginBottom: 8 }}>About the author</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Senior analyst with a focus on thematic strategies and long-horizon capital allocation.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .article-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 480px) {
          .article-grid { gap: 16px !important; }
        }
      `}</style>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Elluminate Capital`,
    description: 'Insights article by Elluminate Capital',
    openGraph: {
      title: article.title,
      type: 'article',
    },
  };
}


