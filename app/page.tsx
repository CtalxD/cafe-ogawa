'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles/page.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.fps(60);
}

/* ============================================
   REAL FOOD IMAGES (Unsplash)
   ============================================ */
const IMAGES = {
  heroBg: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1800&q=80',
  ramenBowl1: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80',
  ramenBowl2: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&q=80',
  ramenBowl3: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&q=80',
  ramenBowl4: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=600&q=80',
  gyoza: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80',
  karaage: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80',
  cafeInterior: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80',
  matchaLatte: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80',
  cheesecake: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80',
  noodles: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=900&q=80',
  broth: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=600&q=80',
};

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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconCoffee = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
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
    <path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/>
    <path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>
  </svg>
);

const IconUtensils = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/>
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

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const IconRamen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11h16a1 1 0 0 1 1 1v.5c0 1.5-2.5 2.5-5 2.5h-2c-1 0-2-.5-3-1s-2-1-3-1c-2.5 0-5-1-5-2.5V12a1 1 0 0 1 1-1z"/>
    <path d="M8 11V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/>
    <line x1="12" y1="5" x2="12" y2="11"/>
    <line x1="8" y1="8" x2="16" y2="8"/>
  </svg>
);

const IconGyoza = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c-3 0-6 2-8 5h16c-2-3-5-5-8-5z"/>
    <path d="M4 8c0 4 3.5 10 8 10s8-6 8-10"/>
    <path d="M8 12h8"/>
    <path d="M10 9h4"/>
  </svg>
);

const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

/* ============================================
   DATA
   ============================================ */
const menuItems = [
  {
    id: 1, name: 'Iekei', jpName: '家系', price: 23.5,
    desc: 'Pork belly chashu, nori, leek, spinach, chicken oil, soy sauce pork broth',
    featured: false, tags: ['Soy Base', 'Rich'], image: IMAGES.ramenBowl1,
  },
  {
    id: 2, name: 'Special Iekei', jpName: '特製家系', price: 29.5,
    desc: 'Double chashu, ajitama egg, extra nori, leek, spinach, soy sauce pork broth',
    featured: true, tags: ['Soy Base', 'Premium'], image: IMAGES.ramenBowl2,
  },
  {
    id: 3, name: 'Tonkotsu', jpName: '豚骨', price: 21.5,
    desc: 'Pork belly chashu, nori, spring onion, salt base pork broth',
    featured: false, tags: ['Salt Base', 'Classic'], image: IMAGES.ramenBowl3,
  },
  {
    id: 4, name: 'Special Tonkotsu', jpName: '特製豚骨', price: 27.5,
    desc: 'Double chashu, ajitama egg, extra nori, spring onion, salt base pork broth',
    featured: true, tags: ['Salt Base', 'Premium'], image: IMAGES.ramenBowl4,
  },
];

const extras = [
  { name: 'Extra Noodles', price: 2.5 },
  { name: 'Ajitama Egg', price: 3.0 },
  { name: 'Seaweed (3pcs)', price: 1.5 },
  { name: 'Pork Chashu (1pc)', price: 5.0 },
];

const sides = [
  { name: 'Pork Gyoza (6pcs)', price: 14.5, image: IMAGES.gyoza },
  { name: 'Vege Gyoza (6pcs)', price: 13.5, image: IMAGES.gyoza },
  { name: 'Chicken Karaage (6pcs)', price: 14.0, image: IMAGES.karaage },
  { name: 'Mini Pork Chashu on Rice', price: 13.5, image: IMAGES.broth },
];

const drinkItems = [
  { name: 'Matcha Latte', price: 6.5, icon: 'coffee', tag: 'Hot/Iced', image: IMAGES.matchaLatte },
  { name: 'Hojicha Latte', price: 6.5, icon: 'coffee', tag: 'Hot/Iced', image: IMAGES.matchaLatte },
  { name: 'Yuzu Spritz', price: 10.0, icon: 'droplet', tag: 'Refreshing', image: IMAGES.matchaLatte },
  { name: 'Melon Soda', price: 9.0, icon: 'sparkles', tag: 'Sweet', image: IMAGES.matchaLatte },
  { name: 'Ume Plum Soda', price: 7.5, icon: 'droplet', tag: 'Tangy', image: IMAGES.matchaLatte },
  { name: 'Ogawa Highball', price: 12.0, icon: 'sparkles', tag: 'Signature', image: IMAGES.matchaLatte },
  { name: 'Basque Cheesecake', price: 11.5, icon: 'cake', tag: 'Dessert', image: IMAGES.cheesecake },
  { name: 'Chiffon Cake', price: 7.5, icon: 'cake', tag: 'Dessert', image: IMAGES.cheesecake },
];

const hoursData = [
  { day: 'Monday', time: 'Closed', closed: true },
  { day: 'Tue – Thu', time: '5 PM – 9 PM' },
  { day: 'Fri – Sat', time: 'Lunch & Dinner' },
  { day: 'Sunday', time: 'Lunch Only' },
];

const reviews = [
  { text: 'The most authentic ramen I\'ve had in Melbourne. The broth is absolutely incredible — rich, complex, and soul-warming.', author: 'Sarah M.', rating: 5, role: 'Food Blogger' },
  { text: 'Cozy atmosphere and the Special Iekei is absolutely divine. A true neighborhood gem that keeps me coming back.', author: 'James K.', rating: 5, role: 'Local Regular' },
  { text: 'Beautiful presentation and even better taste. This place captures the soul of Japanese ramen shops perfectly.', author: 'Emi T.', rating: 5, role: 'Melbourne Eats' },
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
   CINEMATIC TYPOGRAPHY WITH SPLIT TEXT
   ============================================ */
const CinematicTypography = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    
    const ctx = gsap.context(() => {
      const heading = element.querySelector('h1');
      if (!heading) return;

      const split = new SplitText(heading, { 
        type: "lines,words,chars",
        linesClass: "cinematicLine",
        wordsClass: "cinematicWord",
        charsClass: "cinematicChar"
      });

      gsap.fromTo(split.chars,
        { 
          opacity: 0, 
          y: 80, 
          rotationX: -90,
          filter: 'blur(8px)'
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          filter: 'blur(0px)', 
          duration: 1.2, 
          stagger: 0.03,
          ease: 'power3.out', 
          delay: 0.3
        }
      );

      const accent = element.querySelector(`.${styles.cinematicAccent}`);
      if (accent) {
        gsap.fromTo(accent,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.7)', delay: 1.2 }
        );
      }

      return () => split.revert();
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.cinematicContainer}>
      <h1 className={styles.cinematicHeading}>
        Authentic<br />
        Japanese Ramen<br />
        <span className={styles.cinematicAccent}>Experience</span>
      </h1>
    </div>
  );
};

/* ============================================
   SCROLL REVEAL WITH SPLIT TEXT
   ============================================ */
const ScrollReveal = ({ children, className, direction = 'up', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const yStart = direction === 'up' ? 60 : direction === 'down' ? -60 : 0;
    const xStart = direction === 'left' ? 60 : direction === 'right' ? -60 : 0;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(element,
        { opacity: 0, y: yStart, x: xStart, filter: 'blur(4px)' },
        {
          opacity: 1, y: 0, x: 0, filter: 'blur(0px)', 
          duration: 0.9, ease: 'power2.out', delay,
          scrollTrigger: { 
            trigger: element, 
            start: 'top bottom-=100', 
            toggleActions: 'play none none none',
            once: true
          },
        }
      );

      const headings = element.querySelectorAll('h1, h2, h3');
      headings.forEach((heading) => {
        const headingEl = heading as HTMLElement;
        if (headingEl.classList.contains('split-initialized')) return;
        headingEl.classList.add('split-initialized');
        
        const split = new SplitText(headingEl, { 
          type: "words,chars",
          wordsClass: "revealWord",
          charsClass: "revealChar"
        });

        gsap.fromTo(split.chars,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingEl,
              start: 'top bottom-=60',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );

        return () => split.revert();
      });
    }, ref);
    
    return () => ctx.revert();
  }, [direction, delay]);

  return <div ref={ref} className={className}>{children}</div>;
};

/* ============================================
   ANIMATED COUNTER
   ============================================ */
const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const numVal = parseFloat(value);
    if (isNaN(numVal)) return;
    
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: numVal, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top bottom-=80', once: true },
        onUpdate: () => {
          element.textContent = Number.isInteger(numVal) 
            ? Math.round(obj.val).toString() 
            : obj.val.toFixed(1);
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [value]);
  
  return <span ref={ref}>{value}</span>;
};

/* ============================================
   PARALLAX IMAGE
   ============================================ */
const ParallaxImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const img = element.querySelector('img');
    if (!img) return;
    
    const ctx = gsap.context(() => {
      gsap.to(img, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { 
          trigger: element, 
          start: 'top bottom', 
          end: 'bottom top', 
          scrub: true 
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={ref} className={`${styles.parallaxWrapper} ${className || ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={styles.parallaxImg} loading="lazy" />
    </div>
  );
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
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Loading exit animation
  useEffect(() => {
    if (!mounted) return;
    const element = loadingRef.current;
    if (!element) return;
    
    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.to(progressRef.current, { 
          scaleX: 1, 
          duration: 1.2, 
          ease: 'power2.inOut', 
          transformOrigin: 'left center' 
        });
      }
      
      gsap.to(element, {
        yPercent: -100, 
        duration: 0.9, 
        ease: 'power3.in', 
        delay: 0.7,
        onComplete: () => { 
          element.style.display = 'none'; 
        },
      });
    }, loadingRef);
    
    return () => ctx.revert();
  }, [mounted]);

  // Scroll state for navbar
  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Hero animations
  useEffect(() => {
    if (!mounted) return;
    const element = heroRef.current;
    if (!element) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.4 });
      
      tl.fromTo(`.${styles.heroTag}`, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
      .fromTo(`.${styles.heroSubtext}`, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 
        '-=0.4'
      )
      .fromTo(`.${styles.heroButtons}`, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 
        '-=0.4'
      )
      .fromTo(`.${styles.heroStats}`, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 
        '-=0.4'
      )
      .fromTo(`.${styles.heroBadgeFloat}`, 
        { opacity: 0, scale: 0.7 }, 
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, 
        '-=0.3'
      );

      const shapes = element.querySelectorAll(`.${styles.floatingShape}`);
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: gsap.utils.random(-30, 30), 
          x: gsap.utils.random(-20, 20),
          duration: gsap.utils.random(7, 12), 
          repeat: -1, 
          yoyo: true, 
          ease: 'sine.inOut', 
          delay: i * 0.6,
        });
      });

      gsap.to(`.${styles.scrollIndicator}`, {
        y: 16, 
        opacity: 0.25, 
        duration: 1.8, 
        repeat: -1, 
        yoyo: true, 
        ease: 'power1.inOut',
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, [mounted]);

  // Navbar entrance
  useEffect(() => {
    if (!mounted) return;
    gsap.fromTo(`.${styles.navbar}`, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 1 }
    );
  }, [mounted]);

  // ScrollTrigger refresh on mount and tab change
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, [mounted, activeMenuTab]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  // SSR fallback
  if (!mounted) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingLogoWrap}>
          <p className={styles.loadingKanji}>小川</p>
          <div className={styles.loadingRing} />
        </div>
        <p className={styles.loadingSubtext}>Cafe Ogawa</p>
        <p className={styles.loadingCity}>Ascot Vale · Melbourne</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* ── LOADING OVERLAY ── */}
      <div ref={loadingRef} className={styles.loadingOverlay}>
        <div className={styles.loadingInner}>
          <div className={styles.loadingLogoWrap}>
            <p className={styles.loadingKanji}>小川</p>
            <div className={styles.loadingRing} />
          </div>
          <p className={styles.loadingSubtext}>Cafe Ogawa</p>
          <div className={styles.loadingBar}>
            <div ref={progressRef} className={styles.loadingProgress} />
          </div>
          <p className={styles.loadingCity}>Ascot Vale · Melbourne</p>
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
              <a key={item} href={`#${item.toLowerCase()}`} className={styles.navLink}
                onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }}>
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
              <a key={item} href={`#${item.toLowerCase()}`} className={styles.mobileNavLink}
                onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }}>
                {item}
              </a>
            ))}
            <button className={styles.mobileCta} onClick={() => scrollTo('menu')}>View Menu</button>
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      <section ref={heroRef} className={styles.hero} id="home">
        <div className={styles.heroBgImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.heroBg} alt="Ramen bowl" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
          <div className={styles.heroBgGradient} />
        </div>

        <div className={styles.heroBgDecor}>
          <div className={`${styles.floatingShape} ${styles.floatingShape1}`} />
          <div className={`${styles.floatingShape} ${styles.floatingShape2}`} />
          <div className={`${styles.floatingShape} ${styles.floatingShape3}`} />
        </div>

        <div className={styles.heroKanjiWatermark}>小川</div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroTag}>
              <span className={styles.heroTagDot} />
              <span className={styles.heroTagLabel}>Ascot Vale, Melbourne</span>
              <span className={styles.heroTagDivider}>·</span>
              <span className={styles.heroTagLabel}>Est. 2024</span>
            </div>

            <CinematicTypography />

            <p className={styles.heroSubtext}>
              Rich handcrafted ramen, specialty drinks, and a warm Japanese café atmosphere - right in the heart of Ascot Vale.
            </p>

            <div className={styles.heroButtons}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => scrollTo('menu')}>
                <span>Explore Menu</span><IconArrowRight />
              </button>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => scrollTo('visit')}>
                Find Us
              </button>
            </div>

            <div className={styles.heroStats}>
              {[
                { number: '4.8', label: 'Google Rating', suffix: '★' },
                { number: '16', label: 'Signature Bowls' },
                { number: '18', label: 'Hour Broth' },
              ].map((stat, i) => (
                <div key={stat.label} className={styles.heroStatGroup}>
                  {i > 0 && <div className={styles.heroStatDivider} />}
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatNumber}>
                      <AnimatedCounter value={stat.number} />{stat.suffix || '+'}
                    </span>
                    <span className={styles.heroStatLabel}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImageStack}>
              <div className={styles.heroImgCard1}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMAGES.ramenBowl2} alt="Special Iekei ramen" />
                <div className={styles.heroImgCardLabel}>
                  <span>Special Iekei</span>
                  <span>$29.5</span>
                </div>
              </div>
              <div className={styles.heroImgCard2}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMAGES.ramenBowl1} alt="Iekei ramen" />
              </div>
              <div className={styles.heroBadgeFloat}>
                <div className={styles.heroBadgeInner}>
                  <span className={styles.heroBadgeStar}><IconStar size={13} /></span>
                  <span className={styles.heroBadgeText}>18h slow-broth</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll to explore</span>
          <IconChevronDown />
        </div>
      </section>

      {/* ============ FEATURE STRIP ============ */}
      <div className={styles.featureStrip}>
        {[
          { icon: <IconClock />, label: '18-Hour Broth', sub: 'Simmered daily' },
          { icon: <IconUtensils />, label: 'Handcrafted Noodles', sub: 'Made fresh' },
          { icon: <IconMapPin />, label: 'Ascot Vale', sub: '217 Union Rd' },
          { icon: <IconHeart />, label: 'Japanese Soul', sub: 'In Melbourne' },
        ].map((f, i) => (
          <div key={i} className={styles.featureItem}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <div>
              <p className={styles.featureLabel}>{f.label}</p>
              <p className={styles.featureSub}>{f.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ============ MENU ============ */}
      <section id="menu" className={styles.section}>
        <div className={styles.sectionInner}>
          <ScrollReveal className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Our Menu</p>
            <h2 className={styles.sectionTitle}>Signature Bowls</h2>
            <p className={styles.sectionSubtext}>
              Rich broths simmered for 18+ hours, paired with springy handcrafted noodles and premium toppings.
            </p>
          </ScrollReveal>

          <div className={styles.menuTabs}>
            {([
              { id: 'ramen', label: 'Ramen', icon: <IconRamen /> },
              { id: 'sides', label: 'Sides', icon: <IconGyoza /> },
              { id: 'extras', label: 'Extras', icon: <IconPlus /> }
            ] as const).map((tab) => (
              <button key={tab.id}
                className={`${styles.menuTab} ${activeMenuTab === tab.id ? styles.menuTabActive : ''}`}
                onClick={() => setActiveMenuTab(tab.id as 'ramen' | 'sides' | 'extras')}>
                <span className={styles.menuTabIcon}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {activeMenuTab === 'ramen' && (
            <div className={styles.menuGrid}>
              {menuItems.map((item, index) => (
                <ScrollReveal key={item.id} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.08}>
                  <div className={`${styles.menuCard} ${item.featured ? styles.menuCardFeatured : ''}`}>
                    {item.featured && (
                      <span className={styles.menuCardBadge}>
                        <IconStar size={10} /> Popular
                      </span>
                    )}
                    <div className={styles.menuCardImage}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <div className={styles.menuCardImageOverlay} />
                      <span className={styles.menuCardJpOverlay}>{item.jpName}</span>
                    </div>
                    <div className={styles.menuCardBody}>
                      <div className={styles.menuCardTop}>
                        <h3 className={styles.menuCardTitle}>{item.name}</h3>
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
                        <span className={styles.menuCardOrderBtn}>Order Now</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {activeMenuTab === 'sides' && (
            <div className={styles.sidesGrid}>
              {sides.map((item, i) => (
                <ScrollReveal key={item.name} direction="up" delay={i * 0.1}>
                  <div className={styles.sideCard}>
                    <div className={styles.sideCardImage}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className={styles.sideCardBody}>
                      <h4 className={styles.sideName}>{item.name}</h4>
                      <p className={styles.sidePrice}>${item.price.toFixed(1)}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {activeMenuTab === 'extras' && (
            <div className={styles.extrasGrid}>
              <h3 className={styles.extrasTitle}>Customize Your Bowl</h3>
              <div className={styles.extrasList}>
                {extras.map((extra, i) => (
                  <ScrollReveal key={extra.name} direction="left" delay={i * 0.08}>
                    <div className={styles.extraItem}>
                      <span className={styles.extraName}>{extra.name}</span>
                      <span className={styles.extraPrice}>+${extra.price.toFixed(1)}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <div className={styles.riceOptions}>
                <h4 className={styles.riceTitle}>+ Steamed Rice</h4>
                <div className={styles.riceGrid}>
                  {[{ size: 'Mini', price: '$2.0' }, { size: 'Regular', price: '$4.0' }, { size: 'Large', price: '$6.0' }].map((rice) => (
                    <div key={rice.size} className={styles.riceItem}>
                      <span className={styles.riceSize}>{rice.size}</span>
                      <span className={styles.ricePrice}>{rice.price}</span>
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
              <h2 className={styles.aboutHeading}>Inspired by<br />Japanese Neighborhood<br /><em>Cafés</em></h2>
              <p className={styles.aboutParagraph}>
                Cafe Ogawa brings the warmth of authentic Japanese ramen culture to Melbourne - through handcrafted broths, genuine hospitality, and the calm energy of a true neighborhood dining experience.
              </p>
              <p className={styles.aboutParagraph}>
                Every bowl is made with extraordinary care, from the 18-hour slow-simmered broths to the perfectly springy noodles sourced from dedicated Japanese artisans.
              </p>
              <div className={styles.aboutValues}>
                {[
                  { icon: <IconUtensils />, text: 'Handcrafted Daily' },
                  { icon: <IconHeart />, text: 'Warm Hospitality' },
                  { icon: <IconMapPin />, text: 'Neighborhood Vibe' },
                ].map((v) => (
                  <div key={v.text} className={styles.aboutValue}>
                    <span className={styles.aboutValueIcon}>{v.icon}</span>
                    <span>{v.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal className={styles.aboutVisual} direction="right">
              <div className={styles.aboutImageCollage}>
                <div className={styles.aboutImg1}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMAGES.cafeInterior} alt="Cafe interior" loading="lazy" />
                </div>
                <div className={styles.aboutImg2}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMAGES.noodles} alt="Fresh noodles" loading="lazy" />
                </div>
                <div className={styles.aboutImg3}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMAGES.broth} alt="Rich broth" loading="lazy" />
                </div>
                <div className={styles.aboutBadge}>
                  <span className={styles.aboutBadgeNum}>18</span>
                  <span className={styles.aboutBadgeSub}>hours<br />simmered</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ FULL-WIDTH PARALLAX BANNER ============ */}
      <div className={styles.parallaxBanner}>
        <ParallaxImage src={IMAGES.ramenBowl4} alt="Tonkotsu ramen" className={styles.parallaxBannerInner} />
        <div className={styles.parallaxBannerOverlay} />
        <div className={styles.parallaxBannerContent}>
          <p className={styles.parallaxBannerTag}>— Our Philosophy —</p>
          <h3 className={styles.parallaxBannerHeading}>Every bowl tells a story<br />brewed over 18 hours</h3>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => scrollTo('menu')}>
            <span>View Full Menu</span><IconArrowRight />
          </button>
        </div>
      </div>

      {/* ============ REVIEWS ============ */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <ScrollReveal className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Testimonials</p>
            <h2 className={styles.sectionTitle}>Loved by the Neighborhood</h2>
            <div className={styles.reviewsRatingRow}>
              {[...Array(5)].map((_, i) => <IconStar key={i} size={18} />)}
              <span className={styles.reviewsRatingLabel}>4.8 on Google</span>
            </div>
          </ScrollReveal>
          <div className={styles.reviewsGrid}>
            {reviews.map((review, i) => (
              <ScrollReveal key={review.author} direction="up" delay={i * 0.12}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewStars}>
                    {[...Array(review.rating)].map((_, s) => (
                      <span key={s} className={styles.reviewStar}><IconStar size={13} /></span>
                    ))}
                  </div>
                  <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
                  <div className={styles.reviewFooter}>
                    <div className={styles.reviewAvatar}>{review.author[0]}</div>
                    <div>
                      <p className={styles.reviewAuthor}>{review.author}</p>
                      <p className={styles.reviewRole}>{review.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DRINKS & DESSERTS ============ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <ScrollReveal className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Drinks & Desserts</p>
            <h2 className={styles.sectionTitle}>Perfect Pairings</h2>
            <p className={styles.sectionSubtext}>
              Specialty lattes, refreshing spritzes, and handcrafted desserts to complete your meal.
            </p>
          </ScrollReveal>

          <div className={styles.drinksHighlightRow}>
            <ScrollReveal className={styles.drinksHighlightCard} direction="left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.matchaLatte} alt="Matcha latte" className={styles.drinksHighlightImg} />
              <div className={styles.drinksHighlightBody}>
                <span className={styles.sectionTag}>Featured</span>
                <h3 className={styles.drinksHighlightTitle}>Matcha Latte</h3>
                <p className={styles.drinksHighlightDesc}>Stone-ground ceremonial matcha, steamed whole milk, served hot or iced.</p>
                <p className={styles.drinksHighlightPrice}>$6.5</p>
              </div>
            </ScrollReveal>
            <ScrollReveal className={styles.drinksHighlightCard} direction="right">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.cheesecake} alt="Basque cheesecake" className={styles.drinksHighlightImg} />
              <div className={styles.drinksHighlightBody}>
                <span className={styles.sectionTag}>Dessert</span>
                <h3 className={styles.drinksHighlightTitle}>Basque Cheesecake</h3>
                <p className={styles.drinksHighlightDesc}>Burnt Basque-style cheesecake — caramelized crust, silky center.</p>
                <p className={styles.drinksHighlightPrice}>$11.5</p>
              </div>
            </ScrollReveal>
          </div>

          <div className={styles.drinksGrid}>
            {drinkItems.map((item, index) => (
              <ScrollReveal key={item.name} direction="up" delay={index * 0.06}>
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
            <h2 className={styles.sectionTitle}>Find Cafe Ogawa</h2>
            <p className={styles.sectionSubtext}>Come hungry. We're in the heart of Ascot Vale, right on Union Road.</p>
          </ScrollReveal>
          <div className={styles.visitGrid}>
            <ScrollReveal className={styles.visitMapContainer} direction="left">
              <div className={styles.visitMapFrame}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.5!2d144.9136575!3d-37.7723625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d0072e7028b%3A0x2a7dab16beb0f57d!2sCafe%20Ogawa!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cafe Ogawa Location"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal className={styles.visitDetails} direction="right">
              <div className={styles.visitCard}>
                <div className={styles.visitCardHeader}>
                  <div className={styles.visitIconRow}><IconMapPin /></div>
                  <div>
                    <p className={styles.visitAddress}>217 Union Rd</p>
                    <p className={styles.visitSuburb}>Ascot Vale VIC 3032</p>
                  </div>
                </div>
                <div className={styles.visitDivider} />
                <div className={styles.visitHours}>
                  <p className={styles.visitHoursTitle}><IconClock /> Opening Hours</p>
                  {hoursData.map((h) => (
                    <div key={h.day} className={styles.visitHourRow}>
                      <span className={styles.visitDay}>{h.day}</span>
                      <span className={h.closed ? styles.visitClosed : styles.visitTime}>{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.visitDivider} />
                <div className={styles.visitActions}>
                    <a
                      href="https://www.google.com/maps/place/Cafe+Ogawa/@-37.7723582,144.9131722,597m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6ad65d0072e7028b:0x2a7dab16beb0f57d!8m2!3d-37.7723625!4d144.9157525!16s%2Fg%2F11yttcj4p5?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank" rel="noopener noreferrer"
                      className={styles.visitBtn}>
                      <IconMapPin /> Open in Google Maps
                    </a>
                  <a href="https://www.instagram.com/cafeogawa/?hl=en" target="_blank" rel="noopener noreferrer" className={styles.visitBtnSecondary}>
                    <IconInstagram /> Follow on Instagram
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    {/* ============ FOOTER ============ */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            {/* Cafe Ogawa Brand */}
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <div className={styles.footerLogoIcon}><IconLogo /></div>
                <span className={styles.footerLogoText}>Cafe Ogawa</span>
              </div>
              <p className={styles.footerDesc}>Authentic Japanese ramen café in the heart of Ascot Vale, Melbourne.</p>
              <div className={styles.footerSocials}>
                <a href="https://www.instagram.com/cafeogawa/?hl=en" target="_blank" rel="noopener noreferrer" className={styles.footerSocialBtn}><IconInstagram /></a>
                <a href="https://www.google.com/maps/place/Cafe+Ogawa/@-37.7722468,144.9132489,565m/data=!3m1!1e3!4m6!3m5!1s0x6ad65d0072e7028b:0x2a7dab16beb0f57d!8m2!3d-37.7723625!4d144.9157525!16s%2Fg%2F11yttcj4p5?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className={styles.footerSocialBtn}><IconMapPin /></a>
              </div>
            </div>

            {/* Navigate */}
            <div className={styles.footerLinksCol}>
              <h4 className={styles.footerColTitle}>Navigate</h4>
              {['Home', 'Menu', 'About', 'Visit'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className={styles.footerLink}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }}>
                  {item}
                </a>
              ))}
            </div>

            {/* Hours */}
            <div className={styles.footerLinksCol}>
              <h4 className={styles.footerColTitle}>Hours</h4>
              {hoursData.map((h) => (
                <div key={h.day} className={styles.footerHourRow}>
                  <span className={styles.footerHourDay}>{h.day}</span>
                  <span className={h.closed ? styles.footerHourClosed : styles.footerHourTime}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* Location */}
            <div className={styles.footerLinksCol}>
              <h4 className={styles.footerColTitle}>Location</h4>
              <p className={styles.footerAddress}>217 Union Rd<br />Ascot Vale VIC 3032<br />Australia</p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerCopy}>© 2026 Cafe Ogawa. All rights reserved.</p>
            <span className={styles.footerKanji}>小川</span>
          </div>
        </div>
      </footer>
    </div>
  );
}