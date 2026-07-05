import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  History,
  MapPin,
  MapPinned,
  MessageSquareText,
  Radar,
  Search,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import '../styles/landing.css';

function useInView({ threshold = 0.15, root = null, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return [ref, isVisible];
}

function AnimatedNumber({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useInView();

  useEffect(() => {
    if (!isVisible) return undefined;

    let frame = 0;
    const totalFrames = Math.max(1, Math.round(duration / 16));
    const timer = setInterval(() => {
      frame += 1;
      const progress = Math.min(1, frame / totalFrames);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));

      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [duration, isVisible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function BentoCard({ icon: Icon, title, description, metric, className = '', delay = 0 }) {
  const [ref, isVisible] = useInView();

  return (
    <article
      ref={ref}
      className={`bento-card ${className} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bento-card-topline">
        <span className="bento-icon">
          <Icon size={20} aria-hidden="true" />
        </span>
        {metric && <span className="bento-metric">{metric}</span>}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="bento-card-glint" aria-hidden="true" />
    </article>
  );
}

function WorkflowStep({ step, title, description, detail, isLast, delay = 0 }) {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={`workflow-step ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="workflow-step-indicator">
        <div className="workflow-step-number">{step}</div>
        {!isLast && <div className="workflow-step-line" />}
      </div>
      <div className="workflow-step-content">
        <h3 className="workflow-step-title">{title}</h3>
        <p className="workflow-step-desc">{description}</p>
        {detail && <div className="workflow-step-detail">{detail}</div>}
      </div>
    </div>
  );
}

function ProductPreview() {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`product-preview ${isVisible ? 'visible' : ''}`}
      id="product-preview"
      aria-label="AI Launch Playbook Dashboard preview"
    >
      <div className="preview-shell">
        <div className="preview-window-bar">
          <div className="preview-window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="preview-window-title">
            <Sparkles size={14} aria-hidden="true" />
            AI Launch Playbook Dashboard
          </div>
          <div className="preview-window-status">
            <span className="status-pulse" aria-hidden="true" />
            Live signals
          </div>
        </div>

        <div className="preview-grid">
          <aside className="preview-sidebar" aria-label="Dashboard metrics">
            <div>
              <span className="preview-label">Viability</span>
              <div className="preview-score">84</div>
              <p>Strong launch conditions</p>
            </div>
            <div className="preview-score-ring" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="48" className="ring-base" />
                <circle cx="60" cy="60" r="48" className="ring-value" />
              </svg>
              <span>A-</span>
            </div>
            <div className="preview-pill-row">
              <span>Demand +18%</span>
              <span>Risk Low</span>
            </div>
          </aside>

          <div className="preview-map-panel" aria-label="Competitor map preview">
            <div className="map-grid" aria-hidden="true" />
            <span className="map-route route-a" aria-hidden="true" />
            <span className="map-route route-b" aria-hidden="true" />
            <span className="map-pin map-pin-primary" aria-label="Target location">
              <MapPin size={18} />
            </span>
            <span className="map-pin map-pin-one" aria-hidden="true" />
            <span className="map-pin map-pin-two" aria-hidden="true" />
            <span className="map-pin map-pin-three" aria-hidden="true" />
            <div className="map-card map-card-density">
              <span>Competitor density</span>
              <strong>7 in 5 km</strong>
            </div>
            <div className="map-card map-card-gap">
              <span>White-space pocket</span>
              <strong>East corridor</strong>
            </div>
          </div>

          <div className="preview-widget preview-widget-chart">
            <div className="widget-heading">
              <span>Demographic pull</span>
              <strong>Projected weekly footfall</strong>
            </div>
            <div className="chart-bars" aria-hidden="true">
              <span style={{ '--bar': '42%' }} />
              <span style={{ '--bar': '66%' }} />
              <span style={{ '--bar': '58%' }} />
              <span style={{ '--bar': '82%' }} />
              <span style={{ '--bar': '74%' }} />
              <span style={{ '--bar': '92%' }} />
            </div>
          </div>

          <div className="preview-widget preview-widget-actions">
            <div className="widget-heading">
              <span>Next best moves</span>
              <strong>Launch playbook</strong>
            </div>
            <ul className="action-list">
              <li>
                <CheckCircle2 size={14} />
                Anchor morning demand with mobile pickup.
              </li>
              <li>
                <CheckCircle2 size={14} />
                Price premium offers below district median.
              </li>
              <li>
                <CheckCircle2 size={14} />
                Target campus commuter corridors first.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Landing() {
  const navigate = useNavigate();
  const [heroRef, heroVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();
  const [searchValues, setSearchValues] = useState({
    location: 'Downtown Austin, TX',
    businessType: 'Specialty Espresso Coffee Shop',
    niche: 'Single-origin pour-over',
    radius: 5
  });

  const rangeProgress = ((searchValues.radius - 1) / 24) * 100;

  function updateSearchField(field, value) {
    setSearchValues((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleAnalyze(event) {
    event.preventDefault();
    navigate('/dashboard', {
      state: {
        ...searchValues,
        radius: Number(searchValues.radius) * 1000
      }
    });
  }

  return (
    <div className="landing-page" id="landing-top">
      <div className="landing-bg" aria-hidden="true" />

      <header className="landing-nav">
        <div className="landing-nav-inner">
          <a href="#landing-top" className="landing-brand" aria-label="MarketSense home">
            <img src="/images/marketsense_logo.png" className="brand-logo-img" alt="" />
            <span>MarketSense</span>
          </a>

          <nav className="landing-nav-links" aria-label="Landing navigation">
            <a href="#product-preview">Preview</a>
            <a href="#features">Signals</a>
            <a href="#how-it-works">Workflow</a>
          </nav>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="landing-nav-cta">
                Sign In
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="landing-nav-user">
              <button
                className="landing-nav-cta"
                onClick={() => navigate('/dashboard')}
              >
                Launch App
                <ArrowRight size={14} aria-hidden="true" />
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </header>

      <main>
        <section
          ref={heroRef}
          className={`landing-hero ${heroVisible ? 'visible' : ''}`}
        >
          <div className="hero-badge">
            <Sparkles size={13} aria-hidden="true" />
            <span>AI-powered location intelligence</span>
          </div>

          <h1 className="hero-headline">
            Know where your next
            <span className="hero-headline-accent"> location wins.</span>
          </h1>

          <p className="hero-subheadline">
            MarketSense turns local demand, competitor saturation, and AI strategy into a launch-ready
            playbook before you sign the lease.
          </p>

          <form className="hero-search-widget" onSubmit={handleAnalyze}>
            <div className="hero-search-grid">
              <label className="hero-field hero-field-location">
                <span className="hero-field-label">Location</span>
                <span className="hero-field-control">
                  <MapPin size={17} className="hero-field-icon" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchValues.location}
                    onChange={(event) => updateSearchField('location', event.target.value)}
                    placeholder="Downtown Austin, TX"
                    className="hero-input"
                    autoComplete="street-address"
                  />
                </span>
              </label>

              <label className="hero-field hero-field-business">
                <span className="hero-field-label">Business Type</span>
                <span className="hero-field-control">
                  <BriefcaseBusiness size={17} className="hero-field-icon" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchValues.businessType}
                    onChange={(event) => updateSearchField('businessType', event.target.value)}
                    placeholder="Specialty Espresso Coffee Shop"
                    className="hero-input"
                  />
                </span>
              </label>

              <label className="hero-field hero-field-niche">
                <span className="hero-field-label">Niche</span>
                <span className="hero-field-control">
                  <Sparkles size={17} className="hero-field-icon" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchValues.niche}
                    onChange={(event) => updateSearchField('niche', event.target.value)}
                    placeholder="Single-origin pour-over"
                    className="hero-input"
                  />
                </span>
              </label>

              <label className="hero-field hero-field-radius">
                <span className="hero-field-label">Radius Slider (km)</span>
                <span className="hero-field-control hero-radius-control">
                  <Radar size={17} className="hero-field-icon" aria-hidden="true" />
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={searchValues.radius}
                    onChange={(event) => updateSearchField('radius', Number(event.target.value))}
                    className="hero-radius-slider"
                    style={{ '--range-progress': `${rangeProgress}%` }}
                    aria-label="Analysis radius in kilometers"
                  />
                  <span className="hero-radius-label">{searchValues.radius} km</span>
                </span>
              </label>
            </div>

            <button type="submit" className="hero-cta-button">
              <Search size={18} aria-hidden="true" />
              <span>Analyze Location</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>

          <div className="hero-trust-bar" aria-label="Platform capabilities">
            <div className="trust-item">
              <CheckCircle2 size={15} aria-hidden="true" />
              <span>Google Places API</span>
            </div>
            <div className="trust-item">
              <BrainCircuit size={15} aria-hidden="true" />
              <span>Mistral AI Engine</span>
            </div>
            <div className="trust-item">
              <Shield size={15} aria-hidden="true" />
              <span>Real-Time Data</span>
            </div>
          </div>
        </section>

        <ProductPreview />

        <section className="landing-stats" aria-label="MarketSense platform stats">
          <div className="stat-item">
            <strong><AnimatedNumber target={100} suffix="+" /></strong>
            <span>Business types</span>
          </div>
          <div className="stat-item">
            <strong><AnimatedNumber target={50} suffix="M+" /></strong>
            <span>Places indexed</span>
          </div>
          <div className="stat-item">
            <strong><AnimatedNumber target={360} suffix="°" /></strong>
            <span>Market view</span>
          </div>
          <div className="stat-item">
            <strong>&lt;30s</strong>
            <span>Analysis time</span>
          </div>
        </section>

        <section className="landing-bento" id="features">
          <div className="section-header">
            <span className="section-eyebrow">Signal stack</span>
            <h2 className="section-title">
              From raw places data to
              <span className="gradient-inline"> boardroom-ready strategy.</span>
            </h2>
            <p className="section-subtitle">
              The original technical badges become a deeper operating view of the data, AI, and
              recommendations behind each analysis.
            </p>
          </div>

          <div className="bento-grid">
            <BentoCard
              icon={MapPinned}
              title="Google Places intelligence"
              description="Nearby businesses, ratings, price tiers, and density patterns are normalized into a clean competitive map."
              metric="50M+"
              className="bento-card-large"
              delay={0}
            />
            <BentoCard
              icon={BrainCircuit}
              title="Mistral launch playbook"
              description="AI converts the market scan into SWOT, positioning, CapEx and go-to-market recommendations."
              metric="AI"
              delay={80}
            />
            <BentoCard
              icon={TrendingUp}
              title="Demand signals"
              description="Footfall, search intent, and category momentum are scored against local saturation."
              metric="+18%"
              delay={160}
            />
            <BentoCard
              icon={BarChart3}
              title="Viability scoring"
              description="A single executive score blends demand, supply, risk, and neighborhood fit."
              metric="0-100"
              delay={240}
            />
            <BentoCard
              icon={MessageSquareText}
              title="AI consultant chat"
              description="Ask follow-up questions against the generated report and get data-backed answers."
              metric="Live"
              delay={320}
            />
            <BentoCard
              icon={History}
              title="Saved comparisons"
              description="Track candidate sites and compare launch quality across neighborhoods over time."
              metric="Archive"
              className="bento-card-wide"
              delay={400}
            />
          </div>
        </section>

        <section className="landing-workflow" id="how-it-works">
          <div className="section-header">
            <span className="section-eyebrow">Workflow</span>
            <h2 className="section-title">
              Three steps from
              <span className="gradient-inline"> question to confidence.</span>
            </h2>
            <p className="section-subtitle">
              MarketSense keeps the analysis path concise while surfacing enough detail to make a
              leasing decision defensible.
            </p>
          </div>

          <div className="workflow-container">
            <WorkflowStep
              step={1}
              title="Frame the site"
              description="Enter a target location, business type, niche, and radius to define the market boundary."
              detail={
                <div className="workflow-mock-input">
                  <div className="mock-input-row">
                    <MapPin size={14} aria-hidden="true" />
                    <span>Downtown Austin, TX</span>
                  </div>
                  <div className="mock-input-row">
                    <BriefcaseBusiness size={14} aria-hidden="true" />
                    <span>Specialty Espresso Coffee Shop</span>
                  </div>
                </div>
              }
              delay={0}
            />
            <WorkflowStep
              step={2}
              title="Map the market"
              description="Competitors, ratings, pricing, and proximity signals are converted into a structured local landscape."
              detail={
                <div className="workflow-mock-results">
                  <div className="mock-competitor">
                    <Star size={12} className="star-filled" aria-hidden="true" />
                    <span>4.7</span>
                    <span className="mock-name">Austin Java</span>
                    <span className="mock-dist">0.3 km</span>
                  </div>
                  <div className="mock-competitor">
                    <Star size={12} className="star-filled" aria-hidden="true" />
                    <span>4.5</span>
                    <span className="mock-name">Houndstooth Coffee</span>
                    <span className="mock-dist">0.8 km</span>
                  </div>
                  <div className="mock-competitor">
                    <Star size={12} className="star-filled" aria-hidden="true" />
                    <span>4.2</span>
                    <span className="mock-name">Merit Coffee</span>
                    <span className="mock-dist">1.2 km</span>
                  </div>
                </div>
              }
              delay={120}
            />
            <WorkflowStep
              step={3}
              title="Generate the playbook"
              description="The AI synthesis produces a viability score, risk readout, and tactical launch recommendations."
              detail={
                <div className="workflow-mock-score">
                  <div className="mock-score-ring">
                    <svg viewBox="0 0 80 80" className="mock-ring-svg" aria-hidden="true">
                      <circle cx="40" cy="40" r="34" className="ring-bg" />
                      <circle cx="40" cy="40" r="34" className="ring-fill" />
                    </svg>
                    <span className="mock-score-value">84</span>
                  </div>
                  <div className="mock-score-meta">
                    <span className="mock-grade">Grade: A-</span>
                    <span className="mock-verdict">Strong viability</span>
                  </div>
                </div>
              }
              isLast
              delay={240}
            />
          </div>
        </section>

        <section
          ref={ctaRef}
          className={`landing-cta ${ctaVisible ? 'visible' : ''}`}
        >
          <h2 className="cta-headline">
            Find the site where your
            <span className="gradient-inline"> demand curve bends upward.</span>
          </h2>
          <p className="cta-sub">
            Launch a complete AI-powered location analysis and move from instinct to evidence.
          </p>
          <button
            className="cta-primary-button"
            onClick={() => navigate('/dashboard')}
          >
            <Target size={18} aria-hidden="true" />
            <span>Run Free Site Analysis</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="footer-brand">
            <img src="/images/marketsense_logo.png" className="brand-logo-img" alt="" />
            <span>MarketSense</span>
          </div>
          <div className="footer-meta">
            <Zap size={12} aria-hidden="true" />
            <span>Powered by Google Places API and Mistral AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
