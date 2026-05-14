/**
 * KOL SATMAR — Home Page
 * Design: Royal Dark Elegance — deep navy-black + luminous gold
 * Fonts: Frank Ruhl Libre (Hebrew) + Cinzel (English/numbers) + Lora (body)
 * Logo: Ornate Satmar emblem with palm trees and golden crown
 */

import { useEffect, useRef, useState } from "react";

// Phone number data
const centralNumbers = [
  { number: "605-615-7777", tel: "+16056157777", label: "מרכזי" },
];

const localNumbers = [
  {
    region: "קרית יואל",
    regionEn: "Kiryas Joel",
    numbers: [{ number: "845-537-4000", tel: "+18455374000" }],
  },
  {
    region: "אפסטעיט",
    regionEn: "Upstate",
    numbers: [
      { number: "845-951-1110", tel: "+18459511110" },
      { number: "845-414-8018", tel: "+18454148018" },
    ],
  },
  {
    region: "ברוקלין",
    regionEn: "Brooklyn",
    numbers: [
      { number: "718-689-1010", tel: "+17186891010" },
      { number: "718-887-9288", tel: "+17188879288" },
    ],
  },
  {
    region: "לאנדאן / מאנטשעסטער",
    regionEn: "London / Manchester",
    numbers: [{ number: "+44 330-551-1714", tel: "+443305511714" }],
  },
  {
    region: "ארץ ישראל",
    regionEn: "Eretz Yisroel",
    numbers: [{ number: "072.333.3395", tel: "+972723333395" }],
  },
  {
    region: "אויסטראליע",
    regionEn: "Australia",
    numbers: [{ number: "+61 240183912", tel: "+61240183912" }],
  },
  {
    region: "בראזיל",
    regionEn: "Brazil",
    numbers: [{ number: "+55 31-97614-9605", tel: "+5531976149605" }],
  },
  {
    region: "אנטווערפן",
    regionEn: "Antwerp",
    numbers: [{ number: "+32 480-201-265", tel: "+32480201265" }],
  },
];

// Intersection observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// Gold ornamental divider SVG
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[oklch(0.58_0.13_75/60%)]" />
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2 L20 8 L16 14 L12 8 Z" fill="oklch(0.58 0.13 75)" opacity="0.8"/>
        <circle cx="4" cy="8" r="2" fill="oklch(0.58 0.13 75)" opacity="0.5"/>
        <circle cx="28" cy="8" r="2" fill="oklch(0.58 0.13 75)" opacity="0.5"/>
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[oklch(0.58_0.13_75/60%)]" />
    </div>
  );
}

// Phone number card component
function PhoneCard({
  region,
  regionEn,
  numbers,
  delay = 0,
  inView,
}: {
  region: string;
  regionEn: string;
  numbers: { number: string; tel: string }[];
  delay?: number;
  inView: boolean;
}) {
  return (
    <div
      className="phone-card rounded-lg p-5 flex flex-col items-center gap-3 bg-white/90 backdrop-blur-sm relative overflow-hidden shadow-[0_1px_8px_oklch(0_0_0/6%)]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      }}
    >
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 opacity-20">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M0 0 L32 0 L32 32" fill="oklch(0.65 0.09 78)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-8 h-8 opacity-20">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M32 32 L0 32 L0 0" fill="oklch(0.65 0.09 78)" />
        </svg>
      </div>

      <div className="text-center">
        <h3
          className="font-hebrew text-lg font-bold text-gold leading-tight"
          dir="rtl"
        >
          {region}
        </h3>
        <p className="font-cinzel text-xs text-[oklch(0.55_0.05_78)] tracking-widest uppercase mt-0.5">
          {regionEn}
        </p>
      </div>

      <div className="gold-divider w-full" />

      <div className="flex flex-col items-center gap-2 w-full">
        {numbers.map((n) => (
          <a
            key={n.tel}
            href={`tel:${n.tel}`}
            className="font-cinzel text-base font-semibold text-[oklch(0.48_0.09_78)] hover:text-[oklch(0.38_0.09_78)] transition-colors duration-150 tracking-wider hover:scale-105 active:scale-95 transition-transform"
            style={{ direction: "ltr", display: "block" }}
          >
            {n.number}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const { ref: numbersRef, inView: numbersInView } = useInView(0.05);
  const { ref: listenRef, inView: listenInView } = useInView(0.3);
  const { ref: updatesRef, inView: updatesInView } = useInView(0.3);

  useEffect(() => {
    // Trigger hero animation on mount
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "oklch(0.99 0.006 80)",
        backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/96842623/NgsyRHxn8VbGTvVQUBAgFa/hero-bg-koGQpzHHLTVdkYrCNLNesK.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for readability */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(1.0 0.003 80 / 96%) 0%, oklch(1.0 0.003 80 / 93%) 40%, oklch(0.99 0.005 80 / 90%) 70%, oklch(0.99 0.006 80 / 92%) 100%)",
        }}
      />

      {/* ===== HERO SECTION ===== */}
      <header
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 py-16 text-center"
      >
        {/* Emblem */}
        <div
          className="emblem-glow mb-4 md:mb-6"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "scale(1)" : "scale(0.92)",
            transition: "opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <img
            src="/manus-storage/kol-satmar-logo_39731f91.png"
            alt="קול סאטמאר סימבאל"
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] max-w-full"
            style={{ filter: "drop-shadow(0 0 20px oklch(0.65 0.09 78 / 30%))" }}
          />
        </div>

        {/* Central phone number — big CTA */}
        <div
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.23,1,0.32,1) 600ms, transform 0.8s cubic-bezier(0.23,1,0.32,1) 600ms",
          }}
        >
          <div className="mb-2">
          <span
            className="font-hebrew text-sm text-[oklch(0.52_0.07_78)]"
            dir="rtl"
          >
            צענטראלע נומער
          </span>
          </div>
          <a
            href="tel:+16056157777"
            className="btn-gold inline-block font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest px-8 py-4 rounded-lg"
            style={{ direction: "ltr" }}
          >
            605-615-7777
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: heroVisible ? 0.5 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        >
          <div             className="flex flex-col items-center gap-1 text-[oklch(0.55_0.07_78)]">
            <span className="font-hebrew text-xs" dir="rtl">דריקט ארונטער</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce">
              <path d="M10 4 L10 16 M5 11 L10 16 L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </header>

      {/* ===== LOCAL NUMBERS SECTION ===== */}
      <section
        ref={numbersRef}
        className="relative z-10 py-16 px-4"
        style={{
          background: "oklch(0.97 0.008 80 / 85%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <h2
              className="section-title font-hebrew text-3xl sm:text-4xl font-bold mb-3"
              dir="rtl"
            >
              לאקאלע נומערן
            </h2>
            <p             className="font-cinzel text-xs tracking-[0.25em] uppercase text-[oklch(0.52_0.05_78)]">
              Local Numbers Worldwide
            </p>
            <GoldDivider />
          </div>

          {/* Grid of phone cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {localNumbers.map((loc, i) => (
              <PhoneCard
                key={loc.region}
                region={loc.region}
                regionEn={loc.regionEn}
                numbers={loc.numbers}
                delay={i * 70}
                inView={numbersInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== LISTEN ONLINE SECTION ===== */}
      <section
        ref={listenRef}
        className="relative z-10 py-14 px-4"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            style={{
              opacity: listenInView ? 1 : 0,
              transform: listenInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <div className="mb-6">
              <div className="gold-divider max-w-xs mx-auto mb-6" />
              <h2
                className="font-hebrew text-2xl sm:text-3xl font-bold text-gold mb-2"
                dir="rtl"
              >
                הערט קול סאטמאר אנליין
              </h2>
              <p             className="font-cinzel text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.05_78)]">
                Listen to Kol Satmar Online
              </p>
            </div>

            <a
              href="https://portal.voitex.com/publiclibrary/viewLib/Kol-Satmar/5f06226934328"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-3 font-cinzel text-base font-bold px-8 py-4 rounded-lg"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 6.5 L14 10 L8 13.5 Z" fill="currentColor"/>
              </svg>
              <span dir="rtl" className="font-hebrew text-lg">דריקט דא צו הערן</span>
            </a>

            <div className="gold-divider max-w-xs mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* ===== UPDATES SECTION ===== */}
      <section
        ref={updatesRef}
        className="relative z-10 py-14 px-4"
        style={{
          background: "oklch(0.97 0.008 80 / 85%)",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            style={{
              opacity: updatesInView ? 1 : 0,
              transform: updatesInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <h2
              className="section-title font-hebrew text-2xl sm:text-3xl font-bold mb-3"
              dir="rtl"
            >
              אפדעיטס
            </h2>
            <p             className="font-cinzel text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.05_78)] mb-6">
              Latest Updates
            </p>
            <GoldDivider />
            <div className="mt-6">
              <a
                href="https://kolsatmar.org/#updates"
                className="inline-block font-hebrew text-lg text-[oklch(0.48_0.09_78)] hover:text-[oklch(0.38_0.09_78)] transition-colors duration-200 border border-[oklch(0.65_0.09_78/35%)] hover:border-[oklch(0.65_0.09_78/65%)] px-6 py-3 rounded-lg bg-white/70 hover:bg-white/90"
                dir="rtl"
              >
                דריקט דא צו זען די לעצטע אפדעיטס ←
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="relative z-10 py-10 px-4 border-t"
        style={{ borderColor: "oklch(0.65 0.09 78 / 20%)", background: "oklch(0.99 0.006 80 / 95%)" }}
      >
        <div className="max-w-5xl mx-auto">

          {/* Top row: logo center + contact on sides */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">

            {/* Contact Left */}
            <div className="flex flex-col items-center md:items-start gap-2 flex-1">
              <h4 className="font-cinzel text-sm font-bold text-gold mb-1 tracking-wider">Contact Us</h4>
              <a
                href="mailto:support@kolsatmar.org"
                  className="font-lora text-sm text-[oklch(0.42_0.04_60)] hover:text-[oklch(0.48_0.09_78)] transition-colors"
              >
                support@kolsatmar.org
              </a>
              <a
                href="tel:18454442738"
                  className="font-cinzel text-sm text-[oklch(0.42_0.04_60)] hover:text-[oklch(0.48_0.09_78)] transition-colors tracking-wider"
              >
                1-845-444-2738
              </a>
              <p className="font-lora text-xs text-[oklch(0.58_0.025_60)] mt-1">
                Operated by Lipa Goldberger
              </p>
            </div>

            {/* Logo center */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              <img
                src="/manus-storage/kol-satmar-logo_39731f91.png"
                alt="קול סאטמאר"
                className="w-36 opacity-75"
              />
            </div>

            {/* Privacy Right */}
            <div className="flex flex-col items-center md:items-end gap-2 flex-1">
              <h4 className="font-cinzel text-sm font-bold text-gold mb-1 tracking-wider">Privacy Policy</h4>
              <p className="font-lora text-xs text-[oklch(0.52_0.025_60)] leading-relaxed text-center md:text-right max-w-xs">
                No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties.
              </p>
            </div>
          </div>

          {/* Divider + copyright */}
          <div className="gold-divider mb-5" />
          <div className="text-center">
            <p className="font-cinzel text-xs text-[oklch(0.50_0.025_60)] tracking-wider">
              © 2026 קול סאטמאר · Kol Satmar · All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
