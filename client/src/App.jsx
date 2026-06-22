import { useEffect, useState } from 'react';
import { History, MapPinned, Search, Zap, MessageSquare } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes.jsx';
import LiquidGlass from './components/LiquidGlass.jsx';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';
  const isLandingPage = location.pathname === '/landing';

  const isAnalyzeActive = location.pathname === '/';
  const isHistoryActive = location.pathname === '/history';
  const isChatActive = location.pathname === '/chat';

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Support Ctrl + Cmd/Super (metaKey) OR Ctrl + Alt (altKey) for robust OS/browser compatibility
      const hasModifiers = e.ctrlKey && (e.metaKey || e.altKey);
      
      if (hasModifiers) {
        const key = e.key.toLowerCase();
        const code = e.code;

        if (code === 'KeyA' || key === 'a') {
          e.preventDefault();
          navigate('/');
        } else if (code === 'KeyH' || key === 'h') {
          e.preventDefault();
          navigate('/history');
        } else if (code === 'KeyB' || key === 'b') {
          e.preventDefault();
          navigate('/chat');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Landing page has its own isolated design — skip the app shell chrome
  if (isLandingPage) {
    return <AppRoutes />;
  }

  return (
    <div className={`app-shell ${isChatPage ? 'app-shell--chat' : ''}`}>
      {/* Floating Ambient Background Orbs */}
      <div className="bg-orbs" id="liquid-glass-scene" aria-hidden="true">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
      </div>

      <LiquidGlass
        tagName="header"
        className={`topbar ${scrolled ? 'scrolled' : ''}`}
        style={{ position: 'fixed' }}
        depth={scrolled ? 35 : 45}
        blur={1}
        glint={scrolled ? 30 : 40}
        tint={0.12}
        tintColor="#ffffff"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <NavLink to="/" className="brand" aria-label="MarketSite Analyst dashboard">
            <MapPinned size={20} aria-hidden="true" />
            <span>MarketSite Analyst</span>
          </NavLink>
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            className={`nav-link ${isAnalyzeActive ? 'active' : ''}`}
          >
            <span className="nav-link-title">
              <Search size={15} aria-hidden="true" />
              <span>Analyze</span>
            </span>
            <span className="nav-link-keybind" aria-label="shortcut: Command Control A">
              <kbd>⌘</kbd>
              <kbd>⌃</kbd>
              <kbd>A</kbd>
            </span>
          </NavLink>

          <NavLink
            to="/history"
            className={`nav-link ${isHistoryActive ? 'active' : ''}`}
          >
            <span className="nav-link-title">
              <History size={15} aria-hidden="true" />
              <span>History</span>
            </span>
            <span className="nav-link-keybind" aria-label="shortcut: Command Control H">
              <kbd>⌘</kbd>
              <kbd>⌃</kbd>
              <kbd>H</kbd>
            </span>
          </NavLink>
        </nav>

        <NavLink
          to="/chat"
          className={`nav-cta-btn ${isChatActive ? 'active' : ''}`}
          aria-label="AI Chat Assistant"
        >
          <img src="/images/mistral.png" alt="" className="nav-logo-img" draggable="false" />
          <span>AI Chat</span>
        </NavLink>
      </LiquidGlass>

      <main className="main-content">
        <AppRoutes />
      </main>

      <footer className="app-footer">
        <Zap size={12} aria-hidden="true" />
        <span>Powered by AI market intelligence</span>
      </footer>
    </div>
  );
}

export default App;
