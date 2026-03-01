"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [switches, setSwitches] = useState([true, true, false]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const animCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mx.current + "px";
        cursorRef.current.style.top = my.current + "px";
      }
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + "px";
        ringRef.current.style.top = ry.current + "px";
      }
      rafId = requestAnimationFrame(animCursor);
    };
    animCursor();

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    // Scroll reveal
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add("visible"),
              i * 80
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));

    // Hover cursor expand
    const interactives = document.querySelectorAll("a, button, .comp-card, .plan");
    const expand = () => {
      if (cursorRef.current) { cursorRef.current.style.width = "20px"; cursorRef.current.style.height = "20px"; }
      if (ringRef.current) { ringRef.current.style.width = "60px"; ringRef.current.style.height = "60px"; }
    };
    const shrink = () => {
      if (cursorRef.current) { cursorRef.current.style.width = "12px"; cursorRef.current.style.height = "12px"; }
      if (ringRef.current) { ringRef.current.style.width = "40px"; ringRef.current.style.height = "40px"; }
    };
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", expand);
        el.removeEventListener("mouseleave", shrink);
      });
      observer.disconnect();
    };
  }, []);

  const toggleSwitch = (i: number) => {
    setSwitches((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --bg: #060810; --bg2: #0b0f1a; --cyan: #00f5d4; --amber: #f5a623;
          --purple: #7c3aed; --red: #ff3b6b; --white: #f0f2ff;
          --muted: #4a5070; --card: rgba(255,255,255,0.03); --border: rgba(255,255,255,0.07);
        }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--white); font-family: 'Syne', sans-serif; overflow-x: hidden; cursor: none; }
        body::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.03; pointer-events: none; z-index: 9997;
        }
        .cursor {
          width: 12px; height: 12px; background: var(--cyan); border-radius: 50%;
          position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
          transition: transform 0.1s ease, width 0.2s, height 0.2s, background 0.2s;
          transform: translate(-50%, -50%); mix-blend-mode: screen;
        }
        .cursor-ring {
          width: 40px; height: 40px; border: 1px solid rgba(0,245,212,0.4); border-radius: 50%;
          position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9998;
          transition: transform 0.15s ease, width 0.2s, height 0.2s;
          transform: translate(-50%, -50%);
        }
        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 60px; display: flex; align-items: center; justify-content: space-between;
          backdrop-filter: blur(20px); border-bottom: 1px solid var(--border);
          background: rgba(6,8,16,0.7); transition: background 0.3s;
        }
        nav.scrolled { background: rgba(6,8,16,0.95); }
        .logo { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 3px; color: var(--white); }
        .logo span { color: var(--cyan); }
        nav ul { list-style: none; display: flex; gap: 40px; }
        nav ul a { text-decoration: none; color: var(--muted); font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; transition: color 0.2s; }
        nav ul a:hover { color: var(--white); }
        .nav-cta { background: var(--cyan) !important; color: var(--bg) !important; padding: 10px 24px; border-radius: 4px; font-weight: 800 !important; transition: transform 0.15s, box-shadow 0.15s !important; }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 0 20px rgba(0,245,212,0.4); }
        /* HERO */
        .hero {
          min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; padding: 120px 60px 80px; position: relative; overflow: hidden;
        }
        .mesh {
          position: absolute; inset: 0; z-index: 0;
          background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,245,212,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 10% 80%, rgba(124,58,237,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 10%, rgba(245,166,35,0.05) 0%, transparent 50%);
          animation: meshPulse 8s ease-in-out infinite alternate;
        }
        @keyframes meshPulse { from { filter: brightness(1); } to { filter: brightness(1.3); } }
        .grid-bg {
          position: absolute; inset: 0; z-index: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-left { position: relative; z-index: 1; }
        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,245,212,0.08); border: 1px solid rgba(0,245,212,0.2);
          border-radius: 100px; padding: 6px 16px; font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; color: var(--cyan); margin-bottom: 28px;
        }
        .badge-dot { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; animation: blink 2s ease-in-out infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        .hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(64px, 8vw, 110px); line-height: 0.95; letter-spacing: 2px; margin-bottom: 28px; }
        .hero h1 .line2 { display: block; -webkit-text-stroke: 1px rgba(240,242,255,0.4); color: transparent; }
        .hero h1 .accent { color: var(--cyan); }
        .hero-desc { font-size: 16px; line-height: 1.7; color: rgba(240,242,255,0.55); max-width: 440px; margin-bottom: 44px; }
        .hero-actions { display: flex; gap: 16px; align-items: center; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px; background: var(--cyan);
          color: var(--bg); padding: 16px 32px; border-radius: 6px; font-weight: 800;
          font-size: 14px; letter-spacing: 0.5px; text-decoration: none; cursor: none;
          transition: transform 0.15s, box-shadow 0.15s; border: none;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,245,212,0.35); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 10px; color: var(--white);
          padding: 16px 24px; font-weight: 700; font-size: 14px; text-decoration: none;
          border: 1px solid var(--border); border-radius: 6px; cursor: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
        .hero-stats { display: flex; gap: 40px; margin-top: 60px; }
        .stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 42px; color: var(--white); line-height: 1; }
        .stat-val span { color: var(--cyan); }
        .stat-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-top: 4px; }
        .stat-sep { width: 1px; background: var(--border); }
        /* PHONES */
        .hero-right { position: relative; z-index: 1; display: flex; justify-content: center; align-items: center; height: 100%; }
        .phones-scene { position: relative; width: 420px; height: 560px; }
        .phone {
          position: absolute; width: 200px; background: #0f1320; border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.1); overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
        }
        .phone::before {
          content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 70px; height: 22px; background: #060810; border-radius: 0 0 14px 14px; z-index: 10;
        }
        .phone-1 { left: 0; top: 40px; transform: rotate(-8deg); animation: float1 6s ease-in-out infinite; }
        .phone-2 { right: 0; top: 0; transform: rotate(6deg); animation: float2 7s ease-in-out infinite 1s; }
        .phone-3 { left: 50%; top: 160px; transform: translateX(-50%) rotate(-2deg); animation: float3 5s ease-in-out infinite 0.5s; z-index: 3; box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,245,212,0.15); }
        @keyframes float1 { 0%,100%{transform:rotate(-8deg) translateY(0)} 50%{transform:rotate(-8deg) translateY(-14px)} }
        @keyframes float2 { 0%,100%{transform:rotate(6deg) translateY(0)} 50%{transform:rotate(6deg) translateY(-18px)} }
        @keyframes float3 { 0%,100%{transform:translateX(-50%) rotate(-2deg) translateY(0)} 50%{transform:translateX(-50%) rotate(-2deg) translateY(-10px)} }
        .phone-screen { padding: 32px 12px 12px; height: 360px; }
        .ui-header { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding: 0 4px; }
        .ui-avatar { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; }
        .ui-title-block { flex: 1; }
        .ui-name { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.15); margin-bottom: 4px; width: 80px; }
        .ui-sub { height: 6px; border-radius: 4px; background: rgba(255,255,255,0.07); width: 50px; }
        .ui-card { border-radius: 14px; padding: 14px; margin-bottom: 8px; }
        .ui-card-title { height: 7px; border-radius: 4px; width: 70%; margin-bottom: 6px; }
        .ui-card-sub { height: 6px; border-radius: 4px; width: 50%; }
        .ui-card-amount { height: 22px; border-radius: 6px; width: 90px; margin-top: 14px; }
        .ui-row { display: flex; gap: 8px; margin-bottom: 8px; }
        .ui-pill { height: 28px; border-radius: 100px; flex: 1; display: flex; align-items: center; justify-content: center; font-size: 8px; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.5px; }
        .ui-list-item { display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .ui-list-icon { width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0; }
        .ui-list-text { flex: 1; }
        .ui-list-t { height: 6px; border-radius: 4px; width: 90px; margin-bottom: 4px; }
        .ui-list-s { height: 5px; border-radius: 4px; width: 60px; background: rgba(255,255,255,0.07); }
        .ui-list-val { height: 8px; border-radius: 4px; width: 40px; }
        .ui-tabbar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50px;
          background: rgba(15,19,32,0.95); border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-around; padding: 0 8px;
        }
        .ui-tab { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .ui-tab svg { width: 14px; height: 14px; }
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
        .orb-1 { width: 400px; height: 400px; background: rgba(0,245,212,0.06); right: -100px; top: 50%; transform: translateY(-50%); }
        .orb-2 { width: 300px; height: 300px; background: rgba(124,58,237,0.08); left: -50px; bottom: -50px; }
        /* MARQUEE */
        .marquee-section { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 16px 0; overflow: hidden; background: rgba(255,255,255,0.01); }
        .marquee-track { display: flex; animation: marquee 30s linear infinite; width: max-content; }
        .marquee-item { display: flex; align-items: center; gap: 14px; padding: 0 40px; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 3px; color: var(--muted); white-space: nowrap; }
        .marquee-item .dot { color: var(--cyan); font-size: 24px; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        /* SECTIONS */
        .section-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--cyan); margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .section-label::before { content: ''; width: 30px; height: 1px; background: var(--cyan); }
        /* COMPONENTS */
        .components-section { padding: 120px 60px; }
        .components-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 70px; }
        .components-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 6vw, 80px); line-height: 1; letter-spacing: 2px; }
        .components-header h2 em { font-style: normal; -webkit-text-stroke: 1px rgba(240,242,255,0.3); color: transparent; }
        .view-all { display: flex; align-items: center; gap: 8px; color: var(--cyan); text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-bottom: 1px solid rgba(0,245,212,0.3); padding-bottom: 2px; transition: gap 0.2s; cursor: none; }
        .view-all:hover { gap: 14px; }
        .components-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .comp-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 28px; position: relative; overflow: hidden; transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s; cursor: none; }
        .comp-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,245,212,0.04) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s; }
        .comp-card:hover { transform: translateY(-4px); border-color: rgba(0,245,212,0.2); box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,245,212,0.1); }
        .comp-card:hover::after { opacity: 1; }
        .comp-card.featured { grid-column: span 2; border-color: rgba(0,245,212,0.15); background: linear-gradient(135deg, rgba(0,245,212,0.05) 0%, rgba(6,8,16,0.8) 60%); }
        .comp-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; margin-bottom: 20px; }
        .tag-free { background: rgba(0,245,212,0.1); color: var(--cyan); }
        .tag-pro { background: rgba(124,58,237,0.15); color: #a78bfa; }
        .tag-new { background: rgba(245,166,35,0.1); color: var(--amber); }
        .comp-preview { height: 120px; border-radius: 10px; margin-bottom: 16px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); }
        .comp-preview.tall { height: 200px; }
        .comp-name { font-size: 16px; font-weight: 800; margin-bottom: 6px; }
        .comp-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }
        /* DEMO ELEMENTS */
        .demo-btn { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
        .d-btn { padding: 8px 18px; border-radius: 8px; font-size: 11px; font-weight: 700; font-family: 'Syne', sans-serif; letter-spacing: 0.5px; border: none; cursor: none; transition: transform 0.15s; }
        .d-btn:hover { transform: scale(1.05); }
        .d-btn-1 { background: var(--cyan); color: var(--bg); }
        .d-btn-2 { background: rgba(124,58,237,0.8); color: white; }
        .d-btn-3 { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; }
        .demo-input { width: 85%; display: flex; flex-direction: column; gap: 8px; }
        .d-label { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); font-family: 'JetBrains Mono', monospace; margin-bottom: -4px; }
        .d-input { background: #141824; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 14px; font-size: 11px; color: var(--white); font-family: 'Syne', sans-serif; width: 100%; outline: none; transition: border-color 0.2s; }
        .d-input.active { border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(0,245,212,0.1); }
        .demo-toast { width: 85%; display: flex; flex-direction: column; gap: 6px; }
        .d-toast { padding: 10px 14px; border-radius: 10px; display: flex; align-items: center; gap: 10px; font-size: 10px; font-weight: 700; }
        .d-toast-icon { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; flex-shrink: 0; }
        .toast-success { background: rgba(0,245,212,0.1); border: 1px solid rgba(0,245,212,0.2); color: var(--cyan); }
        .toast-error { background: rgba(255,59,107,0.1); border: 1px solid rgba(255,59,107,0.2); color: var(--red); }
        .toast-warn { background: rgba(245,166,35,0.1); border: 1px solid rgba(245,166,35,0.2); color: var(--amber); }
        .demo-badges { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
        .d-badge { padding: 4px 10px; border-radius: 100px; font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; }
        .demo-switches { display: flex; flex-direction: column; gap: 10px; width: 85%; }
        .d-switch-row { display: flex; align-items: center; justify-content: space-between; }
        .d-switch-label { font-size: 11px; color: rgba(255,255,255,0.6); }
        .d-switch { width: 38px; height: 20px; border-radius: 100px; border: none; cursor: none; position: relative; transition: background 0.2s; }
        .d-switch::after { content: ''; position: absolute; top: 3px; width: 14px; height: 14px; border-radius: 50%; background: white; transition: left 0.2s; }
        .d-switch.on { background: var(--cyan); }
        .d-switch.on::after { left: 21px; }
        .d-switch.off { background: rgba(255,255,255,0.1); }
        .d-switch.off::after { left: 3px; }
        .demo-avatars { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .avatar-group { display: flex; }
        .d-ava { width: 34px; height: 34px; border-radius: 50%; border: 2px solid #0b0f1a; margin-left: -8px; font-size: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .d-ava:first-child { margin-left: 0; }
        .ava-count { background: rgba(255,255,255,0.1); color: var(--muted); font-size: 9px; }
        /* HOW IT WORKS */
        .how-section { padding: 120px 60px; background: var(--bg2); border-top: 1px solid var(--border); }
        .how-section h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 6vw, 80px); letter-spacing: 2px; margin-bottom: 80px; max-width: 600px; line-height: 1; }
        .how-section h2 em { font-style: normal; color: var(--cyan); }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .step { background: var(--bg); padding: 50px 40px; position: relative; }
        .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 100px; line-height: 1; color: rgba(255,255,255,0.04); position: absolute; top: 20px; right: 30px; pointer-events: none; }
        .step-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 24px; }
        .step h3 { font-size: 22px; font-weight: 800; margin-bottom: 12px; }
        .step p { font-size: 14px; color: var(--muted); line-height: 1.7; }
        .code-block { background: #0b0f1a; border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-top: 20px; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.8; overflow-x: auto; }
        .code-block .kw { color: #7c3aed; } .code-block .fn { color: var(--cyan); } .code-block .str { color: var(--amber); } .code-block .cm { color: var(--muted); }
        /* PRICING */
        .pricing-section { padding: 120px 60px; }
        .pricing-header { text-align: center; margin-bottom: 80px; }
        .pricing-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 6vw, 80px); letter-spacing: 2px; line-height: 1; margin-bottom: 16px; }
        .pricing-header p { color: var(--muted); font-size: 16px; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1000px; margin: 0 auto; }
        .plan { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 40px 36px; position: relative; transition: transform 0.25s; cursor: none; }
        .plan:hover { transform: translateY(-4px); }
        .plan.popular { border-color: rgba(0,245,212,0.3); background: linear-gradient(135deg, rgba(0,245,212,0.06) 0%, rgba(6,8,16,0.9) 70%); }
        .popular-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--cyan); color: var(--bg); font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; padding: 6px 20px; border-radius: 100px; font-family: 'JetBrains Mono', monospace; white-space: nowrap; }
        .plan-name { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 20px; font-family: 'JetBrains Mono', monospace; }
        .plan-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 8px; }
        .price-cur { font-size: 20px; color: var(--muted); }
        .price-val { font-family: 'Bebas Neue', sans-serif; font-size: 64px; line-height: 1; }
        .price-per { font-size: 13px; color: var(--muted); }
        .plan-desc { font-size: 13px; color: var(--muted); margin-bottom: 32px; line-height: 1.6; }
        .plan-features { list-style: none; margin-bottom: 36px; display: flex; flex-direction: column; gap: 12px; }
        .plan-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; }
        .plan-features li::before { content: '✓'; color: var(--cyan); font-weight: 800; font-size: 12px; margin-top: 2px; flex-shrink: 0; }
        .plan-features li.muted { color: var(--muted); }
        .plan-features li.muted::before { color: var(--muted); content: '—'; }
        .plan-btn { display: block; width: 100%; padding: 14px; border-radius: 8px; text-align: center; font-weight: 800; font-size: 14px; letter-spacing: 0.5px; text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; cursor: none; }
        .plan-btn-outline { border: 1px solid var(--border); color: var(--white); background: transparent; }
        .plan-btn-outline:hover { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.04); }
        .plan-btn-solid { background: var(--cyan); color: var(--bg); border: none; }
        .plan-btn-solid:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,245,212,0.3); }
        /* TESTIMONIALS */
        .testimonials { padding: 120px 60px; background: var(--bg2); border-top: 1px solid var(--border); }
        .testimonials h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 5vw, 70px); letter-spacing: 2px; text-align: center; margin-bottom: 70px; line-height: 1; }
        .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .testi-card { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: 32px; }
        .testi-stars { color: var(--amber); font-size: 13px; margin-bottom: 16px; letter-spacing: 2px; }
        .testi-text { font-size: 14px; line-height: 1.8; color: rgba(240,242,255,0.7); margin-bottom: 24px; }
        .testi-author { display: flex; align-items: center; gap: 12px; }
        .testi-name { font-size: 13px; font-weight: 800; }
        .testi-role { font-size: 11px; color: var(--muted); margin-top: 2px; }
        /* CTA */
        .cta-section { padding: 160px 60px; text-align: center; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; width: 600px; height: 600px; background: radial-gradient(ellipse, rgba(0,245,212,0.08) 0%, transparent 70%); left: 50%; top: 50%; transform: translate(-50%, -50%); pointer-events: none; }
        .cta-section h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(60px, 8vw, 120px); letter-spacing: 2px; line-height: 0.95; margin-bottom: 32px; position: relative; }
        .cta-section p { font-size: 18px; color: var(--muted); max-width: 480px; margin: 0 auto 44px; line-height: 1.7; position: relative; }
        .cta-actions { display: flex; gap: 16px; justify-content: center; position: relative; }
        /* FOOTER */
        footer { border-top: 1px solid var(--border); padding: 60px; display: flex; justify-content: space-between; align-items: center; background: var(--bg2); }
        .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 3px; }
        .footer-logo span { color: var(--cyan); }
        footer p { font-size: 12px; color: var(--muted); }
        .footer-links { display: flex; gap: 32px; }
        .footer-links a { font-size: 12px; color: var(--muted); text-decoration: none; transition: color 0.2s; cursor: none; }
        .footer-links a:hover { color: var(--white); }
        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 900px) {
          nav { padding: 16px 24px; }
          nav ul { display: none; }
          .hero { grid-template-columns: 1fr; padding: 100px 24px 60px; }
          .hero-right { display: none; }
          .components-grid { grid-template-columns: repeat(2, 1fr); }
          .comp-card.featured { grid-column: span 2; }
          .steps, .pricing-grid, .testi-grid { grid-template-columns: 1fr; }
          .components-section, .how-section, .pricing-section, .testimonials, .cta-section { padding: 80px 24px; }
          footer { padding: 40px 24px; flex-direction: column; gap: 24px; text-align: center; }
          .footer-links { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      {/* Cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="logo">Native<span>Blocks</span></div>
        <ul>
          <li><Link href="/components">Components</Link></li>
          <li><Link href="/docs">Docs</Link></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#">Blog</a></li>
          <li><Link href="/sandbox" className="nav-cta">Start Free</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="mesh" />
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="hero-left">
          <div className="badge"><span className="badge-dot" />100+ Components Available</div>
          <h1>
            BUILD<br />
            <span className="line2">MOBILE</span><br />
            <span className="accent">FASTER.</span>
          </h1>
          <p className="hero-desc">
            Production-ready React Native components crafted for speed and beauty.
            Copy, paste, ship. No lock-in, no bloat — just clean, animated components
            your users will love.
          </p>
          <div className="hero-actions">
            <Link href="/sandbox" className="btn-primary">
              Browse Components
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/components" className="btn-ghost">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
              Watch Demo
            </Link>
          </div>
          <div className="hero-stats">
            <div><div className="stat-val">120<span>+</span></div><div className="stat-label">Components</div></div>
            <div className="stat-sep" />
            <div><div className="stat-val">4.2<span>k</span></div><div className="stat-label">Developers</div></div>
            <div className="stat-sep" />
            <div><div className="stat-val">98<span>%</span></div><div className="stat-label">Satisfaction</div></div>
          </div>
        </div>

        <div className="hero-right">
          <div className="phones-scene">
            {/* Phone 1 */}
            <div className="phone phone-1">
              <div className="phone-screen">
                <div className="ui-header">
                  <div className="ui-avatar" style={{ background: "linear-gradient(135deg,#00f5d4,#7c3aed)" }} />
                  <div className="ui-title-block"><div className="ui-name" /><div className="ui-sub" /></div>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,59,107,0.15)", color: "#ff3b6b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>3</div>
                </div>
                <div className="ui-card" style={{ background: "linear-gradient(135deg,rgba(0,245,212,0.12),rgba(124,58,237,0.12))", border: "1px solid rgba(0,245,212,0.15)" }}>
                  <div className="ui-card-title" style={{ background: "rgba(255,255,255,0.2)" }} />
                  <div className="ui-card-sub" style={{ background: "rgba(255,255,255,0.1)" }} />
                  <div className="ui-card-amount" style={{ background: "rgba(0,245,212,0.3)" }} />
                </div>
                <div className="ui-row">
                  <div className="ui-pill" style={{ background: "rgba(0,245,212,0.1)", color: "var(--cyan)", border: "1px solid rgba(0,245,212,0.15)" }}>SEND</div>
                  <div className="ui-pill" style={{ background: "rgba(124,58,237,0.1)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.15)" }}>RECV</div>
                  <div className="ui-pill" style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted)", border: "1px solid var(--border)" }}>TOP UP</div>
                </div>
                <div className="ui-list-item">
                  <div className="ui-list-icon" style={{ background: "rgba(0,245,212,0.1)" }} />
                  <div className="ui-list-text"><div className="ui-list-t" style={{ background: "rgba(255,255,255,0.12)" }} /><div className="ui-list-s" /></div>
                  <div className="ui-list-val" style={{ background: "rgba(0,245,212,0.2)" }} />
                </div>
                <div className="ui-list-item">
                  <div className="ui-list-icon" style={{ background: "rgba(245,166,35,0.1)" }} />
                  <div className="ui-list-text"><div className="ui-list-t" style={{ background: "rgba(255,255,255,0.12)" }} /><div className="ui-list-s" /></div>
                  <div className="ui-list-val" style={{ background: "rgba(255,59,107,0.2)" }} />
                </div>
              </div>
              <PhoneTabBar active={0} />
            </div>

            {/* Phone 2 */}
            <div className="phone phone-2">
              <div className="phone-screen">
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 4px", marginBottom: 6 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg,var(--amber),var(--red))" }} />
                    <div style={{ flex: 1, height: 7, borderRadius: 4, background: "rgba(255,255,255,0.1)" }} />
                    <div style={{ width: 18, height: 18, background: "rgba(255,255,255,0.05)", borderRadius: 6 }} />
                  </div>
                  <div style={{ display: "flex", gap: 8, padding: "0 4px" }}>
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", padding: 2, background: "conic-gradient(var(--cyan),var(--purple),var(--amber),var(--cyan))" }}>
                          <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#141824" }} />
                        </div>
                        <div style={{ height: 5, width: 28, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#141824", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ height: 70, background: "linear-gradient(135deg,rgba(0,245,212,0.12),rgba(124,58,237,0.15))" }} />
                    <div style={{ padding: 10 }}>
                      <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                        <div style={{ height: 14, width: 14, background: "rgba(255,59,107,0.4)", borderRadius: "50%" }} />
                        <div style={{ height: 14, width: 14, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
                        <div style={{ height: 14, width: 14, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
                      </div>
                      <div style={{ height: 6, borderRadius: 4, background: "rgba(255,255,255,0.12)", width: "80%", marginBottom: 4 }} />
                      <div style={{ height: 5, borderRadius: 4, background: "rgba(255,255,255,0.07)", width: "55%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <PhoneTabBar active={0} />
            </div>

            {/* Phone 3 - Center featured */}
            <div className="phone phone-3">
              <div className="phone-screen">
                <div style={{ textAlign: "center", padding: "10px 8px" }}>
                  <div style={{ width: 60, height: 60, borderRadius: 20, background: "linear-gradient(135deg,var(--cyan),var(--purple))", margin: "10px auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>⚡</div>
                  <div style={{ height: 10, borderRadius: 6, background: "rgba(255,255,255,0.15)", width: "70%", margin: "0 auto 8px" }} />
                  <div style={{ height: 7, borderRadius: 4, background: "rgba(255,255,255,0.07)", width: "90%", margin: "0 auto 4px" }} />
                  <div style={{ height: 7, borderRadius: 4, background: "rgba(255,255,255,0.07)", width: "75%", margin: "0 auto 24px" }} />
                  {[1, 2].map((i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                      <div style={{ height: 40, flex: 1, borderRadius: 10, background: "#141824", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: "0 12px" }}>
                        <div style={{ height: 6, borderRadius: 4, background: "rgba(255,255,255,0.08)", width: i === 1 ? "80%" : "60%" }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ height: 40, borderRadius: 10, background: "var(--cyan)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ height: 7, width: 60, borderRadius: 4, background: "rgba(6,8,16,0.4)" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
                    <div style={{ width: 20, height: 4, borderRadius: 2, background: "var(--cyan)" }} />
                    <div style={{ width: 6, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ width: 6, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
                  </div>
                </div>
              </div>
              <PhoneTabBar active={0} />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {["BUTTON", "MODAL", "BOTTOM SHEET", "TOAST", "AVATAR", "OTP INPUT", "DATE PICKER", "TAB BAR", "SKELETON", "SWIPE CARD", "CHART", "ONBOARDING",
            "BUTTON", "MODAL", "BOTTOM SHEET", "TOAST", "AVATAR", "OTP INPUT", "DATE PICKER", "TAB BAR", "SKELETON", "SWIPE CARD", "CHART", "ONBOARDING"
          ].map((item, i) => (
            <div key={i} className="marquee-item">{item}<span className="dot">·</span></div>
          ))}
        </div>
      </div>

      {/* COMPONENTS */}
      <section className="components-section">
        <div className="components-header reveal">
          <div>
            <div className="section-label">Component Library</div>
            <h2>EVERY COMPONENT<br /><em>YOU NEED</em></h2>
          </div>
          <Link href="/components" className="view-all">
            Browse all 120+
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="components-grid">
          {/* Featured: Buttons */}
          <div className="comp-card featured reveal">
            <div className="comp-tag tag-free">Free</div>
            <div className="comp-preview tall">
              <div className="demo-btn">
                <button className="d-btn d-btn-1">Get Started</button>
                <button className="d-btn d-btn-2">Sign Up</button>
                <button className="d-btn d-btn-3">Learn More</button>
              </div>
            </div>
            <div className="comp-name">Button</div>
            <div className="comp-desc">Multiple variants, sizes, loading states, and icon support. Fully accessible with haptic feedback.</div>
          </div>

          {/* Card */}
          <div className="comp-card reveal">
            <div className="comp-tag tag-free">Free</div>
            <div className="comp-preview">
              <div style={{ width: "85%", background: "#141824", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, var(--cyan), var(--purple))" }} />
                  <div><div style={{ fontSize: 11, fontWeight: 700 }}>Alex Johnson</div><div style={{ fontSize: 10, color: "var(--muted)" }}>Product Designer</div></div>
                </div>
                <div style={{ height: 50, background: "linear-gradient(135deg,rgba(0,245,212,0.15),rgba(124,58,237,0.15))", borderRadius: 8 }} />
              </div>
            </div>
            <div className="comp-name">Card</div>
            <div className="comp-desc">Flexible card with shadows, borders, and elevation levels.</div>
          </div>

          {/* Input */}
          <div className="comp-card reveal">
            <div className="comp-tag tag-free">Free</div>
            <div className="comp-preview">
              <div className="demo-input">
                <div className="d-label">Email Address</div>
                <input className="d-input active" type="text" defaultValue="hello@example.com" readOnly />
                <div className="d-label" style={{ marginTop: 4 }}>Password</div>
                <input className="d-input" type="password" defaultValue="••••••••" readOnly />
              </div>
            </div>
            <div className="comp-name">Input Field</div>
            <div className="comp-desc">Animated labels, validation states, secure text entry.</div>
          </div>

          {/* Toast */}
          <div className="comp-card reveal">
            <div className="comp-tag tag-free">Free</div>
            <div className="comp-preview">
              <div className="demo-toast">
                <div className="d-toast toast-success"><div className="d-toast-icon" style={{ background: "rgba(0,245,212,0.2)" }}>✓</div>Payment successful!</div>
                <div className="d-toast toast-error"><div className="d-toast-icon" style={{ background: "rgba(255,59,107,0.2)" }}>✕</div>Connection failed</div>
                <div className="d-toast toast-warn"><div className="d-toast-icon" style={{ background: "rgba(245,166,35,0.2)" }}>!</div>Session expiring</div>
              </div>
            </div>
            <div className="comp-name">Toast</div>
            <div className="comp-desc">Slide-in notifications with auto-dismiss and queuing.</div>
          </div>

          {/* Avatar */}
          <div className="comp-card reveal">
            <div className="comp-tag tag-pro">Pro</div>
            <div className="comp-preview">
              <div className="demo-avatars">
                <div className="avatar-group">
                  {[["#00f5d4","#7c3aed","A"],["#f5a623","#ff3b6b","B"],["#7c3aed","#00f5d4","C"],["#ff3b6b","#f5a623","D"]].map(([a, b, l]) => (
                    <div key={l} className="d-ava" style={{ background: `linear-gradient(135deg,${a},${b})` }}>{l}</div>
                  ))}
                  <div className="d-ava ava-count">+8</div>
                </div>
              </div>
            </div>
            <div className="comp-name">Avatar Group</div>
            <div className="comp-desc">Stacked avatars with overflow count and status rings.</div>
          </div>

          {/* Badge */}
          <div className="comp-card reveal">
            <div className="comp-tag tag-new">New</div>
            <div className="comp-preview">
              <div className="demo-badges">
                {[["Active","rgba(0,245,212,0.1)","var(--cyan)"],["Pending","rgba(245,166,35,0.1)","var(--amber)"],["Error","rgba(255,59,107,0.1)","var(--red)"],["Beta","rgba(124,58,237,0.1)","#a78bfa"],["Draft","rgba(255,255,255,0.06)","var(--muted)"]].map(([label,bg,color])=>(
                  <span key={label} className="d-badge" style={{ background: bg, color }}>{label}</span>
                ))}
              </div>
            </div>
            <div className="comp-name">Badge</div>
            <div className="comp-desc">Status badges with dot indicator and pulse animation.</div>
          </div>

          {/* Switch */}
          <div className="comp-card reveal">
            <div className="comp-tag tag-pro">Pro</div>
            <div className="comp-preview">
              <div className="demo-switches">
                {["Push Notifications", "Dark Mode", "Analytics"].map((label, i) => (
                  <div key={label} className="d-switch-row">
                    <span className="d-switch-label">{label}</span>
                    <button className={`d-switch ${switches[i] ? "on" : "off"}`} onClick={() => toggleSwitch(i)} />
                  </div>
                ))}
              </div>
            </div>
            <div className="comp-name">Toggle Switch</div>
            <div className="comp-desc">Smooth animated toggle with spring physics and haptic feedback.</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-label reveal">How it works</div>
        <h2 className="reveal">THREE STEPS TO <em>SHIP</em><br />FASTER.</h2>
        <div className="steps">
          <div className="step reveal">
            <div className="step-num">01</div>
            <div className="step-icon" style={{ background: "rgba(0,245,212,0.1)" }}>👀</div>
            <h3>Browse & Preview</h3>
            <p>Explore 120+ components with live interactive previews. Filter by category, search by name, and see every variant and state before you commit.</p>
          </div>
          <div className="step reveal">
            <div className="step-num">02</div>
            <div className="step-icon" style={{ background: "rgba(124,58,237,0.1)" }}>⚡</div>
            <h3>Copy or CLI Install</h3>
            <p>One click to copy the component, or use our CLI to drop it straight into your project. No npm installs, no peer dependency hell, no configuration.</p>
            <div className="code-block">
              <span className="cm"># install cli once</span><br />
              <span className="fn">npx</span> nativeblocks <span className="kw">init</span><br /><br />
              <span className="cm"># add any component</span><br />
              <span className="fn">npx</span> nativeblocks <span className="kw">add</span> <span className="str">bottom-sheet</span>
            </div>
          </div>
          <div className="step reveal">
            <div className="step-num">03</div>
            <div className="step-icon" style={{ background: "rgba(245,166,35,0.1)" }}>🚀</div>
            <h3>Customize & Ship</h3>
            <p>Every component is yours — pure TypeScript, zero abstractions. Restyle with your design tokens, extend with your logic, and ship to production.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pricing-section">
        <div className="pricing-header reveal">
          <div className="section-label" style={{ justifyContent: "center" }}>Pricing</div>
          <h2>SIMPLE, HONEST<br />PRICING.</h2>
          <p>Start free. Upgrade when you&apos;re ready. No hidden fees.</p>
        </div>

        <div className="pricing-grid">
          <div className="plan reveal">
            <div className="plan-name">Starter</div>
            <div className="plan-price"><span className="price-cur">$</span><span className="price-val">0</span><span className="price-per">/ forever</span></div>
            <div className="plan-desc">Perfect for side projects and learning. Get 20 essential components, no credit card required.</div>
            <ul className="plan-features">
              <li>20 free components</li><li>Copy-paste code</li><li>TypeScript support</li><li>Community Discord</li>
              <li className="muted">CLI access</li><li className="muted">Premium components</li><li className="muted">Commercial license</li>
            </ul>
            <Link href="/sandbox" className="plan-btn plan-btn-outline">Get Started Free</Link>
          </div>

          <div className="plan popular reveal">
            <div className="popular-badge">MOST POPULAR</div>
            <div className="plan-name">Pro</div>
            <div className="plan-price"><span className="price-cur">$</span><span className="price-val" style={{ color: "var(--cyan)" }}>19</span><span className="price-per">/ month</span></div>
            <div className="plan-desc">For professional developers shipping real products. Everything you need, unlocked.</div>
            <ul className="plan-features">
              <li>All 120+ components</li><li>CLI access</li><li>TypeScript + NativeWind</li>
              <li>Dark mode variants</li><li>Commercial license</li><li>Priority Discord support</li>
              <li className="muted">Team seats</li>
            </ul>
            <Link href="/sandbox" className="plan-btn plan-btn-solid">Start Pro Trial</Link>
          </div>

          <div className="plan reveal">
            <div className="plan-name">Lifetime</div>
            <div className="plan-price"><span className="price-cur">$</span><span className="price-val">299</span><span className="price-per">one-time</span></div>
            <div className="plan-desc">Pay once, use forever. All future components included at no extra cost.</div>
            <ul className="plan-features">
              <li>Everything in Pro</li><li>Lifetime updates</li><li>Future components free</li>
              <li>5 team seats</li><li>Figma kit included</li><li>Private Slack channel</li>
              <li>Early access features</li>
            </ul>
            <Link href="/sandbox" className="plan-btn plan-btn-outline">Buy Lifetime</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2 className="reveal">LOVED BY<br />DEVELOPERS.</h2>
        <div className="testi-grid">
          {[
            { quote: '"NativeBlocks cut our design-to-development time in half. The components are production-quality out of the box — not just demos. Our team adopted it in two days."', name: "Sarah Chen", role: "Lead Engineer, Stripe", grad: "linear-gradient(135deg,var(--cyan),var(--purple))" },
            { quote: '"I\'ve tried every RN component library out there. NativeBlocks is the first one where I didn\'t have to fight the component to make it fit my design. It just works."', name: "Marcus Rivera", role: "Indie Developer, 80k DAU", grad: "linear-gradient(135deg,var(--amber),var(--red))" },
            { quote: '"The Lifetime deal was a no-brainer. Our startup has shipped 3 apps using NativeBlocks. The dark mode support alone is worth the price."', name: "Priya Nair", role: "CTO, Finova", grad: "linear-gradient(135deg,var(--purple),var(--cyan))" },
          ].map((t) => (
            <div key={t.name} className="testi-card reveal">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">{t.quote}</p>
              <div className="testi-author">
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.grad }} />
                <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="reveal">STOP REBUILDING.<br />START SHIPPING.</h2>
        <p className="reveal">Join 4,200+ developers who use NativeBlocks to build beautiful mobile apps in half the time.</p>
        <div className="cta-actions reveal">
          <Link href="/sandbox" className="btn-primary">
            Start for Free
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/docs" className="btn-ghost">View Docs</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Native<span>Blocks</span></div>
        <p>© 2025 NativeBlocks. Built for developers.</p>
        <div className="footer-links">
          <a href="#">Twitter</a><a href="#">GitHub</a><a href="#">Discord</a>
          <Link href="/docs">Docs</Link><a href="#">Privacy</a>
        </div>
      </footer>
    </>
  );
}

function PhoneTabBar({ active }: { active: number }) {
  const icons = [
    <path key="home" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
    <><circle key="s1" cx="11" cy="11" r="8" /><path key="s2" d="m21 21-4.35-4.35" /></>,
    <><rect key="g1" x="3" y="3" width="7" height="7" rx="1" /><rect key="g2" x="14" y="3" width="7" height="7" rx="1" /><rect key="g3" x="3" y="14" width="7" height="7" rx="1" /><rect key="g4" x="14" y="14" width="7" height="7" rx="1" /></>,
    <><path key="u1" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle key="u2" cx="12" cy="7" r="4" /></>,
  ];
  return (
    <div className="ui-tabbar">
      {icons.map((icon, i) => (
        <div key={i} className="ui-tab" style={i === active ? { background: "rgba(0,245,212,0.1)" } : {}}>
          <svg fill="none" stroke={i === active ? "var(--cyan)" : "var(--muted)"} strokeWidth="2" viewBox="0 0 24 24" width="14" height="14">{icon}</svg>
        </div>
      ))}
    </div>
  );
}
