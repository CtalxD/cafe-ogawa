'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles/page.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Optimize GSAP performance
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.fps(60);
}

/* ============================================
   ICON COMPONENTS
   ============================================ */
const IconLogo = () => (
  <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2.5" fill="none"/>
    <path d="M12 20 Q20 10 28 20 Q20 30 12 20Z" fill="white" opacity="0.9"/>
  </svg>
);

const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconStar = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconCoffee = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const IconDroplet = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
);

const IconCake = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
    <path d="M2 21h20"/>
    <path d="M7 8v3"/>
    <path d="M12 8v3"/>
    <path d="M17 8v3"/>
    <path d="M7 4h.01"/>
    <path d="M12 4h.01"/>
    <path d="M17 4h.01"/>
  </svg>
);

const IconUtensils = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <path d="M7 2v20"/>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
  </svg>
);

const IconSparkles = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/>
    <path d="M18 14l.5 2L20 16.5 18 17l-.5 2L17 17l-2-.5 2-1.5z"/>
    <path d="M6 18l.5 2L8 20.5 6 21l-.5 2L5 21l-2-.5 2-1.5z"/>
  </svg>
);

const IconQuote = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.12">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
);

/* ============================================
   DATA
   ============================================ */
const menuItems = [
  { id: 1, name: 'Iekei', jpName: '家系', price: 23.5, desc: 'Pork belly chashu, nori, leek, spinach, chicken oil, soy sauce pork broth', featured: false, tags: ['Soy Base', 'Rich'] },
  { id: 2, name: 'Special Iekei', jpName: '特製家系', price: 29.5, desc: 'Double chashu, ajitama egg, extra nori, leek, spinach, soy sauce pork broth', featured: true, tags: ['Soy Base', 'Premium'] },
  { id: 3, name: 'Tonkotsu', jpName: '豚骨', price: 21.5, desc: 'Pork belly chashu, nori, spring onion, salt base pork broth', featured: false, tags: ['Salt Base', 'Classic'] },
  { id: 4, name: 'Special Tonkotsu', jpName: '特製豚骨', price: 27.5, desc: 'Double chashu, ajitama egg, extra nori, spring onion, salt base pork broth', featured: true, tags: ['Salt Base', 'Premium'] },
];

const extras = [
  { name: 'Extra Noodles', price: 2.5 },
  { name: 'Ajitama Egg', price: 3.0 },
  { name: 'Seaweed (3pcs)', price: 1.5 },
  { name: 'Pork Chashu (1pc)', price: 5.0 },
];

const sides = [
  { name: 'Pork Gyoza (6pcs)', price: 14.5 },
  { name: 'Vege Gyoza (6pcs)', price: 13.5 },
  { name: 'Chicken Karaage (6pcs)', price: 14.0 },
  { name: 'Mini Pork Chashu on Rice', price: 13.5 },
];

const drinkItems = [
  { name: 'Matcha Latte', price: 6.5, icon: 'coffee', tag: 'Hot/Iced' },
  { name: 'Hojicha Latte', price: 6.5, icon: 'coffee', tag: 'Hot/Iced' },
  { name: 'Yuzu Spritz', price: 10.0, icon: 'droplet', tag: 'Refreshing' },
  { name: 'Melon Soda', price: 9.0, icon: 'sparkles', tag: 'Sweet' },
  { name: 'Ume Plum Soda', price: 7.5, icon: 'droplet', tag: 'Tangy' },
  { name: 'Ogawa Highball', price: 12.0, icon: 'sparkles', tag: 'Signature' },
  { name: 'Basque Cheesecake', price: 11.5, icon: 'cake', tag: 'Dessert' },
  { name: 'Chiffon Cake', price: 7.5, icon: 'cake', tag: 'Dessert' },
];

const hoursData = [
  { day: 'Monday', time: 'Closed', closed: true },
  { day: 'Tue–Thu', time: '5 PM – 9 PM' },
  { day: 'Fri–Sat', time: 'Lunch & Dinner' },
  { day: 'Sunday', time: 'Lunch Only' },
];

const reviews = [
  { text: 'The most authentic ramen I\'ve had in Melbourne. The broth is incredible.', author: 'Sarah M.', rating: 5 },
  { text: 'Cozy atmosphere and the Special Iekei is absolutely divine. A true neighborhood gem.', author: 'James K.', rating: 5 },
  { text: 'Beautiful presentation and even better taste. This place captures the soul of Japanese ramen shops.', author: 'Emi T.', rating: 5 },
];

/* ============================================
   HELPERS
   ============================================ */
const DrinkIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'coffee': return <IconCoffee />;
    case 'droplet': return <IconDroplet />;
    case 'sparkles': return <IconSparkles />;
    case 'cake': return <IconCake />;
    default: return <IconCoffee />;
  }
};

/* ============================================
   SIMPLIFIED TYPOGRAPHY (No SplitType)
   ============================================ */
const CinematicTypography = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className={styles.cinematicContainer}>
      <h1 className={styles.cinematicHeading}>
        Authentic Japanese Ramen{' '}
        <span className={styles.cinematicAccent}>Experience</span>
      </h1>
    </div>
  );
};

/* ============================================
   SCROLL REVEAL (Optimized)
   ============================================ */
const ScrollReveal = ({ children, className, direction = 'up' }: {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const yStart = direction === 'up' ? 40 : direction === 'down' ? -40 : 0;
    const xStart = direction === 'left' ? 40 : direction === 'right' ? -40 : 0;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: yStart, x: xStart },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom-=60',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);
    
    return () => ctx.revert();
  }, [direction]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

/* ============================================
   ANIMATED COUNTER
   ============================================ */
const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    const numVal = parseFloat(value);
    if (isNaN(numVal)) return;
    
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: numVal,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top bottom-=80' },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Number.isInteger(numVal)
              ? Math.round(obj.val).toString()
              : obj.val.toFixed(1);
          }
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [value]);
  
  return <span ref={ref}>{value}</span>;
};

/* ============================================
   MAIN LANDING PAGE
   ============================================ */
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState<'ramen' | 'sides' | 'extras'>('ramen');
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => { setMounted(true); }, []);
  
  // ── Loading screen exit animation ──────────────────────
  useEffect(() => {
    if (!mounted || !loadingRef.current) return;
    
    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          transformOrigin: 'left center',
        });
      }
      
      gsap.to(loadingRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.in',
        delay: 0.3,
        onComplete: () => {
          if (loadingRef.current) loadingRef.current.style.display = 'none';
        },
      });
    }, loadingRef);
    
    return () => ctx.revert();
  }, [mounted]);
  
  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);
  
  // ── Hero animations (Optimized) ────────────────────────
  useEffect(() => {
    if (!mounted || !heroRef.current) return;
    
    const ctx = gsap.context(() => {
      // Simple floating shapes
      const shapes = heroRef.current!.querySelectorAll(`.${styles.floatingShape}`);
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          y: gsap.utils.random(-20, 20),
          x: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(6, 10),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.4,
        });
      });
      
      // Logo rotation
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        });
      }
      
      // Hero content entrance - FIXED VISIBILITY
      gsap.fromTo(`.${styles.heroTag}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.2 }
      );
      
      gsap.fromTo(`.${styles.heroSubtext}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.4 }
      );
      
      gsap.fromTo(`.${styles.heroButtons}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.6 }
      );
      
      gsap.fromTo(`.${styles.heroStats}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.8 }
      );
      
      // Scroll indicator
      gsap.to(`.${styles.scrollIndicator}`, {
        y: 12,
        opacity: 0.4,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
      
    }, heroRef);
    
    return () => ctx.revert();
  }, [mounted]);
  
  // ── Navbar entrance ────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const navbar = document.querySelector(`.${styles.navbar}`);
    if (navbar) {
      gsap.fromTo(navbar,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1 }
      );
    }
  }, [mounted]);
  
  // ── Section animations on scroll ───────────────────────
  useEffect(() => {
    if (!mounted) return;
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [mounted, activeMenuTab]);
  
  // ── Simple hover effects (no mousemove listeners) ──────
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);
  
  if (!mounted) {
    return (
      <div className={styles.loadingScreen}>
        <p className={styles.loadingText}>小川</p>
      </div>
    );
  }
  
  return (
    <div className={styles.page}>
      {/* ── LOADING OVERLAY ── */}
      <div ref={loadingRef} className={styles.loadingOverlay}>
        <div className={styles.loadingInner}>
          <p className={styles.loadingText}>小川</p>
          <p className={styles.loadingSubtext}>Cafe Ogawa</p>
          <div className={styles.loadingBar}>
            <div ref={progressRef} className={styles.loadingProgress} />
          </div>
        </div>
      </div>
      
      {/* ============ NAVBAR ============ */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
        <div className={styles.navbarInner}>
          <div className={styles.logo} onClick={() => scrollTo('home')}>
            <div className={styles.logoIcon}><IconLogo /></div>
            <div className={styles.logoTextGroup}>
              <span className={styles.logoText}>Cafe Ogawa</span>
              <span className={styles.logoSub}>小川</span>
            </div>
          </div>
          <div className={styles.navLinks}>
            {['Home', 'Menu', 'About', 'Visit'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={styles.navLink}
                onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }}
              >
                {item}
              </a>
            ))}
            <button className={styles.navCta} onClick={() => scrollTo('menu')}>View Menu</button>
          </div>
          <button
            className={styles.mobileHamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineOpen : ''}`} />
            <div className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineHide : ''}`} />
            <div className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineOpenReverse : ''}`} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {['Home', 'Menu', 'About', 'Visit'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={styles.mobileNavLink}
                onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }}
              >
                {item}
              </a>
            ))}
            <button className={styles.mobileCta} onClick={() => scrollTo('menu')}>View Menu</button>
          </div>
        )}
      </nav>
      
      {/* ============ HERO ============ */}
      <section ref={heroRef} className={styles.hero} id="home">
        <div className={styles.heroBgDecor}>
          <div className={`${styles.floatingShape} ${styles.floatingShape1}`} />
          <div className={`${styles.floatingShape} ${styles.floatingShape2}`} />
          <div className={`${styles.floatingShape} ${styles.floatingShape3}`} />
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTag}>
              <span className={styles.heroTagDot} />
              <span className={styles.heroTagLabel}>Ascot Vale, Melbourne</span>
              <span className={styles.heroTagDot} />
            </div>
            
            <CinematicTypography />
            
            <p className={styles.heroSubtext}>
              Rich handcrafted ramen, specialty drinks, and cozy Japanese café atmosphere in Ascot Vale.
            </p>
            
            <div className={styles.heroButtons}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => scrollTo('menu')}>
                <span>View Menu</span><IconArrowRight />
              </button>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => scrollTo('visit')}>
                Visit Cafe
              </button>
            </div>
            
            <div className={styles.heroStats}>
              {[
                { number: '4.8', label: 'Rating' },
                { number: '16+', label: 'Bowls' },
                { number: '2024', label: 'Est.' }
              ].map((stat, i) => (
                <div key={stat.label} className={styles.heroStatGroup}>
                  {i > 0 && <div className={styles.heroStatDivider} />}
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatNumber}>
                      <AnimatedCounter value={stat.number} />
                    </span>
                    <span className={styles.heroStatLabel}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.heroLogoContainer}>
              <div ref={logoRef} className={styles.heroLogo}>
                <span className={styles.heroLogoInner}>小川</span>
              </div>
              <div className={styles.heroLogoRing} />
              <div className={styles.heroLogoRing2} />
            </div>
          </div>
        </div>
        
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll</span>
          <IconChevronDown />
        </div>
      </section>
      
      {/* ============ MENU ============ */}
      <section id="menu" className={styles.section}>
        <div className={styles.sectionInner}>
          <ScrollReveal className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Our Menu</p>
            <h2 className={styles.sectionTitle}>Signature Bowls</h2>
            <p className={styles.sectionSubtext}>
              Rich broths simmered for 18+ hours, paired with handcrafted noodles and premium toppings.
            </p>
          </ScrollReveal>
          
          <div className={styles.menuTabs}>
            {(['ramen', 'sides', 'extras'] as const).map((tab) => (
              <button
                key={tab}
                className={`${styles.menuTab} ${activeMenuTab === tab ? styles.menuTabActive : ''}`}
                onClick={() => setActiveMenuTab(tab)}
              >
                {tab === 'ramen' ? 'Ramen' : tab === 'sides' ? 'Sides & Rice' : 'Extras'}
              </button>
            ))}
          </div>
          
          {activeMenuTab === 'ramen' && (
            <div className={styles.menuGrid}>
              {menuItems.map((item, index) => (
                <ScrollReveal key={item.id} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <div className={`${styles.menuCard} ${item.featured ? styles.menuCardFeatured : ''}`}>
                    {item.featured && (
                      <span className={styles.menuCardBadge}>
                        <IconStar size={11} /> Popular
                      </span>
                    )}
                    <div className={styles.menuCardTop}>
                      <h3 className={styles.menuCardTitle}>{item.name}</h3>
                      <span className={styles.menuCardJp}>{item.jpName}</span>
                    </div>
                    <p className={styles.menuCardDesc}>{item.desc}</p>
                    <div className={styles.menuCardTags}>
                      {item.tags.map((tag: string) => (
                        <span key={tag} className={styles.menuCardTag}>{tag}</span>
                      ))}
                    </div>
                    <div className={styles.menuCardBottom}>
                      <p className={styles.menuCardPrice}>
                        <span className={styles.menuCardPriceCurrency}>$</span>
                        {item.price.toFixed(1)}
                      </p>
                      <span className={styles.menuCardOrderBtn}>Order</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
          
          {activeMenuTab === 'sides' && (
            <div className={styles.sidesGrid}>
              {sides.map((item) => (
                <ScrollReveal key={item.name} direction="up">
                  <div className={styles.sideCard}>
                    <h4 className={styles.sideName}>{item.name}</h4>
                    <p className={styles.sidePrice}>${item.price.toFixed(1)}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
          
          {activeMenuTab === 'extras' && (
            <div className={styles.extrasGrid}>
              <h3 className={styles.extrasTitle}>Customize Your Bowl</h3>
              <div className={styles.extrasList}>
                {extras.map((extra) => (
                  <ScrollReveal key={extra.name} direction="left">
                    <div className={styles.extraItem}>
                      <span className={styles.extraName}>{extra.name}</span>
                      <span className={styles.extraPrice}>+${extra.price.toFixed(1)}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <div className={styles.riceOptions}>
                <h4 className={styles.riceTitle}>Steamed Rice</h4>
                <div className={styles.riceGrid}>
                  {[
                    { size: 'Mini', price: '$2.0' },
                    { size: 'Regular', price: '$4.0' },
                    { size: 'Large', price: '$6.0' }
                  ].map((rice) => (
                    <div key={rice.size} className={styles.riceItem}>
                      <span>{rice.size}</span>
                      <span>{rice.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* ============ ABOUT ============ */}
      <section id="about" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.aboutGrid}>
            <ScrollReveal className={styles.aboutTextContent} direction="left">
              <p className={styles.sectionTag}>Our Story</p>
              <h2 className={styles.aboutHeading}>Inspired by Japanese</h2>
              <h2 className={styles.aboutHeading}>Neighborhood Cafés</h2>
              <p className={styles.aboutParagraph}>
                Cafe Ogawa brings authentic Japanese ramen culture to Melbourne through handcrafted broths, warm hospitality, and a calm neighborhood dining experience.
              </p>
              <p className={styles.aboutParagraph}>
                Every bowl is made with care — from the 18-hour simmered broths to the perfectly chewy noodles.
              </p>
              <div className={styles.aboutValues}>
                {[
                  { icon: <IconUtensils />, text: 'Handcrafted Daily' },
                  { icon: <IconHeart />, text: 'Warm Hospitality' },
                  { icon: <IconMapPin />, text: 'Neighborhood Vibe' }
                ].map((v) => (
                  <div key={v.text} className={styles.aboutValue}>
                    <span className={styles.aboutValueIcon}>{v.icon}</span>
                    <span>{v.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal className={styles.aboutVisual} direction="right">
              <div className={styles.aboutSwirlContainer}>
                <div className={styles.aboutSwirl} />
                <div className={styles.aboutSwirlIcon}>
                  <svg width="44" height="44" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2" fill="none"/>
                    <path d="M20 30 Q30 15 40 30 Q30 45 20 30Z" fill="white" opacity="0.8"/>
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* ============ REVIEWS ============ */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <ScrollReveal className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Testimonials</p>
            <h2 className={styles.sectionTitle}>Loved by the Neighborhood</h2>
          </ScrollReveal>
          <div className={styles.reviewsGrid}>
            {reviews.map((review) => (
              <ScrollReveal key={review.author} direction="up">
                <div className={styles.reviewCard}>
                  <div className={styles.reviewQuoteIcon}><IconQuote /></div>
                  <div className={styles.reviewStars}>
                    {[...Array(review.rating)].map((_, s) => (
                      <span key={s} className={styles.reviewStar}><IconStar size={13} /></span>
                    ))}
                  </div>
                  <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
                  <p className={styles.reviewAuthor}>— {review.author}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* ============ DRINKS ============ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <ScrollReveal className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Drinks & Desserts</p>
            <h2 className={styles.sectionTitle}>Perfect Pairings</h2>
            <p className={styles.sectionSubtext}>
              Specialty lattes, refreshing spritzes, and handcrafted desserts to complete your meal.
            </p>
          </ScrollReveal>
          <div className={styles.drinksGrid}>
            {drinkItems.map((item, index) => (
              <ScrollReveal key={item.name} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className={styles.drinkCard}>
                  <div className={styles.drinkIconWrapper}><DrinkIcon type={item.icon} /></div>
                  <span className={styles.drinkTag}>{item.tag}</span>
                  <h3 className={styles.drinkName}>{item.name}</h3>
                  <p className={styles.drinkPrice}>${item.price.toFixed(1)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* ============ VISIT ============ */}
      <section id="visit" className={styles.section}>
        <div className={styles.sectionInner}>
          <ScrollReveal className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Visit Us</p>
            <h2 className={styles.sectionTitle}>Find Us</h2>
          </ScrollReveal>
          <div className={styles.visitGrid}>
            <ScrollReveal className={styles.visitMapContainer} direction="left">
              <div className={styles.visitMapFrame}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.5!2d144.9136575!3d-37.7723625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d0072e7028b%3A0x2a7dab16beb0f57d!2sCafe%20Ogawa!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cafe Ogawa Location"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal className={styles.visitDetails} direction="right">
              <div className={styles.visitCard}>
                <div className={styles.visitIconRow}>
                  <IconMapPin />
                </div>
                <p className={styles.visitAddress}>217 Union Rd</p>
                <p className={styles.visitSuburb}>Ascot Vale VIC 3032, Australia</p>
                <div className={styles.visitHours}>
                  {hoursData.map((h) => (
                    <div key={h.day} className={styles.visitHourRow}>
                      <span className={styles.visitDay}>{h.day}</span>
                      <span className={h.closed ? styles.visitClosed : styles.visitTime}>{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.visitActions}>
                  <a
                    href="https://www.google.com/maps/place/Cafe+Ogawa/@-37.7722763,144.9136575,17.21z/data=!4m6!3m5!1s0x6ad65d0072e7028b:0x2a7dab16beb0f57d!8m2!3d-37.7723625!4d144.9157525!16s%2Fg%2F11yttcj4p5?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.visitBtn}
                  >
                    <IconMapPin /> Open in Google Maps
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* ============ FOOTER ============ */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}><IconLogo /></div>
              <span className={styles.footerLogoText}>Cafe Ogawa</span>
            </div>
            <p className={styles.footerDesc}>Authentic Japanese ramen café in the heart of Ascot Vale.</p>
            <span className={styles.footerKanji}>小川</span>
          </div>
          <div className={styles.footerLinksCol}>
            <h4 className={styles.footerColTitle}>Quick Links</h4>
            {['Home', 'Menu', 'About', 'Visit'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={styles.footerLink}
                onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }}
              >
                {item}
              </a>
            ))}
          </div>
          <div className={styles.footerLinksCol}>
            <h4 className={styles.footerColTitle}>Connect</h4>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Instagram</a>
            <a href="https://www.google.com/maps/place/Cafe+Ogawa/@-37.7722763,144.9136575,17.21z" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Google Maps</a>
            <a href="#" className={styles.footerLink}>Contact</a>
          </div>
          <div className={styles.footerLinksCol}>
            <h4 className={styles.footerColTitle}>Hours</h4>
            {hoursData.map((h) => (
              <p key={h.day} className={styles.footerHourRow}>
                <span className={styles.footerHourDay}>{h.day}</span>
                <span className={h.closed ? styles.footerHourClosed : styles.footerHourTime}>{h.time}</span>
              </p>
            ))}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>© 2026 Cafe Ogawa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}