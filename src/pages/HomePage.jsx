// ═══════════════════════════════════════════════════════════════
//  VaultX — Premium Video Content Platform
//  HomePage.jsx  |  Production Ready  |  Connect to your backend
// ═══════════════════════════════════════════════════════════════
//  Font Awesome 6 must be loaded globally:
//    npm install @fortawesome/fontawesome-free
//    then in index.js → import '@fortawesome/fontawesome-free/css/all.min.css';
//  Google Fonts (Bebas Neue + Sora) loaded via @import in STYLES below.
// ═══════════════════════════════════════════════════════════════

import { useNavigate } from 'react-router';
import ProfilePage from './ProfilePage';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import posterImage from '../assets/IMG-20260423-WA0006.jpg';
import HeroVideo from '../assets/videos/VID-20260423-WA0007.mp4';
import HeroVideoBack from '../assets/videos/VID-20260423-WA0007.webm';

/* ════════════════════════════════════════════════════════════
   GLOBAL STYLES — injected once into <head>
════════════════════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700&display=swap');

  :root {
    --c-bg:         #070707;
    --c-surface:    #0d0d0d;
    --c-surface2:   #131313;
    --c-red:        #e8192c;
    --c-red-dk:     #8b0000;
    --c-red-glow:   rgba(232,25,44,.22);
    --c-glass:      rgba(255,255,255,.035);
    --c-glass-bd:   rgba(255,255,255,.07);
    --c-glass-hov:  rgba(255,255,255,.065);
    --c-text:       #f1f1f1;
    --c-text2:      #888;
    --c-text3:      #444;
    --c-gold:       #d4a843;
    --c-green:      #00c97a;
    --font-d: 'Bebas Neue', sans-serif;
    --font-b: 'Sora', sans-serif;
    --ease:   cubic-bezier(.4,0,.2,1);
    --r: 14px;
    --sh-red: 0 0 60px rgba(232,25,44,.12);
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:var(--font-b); background:var(--c-bg); color:var(--c-text); min-height:100vh; overflow-x:hidden; }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:var(--c-bg); }
  ::-webkit-scrollbar-thumb { background:var(--c-red); border-radius:3px; }
  button { cursor:pointer; font-family:var(--font-b); }
  img { display:block; }

  /* ── Keyframes ─────────────────────────────────────────── */
  @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes slideD   { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulseRed { 0%,100%{box-shadow:0 0 0 0 rgba(232,25,44,.45)} 50%{box-shadow:0 0 0 10px rgba(232,25,44,0)} }
  @keyframes toastIn  { from{opacity:0;transform:translateX(110%)} to{opacity:1;transform:translateX(0)} }
  @keyframes toastOut { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(110%)} }
  @keyframes orb1     { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.1)} 66%{transform:translate(-40px,30px) scale(.95)} }
  @keyframes orb2     { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-80px,50px) scale(1.08)} 66%{transform:translate(50px,-60px) scale(.92)} }
  @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes bellRing { 0%,100%{transform:rotate(0)} 15%,45%{transform:rotate(-14deg)} 30%,60%{transform:rotate(14deg)} }

  /* ── Utilities ──────────────────────────────────────────── */
  .glass { background:var(--c-glass); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid var(--c-glass-bd); }

  .btn { display:inline-flex; align-items:center; gap:8px; border:none; border-radius:10px; font-weight:600; font-size:14px; padding:11px 26px; transition:all .28s var(--ease); letter-spacing:.3px; }
  .btn-red  { background:linear-gradient(135deg,var(--c-red),var(--c-red-dk)); color:#fff; }
  .btn-red:hover  { transform:translateY(-2px); box-shadow:0 10px 30px rgba(232,25,44,.42); }
  .btn-red:active { transform:translateY(0); }
  .btn-out  { background:transparent; color:var(--c-text); border:1px solid var(--c-glass-bd); }
  .btn-out:hover { border-color:var(--c-red); color:var(--c-red); background:rgba(232,25,44,.05); }

  .inp { width:100%; background:rgba(255,255,255,.04); border:1px solid var(--c-glass-bd); border-radius:10px; padding:12px 16px; color:var(--c-text); font-size:14px; font-family:var(--font-b); outline:none; transition:all .25s var(--ease); }
  .inp:focus { border-color:var(--c-red); background:rgba(232,25,44,.04); box-shadow:0 0 0 3px rgba(232,25,44,.1); }
  .inp::placeholder { color:var(--c-text3); }
  .lbl { display:block; font-size:11px; font-weight:700; color:var(--c-text2); margin-bottom:6px; text-transform:uppercase; letter-spacing:.6px; }

  .sh { font-family:var(--font-d); letter-spacing:2px; line-height:1; }
  .grad-w  { background:linear-gradient(135deg,#fff 0%,#999 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .grad-r  { background:linear-gradient(135deg,var(--c-red),#ff6b6b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .divider { height:1px; background:linear-gradient(90deg,transparent,var(--c-red),transparent); opacity:.25; margin:72px 0; }

  .badge { display:inline-flex; align-items:center; gap:4px; padding:3px 9px; border-radius:6px; font-size:10px; font-weight:700; letter-spacing:.6px; text-transform:uppercase; }
  .badge-new  { background:rgba(232,25,44,.12); color:var(--c-red); border:1px solid rgba(232,25,44,.25); animation:pulseRed 2.5s infinite; }
  .badge-prem { background:rgba(212,168,67,.1); color:var(--c-gold); border:1px solid rgba(212,168,67,.2); }
  .badge-free { background:rgba(0,201,122,.1); color:var(--c-green); border:1px solid rgba(0,201,122,.2); }

  /* ── Toast system ───────────────────────────────────────── */
  .toast-wrap { position:fixed; bottom:24px; right:24px; z-index:9999; display:flex; flex-direction:column; gap:10px; pointer-events:none; }
  .toast { display:flex; align-items:flex-start; gap:12px; background:rgba(10,10,10,.97); backdrop-filter:blur(20px); border:1px solid var(--c-glass-bd); border-radius:12px; padding:14px 18px; min-width:280px; max-width:360px; animation:toastIn .3s var(--ease); box-shadow:0 20px 60px rgba(0,0,0,.6); pointer-events:all; }
  .toast.exit { animation:toastOut .3s var(--ease) forwards; }
  .t-ico { width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; flex-shrink:0; margin-top:1px; }
  .t-s .t-ico { background:rgba(0,201,122,.15); color:var(--c-green); border:1px solid rgba(0,201,122,.2); }
  .t-e .t-ico { background:rgba(232,25,44,.15); color:var(--c-red); border:1px solid rgba(232,25,44,.2); }
  .t-i .t-ico { background:rgba(100,149,237,.15); color:#6495ed; border:1px solid rgba(100,149,237,.2); }
  .t-w .t-ico { background:rgba(255,165,0,.15); color:orange; border:1px solid rgba(255,165,0,.2); }

  /* ── Navbar ─────────────────────────────────────────────── */
  #vx-nav { position:fixed; top:0; left:0; right:0; z-index:800; height:68px; display:flex; align-items:center; justify-content:space-between; padding:0 clamp(16px,4vw,56px); transition:all .3s var(--ease); }
  #vx-nav.scrolled { background:rgba(7,7,7,.92); backdrop-filter:blur(24px); border-bottom:1px solid var(--c-glass-bd); }
  .nav-logo { font-family:var(--font-d); font-size:28px; letter-spacing:4px; }
  .nav-logo span { color:var(--c-red); }
  .nav-links { display:flex; align-items:center; gap:4px; }
  .nav-lnk { padding:8px 15px; border-radius:8px; font-size:13px; font-weight:500; color:var(--c-text2); background:none; border:none; transition:all .2s; }
  .nav-lnk:hover { color:var(--c-text); background:var(--c-glass-hov); }
  .nav-right { display:flex; align-items:center; gap:12px; }
  .nav-bell { width:36px; height:36px; border-radius:9px; background:var(--c-glass); border:1px solid var(--c-glass-bd); color:var(--c-text2); display:flex; align-items:center; justify-content:center; font-size:14px; transition:all .25s; position:relative; }
  .nav-bell:hover { color:var(--c-text); border-color:rgba(232,25,44,.3); }
  .nav-bell.ring { animation:bellRing .8s ease; }
  .notif-dot { position:absolute; top:6px; right:7px; width:7px; height:7px; background:var(--c-red); border-radius:50%; border:2px solid var(--c-bg); }
  .avatar-btn { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,var(--c-red),var(--c-red-dk)); border:2px solid rgba(232,25,44,.35); display:flex; align-items:center; justify-content:center; color:#fff; font-size:12px; font-weight:700; transition:all .25s; position:relative; }
  .avatar-btn:hover { box-shadow:0 0 0 4px rgba(232,25,44,.2); transform:scale(1.05); }
  .pdrop { position:absolute; top:calc(100% + 10px); right:0; background:rgba(9,9,9,.98); backdrop-filter:blur(24px); border:1px solid var(--c-glass-bd); border-radius:16px; min-width:210px; overflow:hidden; animation:slideD .2s var(--ease); box-shadow:0 24px 80px rgba(0,0,0,.75),var(--sh-red); }
  .pdrop-hd { padding:16px 18px; border-bottom:1px solid var(--c-glass-bd); }
  .pdrop-item { display:flex; align-items:center; gap:10px; padding:12px 18px; width:100%; background:none; border:none; color:var(--c-text2); font-size:13px; font-weight:500; transition:all .2s; text-align:left; font-family:var(--font-b); }
  .pdrop-item:hover { background:var(--c-glass-hov); color:var(--c-text); }
  .pdrop-item.red { color:var(--c-red); }
  .pdrop-item.red:hover { background:rgba(232,25,44,.08); }

  /* ── Hero ───────────────────────────────────────────────── */
  #vx-hero { position:relative; min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; padding:100px clamp(16px,7vw,100px) 60px; text-align:center; }
  .orb { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; }
  .orb-1 { width:600px; height:600px; background:rgba(232,25,44,.11); top:-200px; left:-200px; animation:orb1 14s ease-in-out infinite; }
  .orb-2 { width:500px; height:500px; background:rgba(139,0,0,.08); bottom:-100px; right:-100px; animation:orb2 17s ease-in-out infinite; }
  .orb-3 { width:300px; height:300px; background:rgba(232,25,44,.06); top:40%; left:60%; animation:orb1 20s ease-in-out infinite reverse; }
  .hero-ey { font-size:11px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:var(--c-red); margin-bottom:20px; display:flex; align-items:center; gap:12px; justify-content:center; animation:fadeUp .6s .1s var(--ease) both; }
  .hero-ey::before,.hero-ey::after { content:''; width:28px; height:1px; background:var(--c-red); opacity:.5; }
  .hero-title { font-family:var(--font-d); font-size:clamp(56px,9vw,112px); letter-spacing:3px; line-height:.94; margin-bottom:24px; animation:fadeUp .6s .25s var(--ease) both; }
  .hero-sub { font-size:clamp(15px,2vw,18px); color:var(--c-text2); max-width:560px; line-height:1.75; margin:0 auto 40px; font-weight:300; animation:fadeUp .6s .4s var(--ease) both; }
  .hero-cta { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; animation:fadeUp .6s .55s var(--ease) both; }
  .hero-trust { margin-top:48px; display:flex; align-items:center; gap:16px; justify-content:center; flex-wrap:wrap; font-size:12px; color:var(--c-text3); animation:fadeUp .6s .7s var(--ease) both; }
  .trust-item { display:flex; align-items:center; gap:7px; }
  .trust-item i { color:var(--c-red); }

  /* ── Ticker ─────────────────────────────────────────────── */
  .ticker { overflow:hidden; border-top:1px solid var(--c-glass-bd); border-bottom:1px solid var(--c-glass-bd); background:var(--c-glass); padding:13px 0; }
  .ticker-inner { display:flex; gap:64px; width:max-content; animation:marquee 28s linear infinite; }
  .ticker-item { display:flex; align-items:center; gap:10px; font-size:11px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:var(--c-text3); white-space:nowrap; }
  .ticker-item i { color:var(--c-red); font-size:9px; }

  /* ── Stats ──────────────────────────────────────────────── */
  .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
  @media(max-width:768px) { .stats-grid { grid-template-columns:repeat(2,1fr); } }
  @media(max-width:480px) { .stats-grid { grid-template-columns:1fr; } }
  .stat-card { background:var(--c-glass); backdrop-filter:blur(20px); border:1px solid var(--c-glass-bd); border-radius:var(--r); padding:28px 22px; text-align:center; transition:all .3s var(--ease); animation:fadeUp .6s var(--ease) both; }
  .stat-card:hover { border-color:rgba(232,25,44,.25); transform:translateY(-4px); box-shadow:var(--sh-red); }
  .stat-num { font-family:var(--font-d); font-size:44px; letter-spacing:2px; background:linear-gradient(135deg,var(--c-red),#ff6b6b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1; margin-bottom:6px; }
  .stat-lbl { font-size:12px; font-weight:600; color:var(--c-text2); letter-spacing:.5px; text-transform:uppercase; }

  /* ── Toolbar ─────────────────────────────────────────────── */
  .toolbar { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:28px; }
  .search-wrap { position:relative; flex:1; min-width:200px; }
  .search-wrap i { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--c-text3); font-size:13px; pointer-events:none; }
  .search-wrap input { padding-left:40px; }
  .sort-sel { background:var(--c-glass); border:1px solid var(--c-glass-bd); border-radius:10px; padding:11px 14px; color:var(--c-text2); font-family:var(--font-b); font-size:13px; outline:none; cursor:pointer; transition:all .25s; }
  .sort-sel:focus { border-color:var(--c-red); color:var(--c-text); }
  .cat-scroll { display:flex; gap:8px; overflow-x:auto; padding-bottom:4px; scrollbar-width:none; margin-bottom:28px; }
  .cat-scroll::-webkit-scrollbar { display:none; }
  .cat-pill { flex-shrink:0; padding:8px 20px; border-radius:50px; font-size:13px; font-weight:500; cursor:pointer; border:1px solid var(--c-glass-bd); background:var(--c-glass); color:var(--c-text2); transition:all .25s var(--ease); white-space:nowrap; }
  .cat-pill:hover { border-color:var(--c-red); color:var(--c-text); }
  .cat-pill.active { background:var(--c-red); border-color:var(--c-red); color:#fff; box-shadow:0 4px 20px rgba(232,25,44,.3); }

  /*********************************/

  ====================================== CUSTOM STYLES  ==================================

  .custom-button-1:hover { border-color: var(--c-red); }

  /* ── Content Grid ───────────────────────────────────────── */
  .c-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px; }
  @media(max-width:480px) { .c-grid { grid-template-columns:1fr; } }

  /* ── Content Card ───────────────────────────────────────── */
  .cc { position:relative; border-radius:var(--r); overflow:hidden; cursor:pointer; background:var(--c-glass); backdrop-filter:blur(20px); border:1px solid var(--c-glass-bd); transition:transform .3s var(--ease),box-shadow .3s var(--ease),border-color .3s; animation:fadeUp .5s var(--ease) both; }
  .cc:hover { transform:translateY(-6px); box-shadow:0 24px 80px rgba(0,0,0,.5),var(--sh-red); border-color:rgba(232,25,44,.25); }
  .cc-thumb { position:relative; overflow:hidden; aspect-ratio:16/9; }
  .cc-thumb img { width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
  .cc:hover .cc-thumb img { transform:scale(1.07); }
  .cc-ov { position:absolute; inset:0; opacity:0; transition:opacity .3s; background:linear-gradient(135deg,rgba(232,25,44,.2) 0%,rgba(0,0,0,.45) 100%); display:flex; align-items:center; justify-content:center; }
  .cc:hover .cc-ov { opacity:1; }
  .cc-play { width:54px; height:54px; border-radius:50%; background:rgba(232,25,44,.92); display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; box-shadow:0 0 40px rgba(232,25,44,.6); padding-left:4px; transition:transform .25s; }
  .cc:hover .cc-play { transform:scale(1.1); }
  .cc-lock-ov { position:absolute; inset:0; background:rgba(0,0,0,.65); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; opacity:0; transition:opacity .3s; z-index:3; }
  .cc:hover .cc-lock-ov { opacity:1; }
  .cc-lock-ov i { font-size:24px; color:rgba(255,255,255,.75); }
  .cc-lock-ov span { font-size:11px; font-weight:600; letter-spacing:.8px; color:rgba(255,255,255,.55); text-transform:uppercase; }
  .cc-dur { position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,.8); backdrop-filter:blur(4px); border-radius:6px; padding:3px 8px; font-size:11px; font-weight:600; color:#fff; z-index:5; }
  .cc-wl { position:absolute; top:10px; right:10px; width:32px; height:32px; border-radius:8px; background:rgba(0,0,0,.75); backdrop-filter:blur(8px); border:1px solid var(--c-glass-bd); display:flex; align-items:center; justify-content:center; color:var(--c-text3); font-size:13px; transition:all .25s; z-index:10; }
  .cc-wl:hover,.cc-wl.on { color:var(--c-red); border-color:rgba(232,25,44,.3); }
  .cc-body { padding:18px; }
  .cc-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:9px; }
  .cc-cat { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.8px; color:var(--c-red); }
  .cc-title { font-size:16px; font-weight:700; margin-bottom:6px; line-height:1.35; }
  .cc-desc { font-size:13px; color:var(--c-text2); line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin-bottom:14px; }
  .cc-foot { display:flex; align-items:center; justify-content:space-between; }
  .cc-price { font-family:var(--font-d); font-size:22px; letter-spacing:1px; }
  .cc-price.free { color:var(--c-green); }
  .cc-rating { display:flex; align-items:center; gap:4px; font-size:12px; color:var(--c-text2); }
  .cc-rating i { color:var(--c-gold); font-size:11px; }
  .cc-by { font-size:12px; color:var(--c-text3); margin-top:8px; }
  .prog-bar { height:3px; background:rgba(255,255,255,.08); border-radius:2px; overflow:hidden; margin-top:13px; }
  .prog-fill { height:100%; background:linear-gradient(90deg,var(--c-red),#ff8080); border-radius:2px; }
  .prog-lbl { font-size:10px; color:var(--c-text3); margin-top:5px; }

  /* ── Modal ──────────────────────────────────────────────── */
  .modal-bd { position:fixed; inset:0; background:rgba(0,0,0,.84); backdrop-filter:blur(10px); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeIn .2s var(--ease); }
  .modal { background:rgba(9,9,9,.97); backdrop-filter:blur(30px); border:1px solid rgba(232,25,44,.15); border-radius:22px; width:100%; max-width:640px; max-height:90vh; overflow-y:auto; animation:slideD .3s var(--ease); box-shadow:0 0 100px rgba(232,25,44,.08),0 40px 120px rgba(0,0,0,.85); }
  .modal::-webkit-scrollbar { width:2px; }
  .modal-hdr { display:flex; align-items:center; justify-content:space-between; padding:24px 28px; border-bottom:1px solid var(--c-glass-bd); }
  .modal-ttl { font-family:var(--font-d); font-size:26px; letter-spacing:2px; }
  .modal-close { width:34px; height:34px; border-radius:8px; background:var(--c-glass); border:1px solid var(--c-glass-bd); color:var(--c-text2); display:flex; align-items:center; justify-content:center; font-size:14px; transition:all .2s; }
  .modal-close:hover { background:rgba(232,25,44,.1); color:var(--c-red); border-color:rgba(232,25,44,.25); }
  .modal-body { padding:26px 28px; }

  /* ── Payment tabs ───────────────────────────────────────── */
  .pay-tabs { display:flex; gap:6px; margin-bottom:24px; background:var(--c-glass); border:1px solid var(--c-glass-bd); border-radius:12px; padding:5px; }
  .pay-tab { flex:1; padding:10px 6px; border-radius:8px; border:none; background:transparent; color:var(--c-text2); font-size:11px; font-weight:600; font-family:var(--font-b); letter-spacing:.3px; transition:all .25s; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:5px; }
  .pay-tab i { font-size:17px; }
  .pay-tab.active { background:linear-gradient(135deg,var(--c-red),var(--c-red-dk)); color:#fff; box-shadow:0 4px 16px rgba(232,25,44,.3); }
  .pay-tab:not(.active):hover { background:var(--c-glass-hov); color:var(--c-text); }

  /* ── Upload zone ────────────────────────────────────────── */
  .upload-z { border:2px dashed var(--c-glass-bd); border-radius:12px; padding:36px 24px; text-align:center; cursor:pointer; transition:all .25s; }
  .upload-z:hover,.upload-z.drag { border-color:var(--c-red); background:rgba(232,25,44,.04); }
  .upload-z i { font-size:32px; color:var(--c-text3); margin-bottom:12px; display:block; }
  .upload-preview { max-width:100%; border-radius:8px; margin-top:14px; max-height:180px; object-fit:cover; width:100%; }

  /* ── Auth modal toggle ──────────────────────────────────── */
  .auth-tog { display:flex; background:var(--c-glass); border:1px solid var(--c-glass-bd); border-radius:10px; padding:4px; margin-bottom:24px; }
  .auth-tog button { flex:1; padding:9px; border-radius:8px; border:none; background:transparent; color:var(--c-text2); font-size:13px; font-weight:600; font-family:var(--font-b); transition:all .25s; cursor:pointer; }
  .auth-tog button.active { background:linear-gradient(135deg,var(--c-red),var(--c-red-dk)); color:#fff; }

  /* ── Video player ───────────────────────────────────────── */
  .vid-player { aspect-ratio:16/9; background:#000; border-radius:12px; overflow:hidden; position:relative; margin-bottom:20px; }
  .vid-player img { width:100%; height:100%; object-fit:cover; }
  .vid-player-ov { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); }
  .big-play { width:72px; height:72px; border-radius:50%; background:linear-gradient(135deg,var(--c-red),var(--c-red-dk)); display:flex; align-items:center; justify-content:center; color:#fff; font-size:26px; box-shadow:0 0 60px rgba(232,25,44,.55); cursor:pointer; transition:all .25s; padding-left:5px; }
  .big-play:hover { transform:scale(1.09); box-shadow:0 0 80px rgba(232,25,44,.75); }
  .vid-locked { background:rgba(232,25,44,.04); border:1px solid rgba(232,25,44,.12); border-radius:16px; padding:48px 24px; text-align:center; }

  /* ── Lesson list ────────────────────────────────────────── */
  .lesson-item { display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:10px; background:var(--c-glass); border:1px solid var(--c-glass-bd); margin-bottom:8px; transition:all .2s; cursor:pointer; }
  .lesson-item:hover { border-color:rgba(232,25,44,.2); background:var(--c-glass-hov); }
  .lesson-num { width:28px; height:28px; border-radius:7px; background:rgba(232,25,44,.1); border:1px solid rgba(232,25,44,.2); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:var(--c-red); flex-shrink:0; }
  .lesson-lock { width:28px; height:28px; border-radius:7px; background:rgba(255,255,255,.04); display:flex; align-items:center; justify-content:center; font-size:11px; color:var(--c-text3); flex-shrink:0; }

  /* ── Testimonials ───────────────────────────────────────── */
  .test-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; }
  .test-card { background:var(--c-glass); backdrop-filter:blur(20px); border:1px solid var(--c-glass-bd); border-radius:var(--r); padding:26px; transition:all .3s var(--ease); animation:fadeUp .6s var(--ease) both; }
  .test-card:hover { border-color:rgba(232,25,44,.2); transform:translateY(-4px); }
  .test-stars { display:flex; gap:3px; margin-bottom:14px; }
  .test-stars i { color:var(--c-gold); font-size:12px; }
  .test-txt { font-size:13px; color:var(--c-text2); line-height:1.75; margin-bottom:18px; font-style:italic; }
  .test-author { display:flex; align-items:center; gap:12px; }
  .test-av { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,var(--c-red-dk),#222); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#fff; flex-shrink:0; }

  /* ── CTA Banner ─────────────────────────────────────────── */
  #vx-cta { position:relative; border-radius:22px; overflow:hidden; background:linear-gradient(135deg,rgba(139,0,0,.28) 0%,rgba(232,25,44,.1) 50%,rgba(7,7,7,1) 100%); border:1px solid rgba(232,25,44,.2); padding:clamp(40px,6vw,80px) clamp(24px,6vw,80px); display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; }
  #vx-cta::before { content:''; position:absolute; inset:0; opacity:.4; background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e8192c' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E"); pointer-events:none; }

  /* ── Footer ─────────────────────────────────────────────── */
  #vx-footer { border-top:1px solid var(--c-glass-bd); padding:clamp(40px,6vw,72px) clamp(16px,5vw,80px) 32px; }
  .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:40px; margin-bottom:48px; }
  @media(max-width:768px) { .footer-grid { grid-template-columns:1fr 1fr; } .nav-links { display:none; } }
  @media(max-width:480px) { .footer-grid { grid-template-columns:1fr; } }
  .f-logo { font-family:var(--font-d); font-size:24px; letter-spacing:4px; margin-bottom:12px; }
  .f-logo span { color:var(--c-red); }
  .f-col h4 { font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--c-text2); margin-bottom:16px; }
  .f-col ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
  .f-col li a { font-size:13px; color:var(--c-text3); transition:color .2s; cursor:pointer; }
  .f-col li a:hover { color:var(--c-text); }
  .f-socials { display:flex; gap:10px; margin-top:20px; }
  .f-social { width:36px; height:36px; border-radius:9px; background:var(--c-glass); border:1px solid var(--c-glass-bd); display:flex; align-items:center; justify-content:center; color:var(--c-text3); font-size:14px; transition:all .25s; cursor:pointer; }
  .f-social:hover { color:var(--c-red); border-color:rgba(232,25,44,.3); background:rgba(232,25,44,.08); }
  .f-bottom { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; padding-top:24px; border-top:1px solid var(--c-glass-bd); font-size:12px; color:var(--c-text3); }

  /* ── Section spacing ────────────────────────────────────── */
  .section { padding:80px clamp(16px,5vw,80px); }
  .section-hdr { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:40px; flex-wrap:wrap; gap:16px; }

  /* ── Misc ───────────────────────────────────────────────── */
  .form-group { margin-bottom:18px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:480px) { .form-row { grid-template-columns:1fr; } }
  .info-box { background:rgba(232,25,44,.05); border:1px solid rgba(232,25,44,.12); border-radius:10px; padding:14px 16px; font-size:13px; color:var(--c-text2); line-height:1.6; display:flex; gap:12px; align-items:flex-start; margin-bottom:18px; }
  .info-box i { color:var(--c-red); margin-top:1px; flex-shrink:0; }
  .wallet-box { background:var(--c-glass); border:1px solid var(--c-glass-bd); border-radius:10px; padding:14px 16px; font-size:13px; font-weight:600; letter-spacing:.5px; display:flex; align-items:center; justify-content:space-between; gap:12px; word-break:break-all; }
  .copy-btn { flex-shrink:0; background:rgba(232,25,44,.1); border:1px solid rgba(232,25,44,.2); border-radius:7px; padding:6px 12px; font-size:11px; font-weight:600; color:var(--c-red); cursor:pointer; transition:all .2s; font-family:var(--font-b); }
  .copy-btn:hover { background:rgba(232,25,44,.2); }
  .price-tag { display:inline-flex; align-items:center; gap:6px; background:rgba(232,25,44,.1); border:1px solid rgba(232,25,44,.2); border-radius:8px; padding:6px 14px; }
  .price-tag .amount { font-family:var(--font-d); font-size:28px; color:var(--c-red); letter-spacing:1px; }
  .step-row { display:flex; align-items:flex-start; gap:12px; margin-bottom:14px; }
  .step-num { width:26px; height:26px; border-radius:50%; background:linear-gradient(135deg,var(--c-red),var(--c-red-dk)); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; flex-shrink:0; margin-top:1px; }
  .status-badge { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:50px; font-size:11px; font-weight:700; }
  .status-pending { background:rgba(255,165,0,.1); color:orange; border:1px solid rgba(255,165,0,.2); }
`;

const API = 'https://vaultx-backend-51yt.onrender.com/api/v1';

const TokenStore = {
  set(accessToken, refreshToken) {
    if (accessToken)  localStorage.setItem('vx_access',  accessToken);
    if (refreshToken) localStorage.setItem('vx_refresh', refreshToken);
  },
  getAccess()  { return localStorage.getItem('vx_access'); },
  getRefresh() { return localStorage.getItem('vx_refresh'); },
  clear() {
    localStorage.removeItem('vx_access');
    localStorage.removeItem('vx_refresh');
  },
};

function createFormData({ contentId, amount, description, paymentMethod }) {
  const formData = new FormData();

  formData.append('contentId', contentId);
  formData.append('amount', amount);
  formData.append('description', description);
  formData.append('paymentMethod', paymentMethod);

  return formData
}

const apiService = {
  /* Auth */
  login:        (body)         => req('POST', `${API}/auth/login`,         body),
  register:     (body)         => req('POST', `${API}/auth/register`,      body),
  logout:       ()             => req('POST', `${API}/auth/logout`,        null, true), // destroy session
  getProfile:   ()             => req('GET',  `${API}/user/profile`,       null, true),
  updateProfile:(body)         => req('PATCH',`${API}/user/profile`,       body, true),

  /* Content access */
  checkAccess:  (id)           => req('GET',  `${API}/content/${id}/access`, null, true),
  getPurchases: ()             => req('GET',  `${API}/user/purchases`,       null, true),

  /* Payment */
  initPayment:  (bodyData)         => fetch(`${API}/purchase/checkout`, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${TokenStore.getAccess()}`},
    body: createFormData(bodyData)
  }).then(r => r.json()),

  payStatus:    (id)           => req('GET',  `${API}/payment/${id}/status`, null, true),

  uploadProof:  (formData)     => fetch(`${API}/purchase/checkout`, {
    method: 'POST', headers: {'Authorization': `Bearer ${TokenStore.getAccess()}`}, body: formData
  }).then(r => r.json()),

  /* Engagement */
  toggleWishlist:(id)          => req('POST', `${API}/user/wishlist/${id}`, null, true),
  submitReview: (id, body)     => req('POST', `${API}/content/${id}/reviews`, body, true),
  trackProgress:(id, body)     => req('POST', `${API}/content/${id}/progress`, body, true),
  searchContent:(q)            => req('GET',  `${API}/content/search?q=${encodeURIComponent(q)}`),
};

function req(method, url, body = null, auth = false) {
  const headers = { 'Content-Type': 'application/json' };

  // Attach stored JWT on every authenticated request
  if (auth) {
    const token = TokenStore.getAccess();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const opts = {
    method,
    headers,
    ...(auth && { credentials: 'include' }),
  };
  if (body) opts.body = JSON.stringify(body);

  return fetch(url, opts).then(async r => {
    const data = await r.json();
    if (!r.ok) {
      const err  = new Error(data?.message || `HTTP ${r.status}`);
      err.status = r.status;
      err.data   = data;
      throw err;
    }
    return data;
  });
}

let CATALOG = [
  {
    id: '661f9c8a2d4b7e1a9f3c5d01', title: 'Daddy gives me a creampie', subtitle: 'DADDY X DAUGHTER',
    desc: 'this petite babe gives him blowjob and sucks his balls.She bends over while he licks her ass and fucks her',
    thumb: '6146e1e5afaa0cd2712a688f11389333.jpg',
    cat: 'Teens', price: 59.99, duration: '8h 42m', lessons: 24,
    rating: 4.9, reviews: 1284, students: 750, isNew: false, isPremium: true,
    instructor: 'Becca Wills', tags: ['cinematography','film','camera'], progress: 0,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d02', title: 'Hardcore Couple Fuck -Daddy Pounds Hard', subtitle: 'Creampie finish + my loudest orgasms ever caught on camera',
    desc: 'watch my Stepdad destroy my tight little holes in every position. Rough doggy, deep missionary, and a massive creampie that leaks out while I’m still trembling. Real passion, real screams, and the wettest sounds you’ll ever hear. If you love raw, sweaty, no-limits  sex, this is your new favorite video. Instant download – get off to the real thing..',
    thumb: 'IMG-20260421-WA0001.jpg',
    cat: 'Stepdad & Stepdaughter', price: 24.99, duration: '12h 15m', lessons: 38,
    rating: 4.8, reviews: 2103, students: 15200, isNew: false, isPremium: true,
    instructor: 'Maya Beats', tags: ['music','production','beats'], progress: 35,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d03', title: 'Dripping Wet Solo - I Fuck Myself Stupid with My Favorite Toys', subtitle: 'Watch me squirt all over the sheets while moaning your name',
    desc: 'Close-up, no bullshit. I spread my legs wide and slam my dripping pussy with my thickest toy until I’m shaking and squirting everywhere. Real orgasms, loud moans, dirty talk, and zero cuts. This is the explicit solo you’ve been craving hours of pure self-fucking pleasure. Download instantly and watch me lose control just for you',
    thumb: posterImage,
    cat: 'Pre-teen', price: 19.99, duration: '6h 30m', lessons: 42,
    rating: 4.7, reviews: 3840, students: 22100, isNew: false, isPremium: true,
    instructor: 'Lina Steel', tags: ['fitness','training','health'], progress: 68,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d04', title: 'Who knew my stepdad was this hot', subtitle: 'Stepdad feels his little daughter',
    desc: 'Daddy gives her nice orgasms, this one gladly opens up then swallows every drop for the camera. Damn, I’m speechless… YES! She is tiny :when I say “tiny”, that’s not exaggeration. She’s only 4’ 10 tall and weighs just 85lbs Whoa',
    thumb: 'IMG-20260421-WA0003.jpg',
    cat: 'Daddy x daughter', price: 34.99, duration: '10h 05m', lessons: 30,
    rating: 5.0, reviews: 892, students: 5610, isNew: true, isPremium: true,
    instructor: 'Aria Nova', tags: ['design','ui','figma'], progress: 0,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d05', title: 'POV Blowjob & Deepthroat – I Swallow Every Drop', subtitle: '',
    desc: 'Look straight into my eyes while I gag on your cock. Sloppy, messy, throat-bulging deepthroat action until you explode down my throat and all over my pretty face. I smile and swallow like the good girl I am. Shot in crisp 4K POV so it feels like I’m really sucking YOU. The ultimate cum-slut experience – download and stroke to it tonight.',
    thumb: 'IMG-20260423-WA0005.jpg',
    cat: 'Stepson & Stepmom', price: 34.90, duration: '3h 20m', lessons: 12,
    rating: 4.6, reviews: 521, students: 34000, isNew: false, isPremium: true,
    instructor: 'Rachael Michael', tags: ['photography','street','lightroom'], progress: 0,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d06', title: 'Daddy takes good care of my clits', subtitle: 'See how hard he cums in me till I cannot move',
    desc: 'I have been with him so long and did not know he could handling me so well from gentle carassing to deep and intense sex watch how he does it to me while I cry and beg him for more',
    thumb: 'IMG-20260421-WA0008.jpg',
    cat: 'Teens', price: 49.99, duration: '15h 40m', lessons: 52,
    rating: 4.9, reviews: 1760, students: 9300, isNew: true, isPremium: true,
    instructor: 'Leena Mercer', tags: ['crypto','trading','finance'], progress: 0,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d07', title: 'When I am alone in my room', subtitle: 'Real orgasm, real creampie, no acting',
    desc: 'My daddy pins me down, chokes me, and pounds my tight pussy until I’m screaming. I cum twice before he fills me up with a huge creampie that drips out while I’m still shaking. Passionate, rough, and 100% real',
    thumb: 'IMG-20260421-WA0006.jpg',
    cat: 'Lesbian teen', price: 46.99, duration: '11h 10m', lessons: 68,
    rating: 4.8, reviews: 4210, students: 28700, isNew: false, isPremium: true,
    instructor: 'Lisa Sharma', tags: ['react','nextjs','coding'], progress: 12,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d08', title: 'Blonde teen is teasing her bffs stepdad for him to let them have fun', subtitle: ' He removes her panties and fingers her.She gives him blowjob and gets fucked',
    desc: 'I mean… just look at this girl, she is gorgeous. Angelic face, hot body and the best feature of all… she’s absolutely LOVES to please a man sexually. I mean, everything she does just oozes with sexuality. She smokes my pole with her mouth and even licks my nutsack like it’s made of candy. She loves to get fucked and even asks me to fuck her harder and squeeze her little tities',
    thumb: 'IMG-20260421-WA0007.jpg',
    cat: 'Daddy x daughter', price: 65.00, duration: '4h 55m', lessons: 28,
    rating: 4.7, reviews: 683, students: 4100, isNew: true, isPremium: true,
    instructor: 'Sofia Voss', tags: ['branding','marketing','business'], progress: 0,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d09', title: 'First Time Anal with my dog – Watch Me Take It All', subtitle: ' My dog Stretching my tight ass until I cum',
    desc: 'I’ve been training my ass for weeks… today I finally allow my dog slide a big dih inside while I rub my clit. You get to see every inch stretch me open, my moans get louder, and I have the most intense anal orgasm you’ve ever seen',
    thumb: 'Screenshot_2026-04-21-19-28-37-295_com.google.android.apps.photos~2.jpg',
    cat: 'Dog knotting', price: 50.00, duration: '6h 55m', lessons: 28,
    rating: 4.7, reviews: 683, students: 4100, isNew: true, isPremium: true,
    instructor: 'Eleanora Vance', tags: ['branding','marketing','business'], progress: 0,

  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d0a', title: 'Horny Girl Can’t Stop Fingering Herself Until She Squirts', subtitle: 'Watch me cum so hard my legs shake',
    desc: 'I’m so fucking wet and needy today… I tease my swollen clit and slide two fingers deep inside while moaning your name. My pussy grips tight as I edge myself over and over until I explode in a messy, shaking orgasm. Full HD, close-up, loud and unfiltered.',
    thumb: 'IMG-20260421-WA0012.jpg',
    cat: 'Pre-teen', price: 49.99, duration: '15h 40m', lessons: 52,
    rating: 4.9, reviews: 1760, students: 9300, isNew: true, isPremium: true,
    instructor: 'Alex Mercer', tags: ['crypto','trading','finance'], progress: 0,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d0b', title: 'Spicy Latina Teen Gets Sooooo Much Cum Pumped Deep into her Shaved Snatch ', subtitle: ' He Blows Cum Bubbles With Her Pussy',
    desc: 'She lets me know before we start that she’s good with letting me cum anywhere that I want, so the entire time I’m looking forward to a being able to give her a cunt full of cum (Heh-Heh!). She also got this denim mini skirt that I pull up to reveal some thong panties and a larger ass for her petite frame. I stroke her “kitty” through the panties and pull them aside to reveal a gorgeous camel toe pussy! I grab some good head from this teen and facefuck her submissive mouth as well',
    thumb: 'IMG-20260421-WA0013.jpg',
    cat: 'Stepdad & Stepdaughter', price:60.00 , duration: '15h 40m', lessons: 52,
    rating: 4.9, reviews: 1760, students: 9300, isNew: true, isPremium: true,
    instructor: 'Alex Mercer', tags: ['crypto','trading','finance'], progress: 0,
  },
  {
    id: '661f9c8a2d4b7e1a9f3c5d0c', title: 'Lesbian Scissoring & Squirting – Two Horny Girls Can’t Stop Cumming', subtitle: 'Tribbing, pussy eating, and mutual squirting orgasm',
    desc: 'Me and my hot girlfriend grinding our wet pussies together, licking each other senseless, and squirting all over the bed. Passionate, nasty, and completely real girl-on-girl action. If you love watching two girls lose control and make each other cum over and over, this video is pure fire. Instant access – get ready to watch us soak the sheets.',
    thumb: 'IMG-20260421-WA0011.jpg',
    cat: 'Lesbian teen', price: 65.99, duration: '15h 40m', lessons: 52,
    rating: 4.2, reviews: 1760, students: 9300, isNew: false, isPremium: true,
    instructor: 'Alex Mercer', tags: ['crypto','trading','finance'], progress: 0,
  }
  
];

function makeContentsPremium() {
  CATALOG = CATALOG.map(catalogItem => {
    return {...catalogItem, isPremium: true}
  })
  return CATALOG
}

const TESTIMONIALS = [];

const CATS = ['All','Daddy x daughter','Pre-teen','Teens','Dog knotting','Stepson & Stepmom','Stepdad & Stepdaughter','Lesbian teen'];

const TICKER_ITEMS = ['500+ active users','New content weekly','HD quality guaranteed','Lifetime access','Private community'];

/* ════════════════════════════════════════════════════════════
   TOAST SYSTEM
════════════════════════════════════════════════════════════ */
let toastId = 0;
function ToastContainer({ toasts, dismiss }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast t-${t.type}${t.exiting ? ' exit' : ''}`}>
          <div className="t-ico">
            <i className={`fas fa-${t.type === 's' ? 'check' : t.type === 'e' ? 'times' : t.type === 'w' ? 'exclamation' : 'info'}`} />
          </div>
          <div style={{ flex: 1 }}>
            {t.title && <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{t.title}</div>}
            <div style={{ fontSize: 13, color: 'var(--c-text2)', lineHeight: 1.5 }}>{t.msg}</div>
          </div>
          <button onClick={() => dismiss(t.id)} style={{ background: 'none', border: 'none', color: 'var(--c-text3)', fontSize: 13, padding: '2px 4px' }}>
            <i className="fas fa-times" />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════════════ */
function Navbar({ user, scrolled, onLogin, onLogout, onProfile, toast }) {
  const [drop, setDrop] = useState(false);
  const [bell, setBell] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDrop(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const ringBell = () => {
    setBell(true);
    setTimeout(() => setBell(false), 900);
    toast('i', 'No new notifications', '');
  };

  return (
    <nav id="vx-nav" className={scrolled ? 'scrolled' : ''}>
      {/* Logo */}
      <div className="nav-logo">VAULT<span>X</span></div>

      {/* Center links */}
      <div className="nav-links">
        {['Support'].map(l => (
          <button style={{ transform: 'translateX(100px)' }} key={l} className="nav-lnk">{l}</button>
        ))}
      </div>

      {/* Right */}
      <div className="nav-right">
        {user ? (
          <>
            <button className={`nav-bell${bell ? ' ring' : ''}`} onClick={ringBell} style={{ background: 'var(--c-glass)', border: '1px solid var(--c-glass-bd)', borderRadius: 9, width: 36, height: 36, color: 'var(--c-text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <i className="fas fa-bell" />
              <span className="notif-dot" />
            </button>
            <div style={{ position: 'relative' }} ref={dropRef}>
              <button className="avatar-btn" onClick={() => setDrop(d => !d)}>
                {user.fullName?.charAt(0).toUpperCase()}
              </button>
              {drop && (
                <div className="pdrop">
                  <div className="pdrop-hd">
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{user.fullName}</div>
                    <div style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 3 }}>{user.email}</div>
                    <div style={{ marginTop: 8 }}>
                      <span className="badge badge-free">Free Plan</span>
                    </div>
                  </div>
                  <button className="pdrop-item" onClick={() => { setDrop(false); onProfile(); }}>
                    <i className="fas fa-user" style={{ width: 16 }} /> My Profile
                  </button>
                  <button className="pdrop-item" onClick={() => { setDrop(false); }}>
                    <i className="fas fa-play-circle" style={{ width: 16 }} /> My Content
                  </button>
                  <button className="pdrop-item" onClick={() => { setDrop(false); }}>
                    <i className="fas fa-heart" style={{ width: 16 }} /> Wishlist
                  </button>
                  <button className="pdrop-item" onClick={() => { setDrop(false); }}>
                    <i className="fas fa-cog" style={{ width: 16 }} /> Settings
                  </button>
                  <div style={{ height: 1, background: 'var(--c-glass-bd)', margin: '4px 0' }} />
                  <button className="pdrop-item red" onClick={() => { setDrop(false); onLogout(); }}>
                    <i className="fas fa-sign-out-alt" style={{ width: 16 }} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="btn btn-out" style={{ padding: '9px 20px', fontSize: 13 }} onClick={onLogin}>
              <i className="fas fa-sign-in-alt" /> Sign In
            </button>
            <button className="btn btn-red" style={{ padding: '9px 20px', fontSize: 13 }} onClick={onLogin}>
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
function HeroSection({ onBrowse, onLogin, user }) {
  return (
    <section id="vx-hero">
      {
        user?
        <video
          autoPlay loop muted playsInline
          poster={posterImage}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 0, opacity: 0.35,
          }}
        >
          <source src={HeroVideo}  type="video/mp4" />
          <source src={HeroVideoBack} type="video/webm" />
        </video>
        :
        ''
      }

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'transparent',
      }} />


      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div style={{ position: 'relative', zIndex: 3 }}>
        <div className="hero-ey">
          <i className="fas fa-fire" /> Premium CP content
        </div>

        <h1 className="hero-title">
          <span className="grad-w">UNLOCK the best</span><br />
          <span className="grad-r">CANDY VIDEOS</span>
        </h1>

        <p className="hero-sub"> Gain access to the best premium candy contents, you are one click away daddy don't be shy   
        </p>

        <div className="hero-cta">
          <button className="btn btn-red" style={{ padding: '14px 36px', fontSize: 15 }} onClick={onBrowse}>
            <i className="fas fa-play" /> Browse Content
          </button>
          {!user && (
            <button className="btn btn-out" style={{ padding: '14px 36px', fontSize: 15 }} onClick={onLogin}>
              <i className="fas fa-user-plus" /> Join now 
            </button>
          )}
        </div>

        <div className="hero-trust">
          {[
            { icon: 'fa-users',        text: '7,000+ Users' },
            { icon: 'fa-star',         text: '4.6 Avg Rating' },
            { icon: 'fa-infinity',     text: 'Lifetime Access' },
            
          ].map(({ icon, text }) => (
            <div key={text} className="trust-item">
              <i className={`fas ${icon}`} /> {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   TICKER TAPE
════════════════════════════════════════════════════════════ */
function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <div key={i} className="ticker-item">
            <i className="fas fa-diamond" /> {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STATS BAR
════════════════════════════════════════════════════════════ */
function StatsBar() {
  const stats = [
    { num: '7,000+',  label: 'Users Registered',   icon: 'fa-users' },
    { num: '70+',  label: 'Hours of Content',     icon: 'fa-film' },
    { num: '87%',   label: 'Satisfaction Rate',    icon: 'fa-star' },
  ];
  return (
    <section className="section" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={s.label} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <i className={`fas ${s.icon}`} style={{ fontSize: 20, color: 'var(--c-red)', marginBottom: 12, display: 'block' }} />
            <div className="stat-num">{s.num}</div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CONTENT CARD
════════════════════════════════════════════════════════════ */
function ContentCard({ item, onClick, onWishlist, isWishlisted, purchased, delay = 0 }) {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const locked = item.isPremium && !purchased;
  return (
    <div className="cc" onClick={() => onClick(item)} style={{ animationDelay: `${delay}s` }}>
      {/* Thumbnail */}
      <div  className="cc-thumb">
        <img style={{filter: 'blur(5px)'}} src={item.thumb} alt={item.title} loading="lazy" />
        <div className="cc-ov">
          {locked
            ? <div className="cc-play"><i className="fas fa-lock" style={{ paddingLeft: 0 }} /></div>
            : <div className="cc-play"><i className="fas fa-play" /></div>
          }
        </div>
        {locked && (
          <div className="cc-lock-ov">
            <i className="fas fa-lock" />
            <span>{!user? 'Login to access':'Content locked'}</span>
          </div>
        )}
        <div className="cc-dur"><i className="fas fa-clock" style={{ marginRight: 4 }} />{item.duration}</div>

        {/* Wishlist btn — stop propagation */}
        <button
          className={`cc-wl${isWishlisted ? ' on' : ''}`}
          onClick={e => { e.stopPropagation(); onWishlist(item.id); }}
        >
          <i className={`fa${isWishlisted ? 's' : 'r'} fa-heart`} />
        </button>
      </div>

      {/* Body */}
      <div className="cc-body">
        <div className="cc-row">
          <span className="cc-cat">{item.cat}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {item.isNew && <span className="badge badge-new"><i className="fas fa-bolt" /> New</span>}
            {JSON.parse(localStorage.getItem("user"))
              ? <span className="badge badge-prem"><i className="fas fa-crown" /> Premium</span>
              : <span className="badge badge-free"><i className="fas fa-unlock" /></span>
            }
          </div>
        </div>
        <div className="cc-title">{item.title}</div>
        <div className="cc-desc">{item.desc}</div>

        <div className="cc-foot">
          {
            user?
            <div className="cc-price" style={item.price === 0 ? { color: 'var(--c-green)' } : {}}>
              {item.price === 0 ? 'FREE' : `$${item.price}`}
            </div>
            :
            ''
          }
          <div className="cc-rating">
            <i className="fas fa-star" /> {item.rating}
            <span style={{ color: 'var(--c-text3)' }}>({item.reviews.toLocaleString()})</span>
          </div>
        </div>

        <div className="cc-by">
          <i className="fas fa-user-circle" style={{ marginRight: 5 }} />{item.instructor}
          &nbsp;&nbsp;<i className="fas fa-video" style={{ marginRight: 5 }} />{item.lessons} Videos
        </div>

        {/* Progress bar (if any) */}
        {purchased && item.progress > 0 && (
          <div>
            <div className="prog-bar" style={{ marginTop: 13 }}>
              <div className="prog-fill" style={{ width: `${item.progress}%` }} />
            </div>
            <div className="prog-lbl">{item.progress}% complete</div>
          </div>
        )}
      </div>
    </div>
  );
}

function generateMinuteStamp() {
  return String(Math.floor(Math.random()*60)).padStart("0", 2) + 'm';
}

/* ════════════════════════════════════════════════════════════
   CONTENT VIEWER MODAL  (locked / unlocked)
════════════════════════════════════════════════════════════ */
function ContentModal({ item, user, purchased, onClose, onPayment, onLogin }) {
  if (!item) return null;
  const canAccess = !item.isPremium || purchased;

  const fakeLessons = Array.from({ length: Math.min(item.lessons, 8) }, (_, i) => ({
    n: i + 1, title: ['Video #1', 'Video #2', 'Video #3', 'Video #4', 'Video #5', 'Video #6', 'Video #7', 'Video #8'][i],
    dur: [`${generateMinuteStamp()}`, `${generateMinuteStamp()}`, `${generateMinuteStamp()}`, `${generateMinuteStamp()}`, `${generateMinuteStamp()}`, `${generateMinuteStamp()}`, `${generateMinuteStamp()}`, `${generateMinuteStamp()}`][i],
    free: i === 0,
  }));

  return (
    <div className="modal-bd" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-hdr">
          <div>
            <span className="cc-cat" style={{ display: 'block', marginBottom: 4 }}>{item.cat}</span>
            <div className="modal-ttl">{item.title}</div>
          </div>
          <button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button>
        </div>

        <div className="modal-body">
          {/* Video area */}
          {canAccess ? (
            <div className="vid-player">
              <img src={item.thumb} alt={item.title} />
              <div className="vid-player-ov">
                <div className="big-play"><i className="fas fa-play" /></div>
              </div>
            </div>
          ) : (
            <div className="vid-locked">
              <i className="fas fa-lock" style={{ fontSize: 36, color: 'var(--c-red)', marginBottom: 14, display: 'block' }} />
              <div className="sh" style={{ fontSize: 20, marginBottom: 8 }}>HD Content</div>
              <p style={{ color: 'var(--c-text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
                Unlock <strong style={{ color: 'var(--c-text)' }}>{item.title}</strong> and get full lifetime access to all {item.lessons} HD CP, downloadable Videos, and the private community.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                {user ? (
                  <button className="btn btn-red" onClick={() => { onClose(); onPayment(item); }}>
                    <i className="fas fa-unlock" /> Unlock for ${item.price}
                  </button>
                ) : (
                  <>
                    <button className="btn btn-red" onClick={() => { onClose(); onLogin(); }}>
                      <i className="fas fa-sign-in-alt" /> Sign In to gain access
                    </button>
                    <button className="btn btn-out" onClick={() => { onClose(); onLogin('register'); }}>
                      <i className="fas fa-user-plus" /> Create Free Account
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Meta info */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', margin: '20px 0 24px', fontSize: 13, color: 'var(--c-text2)' }}>
            {[
              { i: 'fa-clock',            v: item.duration },
              { i: 'fa-video',        v: `${item.lessons} Videos` },
              { i: 'fa-star',             v: `${item.rating} (${item.reviews.toLocaleString()} reviews)` },
              { i: 'fa-eye',            v: `${item.students.toLocaleString()} Views` },
            ].map(({ i, v }) => (
              <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <i className={`fas ${i}`} style={{ color: 'var(--c-red)', width: 14 }} /> {v}
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, color: 'var(--c-text2)', lineHeight: 1.75, marginBottom: 24 }}>{item.desc}</p>

          {/* Lesson list preview */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--c-text2)' }}>
              <i className="fas fa-list" style={{ marginRight: 8 }} />Video 1
            </div>
            {fakeLessons.map(l => (
              <div key={l.n} className="lesson-item">
                {canAccess || l.free
                  ? <div className="lesson-num">{l.n}</div>
                  : <div className="lesson-lock"><i className="fas fa-lock" /></div>
                }
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{l.title}</div>
                  {l.free && !canAccess && <div style={{ fontSize: 11, color: 'var(--c-green)', marginTop: 2 }}></div>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--c-text3)' }}>{l.dur}</div>
              </div>
            ))}
            {item.lessons > 8 && (
              <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--c-text3)', marginTop: 10 }}>
                + {item.lessons - 8} videos unlock after signin
              </div>
            )}
          </div>

          {/* Purchase CTA if premium and not purchased */}
          {item.isPremium && !canAccess && user && (
            <button className="btn btn-red" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={() => { onClose(); onPayment(item); }}>
              <i className="fas fa-unlock" /> Get Full Access — ${item.price}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PAYMENT MODAL  (4 tabs: Gift Card / Bank / Crypto / Mobile Money)
════════════════════════════════════════════════════════════ */
function PaymentModal({ item, onClose, toast }) {
  const [tab, setTab] = useState(0);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [drag, setDrag] = useState(false);
  const [ref, setRef] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  if (!item) return null;

  const tabs = [
    { icon: 'fa-gift',        label: 'Gift Card', enabled: true},
    { icon: 'fa-university',  label: 'Bank Transfer', enabled: false },
    { icon: 'fa-coins',       label: 'Crypto', enabled: true       },
    { icon: 'fa-mobile-alt',  label: 'Mobile Money', enabled: false },
  ];

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const submit = async () => {
    if (tab < 2 && !file) { toast('w', '', 'Please upload your payment proof.'); return; }
    if (tab === 1 && !ref) { toast('w', '', 'Please enter your transfer reference.'); return; }
    if (tab === 3 && (!name || !phone)) { toast('w', '', 'Please fill in all fields.'); return; }

    setLoading(true);
    try {
      if (file) {
        const fd = new FormData();
        fd.append('paymentProof', file);
        fd.append('contentId', item.id);
        fd.append('amount', item.price);
        fd.append('paymentMethod', tabs[tab].label);
        fd.append('description', ref);
        await apiService.uploadProof(fd);
      } else {
        await apiService.initPayment({ contentId: item.id, paymentMethod: tabs[tab].label, amount: item.price, description: ref, name, phone });
      }
      setSubmitted(true);
    } catch (_) {
      _
      toast('e', 'Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="modal-bd" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal">
          <div className="modal-body" style={{ textAlign: 'center', padding: '48px 28px' }}>
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(0,201,122,.1)', border: '1px solid rgba(0,201,122,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <i className="fas fa-check" style={{ fontSize: 28, color: 'var(--c-green)' }} />
            </div>
            <div className="sh" style={{ fontSize: 28, marginBottom: 12 }}>Payment Submitted</div>
            <p style={{ color: 'var(--c-text2)', fontSize: 14, lineHeight: 1.75, marginBottom: 8 }}>
              Your payment proof has been received and is under review. Access will be granted within <strong style={{ color: 'var(--c-text)' }}>10-20minutes</strong> once confirmed.
            </p>
            <div className="status-badge status-pending" style={{ margin: '16px auto', display: 'inline-flex' }}>
              <i className="fas fa-clock" /> Pending Verification
            </div>
            <p style={{ color: 'var(--c-text3)', fontSize: 12, marginBottom: 28 }}>
              You will receive an email notification upon approval.
            </p>
            <button className="btn btn-red" style={{ margin: '0 auto' }} onClick={onClose}>
              <i className="fas fa-home" /> Back to Browse
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-bd" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-hdr">
          <div className="modal-ttl">UNLOCK CONTENT</div>
          <button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button>
        </div>

        <div className="modal-body">
          {/* Item summary */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: 'var(--c-glass)', border: '1px solid var(--c-glass-bd)', borderRadius: 12, padding: '14px 16px', marginBottom: 24 }}>
            <img src={item.thumb} alt={item.title} style={{ width: 64, height: 44, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--c-text2)', marginTop: 3 }}>
                {item.lessons} Videos &bull; {item.duration}
              </div>
            </div>
            <div className="price-tag">
              <span className="amount">${item.price}</span>
            </div>
          </div>

          <div className="info-box">
            <i className="fas fa-info-circle" />
            <div>After payment verification (within 10m), your content will be instantly unlocked. All purchases are reviewed manually by our team.</div>
          </div>

          {/* Payment method tabs */}
          <div style={{ fontWeight: 700, fontSize: 11, color: 'var(--c-text2)', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 12 }}>
            Choose Payment Method
          </div>
          <div className="pay-tabs">
            {tabs.map((t, i) => (
              <button key={t.label} className={`pay-tab${tab === i ? ' active' : ''}`} onClick={() => {
                if(t.enabled) {
                  setTab(i); 
                  setFile(null); 
                  setPreview(null); 
                } else {
                  toast("i", "Payment method", "Coming soon.");
                }
              }
            }
              >
                <i className={`fas ${t.icon}`} /> {t.label}
              </button>
            ))}
          </div>

          {/* ── Gift Card ── */}
          {tab === 0 && (
            <div>
              <div style={{ fontSize: 14, color: 'var(--c-text2)', lineHeight: 1.7, marginBottom: 18 }}>
                Purchase any gift card (Razar Gold, iTunes , Steam, etc.) of <strong style={{ color: 'var(--c-text)' }}>${item.price} or equivalent</strong>, then upload a clear photo of the card showing the code.
              </div>
              <div style={{ marginBottom: 18 }}>
                <div className="step-row"><div className="step-num">1</div><div style={{ fontSize: 13, color: 'var(--c-text2)', lineHeight: 1.6 }}>Purchase a gift card for exactly <strong style={{ color: 'var(--c-text)' }}>${item.price}</strong> (or highest available denomination).</div></div>
                <div className="step-row"><div className="step-num">2</div><div style={{ fontSize: 13, color: 'var(--c-text2)', lineHeight: 1.6 }}>Scratch the card to reveal the code.</div></div>
                <div className="step-row"><div className="step-num">3</div><div style={{ fontSize: 13, color: 'var(--c-text2)', lineHeight: 1.6 }}>Upload a photo of the card below. Make sure the code is clearly visible.</div></div>
              </div>
              <div
                className={`upload-z${drag ? ' drag' : ''}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={handleDrop}
              >
                {preview
                  ? <img src={preview} className="upload-preview" alt="preview" />
                  : <>
                      <i className="fas fa-cloud-upload-alt" />
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>Drop photo here or click to upload</div>
                      <div style={{ fontSize: 12, color: 'var(--c-text3)' }}>JPG, PNG — max 5MB</div>
                    </>
                }
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
              <div style={{marginTop: '12px'}} className="form-group">
                <label className="lbl">GIFT CARD NUMBER</label>
                <input className="inp" placeholder="e.g., 8U95-Y3E8CQ-29MPQ" value={ref} onChange={e => setRef(e.target.value)} />
              </div>
            </div>
          )}

          {/* ── Bank Transfer ── */}
          {tab === 1 && (
           {}
          )}

          {/* ── Crypto ── */}
          {tab === 2 && (
            <div>
              <div style={{ marginBottom: 20 }}>
                {[
                  { coin: 'Bitcoin (BTC)',  addr: '12yaCjN6wCG2SpYvUszrGFiVYYWGT5RwnN',  icon: 'fa-bitcoin' },
                  { coin: 'Ethereum (ETH)', addr: '0x4985991562842267fa3ec3ae7ec7cc3bd14c8fa1', icon: 'fa-ethereum' },
                  { coin: 'USDT (ERC20)', addr: '0x4985991562842267fa3ec3ae7ec7cc3bd14c8fa1',  icon: 'fa-dollar' },
                ].map(({ coin, addr, icon }) => (
                  <div key={coin} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
                      <i className={`fab ${icon}`} style={{ color: 'var(--c-gold)' }} /> {coin}
                    </div>
                    <div className="wallet-box">
                      <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--c-text2)' }}>{addr}</span>
                      <button className="copy-btn" onClick={() => { navigator.clipboard.writeText(addr); }}>
                        <i className="fas fa-copy" /> Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="info-box">
                <i className="fas fa-exclamation-triangle" />
                <div>Send exactly <strong style={{ color: 'var(--c-text)' }}>${item.price} USD equivalent</strong>. After sending, paste your transaction hash below so we can verify your payment.</div>
              </div>
              <div className="form-group">
                <label className="lbl">Transaction Hash / TxID</label>
                <input className="inp" placeholder="Paste your transaction hash here..." value={ref} onChange={e => setRef(e.target.value)} />
              </div>
            </div>
          )}

          {/* ── Mobile Money ── */}
          {tab === 3 && (
            <div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 13, color: 'var(--c-text2)', marginBottom: 16, lineHeight: 1.7 }}>
                  Send <strong style={{ color: 'var(--c-text)' }}>${item.price}</strong> to any of the mobile money numbers below, then fill in your details.
                </div>
                {[
                  { net: 'M-Pesa',    num: '+1 (555) 020-1234' },
                  { net: 'MTN MoMo',  num: '+1 (555) 053-5678' },
                  { net: 'Airtel Money', num: '+1 (555) 073-9012' },
                ].map(({ net, num }) => (
                  <div key={net} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--c-glass-bd)', fontSize: 13 }}>
                    <span style={{ color: 'var(--c-text2)' }}>{net}</span>
                    <strong style={{ fontFamily: 'monospace' }}>{num}</strong>
                  </div>
                ))}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="lbl">Your Full Name</label>
                  <input className="inp" placeholder="Name on the account" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="lbl">Your Phone Number</label>
                  <input className="inp" placeholder="+1 234 567 8900" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="lbl">Transaction Reference</label>
                <input className="inp" placeholder="Reference ID from your SMS confirmation" value={ref} onChange={e => setRef(e.target.value)} />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            className="btn btn-red"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: 8 }}
            onClick={submit}
            disabled={loading}
          >
            {loading
              ? <><i className="fas fa-spinner fa-spin" /> Processing...</>
              : <><i className="fas fa-paper-plane" /> Submit Payment</>
            }
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--c-text3)', marginTop: 12 }}>
            <i className="fas fa-shield-alt" style={{ marginRight: 5 }} />All submissions are reviewed within 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
}



function AuthModal({ mode: initMode, onClose, onSuccess, toast, setCatalog }) {
  const [mode,      setMode]      = useState(initMode || 'login');
  const [form,      setForm]      = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading,   setLoading]   = useState(false);
  const [authError, setAuthError] = useState('');   // ← inline error banner state
  const [showPw,    setShowPw]    = useState(false); // ← password visibility toggle

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  // Clear form error when user switches between login and register
  const switchMode = newMode => {
    setMode(newMode);
    setAuthError('');
    setForm({ name: '', email: '', password: '', confirm: '' });
  };

  const submit = async () => {
    setAuthError('');

    // ── Client-side validation ──
    if (mode === 'register' && !form.name.trim()) {
      setAuthError('Please enter your full name.');
      return;
    }
    if (!form.email || !form.password) {
      setAuthError('Please fill in your email and password.');
      return;
    }
    if (mode === 'register' && form.password.length < 8) {
      setAuthError('Password must be at least 8 characters long.');
      return;
    }
    if (mode === 'register' && form.password !== form.confirm) {
      setAuthError('Your passwords do not match. Please check and try again.');
      return;
    }

    setLoading(true);
    try {
      const res = mode === 'login'
        ? await apiService.login({ email: form.email, password: form.password })
        : await apiService.register({
            fullName:        form.name,
            email:           form.email,
            password:        form.password,
            confirmPassword: form.confirm,
          });

      const payload      = res.data || res;
      const user         = payload.user;
      const accessToken  = payload.accessToken;
      const refreshToken = payload.refreshToken;

      if (!user) {
        setAuthError('Unexpected response from server. Please try again.');
        return;
      }

      TokenStore.set(accessToken, refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      toast('s', 'Welcome!', mode === 'login' ? 'Signed in successfully.' : 'Account created!');
      onSuccess(user);
      setCatalog(makeContentsPremium);
      onClose();

    } catch (err) {
      const status  = err?.status;
      const message = err?.data?.message || err?.message || '';

      if (status === 409) {
        setAuthError('An account with this email already exists. Try signing in instead.');

      } else if (status === 401) {
        setAuthError('Incorrect email or password. Please try again.');

      } else if (status === 400) {
        setAuthError(message || 'Some of your details are invalid. Please check and try again.');

      } else if (status === 403) {
        setAuthError('Your account has been suspended. Please contact support.');

      } else if (status === 404) {
        setAuthError('No account found with that email address.');

      } else if (status === 429) {
        setAuthError('Too many attempts. Please wait a few minutes and try again.');

      } else if (status >= 500) {
        setAuthError('Our servers are having trouble right now. Please try again in a moment.');

      } else if (message.toLowerCase().includes('fetch') || message.toLowerCase().includes('network')) {
        setAuthError('Cannot connect to the server. Please check your internet connection.');

      } else {
        setAuthError(message || 'Something went wrong. Please try again.');
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-bd" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 440 }}>

        <div className="modal-hdr">
          <div className="modal-ttl">{mode === 'login' ? 'SIGN IN' : 'JOIN VAULTX'}</div>
          <button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button>
        </div>

        <div className="modal-body">

          {/* Mode toggle */}
          <div className="auth-tog">
            <button className={mode === 'login'    ? 'active' : ''} onClick={() => switchMode('login')}>Sign In</button>
            <button className={mode === 'register' ? 'active' : ''} onClick={() => switchMode('register')}>Create Account</button>
          </div>

          {/* ── Inline error banner ── */}
          {authError && (
            <div style={{
              display:       'flex',
              alignItems:    'flex-start',
              gap:           10,
              padding:       '12px 14px',
              marginBottom:  16,
              background:    'rgba(232,25,44,.07)',
              border:        '1px solid rgba(232,25,44,.25)',
              borderRadius:  10,
              animation:     'fadeIn .2s ease',
            }}>
              <i className="fas fa-exclamation-circle"
                 style={{ color: 'var(--c-red)', marginTop: 2, flexShrink: 0 }} />
              <div style={{ fontSize: 13, color: 'var(--c-red)', fontWeight: 500, lineHeight: 1.5 }}>
                {authError}
              </div>
            </div>
          )}

          {/* Full name — register only */}
          {mode === 'register' && (
            <div className="form-group">
              <label className="lbl">Full Name</label>
              <input
                className="inp"
                placeholder="Your full name"
                value={form.name}
                onChange={set('name')}
                autoComplete="name"
              />
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label className="lbl">Email Address</label>
            <input
              className="inp"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
            />
          </div>

          {/* Password with show/hide toggle */}
          <div className="form-group">
            <label className="lbl">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="inp"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={set('password')}
                style={{ paddingRight: 44 }}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                style={{
                  position:   'absolute', right: 12, top: '50%',
                  transform:  'translateY(-50%)',
                  background: 'none', border: 'none',
                  color:      'var(--c-text3)', cursor: 'pointer', fontSize: 13,
                }}
              >
                <i className={`fas ${showPw ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
          </div>

          {/* Confirm password — register only */}
          {mode === 'register' && (
            <div className="form-group">
              <label className="lbl">Confirm Password</label>
              <input
                className="inp"
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={set('confirm')}
                autoComplete="new-password"
              />
              {/* Live match indicator */}
              {form.confirm && (
                <div style={{ fontSize: 11, marginTop: 5, display: 'flex', alignItems: 'center', gap: 5,
                  color: form.password === form.confirm ? 'var(--c-green)' : 'var(--c-red)' }}>
                  <i className={`fas ${form.password === form.confirm ? 'fa-check' : 'fa-times'}`} />
                  {form.password === form.confirm ? 'Passwords match' : 'Passwords do not match'}
                </div>
              )}
            </div>
          )}

          {/* Submit button */}
          <button
            className="btn btn-red"
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            onClick={submit}
            disabled={loading}
          >
            {loading
              ? <><i className="fas fa-spinner fa-spin" /> Please wait...</>
              : mode === 'login'
                ? <><i className="fas fa-sign-in-alt" /> Sign In</>
                : <><i className="fas fa-user-plus" /> Create Account</>
            }
          </button>

          {/* Forgot password — login only */}
          {mode === 'login' && (
            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--c-red)', fontSize: 12, cursor: 'pointer' }}
                onClick={() => toast('i', 'Reset Password', 'Password reset is not yet implemented. Contact support.')}
              >
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function ContactModal({ onClose, setCloseContact }) {
  const EMAIL = "support@vaultx.io";
  const WHATSAPP = "+1 (778) 832-8705";
  const WA_LINK = `https://wa.me/${WHATSAPP.replace(/\D/g, "")}`;
  const [copied, setCopied] = useState("");

  const copy = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(key);
        setTimeout(() => setCopied(""), 2000);
      });
    }
  };

  return (
    <div
      className="modal-bd"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" style={{ maxWidth: 420 }}>
        
        {/* Header */}
        <div className="modal-hdr">
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                color: "var(--c-red)",
                textTransform: "uppercase",
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <i className="fas fa-headset" /> Get In Touch
            </div>
            <div className="modal-ttl">CONTACT US</div>
          </div>
          <button className="modal-close" onClick={() => {
            setCloseContact(false);
          }}>
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p
            style={{
              fontSize: 13,
              color: "var(--c-text2)",
              lineHeight: 1.75,
              marginBottom: 24,
            }}
          >
            We typically respond within{" "}
            <strong style={{ color: "var(--c-text)" }}>24 hours</strong> on
            business days. Choose the channel that works best for you.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {/* Email card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 20px",
                background: "rgba(255,255,255,.03)",
                border: "1px solid var(--c-glass-bd)",
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  flexShrink: 0,
                  background: "rgba(232,25,44,.1)",
                  border: "1px solid rgba(232,25,44,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="fas fa-envelope"
                  style={{ fontSize: 20, color: "var(--c-red)" }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".7px",
                    color: "var(--c-text3)",
                    marginBottom: 4,
                  }}
                >
                  Email Support
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--c-text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {EMAIL}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--c-text3)",
                    marginTop: 3,
                  }}
                >
                  Replies within 24 hours
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                  flexShrink: 0,
                }}
              >
                <a
                  href={`mailto:${EMAIL}`}
                  className="btn btn-red btn-sm"
                  style={{
                    textDecoration: "none",
                    justifyContent: "center",
                  }}
                >
                  <i className="fas fa-paper-plane" /> Send
                </a>

                <button
                  className="btn btn-ghost btn-sm"
                  style={{ justifyContent: "center" }}
                  onClick={() => copy(EMAIL, "email")}
                >
                  {copied === "email" ? (
                    <>
                      <i
                        className="fas fa-check"
                        style={{ color: "var(--c-green)" }}
                      />{" "}
                      Copied
                    </>
                  ) : (
                    <>
                      <i className="fas fa-copy" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* WhatsApp card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 20px",
                background: "rgba(255,255,255,.03)",
                border: "1px solid var(--c-glass-bd)",
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  flexShrink: 0,
                  background: "rgba(37,211,102,.1)",
                  border: "1px solid rgba(37,211,102,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="fab fa-whatsapp"
                  style={{ fontSize: 24, color: "#25d366" }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".7px",
                    color: "var(--c-text3)",
                    marginBottom: 4,
                  }}
                >
                  WhatsApp
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--c-text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {WHATSAPP}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--c-text3)",
                    marginTop: 3,
                  }}
                >
                  Fastest response channel
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                  flexShrink: 0,
                }}
              >
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm"
                  style={{
                    textDecoration: "none",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg,#25d366,#128c7e)",
                    color: "#fff",
                    boxShadow:
                      "0 4px 14px rgba(37,211,102,.3)",
                    border: "none",
                  }}
                >
                  <i className="fab fa-whatsapp" /> Chat
                </a>

                <button
                  className="btn btn-ghost btn-sm"
                  style={{ justifyContent: "center" }}
                  onClick={() => copy(WHATSAPP, "wa")}
                >
                  {copied === "wa" ? (
                    <>
                      <i
                        className="fas fa-check"
                        style={{ color: "var(--c-green)" }}
                      />{" "}
                      Copied
                    </>
                  ) : (
                    <>
                      <i className="fas fa-copy" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Security note */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "12px 14px",
              background: "rgba(232,25,44,.04)",
              border: "1px solid rgba(232,25,44,.1)",
              borderRadius: 10,
            }}
          >
            <i
              className="fas fa-shield-alt"
              style={{
                color: "var(--c-red)",
                marginTop: 1,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: "var(--c-text2)",
                lineHeight: 1.65,
              }}
            >
              Never share your password or payment details over chat.
              Our team will never ask for them.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="section" style={{ background: 'var(--c-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-hdr">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--c-red)', marginBottom: 10 }}>
              <i className="fas fa-quote-left" /> Candy HD Human Content
            </div>
            <div className="sh grad-w" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>
              Good quality Videos,<br /><span className="grad-r">RAW MOMENTS</span>
            </div>
          </div>
        </div>
        <div className="test-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="test-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="test-stars">
                {Array.from({ length: t.rating }).map((_, j) => <i key={j} className="fas fa-star" />)}
              </div>
              <p className="test-txt">"{t.text}"</p>
              <div className="test-author">
                <div className="test-av">{t.init}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--c-text3)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CTA BANNER
════════════════════════════════════════════════════════════ */
function CTABanner({ user, onLogin, handleCardClick, setCloseContact }) {

  const [contactForm, setContactForm] = useState(false);

  return (
    <section style={ {display: `${JSON.parse(localStorage.getItem("user"))?'block':'none'}`} } className="section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div id="vx-cta">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--c-red)', marginBottom: 12 }}>
              <i className="fas fa-bolt" /> One purchase. Unlimited Cum. Forever.
            </div>
            <div className="sh grad-w" style={{ fontSize: 'clamp(28px,4vw,50px)', marginBottom: 16 }}>
              <br /><span className="grad-r">Ultimate Video Vault</span>
            </div>
            <p style={{ fontSize: 15, color: 'var(--c-text2)', lineHeight: 1.7 }}>
              Get everything in our video — and all newly uploaded videos — in a single discounted bundle.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            {!user && (
              <button className="btn btn-red" style={{ padding: '14px 36px', fontSize: 15 }} onClick={onLogin}>
                <i className="fas fa-rocket" /> Get Started 
              </button>
            )}

            <button className="badge badge-new btn btn-out" onClick={() => {
              handleCardClick({
    id: '651f8a3c9b2d4e7f1a6c8d92', title: 'One purchase. Unlimited Cum. Forever', subtitle: 'Ultimate Video Vault',
    desc: 'Stop buying Videos one by one. Get everything in our video Library — and everything we will create — in a single discounted bundle.',
    thumb: '6146e1e5afaa0cd2712a688f11389333.jpg',
    cat: 'complete', price: 300.00, duration: '80h+', lessons: 146,
    rating: 4.9, reviews: 301, students: 342, isNew: true, isPremium: true,
    instructor: 'VaultX Family', tags: ['Complete box','film'], progress: 0,
  });
            }}style={{ padding: '14px 36px', fontSize: 15}}>
              Get the complete Video Box
            </button>

            <button onClick={() => {setCloseContact(true)}} style={{marginLeft: '10px', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '26px'}} className='btn btn-out custom-button-1'>User support</button>

          </div>
        </div>
      </div>
    </section>
  );
}



function Footer() {
  return (
    <footer id="vx-footer">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-grid">
          <div>
            <div className="f-logo">VAULT<span>X</span></div>
            <p style={{ fontSize: 13, color: 'var(--c-text3)', lineHeight: 1.75, marginBottom: 6, maxWidth: 280 }}>
              The premium platform for elite video content. Watch how it is done by the best.
            </p>
          </div>
          <div className="f-col">
            <h4>Content</h4>
            <ul>
              {['Browse All','New Releases','Trending','Bundles'].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="f-col">
            <h4>Support</h4>
            <ul>
              {['Help Center','Contact Us','Privacy Policy','Terms of Service','Refund Policy'].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="f-bottom">
          <div>&copy; {new Date().getFullYear()} VaultX. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" style={{ color: 'var(--c-text3)', fontSize: 12 }}>Privacy</a>
            <a href="#" style={{ color: 'var(--c-text3)', fontSize: 12 }}>Terms</a>
            <a href="#" style={{ color: 'var(--c-text3)', fontSize: 12 }}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [user, setUser]                     = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser): null;
  });

  const [scrolled, setScrolled]             = useState(false);
  const [activeCat, setActiveCat]           = useState('All');
  const [search, setSearch]                 = useState('');
  const [sortBy, setSortBy]                 = useState('popular');
  const [selectedItem, setSelectedItem]     = useState(null);
  const [payItem, setPayItem]               = useState(null);
  const [showAuth, setShowAuth]             = useState(false);
  const [authMode, setAuthMode]             = useState('login');
  const [toasts, setToasts]                 = useState([]);
  const [wishlist, setWishlist]             = useState([]);
  const [purchased, setPurchased]           = useState(['c005']);
  const contentRef                          = useRef(null);
  const navigate = useNavigate();
  const [catalog, setCatalog]               = useState(CATALOG);
  const [closeContact, setCloseContact]     = useState(false);

  /* ── Inject styles once ─────────────────────────────── */
  useEffect(() => {
    if (!document.getElementById('vaultx-styles')) {
      const el = document.createElement('style');
      el.id = 'vaultx-styles';
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    return () => {}; // styles persist across re-renders intentionally
  }, []);

  /* ── Scroll listener (navbar) ───────────────────────── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* ── Toast helper ───────────────────────────────────── */
  const toast = useCallback((type, title, msg) => {
    const id = ++toastId;
    setToasts(t => [...t, { id, type, title, msg }]);
    setTimeout(() => {
      setToasts(t => t.map(x => x.id === id ? { ...x, exiting: true } : x));
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 320);
    }, 3800);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(t => t.map(x => x.id === id ? { ...x, exiting: true } : x));
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 320);
  }, []);

  /* ── Filter + sort catalog ──────────────────────────── */
  const filtered = catalog
    .filter(c => activeCat === 'All' || c.cat === activeCat)
    .filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === 'popular')  return b.students - a.students;
      if (sortBy === 'newest')   return b.isNew - a.isNew;
      if (sortBy === 'rating')   return b.rating - a.rating;
      if (sortBy === 'price-lo') return a.price - b.price;
      if (sortBy === 'price-hi') return b.price - a.price;
      return 0;
    });

  /* ── Handlers ───────────────────────────────────────── */
  const handleCardClick = (item) => setSelectedItem(item);

  const handleWishlist = async (id) => {
    if (!user) { toast('w', 'Sign in required', 'Create a free account to save content.'); return; }
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
    try { await apiService.toggleWishlist(id); } catch (_) {}
  };

  const handlePayment = (item) => {
    if (!user) { toast('w', 'Sign in required', 'Please sign in to purchase content.'); setShowAuth(true); setAuthMode('login'); return; }
    setPayItem(item);
  };

  const handleLogin = (mode = 'login') => { setAuthMode(mode); setShowAuth(true); };

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    TokenStore.clear();
    toast('i', 'Signed out', 'You have been signed out successfully.');
  };

  const handleAuthSuccess = (u) => { setUser(u); setPurchased(p => [...p, 'c005']); };

  const scrollToContent = () => contentRef.current?.scrollIntoView({ behavior: 'smooth' });

  /* ── Render ─────────────────────────────────────────── */
  return (
    <>
      {/* Navbar */}
      <Navbar
        user={user}
        scrolled={scrolled}
        onLogin={() => handleLogin('login')}
        onLogout={handleLogout}
        onProfile={() => {navigate('/profile')}}
        toast={toast}
      />

      {/* Hero */}
      <HeroSection user={user} onBrowse={scrollToContent} onLogin={() => handleLogin('register')} />

      {
        closeContact?
          <ContactModal setCloseContact={setCloseContact} />
        :
        ''
      }

      {/* Ticker */}
      <Ticker />

      {/* Stats */}
      <StatsBar />

      <div className="divider" />

      {/* ── Content Catalog ──────────────────────────────── */}
      <section className="section" ref={contentRef}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-hdr">
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--c-red)', marginBottom: 10 }}>
                <i className="fas fa-film" /> Content Library
              </div>
              <div className="sh grad-w" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
                PREMIUM <span className="grad-r">Content</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--c-text2)' }}>
              {filtered.length} package{filtered.length !== 1 ? 's' : ''} available
            </div>
          </div>

          {/* Categories */}
          <div className="cat-scroll">
            {CATS.map(c => (
              <button key={c} className={`cat-pill${activeCat === c ? ' active' : ''}`} onClick={() => setActiveCat(c)}>{c}</button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-wrap">
              <i className="fas fa-search" />
              <input
                className="inp" style={{ paddingLeft: 40 }}
                placeholder="Search contents..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="c-grid">
              {filtered.map((item, i) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onClick={handleCardClick}
                  onWishlist={handleWishlist}
                  isWishlisted={wishlist.includes(item.id)}
                  purchased={purchased.includes(item.id)}
                  delay={i * 0.07}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--c-text3)' }}>
              <i className="fas fa-search" style={{ fontSize: 40, marginBottom: 16, display: 'block' }} />
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>No courses found</div>
              <div style={{ fontSize: 14 }}>Try adjusting your search or category filter.</div>
            </div>
          )}
        </div>
      </section>

      <div className="divider" />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <CTABanner setCloseContact={setCloseContact} handleCardClick={handleCardClick} user={user} onLogin={() => handleLogin('register')} />

      {/* Footer */}
      <Footer />

      {/* ── Modals ────────────────────────────────────────── */}
      {selectedItem && (
        <ContentModal
          item={selectedItem}
          user={user}
          purchased={purchased.includes(selectedItem.id)}
          onClose={() => setSelectedItem(null)}
          onPayment={(item) => { setSelectedItem(null); handlePayment(item); }}
          onLogin={() => { setSelectedItem(null); handleLogin('login'); }}
        />
      )}

      {payItem && (
        <PaymentModal
          item={payItem}
          onClose={() => setPayItem(null)}
          toast={toast}
        />
      )}

      {showAuth && (
        <AuthModal
          mode={authMode}
          setCatalog={setCatalog}
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
          toast={toast}
        />
      )}

      {/* Toast container */}
      <ToastContainer toasts={toasts} dismiss={dismissToast} />
    </>
  );
}