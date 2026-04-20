// ═══════════════════════════════════════════════════════════════
//  VaultX — Premium Video Content Platform
//  ProfilePage.jsx  |  Production Ready  |  40 Features
// ═══════════════════════════════════════════════════════════════
//  Shares the same design system as HomePage.jsx
//  Font Awesome 6 + Bebas Neue + Sora — same setup as Home
//  All API endpoints defined in apiService below
// ═══════════════════════════════════════════════════════════════

import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react';

/* ════════════════════════════════════════════════════════════
   PROFILE PAGE STYLES  (extends shared VaultX variables)
════════════════════════════════════════════════════════════ */
const PROFILE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700&display=swap');

  :root {
    --c-bg:#070707; --c-surface:#0d0d0d; --c-surface2:#131313;
    --c-red:#e8192c; --c-red-dk:#8b0000; --c-red-glow:rgba(232,25,44,.22);
    --c-glass:rgba(255,255,255,.035); --c-glass-bd:rgba(255,255,255,.07);
    --c-glass-hov:rgba(255,255,255,.065);
    --c-text:#f1f1f1; --c-text2:#888; --c-text3:#444;
    --c-gold:#d4a843; --c-green:#00c97a; --c-blue:#4fa3ff;
    --font-d:'Bebas Neue',sans-serif; --font-b:'Sora',sans-serif;
    --ease:cubic-bezier(.4,0,.2,1); --r:14px;
    --sh-red:0 0 60px rgba(232,25,44,.12);
    --nav-h:68px;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:var(--font-b);background:var(--c-bg);color:var(--c-text);min-height:100vh;overflow-x:hidden;}
  ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-track{background:var(--c-bg);}
  ::-webkit-scrollbar-thumb{background:var(--c-red);border-radius:3px;}
  button{cursor:pointer;font-family:var(--font-b);}
  img{display:block;}
  textarea{font-family:var(--font-b);resize:vertical;}

  /* Keyframes */
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideR{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes toastIn{from{opacity:0;transform:translateX(110%)}to{opacity:1;transform:translateX(0)}}
  @keyframes toastOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(110%)}}
  @keyframes pulseRed{0%,100%{box-shadow:0 0 0 0 rgba(232,25,44,.45)}50%{box-shadow:0 0 0 10px rgba(232,25,44,0)}}
  @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
  @keyframes streakPop{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}

  /* Utilities */
  .glass{background:var(--c-glass);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--c-glass-bd);}
  .btn{display:inline-flex;align-items:center;gap:8px;border:none;border-radius:10px;font-weight:600;font-size:14px;padding:11px 26px;transition:all .28s var(--ease);letter-spacing:.3px;}
  .btn-red{background:linear-gradient(135deg,var(--c-red),var(--c-red-dk));color:#fff;}
  .btn-red:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(232,25,44,.42);}
  .btn-red:active{transform:translateY(0);}
  .btn-red:disabled{opacity:.5;pointer-events:none;}
  .btn-out{background:transparent;color:var(--c-text);border:1px solid var(--c-glass-bd);}
  .btn-out:hover{border-color:var(--c-red);color:var(--c-red);background:rgba(232,25,44,.05);}
  .btn-ghost{background:var(--c-glass);border:1px solid var(--c-glass-bd);color:var(--c-text2);}
  .btn-ghost:hover{border-color:rgba(232,25,44,.3);color:var(--c-text);background:var(--c-glass-hov);}
  .btn-danger{background:rgba(232,25,44,.1);border:1px solid rgba(232,25,44,.25);color:var(--c-red);}
  .btn-danger:hover{background:rgba(232,25,44,.2);}
  .btn-sm{padding:7px 16px;font-size:12px;border-radius:8px;}
  .btn-xs{padding:5px 12px;font-size:11px;border-radius:7px;}

  .inp{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--c-glass-bd);border-radius:10px;padding:12px 16px;color:var(--c-text);font-size:14px;font-family:var(--font-b);outline:none;transition:all .25s var(--ease);}
  .inp:focus{border-color:var(--c-red);background:rgba(232,25,44,.04);box-shadow:0 0 0 3px rgba(232,25,44,.1);}
  .inp::placeholder{color:var(--c-text3);}
  .inp:disabled{opacity:.5;pointer-events:none;}
  .lbl{display:block;font-size:11px;font-weight:700;color:var(--c-text2);margin-bottom:6px;text-transform:uppercase;letter-spacing:.6px;}
  .sh{font-family:var(--font-d);letter-spacing:2px;line-height:1;}
  .grad-w{background:linear-gradient(135deg,#fff 0%,#999 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .grad-r{background:linear-gradient(135deg,var(--c-red),#ff6b6b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .form-group{margin-bottom:18px;}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  @media(max-width:600px){.form-row{grid-template-columns:1fr;}}

  /* Badges */
  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:6px;font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;}
  .badge-new{background:rgba(232,25,44,.12);color:var(--c-red);border:1px solid rgba(232,25,44,.25);}
  .badge-prem{background:rgba(212,168,67,.1);color:var(--c-gold);border:1px solid rgba(212,168,67,.2);}
  .badge-free{background:rgba(0,201,122,.1);color:var(--c-green);border:1px solid rgba(0,201,122,.2);}
  .badge-blue{background:rgba(79,163,255,.1);color:var(--c-blue);border:1px solid rgba(79,163,255,.2);}

  /* Toast */
  .toast-wrap{position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;}
  .toast{display:flex;align-items:flex-start;gap:12px;background:rgba(10,10,10,.97);backdrop-filter:blur(20px);border:1px solid var(--c-glass-bd);border-radius:12px;padding:14px 18px;min-width:280px;max-width:360px;animation:toastIn .3s var(--ease);box-shadow:0 20px 60px rgba(0,0,0,.6);pointer-events:all;}
  .toast.exit{animation:toastOut .3s var(--ease) forwards;}
  .t-ico{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;margin-top:1px;}
  .t-s .t-ico{background:rgba(0,201,122,.15);color:var(--c-green);border:1px solid rgba(0,201,122,.2);}
  .t-e .t-ico{background:rgba(232,25,44,.15);color:var(--c-red);border:1px solid rgba(232,25,44,.2);}
  .t-i .t-ico{background:rgba(79,163,255,.15);color:var(--c-blue);border:1px solid rgba(79,163,255,.2);}
  .t-w .t-ico{background:rgba(255,165,0,.15);color:orange;border:1px solid rgba(255,165,0,.2);}

  /* Modal */
  .modal-bd{position:fixed;inset:0;background:rgba(0,0,0,.84);backdrop-filter:blur(10px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .2s var(--ease);}
  .modal{background:rgba(9,9,9,.97);backdrop-filter:blur(30px);border:1px solid rgba(232,25,44,.15);border-radius:22px;width:100%;max-width:580px;max-height:90vh;overflow-y:auto;animation:slideR .3s var(--ease);box-shadow:0 0 100px rgba(232,25,44,.08),0 40px 120px rgba(0,0,0,.85);}
  .modal::-webkit-scrollbar{width:2px;}
  .modal-hdr{display:flex;align-items:center;justify-content:space-between;padding:22px 26px;border-bottom:1px solid var(--c-glass-bd);}
  .modal-ttl{font-family:var(--font-d);font-size:24px;letter-spacing:2px;}
  .modal-close{width:32px;height:32px;border-radius:8px;background:var(--c-glass);border:1px solid var(--c-glass-bd);color:var(--c-text2);display:flex;align-items:center;justify-content:center;font-size:13px;transition:all .2s;}
  .modal-close:hover{background:rgba(232,25,44,.1);color:var(--c-red);}
  .modal-body{padding:24px 26px;}

  /* Info box */
  .info-box{background:rgba(79,163,255,.05);border:1px solid rgba(79,163,255,.12);border-radius:10px;padding:14px 16px;font-size:13px;color:var(--c-text2);line-height:1.6;display:flex;gap:12px;align-items:flex-start;margin-bottom:18px;}
  .info-box i{color:var(--c-blue);margin-top:1px;flex-shrink:0;}
  .warn-box{background:rgba(255,165,0,.05);border:1px solid rgba(255,165,0,.15);border-radius:10px;padding:14px 16px;font-size:13px;color:var(--c-text2);line-height:1.6;display:flex;gap:12px;align-items:flex-start;margin-bottom:18px;}
  .warn-box i{color:orange;margin-top:1px;flex-shrink:0;}
  .err-box{background:rgba(232,25,44,.05);border:1px solid rgba(232,25,44,.12);border-radius:10px;padding:14px 16px;font-size:13px;color:var(--c-text2);line-height:1.6;display:flex;gap:12px;align-items:flex-start;margin-bottom:18px;}
  .err-box i{color:var(--c-red);margin-top:1px;flex-shrink:0;}

  /* Upload zone */
  .upload-z{border:2px dashed var(--c-glass-bd);border-radius:12px;padding:32px 24px;text-align:center;cursor:pointer;transition:all .25s;}
  .upload-z:hover,.upload-z.drag{border-color:var(--c-red);background:rgba(232,25,44,.04);}

  /* Toggle switch */
  .tog-wrap{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:var(--c-glass);border:1px solid var(--c-glass-bd);border-radius:12px;transition:all .2s;}
  .tog-wrap:hover{border-color:rgba(232,25,44,.2);}
  .tog{position:relative;width:44px;height:24px;flex-shrink:0;}
  .tog input{opacity:0;width:0;height:0;position:absolute;}
  .tog-slider{position:absolute;inset:0;background:rgba(255,255,255,.1);border-radius:24px;transition:all .3s var(--ease);cursor:pointer;border:1px solid var(--c-glass-bd);}
  .tog-slider::before{content:'';position:absolute;height:16px;width:16px;left:4px;bottom:3px;background:var(--c-text2);border-radius:50%;transition:all .3s var(--ease);}
  .tog input:checked+.tog-slider{background:linear-gradient(135deg,var(--c-red),var(--c-red-dk));border-color:var(--c-red);}
  .tog input:checked+.tog-slider::before{transform:translateX(20px);background:#fff;}

  /* Table */
  .tbl{width:100%;border-collapse:collapse;}
  .tbl th{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--c-text3);padding:10px 14px;text-align:left;border-bottom:1px solid var(--c-glass-bd);}
  .tbl td{padding:13px 14px;font-size:13px;border-bottom:1px solid rgba(255,255,255,.03);vertical-align:middle;}
  .tbl tr:last-child td{border-bottom:none;}
  .tbl tr:hover td{background:var(--c-glass);}

  /* Strength meter */
  .str-bar{height:4px;border-radius:2px;margin-top:8px;overflow:hidden;background:rgba(255,255,255,.06);}
  .str-fill{height:100%;border-radius:2px;transition:all .35s var(--ease);}

  /* Shimmer skeleton */
  .skel{background:linear-gradient(90deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.04) 100%);background-size:400px 100%;animation:shimmer 1.4s infinite;}

  /* Progress ring */
  .ring-wrap{position:relative;display:inline-flex;align-items:center;justify-content:center;}
  .ring-wrap svg{transform:rotate(-90deg);}
  .ring-center{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;}

  /* Tab nav */
  .tab-nav{display:flex;flex-direction:column;gap:2px;}
  .tab-btn{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:10px;background:none;border:none;color:var(--c-text2);font-size:13px;font-weight:500;transition:all .2s;text-align:left;width:100%;font-family:var(--font-b);}
  .tab-btn i{width:18px;text-align:center;font-size:15px;flex-shrink:0;}
  .tab-btn:hover{background:var(--c-glass-hov);color:var(--c-text);}
  .tab-btn.active{background:rgba(232,25,44,.1);color:var(--c-red);border:1px solid rgba(232,25,44,.15);}
  .tab-btn .tab-count{margin-left:auto;background:var(--c-glass);border:1px solid var(--c-glass-bd);border-radius:50px;padding:1px 8px;font-size:10px;font-weight:700;}
  .tab-btn.active .tab-count{background:rgba(232,25,44,.15);border-color:rgba(232,25,44,.25);color:var(--c-red);}

  /* Card */
  .pcard{background:var(--c-glass);backdrop-filter:blur(20px);border:1px solid var(--c-glass-bd);border-radius:var(--r);padding:22px;transition:all .25s var(--ease);animation:fadeUp .4s var(--ease) both;}
  .pcard:hover{border-color:rgba(232,25,44,.18);}
  .pcard-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
  .pcard-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--c-text2);}

  /* Content mini card */
  .cmc{display:flex;gap:14px;align-items:center;padding:12px;background:var(--c-glass);border:1px solid var(--c-glass-bd);border-radius:12px;transition:all .2s;cursor:pointer;}
  .cmc:hover{border-color:rgba(232,25,44,.2);background:var(--c-glass-hov);}
  .cmc img{width:72px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0;}
  .prog-bar{height:3px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden;margin-top:6px;}
  .prog-fill{height:100%;background:linear-gradient(90deg,var(--c-red),#ff8080);border-radius:2px;}

  /* Activity feed */
  .act-item{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--c-glass-bd);}
  .act-item:last-child{border-bottom:none;}
  .act-dot{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;margin-top:1px;}

  /* Achievement badge */
  .ach{display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 14px;background:var(--c-glass);border:1px solid var(--c-glass-bd);border-radius:14px;text-align:center;transition:all .3s var(--ease);}
  .ach:hover{border-color:rgba(212,168,67,.3);box-shadow:0 0 30px rgba(212,168,67,.07);}
  .ach.locked{opacity:.35;filter:grayscale(1);}
  .ach-ico{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;}

  /* Heatmap cell */
  .hm-cell{width:13px;height:13px;border-radius:3px;transition:all .2s;}
  .hm-cell:hover{transform:scale(1.3);}

  /* Ticket */
  .ticket{background:var(--c-glass);border:1px solid var(--c-glass-bd);border-radius:12px;padding:16px 18px;transition:all .2s;}
  .ticket:hover{border-color:rgba(232,25,44,.2);}

  /* Stat pill */
  .stat-pill{display:flex;flex-direction:column;align-items:center;gap:4px;padding:18px 14px;background:var(--c-glass);border:1px solid var(--c-glass-bd);border-radius:12px;}
  .stat-pill .val{font-family:var(--font-d);font-size:32px;letter-spacing:1px;background:linear-gradient(135deg,var(--c-red),#ff6b6b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;}
  .stat-pill .lbl2{font-size:11px;font-weight:600;color:var(--c-text2);text-transform:uppercase;letter-spacing:.5px;}

  /* QR placeholder */
  .qr-box{width:160px;height:160px;background:rgba(255,255,255,.93);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;color:#000;font-size:11px;font-weight:700;letter-spacing:.5px;flex-shrink:0;}

  /* Divider */
  .divider{height:1px;background:linear-gradient(90deg,transparent,var(--c-red),transparent);opacity:.15;margin:28px 0;}

  /* Page layout */
  #pp-wrap{display:grid;grid-template-columns:240px 1fr;gap:24px;min-height:100vh;padding:calc(var(--nav-h) + 24px) clamp(12px,3vw,40px) 48px;max-width:1300px;margin:0 auto;}
  @media(max-width:900px){#pp-wrap{grid-template-columns:1fr;}#pp-sidebar{display:none;}}

  #pp-sidebar{position:sticky;top:calc(var(--nav-h) + 24px);height:fit-content;}
  .sidebar-card{background:var(--c-glass);backdrop-filter:blur(20px);border:1px solid var(--c-glass-bd);border-radius:18px;padding:20px;margin-bottom:16px;}
  .avatar-ring{position:relative;width:80px;height:80px;margin:0 auto 14px;}
  .avatar-circle{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--c-red),var(--c-red-dk));display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:#fff;border:3px solid rgba(232,25,44,.35);font-family:var(--font-d);letter-spacing:1px;overflow:hidden;}
  .avatar-circle img{width:100%;height:100%;object-fit:cover;}
  .avatar-edit-btn{position:absolute;bottom:0;right:0;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--c-red),var(--c-red-dk));border:2px solid var(--c-bg);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;transition:transform .2s;cursor:pointer;}
  .avatar-edit-btn:hover{transform:scale(1.1);}

  /* Completion ring colors */
  .ring-bg{stroke:rgba(255,255,255,.06);}
  .ring-fg{stroke:url(#ringGrad);stroke-linecap:round;transition:stroke-dashoffset .8s var(--ease);}

  /* Section animations */
  .sec-enter{animation:fadeUp .35s var(--ease) both;}

  /* Mobile bottom nav */
  @media(max-width:900px){
    .mob-tab-bar{display:flex;position:fixed;bottom:0;left:0;right:0;background:rgba(7,7,7,.96);backdrop-filter:blur(20px);border-top:1px solid var(--c-glass-bd);z-index:700;padding:8px 0 env(safe-area-inset-bottom,0);}
    .mob-tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px;border:none;background:none;color:var(--c-text3);font-size:9px;font-weight:600;letter-spacing:.4px;text-transform:uppercase;transition:color .2s;font-family:var(--font-b);}
    .mob-tab i{font-size:18px;}
    .mob-tab.active{color:var(--c-red);}
  }
  @media(min-width:901px){.mob-tab-bar{display:none;}}
`;

/* ════════════════════════════════════════════════════════════
   API SERVICE
════════════════════════════════════════════════════════════ */
const API = '/api';
const r = (method, url, body = null, auth = true) => {
  const opts = { method, headers: { 'Content-Type': 'application/json' }, ...(auth && { credentials: 'include' }) };
  if (body) opts.body = JSON.stringify(body);
  return fetch(url, opts).then(res => res.json());
};
const upload = (url, formData) =>
  fetch(url, { method: 'POST', credentials: 'include', body: formData }).then(res => res.json());

const api = {
  /* Profile */
  getProfile:          ()      => r('GET',   `${API}/user/profile`),
  updateProfile:       body    => r('PATCH', `${API}/user/profile`, body),
  uploadAvatar:        fd      => upload(`${API}/user/avatar`, fd),
  uploadCover:         fd      => upload(`${API}/user/cover`, fd),
  updateSocialLinks:   body    => r('PUT',   `${API}/user/social-links`, body),
  updateLanguage:      body    => r('PATCH', `${API}/user/language`, body),
  setFavoriteCategories: body  => r('PUT',   `${API}/user/favorite-categories`, body),
  getProfileCompletion: ()     => r('GET',   `${API}/user/profile-completion`),
  getPublicProfileUrl:  ()     => r('GET',   `${API}/user/public-url`),

  /* Content */
  getPurchases:        ()      => r('GET',   `${API}/user/purchases`),
  getWishlist:         ()      => r('GET',   `${API}/user/wishlist`),
  removeWishlist:      id      => r('DELETE',`${API}/user/wishlist/${id}`),
  getContinueWatching: ()      => r('GET',   `${API}/user/continue-watching`),
  getCertificates:     ()      => r('GET',   `${API}/user/certificates`),
  downloadCertificate: id      => r('GET',   `${API}/user/certificates/${id}/download`),
  getDownloads:        ()      => r('GET',   `${API}/user/downloads`),

  /* Progress */
  getWatchStats:       ()      => r('GET',   `${API}/user/watch-stats`),
  getLearningStreak:   ()      => r('GET',   `${API}/user/learning-streak`),
  getReviews:          ()      => r('GET',   `${API}/user/reviews`),
  deleteReview:        id      => r('DELETE',`${API}/reviews/${id}`),
  updateReview:        (id,b)  => r('PUT',   `${API}/reviews/${id}`, b),

  /* Purchases & Billing */
  getPurchaseHistory:  ()      => r('GET',   `${API}/user/purchase-history`),
  getPendingPayments:  ()      => r('GET',   `${API}/user/pending-payments`),
  getInvoices:         ()      => r('GET',   `${API}/user/invoices`),
  downloadInvoice:     id      => r('GET',   `${API}/user/invoices/${id}/download`),
  getLoyaltyPoints:    ()      => r('GET',   `${API}/user/loyalty-points`),
  redeemPoints:        body    => r('POST',  `${API}/user/loyalty-points/redeem`, body),
  upgradeSubscription: body    => r('POST',  `${API}/user/subscription/upgrade`, body),

  /* Security */
  changePassword:      body    => r('POST',  `${API}/auth/change-password`, body),
  setup2FA:            ()      => r('POST',  `${API}/auth/2fa/setup`),
  verify2FA:           body    => r('POST',  `${API}/auth/2fa/verify`, body),
  disable2FA:          body    => r('POST',  `${API}/auth/2fa/disable`, body),
  getActiveSessions:   ()      => r('GET',   `${API}/auth/sessions`),
  revokeSession:       id      => r('DELETE',`${API}/auth/sessions/${id}`),
  revokeAllSessions:   ()      => r('DELETE',`${API}/auth/sessions/all`),
  getConnectedAccounts:()      => r('GET',   `${API}/auth/connected-accounts`),
  unlinkAccount:       provider=> r('DELETE',`${API}/auth/connected-accounts/${provider}`),
  getApiKeys:          ()      => r('GET',   `${API}/user/api-keys`),
  createApiKey:        body    => r('POST',  `${API}/user/api-keys`, body),
  revokeApiKey:        id      => r('DELETE',`${API}/user/api-keys/${id}`),

  /* Notifications & Privacy */
  getNotifPrefs:       ()      => r('GET',   `${API}/user/notification-preferences`),
  updateNotifPrefs:    body    => r('PUT',   `${API}/user/notification-preferences`, body),
  getPrivacySettings:  ()      => r('GET',   `${API}/user/privacy-settings`),
  updatePrivacy:       body    => r('PUT',   `${API}/user/privacy-settings`, body),
  updateNewsletter:    body    => r('PUT',   `${API}/user/newsletter`, body),

  /* Referral & Affiliate */
  getReferralData:     ()      => r('GET',   `${API}/user/referral`),
  getAffiliateStats:   ()      => r('GET',   `${API}/user/affiliate`),
  requestPayout:       body    => r('POST',  `${API}/user/affiliate/payout`, body),
  getAchievements:     ()      => r('GET',   `${API}/user/achievements`),

  /* Support */
  getTickets:          ()      => r('GET',   `${API}/support/tickets`),
  createTicket:        body    => r('POST',  `${API}/support/tickets`, body),
  submitFeedback:      body    => r('POST',  `${API}/feedback`, body),
  exportData:          ()      => r('POST',  `${API}/user/export-data`),
  deleteAccount:       body    => r('DELETE',`${API}/user/account`, body),
};

/* ════════════════════════════════════════════════════════════
   MOCK DATA  (replace with real API responses)
════════════════════════════════════════════════════════════ */
const MOCK_USER = {
  id: 'u_001', name: 'Jordan Blake', username: '@jordanblake', email: 'jordan@email.com',
  bio: 'Filmmaker, musician, and lifelong learner. Building creative skills one course at a time.',
  website: 'https://jordanblake.io', plan: 'Pro', joinDate: '2023-08-14',
  avatarUrl: null, coverUrl: null, emailVerified: true,
  social: { twitter: 'jordanblake', instagram: 'jordan.blake', youtube: '', linkedin: 'jordanblake', github: 'jblake' },
  language: 'en', timezone: 'UTC+1', dateFormat: 'DD/MM/YYYY',
  totalSpend: 189.94, coursesCompleted: 3, totalWatchHours: 124,
};

const MOCK_PURCHASES = [
  { id:'p1', title:'Master Cinematography', thumb:'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=120&fit=crop', progress:78, lessons:24, cat:'Filmmaking', instructor:'Jordan Cole', duration:'8h 42m' },
  { id:'p3', title:'Elite Fitness Protocol', thumb:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=120&fit=crop', progress:100, lessons:42, cat:'Fitness', instructor:'Marcus Steel', duration:'6h 30m' },
  { id:'p7', title:'React & Next.js Mastery', thumb:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=120&fit=crop', progress:12, lessons:68, cat:'Coding', instructor:'Dev Sharma', duration:'20h 10m' },
  { id:'p5', title:'Street Photography Secrets', thumb:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&h=120&fit=crop', progress:45, lessons:12, cat:'Photography', instructor:'Lin Zhang', duration:'3h 20m' },
];

const MOCK_HISTORY = [
  { id:'h1', date:'2024-04-10', item:'Master Cinematography', method:'Gift Card', amount:29.99, status:'approved' },
  { id:'h2', date:'2024-03-22', item:'Elite Fitness Protocol', method:'Crypto (BTC)', amount:19.99, status:'approved' },
  { id:'h3', date:'2024-03-01', item:'React & Next.js Mastery', method:'Bank Transfer', amount:39.99, status:'approved' },
  { id:'h4', date:'2024-02-14', item:'Beat Production Masterclass', method:'Mobile Money', amount:24.99, status:'pending' },
  { id:'h5', date:'2024-01-30', item:'Dark UI Design System', method:'Gift Card', amount:34.99, status:'rejected' },
];

const MOCK_SESSIONS = [
  { id:'s1', device:'Chrome on MacOS', ip:'192.168.1.1', location:'London, UK', lastActive:'Just now', current:true },
  { id:'s2', device:'Safari on iPhone 15', ip:'192.168.1.2', location:'London, UK', lastActive:'2 hours ago', current:false },
  { id:'s3', device:'Firefox on Windows', ip:'45.62.103.88', location:'New York, US', lastActive:'3 days ago', current:false },
];

const MOCK_ACHIEVEMENTS = [
  { id:'a1', icon:'fa-fire', color:'#e8192c', bg:'rgba(232,25,44,.15)', title:'First Purchase', desc:'Bought your first course', earned:true },
  { id:'a2', icon:'fa-trophy', color:'var(--c-gold)', bg:'rgba(212,168,67,.12)', title:'Course Crusher', desc:'Completed 3 courses', earned:true },
  { id:'a3', icon:'fa-bolt', color:'#4fa3ff', bg:'rgba(79,163,255,.12)', title:'Speed Learner', desc:'Watched 10h in one week', earned:true },
  { id:'a4', icon:'fa-star', color:'var(--c-gold)', bg:'rgba(212,168,67,.12)', title:'Top Reviewer', desc:'Left 10 reviews', earned:false },
  { id:'a5', icon:'fa-users', color:'var(--c-green)', bg:'rgba(0,201,122,.12)', title:'Referral King', desc:'Referred 5 friends', earned:false },
  { id:'a6', icon:'fa-crown', color:'var(--c-gold)', bg:'rgba(212,168,67,.12)', title:'VaultX Elite', desc:'Spent $500+ on platform', earned:false },
  { id:'a7', icon:'fa-calendar-check', color:'#4fa3ff', bg:'rgba(79,163,255,.12)', title:'Streak Master', desc:'30-day learning streak', earned:false },
  { id:'a8', icon:'fa-certificate', color:'var(--c-green)', bg:'rgba(0,201,122,.12)', title:'Certified Pro', desc:'Earned 5 certificates', earned:false },
];

const MOCK_ACTIVITY = [
  { id:'ac1', type:'purchase', icon:'fa-shopping-cart', color:'rgba(232,25,44,.15)', tc:'var(--c-red)', text:'Purchased React & Next.js Mastery', time:'2 days ago' },
  { id:'ac2', type:'progress', icon:'fa-play', color:'rgba(79,163,255,.15)', tc:'var(--c-blue)', text:'Watched Lesson 8 of Master Cinematography', time:'3 days ago' },
  { id:'ac3', type:'review', icon:'fa-star', color:'rgba(212,168,67,.15)', tc:'var(--c-gold)', text:'Left a 5-star review on Elite Fitness Protocol', time:'5 days ago' },
  { id:'ac4', type:'wishlist', icon:'fa-heart', color:'rgba(232,25,44,.15)', tc:'var(--c-red)', text:'Added Crypto Trading Strategies to wishlist', time:'1 week ago' },
  { id:'ac5', type:'cert', icon:'fa-certificate', color:'rgba(0,201,122,.15)', tc:'var(--c-green)', text:'Earned certificate for Elite Fitness Protocol', time:'1 week ago' },
  { id:'ac6', type:'achievement', icon:'fa-trophy', color:'rgba(212,168,67,.15)', tc:'var(--c-gold)', text:'Unlocked Speed Learner achievement', time:'2 weeks ago' },
];

const MOCK_TICKETS = [
  { id:'t1', subject:'Payment not reflecting after 24h', status:'open',   priority:'high',   date:'2024-04-09', messages:3 },
  { id:'t2', subject:'Unable to download certificate',  status:'closed',  priority:'medium', date:'2024-03-20', messages:5 },
  { id:'t3', subject:'Video not playing on mobile',     status:'pending', priority:'low',    date:'2024-03-10', messages:1 },
];

const MOCK_STREAK_DATA = (() => {
  const d = [];
  for (let i = 83; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const rand = Math.random();
    d.push({ date: date.toISOString().slice(0,10), level: rand > .65 ? Math.floor(rand * 4) + 1 : 0 });
  }
  return d;
})();

const PLAN_TIERS = [
  { name:'Free', price:0, features:['Access to free content','Basic community access','Email support'], color:'var(--c-green)' },
  { name:'Pro', price:9.99, features:['Unlimited premium content','Priority support','Download offline','Certificates','Early access'], color:'var(--c-red)', popular:true },
  { name:'Elite', price:24.99, features:['Everything in Pro','Affiliate commission 25%','1-on-1 mentoring sessions','Custom profile badge','API access'], color:'var(--c-gold)' },
];

/* ════════════════════════════════════════════════════════════
   UTILITY HOOKS & HELPERS
════════════════════════════════════════════════════════════ */
let toastId = 0;
function useToast() {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback((type, title, msg) => {
    const id = ++toastId;
    setToasts(t => [...t, { id, type, title, msg }]);
    setTimeout(() => {
      setToasts(t => t.map(x => x.id === id ? { ...x, exiting: true } : x));
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 320);
    }, 3800);
  }, []);
  const dismiss = useCallback(id => {
    setToasts(t => t.map(x => x.id === id ? { ...x, exiting: true } : x));
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 320);
  }, []);
  return { toasts, toast, dismiss };
}

function pwStrength(p) {
  if (!p) return { score: 0, label: '', color: '' };
  let s = 0;
  if (p.length >= 8)  s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  if (p.length >= 14) s++;
  const map = ['','Weak','Fair','Good','Strong','Very Strong'];
  const col = ['','var(--c-red)','orange','#f0c040','var(--c-green)','var(--c-blue)'];
  return { score: s, label: map[s] || '', color: col[s] || '' };
}

function copy(text, toast) {
  navigator.clipboard.writeText(text).then(() => toast('s','Copied!','Copied to clipboard.'));
}

const STATUS_MAP = {
  approved: { label:'Approved', color:'var(--c-green)', bg:'rgba(0,201,122,.1)', border:'rgba(0,201,122,.2)', icon:'fa-check-circle' },
  pending:  { label:'Pending',  color:'orange',         bg:'rgba(255,165,0,.1)',  border:'rgba(255,165,0,.2)', icon:'fa-clock' },
  rejected: { label:'Rejected', color:'var(--c-red)',   bg:'rgba(232,25,44,.1)', border:'rgba(232,25,44,.2)', icon:'fa-times-circle' },
  open:     { label:'Open',     color:'var(--c-blue)',  bg:'rgba(79,163,255,.1)' ,border:'rgba(79,163,255,.2)',icon:'fa-dot-circle' },
  closed:   { label:'Closed',   color:'var(--c-text3)', bg:'rgba(255,255,255,.04)',border:'var(--c-glass-bd)', icon:'fa-check' },
};

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:50, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.6px', background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>
      <i className={`fas ${s.icon}`} /> {s.label}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   TOAST CONTAINER
════════════════════════════════════════════════════════════ */
function ToastContainer({ toasts, dismiss }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast t-${t.type}${t.exiting ? ' exit' : ''}`}>
          <div className="t-ico"><i className={`fas fa-${t.type==='s'?'check':t.type==='e'?'times':t.type==='w'?'exclamation':'info'}`} /></div>
          <div style={{ flex:1 }}>
            {t.title && <div style={{ fontWeight:700, fontSize:13, marginBottom:3 }}>{t.title}</div>}
            <div style={{ fontSize:13, color:'var(--c-text2)', lineHeight:1.5 }}>{t.msg}</div>
          </div>
          <button onClick={() => dismiss(t.id)} style={{ background:'none', border:'none', color:'var(--c-text3)', fontSize:13, padding:'2px 4px' }}><i className="fas fa-times" /></button>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PROFILE COMPLETION RING  — Feature 1
════════════════════════════════════════════════════════════ */
function CompletionRing({ pct }) {
  const r2 = 48, circ = 2 * Math.PI * r2;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="ring-wrap" style={{ width:120, height:120 }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8192c" />
            <stop offset="100%" stopColor="#ff6b6b" />
          </linearGradient>
        </defs>
        <circle className="ring-bg" cx="60" cy="60" r={r2} strokeWidth="7" fill="none" />
        <circle className="ring-fg" cx="60" cy="60" r={r2} strokeWidth="7" fill="none"
          strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div className="ring-center">
        <div style={{ fontFamily:'var(--font-d)', fontSize:26, letterSpacing:1, background:'linear-gradient(135deg,var(--c-red),#ff6b6b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{pct}%</div>
        <div style={{ fontSize:9, color:'var(--c-text3)', fontWeight:700, letterSpacing:'.5px', textTransform:'uppercase' }}>Complete</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: OVERVIEW  — Features 1-7
════════════════════════════════════════════════════════════ */
function OverviewSection({ user, toast }) {
  const completion = useMemo(() => {
    let pts = 0;
    if (user.name)              pts += 20;
    if (user.bio)               pts += 15;
    if (user.avatarUrl)         pts += 15;
    if (user.website)           pts += 10;
    if (user.emailVerified)     pts += 20;
    if (Object.values(user.social).some(v => v)) pts += 10;
    if (user.username)          pts += 10;
    return Math.min(pts, 100);
  }, [user]);

  const completionItems = [
    { label:'Profile Photo',    done: !!user.avatarUrl,       icon:'fa-camera' },
    { label:'Bio Added',        done: !!user.bio,             icon:'fa-pen' },
    { label:'Email Verified',   done: !!user.emailVerified,   icon:'fa-envelope-open' },
    { label:'Social Links',     done: Object.values(user.social).some(v=>v), icon:'fa-share-alt' },
    { label:'Website',          done: !!user.website,         icon:'fa-globe' },
  ];

  return (
    <div className="sec-enter">
      {/* Feature 1: Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:12, marginBottom:20 }}>
        {[
          { val:`${user.totalWatchHours}h`, lbl:'Watch Time' },
          { val:user.coursesCompleted, lbl:'Completed' },
          { val:'14', lbl:'Day Streak' },
          { val:`$${user.totalSpend}`, lbl:'Total Spent' },
        ].map((s,i) => (
          <div key={i} className="stat-pill" style={{ animationDelay:`${i*.07}s` }}>
            <div className="val">{s.val}</div>
            <div className="lbl2">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
        {/* Feature 2: Profile Completion */}
        <div className="pcard" style={{ gridColumn:'span 1' }}>
          <div className="pcard-hdr">
            <span className="pcard-title"><i className="fas fa-chart-pie" style={{ marginRight:8 }} />Profile Strength</span>
            {completion < 100 && <span className="badge badge-new">Incomplete</span>}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <CompletionRing pct={completion} />
            <div style={{ flex:1 }}>
              {completionItems.map(ci => (
                <div key={ci.label} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8, fontSize:12 }}>
                  <i className={`fas ${ci.done ? 'fa-check-circle' : 'fa-circle'}`} style={{ color: ci.done ? 'var(--c-green)' : 'var(--c-text3)', fontSize:11 }} />
                  <span style={{ color: ci.done ? 'var(--c-text2)' : 'var(--c-text3)', textDecoration: ci.done ? 'none' : 'none' }}>{ci.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 3: Quick Stats + Loyalty Points */}
        <div className="pcard">
          <div className="pcard-hdr">
            <span className="pcard-title"><i className="fas fa-coins" style={{ marginRight:8 }} />Loyalty Points</span>
            <span className="badge badge-gold" style={{ background:'rgba(212,168,67,.1)', color:'var(--c-gold)', border:'1px solid rgba(212,168,67,.2)', padding:'3px 9px', borderRadius:6, fontSize:10, fontWeight:700 }}>Pro Member</span>
          </div>
          <div style={{ textAlign:'center', padding:'8px 0' }}>
            <div style={{ fontFamily:'var(--font-d)', fontSize:52, letterSpacing:2, background:'linear-gradient(135deg,var(--c-gold),#f5d98a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>2,450</div>
            <div style={{ fontSize:12, color:'var(--c-text2)', marginBottom:16 }}>points available</div>
            <div style={{ background:'rgba(212,168,67,.08)', border:'1px solid rgba(212,168,67,.15)', borderRadius:10, padding:'10px 14px', fontSize:12, color:'var(--c-text2)', marginBottom:14 }}>
              <i className="fas fa-info-circle" style={{ color:'var(--c-gold)', marginRight:6 }} />550 pts away from <strong style={{ color:'var(--c-text)' }}>Elite status</strong>
            </div>
            <button className="btn btn-ghost btn-sm" style={{ width:'100%', justifyContent:'center' }} onClick={() => toast('i','Points','Redeem feature coming soon!')}>
              <i className="fas fa-gift" /> Redeem Points
            </button>
          </div>
        </div>
      </div>

      {/* Feature 4: Continue Watching */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-history" style={{ marginRight:8 }} />Continue Watching</span>
          <button className="btn btn-ghost btn-xs" onClick={() => toast('i','','View all content')}>View All <i className="fas fa-arrow-right" /></button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {MOCK_PURCHASES.filter(p => p.progress > 0 && p.progress < 100).slice(0,3).map(p => (
            <div key={p.id} className="cmc">
              <img src={p.thumb} alt={p.title} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:600, fontSize:13, marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.title}</div>
                <div style={{ fontSize:11, color:'var(--c-text2)' }}>{p.cat} &bull; {p.instructor}</div>
                <div className="prog-bar"><div className="prog-fill" style={{ width:`${p.progress}%` }} /></div>
                <div style={{ fontSize:10, color:'var(--c-text3)', marginTop:3 }}>{p.progress}% — {Math.round((100 - p.progress) / 100 * parseInt(p.duration))}m remaining</div>
              </div>
              <button className="btn btn-red btn-xs"><i className="fas fa-play" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Feature 5: Recent Activity */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-stream" style={{ marginRight:8 }} />Recent Activity</span>
        </div>
        {MOCK_ACTIVITY.map(a => (
          <div key={a.id} className="act-item">
            <div className="act-dot" style={{ background:a.color }}><i className={`fas ${a.icon}`} style={{ color:a.tc, fontSize:13 }} /></div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, marginBottom:3 }}>{a.text}</div>
              <div style={{ fontSize:11, color:'var(--c-text3)' }}><i className="fas fa-clock" style={{ marginRight:5 }} />{a.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature 6: Achievements Preview */}
      <div className="pcard">
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-trophy" style={{ marginRight:8 }} />Achievements</span>
          <span style={{ fontSize:12, color:'var(--c-text2)' }}>{MOCK_ACHIEVEMENTS.filter(a=>a.earned).length}/{MOCK_ACHIEVEMENTS.length} earned</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(100px,1fr))', gap:10 }}>
          {MOCK_ACHIEVEMENTS.map(a => (
            <div key={a.id} className={`ach${a.earned ? '' : ' locked'}`} title={a.earned ? a.desc : `Locked: ${a.desc}`}>
              <div className="ach-ico" style={{ background:a.bg }}><i className={`fas ${a.icon}`} style={{ color:a.color }} /></div>
              <div style={{ fontSize:11, fontWeight:700, lineHeight:1.3 }}>{a.title}</div>
              {a.earned && <span className="badge badge-free" style={{ fontSize:9 }}><i className="fas fa-check" /> Earned</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: MY CONTENT  — Features 8-11
════════════════════════════════════════════════════════════ */
function MyContentSection({ toast }) {
  const [view, setView] = useState('library');

  const wishlist = MOCK_PURCHASES.slice(0, 2);

  return (
    <div className="sec-enter">
      {/* Sub-tab bar */}
      <div style={{ display:'flex', gap:6, marginBottom:20, background:'var(--c-glass)', border:'1px solid var(--c-glass-bd)', borderRadius:12, padding:5 }}>
        {[['library','fa-play-circle','Library'],['wishlist','fa-heart','Wishlist'],['certificates','fa-certificate','Certificates'],['downloads','fa-download','Downloads']].map(([k,ic,lb]) => (
          <button key={k} onClick={() => setView(k)} style={{ flex:1, padding:'9px 6px', borderRadius:8, border:'none', background:view===k?'linear-gradient(135deg,var(--c-red),var(--c-red-dk))':'transparent', color:view===k?'#fff':'var(--c-text2)', fontSize:11, fontWeight:600, letterSpacing:'.3px', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:4, transition:'all .25s', fontFamily:'var(--font-b)' }}>
            <i className={`fas ${ic}`} style={{ fontSize:15 }} /> {lb}
          </button>
        ))}
      </div>

      {/* Feature 8: Course Library */}
      {view === 'library' && (
        <div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {MOCK_PURCHASES.map(p => (
              <div key={p.id} className="pcard" style={{ padding:16 }}>
                <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
                  <img src={p.thumb} alt={p.title} style={{ width:100, height:66, objectFit:'cover', borderRadius:10, flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:180 }}>
                    <div style={{ display:'flex', gap:8, marginBottom:6 }}>
                      <span className="badge badge-blue">{p.cat}</span>
                      {p.progress === 100 && <span className="badge badge-free"><i className="fas fa-check" /> Completed</span>}
                    </div>
                    <div style={{ fontWeight:700, fontSize:15, marginBottom:3 }}>{p.title}</div>
                    <div style={{ fontSize:12, color:'var(--c-text2)', marginBottom:8 }}>
                      <i className="fas fa-user" style={{ marginRight:5 }} />{p.instructor}
                      &nbsp;&bull;&nbsp;<i className="fas fa-book" style={{ marginRight:5 }} />{p.lessons} lessons
                      &nbsp;&bull;&nbsp;<i className="fas fa-clock" style={{ marginRight:5 }} />{p.duration}
                    </div>
                    <div className="prog-bar"><div className="prog-fill" style={{ width:`${p.progress}%` }} /></div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:4, fontSize:11, color:'var(--c-text3)' }}>
                      <span>{p.progress}% complete</span>
                      {p.progress === 100 && <span style={{ color:'var(--c-green)' }}><i className="fas fa-trophy" style={{ marginRight:4 }} />Completed</span>}
                    </div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    <button className="btn btn-red btn-sm"><i className="fas fa-play" /> {p.progress > 0 ? 'Resume' : 'Start'}</button>
                    {p.progress === 100 && <button className="btn btn-ghost btn-sm" onClick={() => toast('s','','Certificate ready to download!')}><i className="fas fa-certificate" /> Certificate</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature 9: Wishlist */}
      {view === 'wishlist' && (
        <div>
          {wishlist.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 20px', color:'var(--c-text3)' }}>
              <i className="fas fa-heart" style={{ fontSize:40, marginBottom:16, display:'block' }} />
              <div style={{ fontWeight:600, marginBottom:8 }}>Your wishlist is empty</div>
              <div style={{ fontSize:13 }}>Browse content and save courses you want to take later.</div>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
              {wishlist.map(p => (
                <div key={p.id} className="pcard" style={{ padding:0, overflow:'hidden' }}>
                  <img src={p.thumb} alt={p.title} style={{ width:'100%', height:140, objectFit:'cover' }} />
                  <div style={{ padding:16 }}>
                    <div style={{ fontWeight:700, marginBottom:6 }}>{p.title}</div>
                    <div style={{ fontSize:12, color:'var(--c-text2)', marginBottom:12 }}>{p.instructor}</div>
                    <div style={{ display:'flex', gap:8 }}>
                      <button className="btn btn-red btn-sm" style={{ flex:1, justifyContent:'center' }}><i className="fas fa-unlock" /> Unlock</button>
                      <button className="btn btn-danger btn-sm" onClick={() => toast('i','','Removed from wishlist')}><i className="fas fa-trash" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Feature 10: Certificates */}
      {view === 'certificates' && (
        <div>
          {[{ id:'cert1', course:'Elite Fitness Protocol', instructor:'Marcus Steel', date:'2024-03-22', grade:'95%' }].map(c => (
            <div key={c.id} className="pcard" style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap', marginBottom:12 }}>
              <div style={{ width:70, height:70, borderRadius:14, background:'rgba(0,201,122,.1)', border:'1px solid rgba(0,201,122,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <i className="fas fa-certificate" style={{ fontSize:30, color:'var(--c-green)' }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>Certificate of Completion</div>
                <div style={{ fontSize:13, color:'var(--c-text2)', marginBottom:3 }}>{c.course} &bull; {c.instructor}</div>
                <div style={{ fontSize:12, color:'var(--c-text3)' }}>
                  <i className="fas fa-calendar" style={{ marginRight:5 }} />Issued {c.date}
                  &nbsp;&bull;&nbsp;<i className="fas fa-chart-bar" style={{ marginRight:5 }} />Grade: <strong style={{ color:'var(--c-green)' }}>{c.grade}</strong>
                </div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => toast('i','','Preview opening...')}><i className="fas fa-eye" /> Preview</button>
                <button className="btn btn-red btn-sm" onClick={() => toast('s','','Certificate download started!')}><i className="fas fa-download" /> Download</button>
              </div>
            </div>
          ))}
          <div style={{ textAlign:'center', padding:'32px', color:'var(--c-text3)', fontSize:13 }}>
            Complete more courses to earn additional certificates.
          </div>
        </div>
      )}

      {/* Feature 11: Downloads */}
      {view === 'downloads' && (
        <div>
          <div className="info-box"><i className="fas fa-info-circle" />Offline downloads are available on Pro and Elite plans only.</div>
          <div style={{ textAlign:'center', padding:'60px 20px', color:'var(--c-text3)' }}>
            <i className="fas fa-download" style={{ fontSize:40, marginBottom:16, display:'block' }} />
            <div style={{ fontWeight:600, marginBottom:8 }}>No offline downloads</div>
            <div style={{ fontSize:13, marginBottom:20 }}>Use the VaultX mobile app to download content for offline viewing.</div>
            <button className="btn btn-red" onClick={() => toast('i','App','Check the App Store or Google Play for VaultX Mobile.')}><i className="fas fa-mobile-alt" /> Get Mobile App</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: PROGRESS  — Features 12-15
════════════════════════════════════════════════════════════ */
function ProgressSection({ toast }) {
  const [editReview, setEditReview] = useState(null);
  const today = MOCK_STREAK_DATA[MOCK_STREAK_DATA.length - 1].date;
  const currentStreak = 14;

  const heatColors = ['rgba(255,255,255,.05)','rgba(232,25,44,.2)','rgba(232,25,44,.4)','rgba(232,25,44,.65)','rgba(232,25,44,.9)'];

  return (
    <div className="sec-enter">
      {/* Feature 12: Watch Statistics */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-chart-bar" style={{ marginRight:8 }} />Watch Statistics</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))', gap:12, marginBottom:20 }}>
          {[
            { val:'124h', lbl:'Total Watched',    icon:'fa-clock',           col:'var(--c-red)' },
            { val:'78%',  lbl:'Avg Completion',   icon:'fa-percentage',      col:'var(--c-green)' },
            { val:'3',    lbl:'Courses Finished', icon:'fa-graduation-cap',  col:'var(--c-gold)' },
            { val:'4.8',  lbl:'Avg Review Given', icon:'fa-star',            col:'var(--c-gold)' },
          ].map((s,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,.03)', border:'1px solid var(--c-glass-bd)', borderRadius:12, padding:'16px 12px', textAlign:'center' }}>
              <i className={`fas ${s.icon}`} style={{ color:s.col, fontSize:20, marginBottom:10, display:'block' }} />
              <div style={{ fontFamily:'var(--font-d)', fontSize:28, letterSpacing:1, color:s.col }}>{s.val}</div>
              <div style={{ fontSize:10, color:'var(--c-text3)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.4px', marginTop:4 }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Simple bar chart — category breakdown */}
        <div style={{ fontSize:11, fontWeight:700, color:'var(--c-text3)', textTransform:'uppercase', letterSpacing:'.6px', marginBottom:14 }}>Hours by Category</div>
        {[
          { cat:'Filmmaking', hours:52, max:124 },
          { cat:'Fitness',    hours:38, max:124 },
          { cat:'Coding',     hours:20, max:124 },
          { cat:'Photography', hours:14, max:124 },
        ].map(row => (
          <div key={row.cat} style={{ marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:5 }}>
              <span style={{ color:'var(--c-text2)' }}>{row.cat}</span>
              <span style={{ color:'var(--c-text3)' }}>{row.hours}h</span>
            </div>
            <div style={{ height:6, background:'rgba(255,255,255,.06)', borderRadius:3 }}>
              <div style={{ height:'100%', background:'linear-gradient(90deg,var(--c-red),#ff8080)', borderRadius:3, width:`${(row.hours/row.max)*100}%`, transition:'width .6s var(--ease)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Feature 13: Learning Streak Calendar */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-fire" style={{ marginRight:8 }} />Learning Streak</span>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <i className="fas fa-fire" style={{ color:'var(--c-red)' }} />
            <span style={{ fontFamily:'var(--font-d)', fontSize:22, letterSpacing:1, color:'var(--c-red)' }}>{currentStreak}</span>
            <span style={{ fontSize:11, color:'var(--c-text2)' }}>days</span>
          </div>
        </div>
        <div style={{ overflowX:'auto', paddingBottom:8 }}>
          <div style={{ display:'flex', gap:3, flexWrap:'wrap', minWidth:600 }}>
            {MOCK_STREAK_DATA.map((d, i) => (
              <div key={d.date} className="hm-cell" title={`${d.date}: ${d.level > 0 ? d.level * 25 + 'min watched' : 'No activity'}`}
                style={{ background:heatColors[d.level] }} />
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:10, fontSize:10, color:'var(--c-text3)' }}>
            <span>Less</span>
            {heatColors.map((c,i) => <div key={i} style={{ width:10, height:10, borderRadius:2, background:c }} />)}
            <span>More</span>
          </div>
        </div>
        <div style={{ display:'flex', gap:16, marginTop:16, flexWrap:'wrap' }}>
          {[
            { lbl:'Longest Streak', val:'28 days', icon:'fa-medal' },
            { lbl:'Total Active Days', val:'61 days', icon:'fa-calendar-check' },
            { lbl:'This Month', val:'16 / 20 days', icon:'fa-chart-line' },
          ].map(s => (
            <div key={s.lbl} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--c-text2)' }}>
              <i className={`fas ${s.icon}`} style={{ color:'var(--c-red)' }} />
              <span>{s.lbl}:</span><strong style={{ color:'var(--c-text)' }}>{s.val}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Feature 14: Reviews Written */}
      <div className="pcard">
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-star" style={{ marginRight:8 }} />My Reviews</span>
        </div>
        {[
          { id:'r1', course:'Elite Fitness Protocol', rating:5, text:'Absolutely transformed my fitness routine. Marcus Steel is an incredible instructor.', date:'2024-03-25' },
          { id:'r2', course:'Master Cinematography', rating:5, text:'Best cinematography course I have ever taken. The lighting modules alone are worth it.', date:'2024-04-01' },
        ].map(rv => (
          <div key={rv.id} style={{ background:'rgba(255,255,255,.02)', border:'1px solid var(--c-glass-bd)', borderRadius:12, padding:16, marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8 }}>
              <div>
                <div style={{ fontWeight:700, marginBottom:4, fontSize:14 }}>{rv.course}</div>
                <div style={{ display:'flex', gap:2, marginBottom:8 }}>
                  {Array.from({length:5}).map((_,i) => <i key={i} className={`fas fa-star`} style={{ fontSize:11, color: i < rv.rating ? 'var(--c-gold)' : 'var(--c-text3)' }} />)}
                </div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button className="btn btn-ghost btn-xs" onClick={() => setEditReview(rv)}><i className="fas fa-edit" /> Edit</button>
                <button className="btn btn-danger btn-xs" onClick={() => toast('i','','Review deleted.')}><i className="fas fa-trash" /></button>
              </div>
            </div>
            <p style={{ fontSize:13, color:'var(--c-text2)', lineHeight:1.65, fontStyle:'italic' }}>"{rv.text}"</p>
            <div style={{ fontSize:11, color:'var(--c-text3)', marginTop:8 }}><i className="fas fa-calendar" style={{ marginRight:5 }} />{rv.date}</div>
          </div>
        ))}
      </div>

      {/* Edit Review Modal — Feature 15 */}
      {editReview && (
        <ReviewEditModal review={editReview} onClose={() => setEditReview(null)} toast={toast} />
      )}
    </div>
  );
}

function ReviewEditModal({ review, onClose, toast }) {
  const [text, setText] = useState(review.text);
  const [rating, setRating] = useState(review.rating);
  const [hover, setHover] = useState(0);
  const save = async () => {
    try { await api.updateReview(review.id, { text, rating }); } catch (_) {}
    toast('s','Review Updated','Your review has been updated successfully.');
    onClose();
  };
  return (
    <div className="modal-bd" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth:440 }}>
        <div className="modal-hdr"><div className="modal-ttl">EDIT REVIEW</div><button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button></div>
        <div className="modal-body">
          <div style={{ fontWeight:600, marginBottom:12 }}>{review.course}</div>
          <div style={{ display:'flex', gap:6, marginBottom:18 }}>
            {Array.from({length:5}).map((_,i) => (
              <i key={i} className="fas fa-star" onMouseEnter={() => setHover(i+1)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i+1)}
                style={{ fontSize:22, color: i < (hover || rating) ? 'var(--c-gold)' : 'var(--c-text3)', cursor:'pointer', transition:'color .15s' }} />
            ))}
          </div>
          <div className="form-group">
            <label className="lbl">Your Review</label>
            <textarea className="inp" rows={4} value={text} onChange={e => setText(e.target.value)} style={{ resize:'vertical' }} />
          </div>
          <button className="btn btn-red" style={{ width:'100%', justifyContent:'center', padding:'13px' }} onClick={save}>
            <i className="fas fa-save" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: PURCHASES  — Features 16-19
════════════════════════════════════════════════════════════ */
function PurchasesSection({ toast }) {
  const [tab, setTab] = useState('history');
  const [redeeming, setRedeeming] = useState(false);
  const [redeemAmt, setRedeemAmt] = useState('');

  return (
    <div className="sec-enter">
      <div style={{ display:'flex', gap:6, marginBottom:20, flexWrap:'wrap' }}>
        {[['history','fa-receipt','History'],['pending','fa-clock','Pending'],['invoices','fa-file-invoice','Invoices'],['points','fa-coins','Points']].map(([k,ic,lb]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding:'9px 18px', borderRadius:10, border:`1px solid ${tab===k?'rgba(232,25,44,.3)':'var(--c-glass-bd)'}`, background:tab===k?'rgba(232,25,44,.1)':'var(--c-glass)', color:tab===k?'var(--c-red)':'var(--c-text2)', fontSize:12, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:7, transition:'all .2s', fontFamily:'var(--font-b)' }}>
            <i className={`fas ${ic}`} /> {lb}
          </button>
        ))}
      </div>

      {/* Feature 16: Purchase History */}
      {tab === 'history' && (
        <div className="pcard" style={{ padding:0, overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table className="tbl">
              <thead><tr><th>Date</th><th>Content</th><th>Method</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {MOCK_HISTORY.map(h => (
                  <tr key={h.id}>
                    <td style={{ color:'var(--c-text2)', whiteSpace:'nowrap' }}>{h.date}</td>
                    <td style={{ fontWeight:600, maxWidth:180 }}>{h.item}</td>
                    <td style={{ color:'var(--c-text2)', fontSize:12 }}>{h.method}</td>
                    <td style={{ fontFamily:'var(--font-d)', fontSize:18, letterSpacing:1, color: h.status==='rejected' ? 'var(--c-text3)' : 'var(--c-text)' }}>${h.amount}</td>
                    <td><StatusBadge status={h.status} /></td>
                    <td>
                      {h.status === 'approved'
                        ? <button className="btn btn-ghost btn-xs" onClick={() => toast('s','','Invoice downloading...')}><i className="fas fa-download" /></button>
                        : h.status === 'rejected'
                          ? <button className="btn btn-danger btn-xs" onClick={() => toast('i','','Please contact support for assistance.')}><i className="fas fa-redo" /></button>
                          : <span style={{ fontSize:11, color:'var(--c-text3)' }}>Under review</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Feature 17: Pending Payments */}
      {tab === 'pending' && (
        <div>
          {MOCK_HISTORY.filter(h => h.status === 'pending').map(h => (
            <div key={h.id} className="ticket" style={{ marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8 }}>
                <div>
                  <div style={{ fontWeight:700, marginBottom:4 }}>{h.item}</div>
                  <div style={{ fontSize:12, color:'var(--c-text2)' }}><i className="fas fa-calendar" style={{ marginRight:5 }} />{h.date} &bull; {h.method}</div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontFamily:'var(--font-d)', fontSize:20, color:'var(--c-gold)' }}>${h.amount}</span>
                  <StatusBadge status="pending" />
                </div>
              </div>
              <div className="divider" style={{ margin:'14px 0' }} />
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
                <div style={{ fontSize:12, color:'var(--c-text3)' }}>
                  <i className="fas fa-info-circle" style={{ marginRight:5 }} />Payment proof submitted and awaiting admin review (within 24h).
                </div>
                <button className="btn btn-ghost btn-xs" onClick={() => toast('i','','Contact our support team for updates on your payment.')}><i className="fas fa-headset" /> Contact Support</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feature 18: Invoices */}
      {tab === 'invoices' && (
        <div>
          {MOCK_HISTORY.filter(h => h.status === 'approved').map(h => (
            <div key={h.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 18px', background:'var(--c-glass)', border:'1px solid var(--c-glass-bd)', borderRadius:12, marginBottom:10, flexWrap:'wrap', gap:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:'rgba(232,25,44,.1)', border:'1px solid rgba(232,25,44,.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <i className="fas fa-file-invoice" style={{ color:'var(--c-red)' }} />
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:13 }}>INV-{h.id.toUpperCase()}</div>
                  <div style={{ fontSize:12, color:'var(--c-text2)' }}>{h.item} &bull; {h.date}</div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontFamily:'var(--font-d)', fontSize:18 }}>${h.amount}</span>
                <button className="btn btn-ghost btn-sm" onClick={() => toast('s','','Invoice PDF downloading!')}><i className="fas fa-download" /> PDF</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feature 19: Loyalty Points */}
      {tab === 'points' && (
        <div>
          <div className="pcard" style={{ textAlign:'center', marginBottom:16 }}>
            <div style={{ fontSize:11, color:'var(--c-text2)', fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginBottom:10 }}>Available Balance</div>
            <div style={{ fontFamily:'var(--font-d)', fontSize:64, letterSpacing:3, background:'linear-gradient(135deg,var(--c-gold),#f5d98a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1, marginBottom:8 }}>2,450</div>
            <div style={{ fontSize:13, color:'var(--c-text2)', marginBottom:24 }}>VaultX Points &bull; Worth approx. <strong style={{ color:'var(--c-text)' }}>$24.50</strong></div>
            <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
              <button className="btn btn-red" onClick={() => setRedeeming(true)}><i className="fas fa-gift" /> Redeem Points</button>
              <button className="btn btn-ghost" onClick={() => toast('i','','Points history showing.')}><i className="fas fa-history" /> History</button>
            </div>
          </div>
          <div className="pcard" style={{ padding:0, overflow:'hidden' }}>
            <div style={{ padding:'16px 18px', borderBottom:'1px solid var(--c-glass-bd)', fontSize:12, fontWeight:700, color:'var(--c-text3)', textTransform:'uppercase', letterSpacing:'.6px' }}>Points History</div>
            {[
              { date:'2024-04-10', desc:'Purchase — Master Cinematography', pts:'+300', col:'var(--c-green)' },
              { date:'2024-03-22', desc:'Purchase — Elite Fitness Protocol', pts:'+200', col:'var(--c-green)' },
              { date:'2024-03-01', desc:'Referral Bonus', pts:'+500', col:'var(--c-blue)' },
              { date:'2024-02-14', desc:'Course Completion Bonus', pts:'+150', col:'var(--c-gold)' },
              { date:'2024-01-30', desc:'Redeemed for Discount', pts:'-200', col:'var(--c-red)' },
            ].map((row, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 18px', borderBottom:'1px solid rgba(255,255,255,.03)' }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:500 }}>{row.desc}</div>
                  <div style={{ fontSize:11, color:'var(--c-text3)', marginTop:2 }}>{row.date}</div>
                </div>
                <span style={{ fontFamily:'var(--font-d)', fontSize:18, letterSpacing:1, color:row.col }}>{row.pts}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: SECURITY  — Features 20-25
════════════════════════════════════════════════════════════ */
function SecuritySection({ toast }) {
  const [pw, setPw] = useState({ old:'', new:'', confirm:'' });
  const [show2FA, setShow2FA] = useState(false);
  const [is2FAEnabled, set2FAEnabled] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [keys, setKeys] = useState([
    { id:'k1', name:'Production App', key:'vx_sk_live_••••••••••••3f9a', created:'2024-03-01', lastUsed:'Today' },
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [showNewKey, setShowNewKey] = useState(null);
  const strength = pwStrength(pw.new);

  const changePw = async () => {
    if (!pw.old || !pw.new || !pw.confirm) { toast('w','','Please fill in all password fields.'); return; }
    if (pw.new !== pw.confirm) { toast('w','','New passwords do not match.'); return; }
    if (strength.score < 2) { toast('w','','Password is too weak.'); return; }
    try { await api.changePassword({ oldPassword: pw.old, newPassword: pw.new }); } catch (_) {}
    toast('s','Password Changed','Your password has been updated securely.');
    setPw({ old:'', new:'', confirm:'' });
  };

  const revokeSession = (id) => {
    toast('s','Session Revoked','Device has been signed out.');
  };

  const createKey = async () => {
    if (!newKeyName) { toast('w','','Please enter a name for the API key.'); return; }
    const fake = `vx_sk_live_${Math.random().toString(36).slice(2,14)}`;
    setShowNewKey(fake);
    setKeys(k => [...k, { id:`k${Date.now()}`, name:newKeyName, key:`vx_sk_live_••••${fake.slice(-4)}`, created:new Date().toISOString().slice(0,10), lastUsed:'Never' }]);
    setNewKeyName('');
    try { await api.createApiKey({ name:newKeyName }); } catch (_) {}
  };

  return (
    <div className="sec-enter">
      {/* Feature 20: Change Password */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-lock" style={{ marginRight:8 }} />Change Password</span></div>
        <div className="form-group">
          <label className="lbl">Current Password</label>
          <input className="inp" type="password" placeholder="••••••••" value={pw.old} onChange={e => setPw(p=>({...p,old:e.target.value}))} />
        </div>
        <div className="form-group">
          <label className="lbl">New Password</label>
          <input className="inp" type="password" placeholder="••••••••" value={pw.new} onChange={e => setPw(p=>({...p,new:e.target.value}))} />
          {pw.new && (
            <>
              <div className="str-bar"><div className="str-fill" style={{ width:`${(strength.score/5)*100}%`, background:strength.color }} /></div>
              <div style={{ fontSize:11, color:strength.color, marginTop:5, fontWeight:600 }}>{strength.label}</div>
            </>
          )}
        </div>
        <div className="form-group">
          <label className="lbl">Confirm New Password</label>
          <input className="inp" type="password" placeholder="••••••••" value={pw.confirm} onChange={e => setPw(p=>({...p,confirm:e.target.value}))} />
          {pw.confirm && pw.new !== pw.confirm && <div style={{ fontSize:11, color:'var(--c-red)', marginTop:5 }}><i className="fas fa-times" style={{ marginRight:4 }} />Passwords do not match</div>}
          {pw.confirm && pw.new === pw.confirm && pw.new && <div style={{ fontSize:11, color:'var(--c-green)', marginTop:5 }}><i className="fas fa-check" style={{ marginRight:4 }} />Passwords match</div>}
        </div>
        <button className="btn btn-red" onClick={changePw}><i className="fas fa-key" /> Update Password</button>
      </div>

      {/* Feature 21: Two-Factor Authentication */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-shield-alt" style={{ marginRight:8 }} />Two-Factor Authentication</span>
          {is2FAEnabled ? <span className="badge badge-free"><i className="fas fa-check" /> Enabled</span> : <span className="badge badge-new"><i className="fas fa-times" /> Disabled</span>}
        </div>
        <p style={{ fontSize:13, color:'var(--c-text2)', lineHeight:1.7, marginBottom:16 }}>
          Add an extra layer of security by requiring a verification code whenever you sign in on a new device.
        </p>
        {!is2FAEnabled ? (
          <button className="btn btn-red" onClick={() => setShow2FA(true)}><i className="fas fa-mobile-alt" /> Enable 2FA</button>
        ) : (
          <button className="btn btn-danger" onClick={() => { set2FAEnabled(false); toast('i','2FA Disabled','Two-factor authentication has been turned off.'); }}><i className="fas fa-shield-alt" /> Disable 2FA</button>
        )}

        {show2FA && (
          <div style={{ marginTop:20, padding:20, background:'rgba(232,25,44,.04)', border:'1px solid rgba(232,25,44,.1)', borderRadius:12 }}>
            <div style={{ display:'flex', gap:24, flexWrap:'wrap', alignItems:'flex-start' }}>
              <div className="qr-box">
                <i className="fas fa-qrcode" style={{ fontSize:80, color:'#222' }} />
                <span>Scan with app</span>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, marginBottom:8 }}>Step 1: Install an authenticator app</div>
                <p style={{ fontSize:13, color:'var(--c-text2)', lineHeight:1.6, marginBottom:14 }}>Use Google Authenticator, Authy, or any TOTP app. Scan the QR code or enter the setup key manually.</p>
                <div style={{ background:'rgba(0,0,0,.3)', borderRadius:8, padding:'10px 14px', fontFamily:'monospace', fontSize:13, marginBottom:14, letterSpacing:2 }}>VXLT-H4AP-Q7NK-2M9R</div>
                <div style={{ fontWeight:700, marginBottom:8 }}>Step 2: Enter verification code</div>
                <div style={{ display:'flex', gap:10 }}>
                  <input className="inp" placeholder="6-digit code" maxLength={6} value={otpCode} onChange={e => setOtpCode(e.target.value)} style={{ maxWidth:160 }} />
                  <button className="btn btn-red" onClick={() => { if (otpCode.length === 6) { set2FAEnabled(true); setShow2FA(false); toast('s','2FA Enabled','Your account is now protected with two-factor authentication.'); } else { toast('w','','Please enter a 6-digit code.'); } }}>
                    <i className="fas fa-check" /> Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feature 22: Active Sessions */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-desktop" style={{ marginRight:8 }} />Active Sessions</span>
          <button className="btn btn-danger btn-sm" onClick={() => toast('s','','All other sessions revoked.')}><i className="fas fa-sign-out-alt" /> Revoke All Others</button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {MOCK_SESSIONS.map(s => (
            <div key={s.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:'rgba(255,255,255,.02)', border:'1px solid var(--c-glass-bd)', borderRadius:12, flexWrap:'wrap', gap:10 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:s.current?'rgba(232,25,44,.1)':'rgba(255,255,255,.04)', border:`1px solid ${s.current?'rgba(232,25,44,.25)':'var(--c-glass-bd)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <i className={`fas ${s.device.includes('iPhone') || s.device.includes('Mobile') ? 'fa-mobile-alt' : 'fa-desktop'}`} style={{ color:s.current?'var(--c-red)':'var(--c-text2)' }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                  <span style={{ fontWeight:600, fontSize:13 }}>{s.device}</span>
                  {s.current && <span className="badge badge-free" style={{ fontSize:9 }}>Current</span>}
                </div>
                <div style={{ fontSize:11, color:'var(--c-text3)' }}>
                  <i className="fas fa-map-marker-alt" style={{ marginRight:4 }} />{s.location} &nbsp;&bull;&nbsp;
                  <i className="fas fa-clock" style={{ marginRight:4 }} />{s.lastActive}
                </div>
              </div>
              {!s.current && (
                <button className="btn btn-danger btn-sm" onClick={() => revokeSession(s.id)}>
                  <i className="fas fa-times" /> Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature 23: Connected Accounts */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-link" style={{ marginRight:8 }} />Connected Accounts</span></div>
        {[
          { provider:'google', icon:'fa-google', label:'Google', connected:true, email:'jordan@gmail.com' },
          { provider:'github', icon:'fa-github', label:'GitHub', connected:false },
          { provider:'twitter',icon:'fa-twitter',label:'Twitter', connected:false },
        ].map(acc => (
          <div key={acc.provider} className="tog-wrap" style={{ marginBottom:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:9, background:'var(--c-glass)', border:'1px solid var(--c-glass-bd)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <i className={`fab ${acc.icon}`} style={{ fontSize:16, color: acc.connected ? 'var(--c-text)' : 'var(--c-text3)' }} />
              </div>
              <div>
                <div style={{ fontWeight:600, fontSize:13 }}>{acc.label}</div>
                <div style={{ fontSize:11, color:'var(--c-text3)' }}>{acc.connected ? acc.email : 'Not connected'}</div>
              </div>
            </div>
            {acc.connected
              ? <button className="btn btn-danger btn-sm" onClick={() => toast('i','','Account unlinked.')}><i className="fas fa-unlink" /> Unlink</button>
              : <button className="btn btn-ghost btn-sm" onClick={() => toast('i','Coming Soon',`${acc.label} OAuth integration pending.`)}><i className="fas fa-link" /> Connect</button>
            }
          </div>
        ))}
      </div>

      {/* Feature 24: API Keys */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-code" style={{ marginRight:8 }} />API Keys</span><span className="badge badge-blue">Developer</span></div>
        <div className="info-box"><i className="fas fa-info-circle" />API keys grant programmatic access to your VaultX account. Keep them secret and rotate them regularly.</div>
        {showNewKey && (
          <div style={{ background:'rgba(0,201,122,.05)', border:'1px solid rgba(0,201,122,.15)', borderRadius:10, padding:'14px 16px', marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'var(--c-green)', marginBottom:8 }}><i className="fas fa-exclamation-triangle" style={{ marginRight:5 }} />Copy this key now — it will not be shown again.</div>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <code style={{ flex:1, fontFamily:'monospace', fontSize:12, background:'rgba(0,0,0,.3)', padding:'8px 12px', borderRadius:8, color:'var(--c-green)', wordBreak:'break-all' }}>{showNewKey}</code>
              <button className="btn btn-ghost btn-sm" onClick={() => copy(showNewKey, toast)}><i className="fas fa-copy" /></button>
            </div>
            <button className="btn btn-xs" style={{ marginTop:10, background:'transparent', border:'none', color:'var(--c-text3)' }} onClick={() => setShowNewKey(null)}>Dismiss</button>
          </div>
        )}
        {keys.map(k => (
          <div key={k.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid var(--c-glass-bd)', flexWrap:'wrap', gap:10 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:13, marginBottom:3 }}>{k.name}</div>
              <code style={{ fontSize:12, color:'var(--c-text2)', fontFamily:'monospace' }}>{k.key}</code>
              <div style={{ fontSize:11, color:'var(--c-text3)', marginTop:3 }}>Created {k.created} &bull; Last used: {k.lastUsed}</div>
            </div>
            <button className="btn btn-danger btn-xs" onClick={() => { setKeys(ks => ks.filter(x => x.id !== k.id)); toast('s','','API key revoked.'); }}><i className="fas fa-trash" /> Revoke</button>
          </div>
        ))}
        <div style={{ display:'flex', gap:10, marginTop:16 }}>
          <input className="inp" placeholder="Key name (e.g. My App)" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} style={{ flex:1 }} />
          <button className="btn btn-red" onClick={createKey}><i className="fas fa-plus" /> Create</button>
        </div>
      </div>

      {/* Feature 25: Privacy Settings */}
      <div className="pcard">
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-user-secret" style={{ marginRight:8 }} />Privacy Settings</span></div>
        {[
          { key:'profilePublic',   label:'Public Profile',          desc:'Allow anyone to view your profile page' },
          { key:'showActivity',    label:'Activity Status',         desc:'Show when you were last active' },
          { key:'showProgress',    label:'Learning Progress',       desc:'Display your course progress publicly' },
          { key:'dataAnalytics',   label:'Analytics & Improvement', desc:'Help us improve VaultX with usage data' },
        ].map((item, i) => {
          const [on, setOn] = useState(i < 2);
          return (
            <div key={item.key} className="tog-wrap" style={{ marginBottom:10 }}>
              <div>
                <div style={{ fontWeight:600, fontSize:13, marginBottom:3 }}>{item.label}</div>
                <div style={{ fontSize:11, color:'var(--c-text3)' }}>{item.desc}</div>
              </div>
              <label className="tog"><input type="checkbox" checked={on} onChange={() => { setOn(!on); toast('s','Saved','Privacy setting updated.'); }} /><span className="tog-slider" /></label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: SETTINGS  — Features 26-30
════════════════════════════════════════════════════════════ */
function SettingsSection({ user, setUser, toast }) {
  const [form, setForm] = useState({
    name: user.name, username: user.username.replace('@',''), bio: user.bio, website: user.website,
  });
  const [social, setSocial] = useState(user.social);
  const [locale, setLocale] = useState({ language:'en', timezone:'UTC+1', dateFormat:'DD/MM/YYYY' });
  const [favCats, setFavCats] = useState(['Filmmaking','Fitness']);
  const [newsletter, setNewsletter] = useState({ weekly:true, newContent:true, promos:false, tips:true });
  const [notifs, setNotifs] = useState({ email_purchase:true, email_progress:true, email_promo:false, push_new:true, push_review:false });
  const [saving, setSaving] = useState(false);

  const ALL_CATS = ['Filmmaking','Music','Fitness','Design','Photography','Finance','Coding','Business','Health','Travel'];

  const saveProfile = async () => {
    setSaving(true);
    try { await api.updateProfile({ ...form, username: '@' + form.username }); } catch (_) {}
    setTimeout(() => {
      setUser(u => ({ ...u, name: form.name, bio: form.bio, website: form.website, username: '@' + form.username }));
      setSaving(false);
      toast('s','Profile Saved','Your profile has been updated successfully.');
    }, 800);
  };

  const saveSocial = async () => {
    try { await api.updateSocialLinks(social); } catch (_) {}
    toast('s','Social Links Saved','Your social links have been updated.');
  };

  return (
    <div className="sec-enter">
      {/* Feature 26: Edit Profile */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-user-edit" style={{ marginRight:8 }} />Edit Profile</span></div>
        <div className="form-row">
          <div className="form-group">
            <label className="lbl">Full Name</label>
            <input className="inp" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} />
          </div>
          <div className="form-group">
            <label className="lbl">Username</label>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--c-text3)', fontSize:14, pointerEvents:'none' }}>@</span>
              <input className="inp" style={{ paddingLeft:28 }} value={form.username} onChange={e => setForm(f=>({...f,username:e.target.value.replace('@','')}))} />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="lbl">Bio</label>
          <textarea className="inp" rows={3} placeholder="Tell the world about yourself..." value={form.bio} onChange={e => setForm(f=>({...f,bio:e.target.value}))} />
          <div style={{ textAlign:'right', fontSize:11, color:'var(--c-text3)', marginTop:4 }}>{form.bio.length}/200</div>
        </div>
        <div className="form-group">
          <label className="lbl">Website</label>
          <div style={{ position:'relative' }}>
            <i className="fas fa-globe" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--c-text3)', fontSize:13, pointerEvents:'none' }} />
            <input className="inp" style={{ paddingLeft:36 }} placeholder="https://yourwebsite.com" value={form.website} onChange={e => setForm(f=>({...f,website:e.target.value}))} />
          </div>
        </div>
        <div className="form-group">
          <label className="lbl">Public Profile URL</label>
          <div style={{ display:'flex', gap:10 }}>
            <input className="inp" readOnly value={`https://vaultx.io/@${form.username || 'yourname'}`} style={{ color:'var(--c-text2)' }} />
            <button className="btn btn-ghost btn-sm" style={{ flexShrink:0 }} onClick={() => copy(`https://vaultx.io/@${form.username}`, toast)}><i className="fas fa-copy" /></button>
          </div>
        </div>
        <button className="btn btn-red" onClick={saveProfile} disabled={saving}>
          {saving ? <><i className="fas fa-spinner fa-spin" /> Saving...</> : <><i className="fas fa-save" /> Save Profile</>}
        </button>
      </div>

      {/* Feature 27: Social Links */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-share-alt" style={{ marginRight:8 }} />Social Links</span></div>
        {[
          { key:'twitter',   icon:'fa-twitter',   label:'Twitter',   placeholder:'username' },
          { key:'instagram', icon:'fa-instagram', label:'Instagram', placeholder:'username' },
          { key:'youtube',   icon:'fa-youtube',   label:'YouTube',   placeholder:'channel handle' },
          { key:'linkedin',  icon:'fa-linkedin',  label:'LinkedIn',  placeholder:'profile URL or username' },
          { key:'github',    icon:'fa-github',    label:'GitHub',    placeholder:'username' },
        ].map(s => (
          <div key={s.key} className="form-group">
            <label className="lbl"><i className={`fab ${s.icon}`} style={{ marginRight:6 }} />{s.label}</label>
            <div style={{ position:'relative' }}>
              <i className={`fab ${s.icon}`} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--c-text3)', fontSize:13, pointerEvents:'none' }} />
              <input className="inp" style={{ paddingLeft:38 }} placeholder={s.placeholder} value={social[s.key]} onChange={e => setSocial(so=>({...so,[s.key]:e.target.value}))} />
            </div>
          </div>
        ))}
        <button className="btn btn-red" onClick={saveSocial}><i className="fas fa-save" /> Save Social Links</button>
      </div>

      {/* Feature 28: Language & Region */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-globe-americas" style={{ marginRight:8 }} />Language & Region</span></div>
        <div className="form-row">
          <div className="form-group">
            <label className="lbl">Language</label>
            <select className="inp" style={{ cursor:'pointer' }} value={locale.language} onChange={e => { setLocale(l=>({...l,language:e.target.value})); toast('s','','Language updated.'); }}>
              {[['en','English'],['es','Español'],['fr','Français'],['de','Deutsch'],['ja','日本語'],['pt','Português'],['ar','العربية']].map(([v,lb]) => <option key={v} value={v}>{lb}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="lbl">Timezone</label>
            <select className="inp" style={{ cursor:'pointer' }} value={locale.timezone} onChange={e => setLocale(l=>({...l,timezone:e.target.value}))}>
              {['UTC-8','UTC-5','UTC','UTC+1','UTC+3','UTC+5:30','UTC+8','UTC+9','UTC+10'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="lbl">Date Format</label>
          <select className="inp" style={{ cursor:'pointer', maxWidth:200 }} value={locale.dateFormat} onChange={e => setLocale(l=>({...l,dateFormat:e.target.value}))}>
            {['DD/MM/YYYY','MM/DD/YYYY','YYYY-MM-DD'].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <button className="btn btn-red btn-sm" onClick={() => { api.updateLanguage(locale); toast('s','Saved','Language & region preferences updated.'); }}><i className="fas fa-check" /> Save Preferences</button>
      </div>

      {/* Feature 29: Favorite Categories */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-heart" style={{ marginRight:8 }} />Favorite Categories</span>
          <span style={{ fontSize:12, color:'var(--c-text2)' }}>Personalizes recommendations</span>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16 }}>
          {ALL_CATS.map(c => (
            <button key={c} onClick={() => {
              setFavCats(f => f.includes(c) ? f.filter(x=>x!==c) : [...f,c]);
              api.setFavoriteCategories({ categories: favCats.includes(c) ? favCats.filter(x=>x!==c) : [...favCats,c] }).catch(()=>{});
            }} style={{ padding:'8px 18px', borderRadius:50, fontSize:12, fontWeight:500, border:`1px solid ${favCats.includes(c)?'var(--c-red)':'var(--c-glass-bd)'}`, background:favCats.includes(c)?'rgba(232,25,44,.1)':'var(--c-glass)', color:favCats.includes(c)?'var(--c-red)':'var(--c-text2)', cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-b)' }}>
              {favCats.includes(c) && <i className="fas fa-check" style={{ marginRight:5 }} />}{c}
            </button>
          ))}
        </div>
        <div style={{ fontSize:12, color:'var(--c-text3)' }}>{favCats.length} categories selected</div>
      </div>

      {/* Feature 30: Notification Preferences */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-bell" style={{ marginRight:8 }} />Notification Preferences</span></div>
        <div style={{ fontSize:11, fontWeight:700, color:'var(--c-text3)', textTransform:'uppercase', letterSpacing:'.6px', marginBottom:12 }}>Email Notifications</div>
        {[
          { key:'email_purchase', label:'Purchase Confirmations', desc:'When a payment is confirmed' },
          { key:'email_progress', label:'Learning Updates', desc:'Weekly progress summaries' },
          { key:'email_promo',    label:'Promotions & Deals', desc:'Special offers and discounts' },
        ].map(item => (
          <div key={item.key} className="tog-wrap" style={{ marginBottom:10 }}>
            <div><div style={{ fontWeight:600, fontSize:13, marginBottom:3 }}>{item.label}</div><div style={{ fontSize:11, color:'var(--c-text3)' }}>{item.desc}</div></div>
            <label className="tog"><input type="checkbox" checked={notifs[item.key]} onChange={() => setNotifs(n=>({...n,[item.key]:!n[item.key]}))} /><span className="tog-slider" /></label>
          </div>
        ))}
        <div style={{ fontSize:11, fontWeight:700, color:'var(--c-text3)', textTransform:'uppercase', letterSpacing:'.6px', margin:'18px 0 12px' }}>Push Notifications</div>
        {[
          { key:'push_new',    label:'New Content Alerts', desc:'When new courses are published' },
          { key:'push_review', label:'Review Responses',  desc:'When creators respond to your reviews' },
        ].map(item => (
          <div key={item.key} className="tog-wrap" style={{ marginBottom:10 }}>
            <div><div style={{ fontWeight:600, fontSize:13, marginBottom:3 }}>{item.label}</div><div style={{ fontSize:11, color:'var(--c-text3)' }}>{item.desc}</div></div>
            <label className="tog"><input type="checkbox" checked={notifs[item.key]} onChange={() => setNotifs(n=>({...n,[item.key]:!n[item.key]}))} /><span className="tog-slider" /></label>
          </div>
        ))}
        <button className="btn btn-red btn-sm" style={{ marginTop:6 }} onClick={() => { api.updateNotifPrefs(notifs).catch(()=>{}); toast('s','Saved','Notification preferences updated.'); }}><i className="fas fa-save" /> Save Preferences</button>
      </div>

      {/* Feature 31: Newsletter */}
      <div className="pcard">
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-newspaper" style={{ marginRight:8 }} />Newsletter</span></div>
        {[
          { key:'weekly',     label:'Weekly Digest', desc:'Top picks and platform news every Monday' },
          { key:'newContent', label:'New Content',   desc:'Instant alert when new courses launch' },
          { key:'tips',       label:'Learning Tips', desc:'Expert tips and tricks weekly' },
          { key:'promos',     label:'Promotions',    desc:'Exclusive deals and limited-time offers' },
        ].map(item => (
          <div key={item.key} className="tog-wrap" style={{ marginBottom:10 }}>
            <div><div style={{ fontWeight:600, fontSize:13, marginBottom:3 }}>{item.label}</div><div style={{ fontSize:11, color:'var(--c-text3)' }}>{item.desc}</div></div>
            <label className="tog"><input type="checkbox" checked={newsletter[item.key]} onChange={() => setNewsletter(n=>({...n,[item.key]:!n[item.key]}))} /><span className="tog-slider" /></label>
          </div>
        ))}
        <button className="btn btn-red btn-sm" style={{ marginTop:6 }} onClick={() => { api.updateNewsletter(newsletter).catch(()=>{}); toast('s','Saved','Newsletter preferences saved.'); }}><i className="fas fa-save" /> Save</button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: BILLING & PLANS  — Features 32-33
════════════════════════════════════════════════════════════ */
function BillingSection({ user, toast }) {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  return (
    <div className="sec-enter">
      {/* Feature 32: Current Plan */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-crown" style={{ marginRight:8 }} />Current Plan</span></div>
        <div style={{ display:'flex', alignItems:'center', gap:16, padding:'16px', background:'rgba(232,25,44,.05)', border:'1px solid rgba(232,25,44,.12)', borderRadius:12, marginBottom:20, flexWrap:'wrap' }}>
          <div style={{ width:50, height:50, borderRadius:14, background:'linear-gradient(135deg,var(--c-red),var(--c-red-dk))', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <i className="fas fa-crown" style={{ color:'#fff', fontSize:22 }} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'var(--font-d)', fontSize:24, letterSpacing:2 }}>{user.plan} Plan</div>
            <div style={{ fontSize:13, color:'var(--c-text2)' }}>Active since Aug 2023 &bull; Renews monthly</div>
          </div>
          <button className="btn btn-red" onClick={() => setShowUpgrade(true)}><i className="fas fa-arrow-up" /> Upgrade to Elite</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10 }}>
          {['Unlimited premium content','Priority support','Download offline','Course certificates','Early access to new content'].map(f => (
            <div key={f} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--c-text2)' }}>
              <i className="fas fa-check-circle" style={{ color:'var(--c-green)', fontSize:12 }} />{f}
            </div>
          ))}
        </div>
      </div>

      {/* Feature 33: Plan Comparison */}
      {showUpgrade && (
        <div className="pcard" style={{ marginBottom:16 }}>
          <div className="pcard-hdr">
            <span className="pcard-title"><i className="fas fa-layer-group" style={{ marginRight:8 }} />Choose Your Plan</span>
            <button className="modal-close" onClick={() => setShowUpgrade(false)}><i className="fas fa-times" /></button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14 }}>
            {PLAN_TIERS.map(plan => (
              <div key={plan.name} onClick={() => setSelectedPlan(plan.name)} style={{ padding:20, borderRadius:14, border:`2px solid ${selectedPlan===plan.name ? plan.color : 'var(--c-glass-bd)'}`, background: selectedPlan===plan.name ? `rgba(${plan.name==='Pro'?'232,25,44':plan.name==='Elite'?'212,168,67':'0,201,122'},.06)` : 'var(--c-glass)', cursor:'pointer', transition:'all .25s', position:'relative' }}>
                {plan.popular && <div style={{ position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)', background:plan.color, color:'#fff', fontSize:9, fontWeight:700, letterSpacing:1, padding:'3px 12px', borderRadius:50, whiteSpace:'nowrap' }}>MOST POPULAR</div>}
                <div style={{ fontFamily:'var(--font-d)', fontSize:22, letterSpacing:2, color:plan.color, marginBottom:4 }}>{plan.name}</div>
                <div style={{ marginBottom:14 }}>
                  <span style={{ fontFamily:'var(--font-d)', fontSize:32, color:'var(--c-text)' }}>${plan.price}</span>
                  <span style={{ fontSize:12, color:'var(--c-text3)' }}>/mo</span>
                </div>
                {plan.features.map(f => (
                  <div key={f} style={{ display:'flex', alignItems:'flex-start', gap:7, fontSize:12, color:'var(--c-text2)', marginBottom:7 }}>
                    <i className="fas fa-check" style={{ color:plan.color, marginTop:2, flexShrink:0 }} />{f}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button className="btn btn-red" style={{ marginTop:18, width:'100%', justifyContent:'center', padding:'14px' }} onClick={() => { api.upgradeSubscription({ plan: selectedPlan }).catch(()=>{}); toast('s','Plan Updated!',`You are now on the ${selectedPlan} plan.`); setShowUpgrade(false); }}>
            <i className="fas fa-arrow-up" /> Upgrade to {selectedPlan}
          </button>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: AFFILIATE  — Features 34-36
════════════════════════════════════════════════════════════ */
function AffiliateSection({ toast }) {
  const refCode = 'VAULTX-JBLAKE';
  const refLink = `https://vaultx.io/ref/${refCode}`;
  const [payoutMethod, setPayoutMethod] = useState('');
  const [payoutAmt, setPayoutAmt] = useState('');

  return (
    <div className="sec-enter">
      {/* Feature 34: Referral Program */}
      <div className="pcard" style={{ marginBottom:16, background:'linear-gradient(135deg,rgba(139,0,0,.15) 0%,rgba(7,7,7,1) 100%)', border:'1px solid rgba(232,25,44,.15)' }}>
        <div style={{ textAlign:'center', padding:'10px 0 20px' }}>
          <i className="fas fa-users" style={{ fontSize:36, color:'var(--c-red)', marginBottom:14, display:'block' }} />
          <div className="sh grad-r" style={{ fontSize:'clamp(24px,4vw,36px)', marginBottom:8 }}>REFER & EARN</div>
          <p style={{ fontSize:14, color:'var(--c-text2)', lineHeight:1.7, marginBottom:20, maxWidth:440, margin:'0 auto 20px' }}>
            Share your unique link and earn <strong style={{ color:'var(--c-text)' }}>$5 credit</strong> for every friend who signs up, plus <strong style={{ color:'var(--c-text)' }}>10% commission</strong> on their first purchase.
          </p>
          <div style={{ display:'flex', gap:10, maxWidth:480, margin:'0 auto 14px' }}>
            <input className="inp" readOnly value={refLink} style={{ color:'var(--c-text2)', fontFamily:'monospace', fontSize:12 }} />
            <button className="btn btn-red" style={{ flexShrink:0 }} onClick={() => copy(refLink, toast)}><i className="fas fa-copy" /> Copy</button>
          </div>
          <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap' }}>
            <div style={{ background:'rgba(255,255,255,.05)', borderRadius:8, padding:'6px 14px', fontSize:11, fontWeight:700, letterSpacing:1 }}>
              Code: <span style={{ color:'var(--c-red)', fontFamily:'monospace' }}>{refCode}</span>
            </div>
            {[['fa-twitter','Twitter'],['fa-whatsapp','WhatsApp'],['fa-telegram','Telegram']].map(([ic,lb]) => (
              <button key={lb} className="btn btn-ghost btn-xs" onClick={() => toast('i','','Opening share dialog...')}>
                <i className={`fab ${ic}`} /> {lb}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature 35: Referral Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:12, marginBottom:16 }}>
        {[
          { val:'12', lbl:'Total Referrals', icon:'fa-users', col:'var(--c-blue)' },
          { val:'7',  lbl:'Converted',       icon:'fa-check', col:'var(--c-green)' },
          { val:'$35',lbl:'Credits Earned',  icon:'fa-dollar-sign', col:'var(--c-gold)' },
          { val:'58%',lbl:'Conversion Rate', icon:'fa-chart-line', col:'var(--c-red)' },
        ].map((s,i) => (
          <div key={i} className="stat-pill">
            <i className={`fas ${s.icon}`} style={{ color:s.col, fontSize:18, marginBottom:4 }} />
            <div className="val" style={{ fontSize:26 }}>{s.val}</div>
            <div className="lbl2">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Feature 36: Affiliate Dashboard */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-chart-line" style={{ marginRight:8 }} />Affiliate Earnings</span></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:12, marginBottom:20 }}>
          {[
            { val:'$142.50', lbl:'Total Earnings',   col:'var(--c-green)' },
            { val:'$0.00',   lbl:'Pending Payout',   col:'var(--c-gold)' },
            { val:'$110.00', lbl:'Paid Out',          col:'var(--c-text2)' },
            { val:'25%',     lbl:'Commission Rate',  col:'var(--c-red)' },
          ].map((s,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,.02)', border:'1px solid var(--c-glass-bd)', borderRadius:12, padding:'14px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-d)', fontSize:24, color:s.col, letterSpacing:1 }}>{s.val}</div>
              <div style={{ fontSize:10, color:'var(--c-text3)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.4px', marginTop:4 }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize:11, fontWeight:700, color:'var(--c-text3)', textTransform:'uppercase', letterSpacing:'.6px', marginBottom:14 }}>Request Payout</div>
        <div className="info-box"><i className="fas fa-info-circle" />Minimum payout is $50. Payouts are processed within 5-7 business days.</div>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          <select className="inp" style={{ flex:1, minWidth:140, cursor:'pointer' }} value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)}>
            <option value="">Select method</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
            <option value="crypto">Crypto (USDT)</option>
          </select>
          <input className="inp" style={{ flex:1, minWidth:120 }} placeholder="Amount ($)" type="number" min="50" value={payoutAmt} onChange={e => setPayoutAmt(e.target.value)} />
          <button className="btn btn-red" onClick={() => { if (!payoutMethod || !payoutAmt) { toast('w','','Please select a method and enter amount.'); return; } api.requestPayout({ method:payoutMethod, amount:payoutAmt }).catch(()=>{}); toast('s','Payout Requested',`$${payoutAmt} payout via ${payoutMethod} is being processed.`); setPayoutAmt(''); }}>
            <i className="fas fa-paper-plane" /> Request
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: SUPPORT  — Features 37-40
════════════════════════════════════════════════════════════ */
function SupportSection({ toast, onDeleteAccount }) {
  const [newTicket, setNewTicket] = useState(false);
  const [ticket, setTicket] = useState({ subject:'', category:'', priority:'medium', message:'' });
  const [feedback, setFeedback] = useState({ rating:0, hover:0, comment:'' });
  const [delConfirm, setDelConfirm] = useState({ step:0, reason:'', password:'' });
  const [exportRequested, setExportRequested] = useState(false);

  const submitTicket = async () => {
    if (!ticket.subject || !ticket.message) { toast('w','','Please fill in all required fields.'); return; }
    try { await api.createTicket(ticket); } catch (_) {}
    toast('s','Ticket Created',`Support ticket "${ticket.subject}" has been submitted.`);
    setNewTicket(false);
    setTicket({ subject:'', category:'', priority:'medium', message:'' });
  };

  const submitFeedback = async () => {
    if (!feedback.rating) { toast('w','','Please select a rating.'); return; }
    try { await api.submitFeedback(feedback); } catch (_) {}
    toast('s','Thank You!','Your feedback helps us improve VaultX for everyone.');
    setFeedback({ rating:0, hover:0, comment:'' });
  };

  const requestExport = async () => {
    try { await api.exportData(); } catch (_) {}
    setExportRequested(true);
    toast('s','Export Requested','Your data export will be emailed to you within 24 hours.');
  };

  return (
    <div className="sec-enter">
      {/* Feature 37: Support Tickets */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr">
          <span className="pcard-title"><i className="fas fa-headset" style={{ marginRight:8 }} />Support Tickets</span>
          <button className="btn btn-red btn-sm" onClick={() => setNewTicket(true)}><i className="fas fa-plus" /> New Ticket</button>
        </div>
        {newTicket && (
          <div style={{ padding:18, background:'rgba(232,25,44,.04)', border:'1px solid rgba(232,25,44,.1)', borderRadius:12, marginBottom:18 }}>
            <div style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>Create Support Ticket</div>
            <div className="form-row">
              <div className="form-group">
                <label className="lbl">Category</label>
                <select className="inp" style={{ cursor:'pointer' }} value={ticket.category} onChange={e => setTicket(t=>({...t,category:e.target.value}))}>
                  <option value="">Select category</option>
                  {['Payment Issue','Content Access','Technical Problem','Account Issue','Other'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="lbl">Priority</label>
                <select className="inp" style={{ cursor:'pointer' }} value={ticket.priority} onChange={e => setTicket(t=>({...t,priority:e.target.value}))}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="lbl">Subject <span style={{ color:'var(--c-red)' }}>*</span></label>
              <input className="inp" placeholder="Briefly describe your issue" value={ticket.subject} onChange={e => setTicket(t=>({...t,subject:e.target.value}))} />
            </div>
            <div className="form-group">
              <label className="lbl">Message <span style={{ color:'var(--c-red)' }}>*</span></label>
              <textarea className="inp" rows={4} placeholder="Describe your issue in detail..." value={ticket.message} onChange={e => setTicket(t=>({...t,message:e.target.value}))} />
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button className="btn btn-red" onClick={submitTicket}><i className="fas fa-paper-plane" /> Submit Ticket</button>
              <button className="btn btn-ghost" onClick={() => setNewTicket(false)}><i className="fas fa-times" /> Cancel</button>
            </div>
          </div>
        )}
        {MOCK_TICKETS.map(t => (
          <div key={t.id} className="ticket" style={{ marginBottom:10, cursor:'pointer' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:5 }}>{t.subject}</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <StatusBadge status={t.status} />
                  <span className={`badge ${t.priority==='high'?'badge-new':t.priority==='medium'?'badge-blue':'badge-free'}`}>{t.priority} priority</span>
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:12, color:'var(--c-text3)', marginBottom:6 }}>{t.date}</div>
                <div style={{ fontSize:12, color:'var(--c-text2)' }}><i className="fas fa-comments" style={{ marginRight:4 }} />{t.messages} messages</div>
              </div>
            </div>
            <div style={{ marginTop:10, display:'flex', gap:8 }}>
              <button className="btn btn-ghost btn-xs" onClick={() => toast('i','','Ticket thread opening...')}><i className="fas fa-eye" /> View Thread</button>
              {t.status !== 'closed' && <button className="btn btn-ghost btn-xs" onClick={() => toast('i','','Reply composer opening...')}><i className="fas fa-reply" /> Reply</button>}
            </div>
          </div>
        ))}
      </div>

      {/* Feature 38: Platform Feedback */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-comment-alt" style={{ marginRight:8 }} />Rate VaultX</span></div>
        <p style={{ fontSize:13, color:'var(--c-text2)', lineHeight:1.7, marginBottom:16 }}>How satisfied are you with VaultX? Your feedback helps us build a better platform.</p>
        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          {Array.from({length:5}).map((_,i) => (
            <i key={i} className="fas fa-star"
              onMouseEnter={() => setFeedback(f=>({...f,hover:i+1}))}
              onMouseLeave={() => setFeedback(f=>({...f,hover:0}))}
              onClick={() => setFeedback(f=>({...f,rating:i+1}))}
              style={{ fontSize:28, color: i < (feedback.hover || feedback.rating) ? 'var(--c-gold)' : 'var(--c-text3)', cursor:'pointer', transition:'all .15s' }} />
          ))}
          {feedback.rating > 0 && <span style={{ fontSize:13, color:'var(--c-text2)', alignSelf:'center', marginLeft:8 }}>
            {['','Terrible','Bad','Okay','Good','Excellent!'][feedback.rating]}
          </span>}
        </div>
        <div className="form-group">
          <label className="lbl">Additional Comments (optional)</label>
          <textarea className="inp" rows={3} placeholder="Tell us what you love or what we can improve..." value={feedback.comment} onChange={e => setFeedback(f=>({...f,comment:e.target.value}))} />
        </div>
        <button className="btn btn-red" onClick={submitFeedback}><i className="fas fa-paper-plane" /> Submit Feedback</button>
      </div>

      {/* Feature 39: Data Export (GDPR) */}
      <div className="pcard" style={{ marginBottom:16 }}>
        <div className="pcard-hdr"><span className="pcard-title"><i className="fas fa-database" style={{ marginRight:8 }} />Your Data (GDPR)</span></div>
        <p style={{ fontSize:13, color:'var(--c-text2)', lineHeight:1.7, marginBottom:16 }}>
          Under GDPR and privacy laws, you have the right to access and export all personal data associated with your VaultX account.
        </p>
        <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
          <button className="btn btn-ghost" onClick={requestExport} disabled={exportRequested}>
            {exportRequested
              ? <><i className="fas fa-check" style={{ color:'var(--c-green)' }} /> Export Requested</>
              : <><i className="fas fa-download" /> Export My Data</>
            }
          </button>
          {exportRequested && <span style={{ fontSize:12, color:'var(--c-text3)' }}><i className="fas fa-envelope" style={{ marginRight:5 }} />You will receive an email with your data within 24 hours.</span>}
        </div>
      </div>

      {/* Feature 40: Delete Account */}
      <div className="pcard" style={{ border:'1px solid rgba(232,25,44,.25)' }}>
        <div className="pcard-hdr"><span className="pcard-title" style={{ color:'var(--c-red)' }}><i className="fas fa-exclamation-triangle" style={{ marginRight:8 }} />Danger Zone</span></div>
        <div className="err-box"><i className="fas fa-exclamation-triangle" />Deleting your account is <strong style={{ color:'var(--c-text)' }}>permanent and irreversible</strong>. All your content, progress, and purchase history will be permanently lost.</div>
        {delConfirm.step === 0 && (
          <button className="btn btn-danger" onClick={() => setDelConfirm(d=>({...d,step:1}))}><i className="fas fa-trash-alt" /> Delete My Account</button>
        )}
        {delConfirm.step === 1 && (
          <div style={{ padding:18, background:'rgba(232,25,44,.04)', border:'1px solid rgba(232,25,44,.15)', borderRadius:12 }}>
            <div style={{ fontWeight:700, marginBottom:12, color:'var(--c-red)' }}><i className="fas fa-skull" style={{ marginRight:8 }} />Confirm Account Deletion</div>
            <div className="form-group">
              <label className="lbl">Reason for leaving</label>
              <select className="inp" style={{ cursor:'pointer' }} value={delConfirm.reason} onChange={e => setDelConfirm(d=>({...d,reason:e.target.value}))}>
                <option value="">Select reason...</option>
                {['Too expensive','Not enough content','Found a better platform','Privacy concerns','Other'].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="lbl">Enter your password to confirm</label>
              <input className="inp" type="password" placeholder="Your current password" value={delConfirm.password} onChange={e => setDelConfirm(d=>({...d,password:e.target.value}))} />
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button className="btn btn-danger" onClick={() => {
                if (!delConfirm.reason || !delConfirm.password) { toast('w','','Please fill in all fields.'); return; }
                api.deleteAccount({ reason: delConfirm.reason, password: delConfirm.password }).catch(()=>{});
                toast('i','Account Deleted','Your account has been scheduled for deletion. Goodbye.');
                onDeleteAccount();
              }}><i className="fas fa-trash-alt" /> Yes, Delete Permanently</button>
              <button className="btn btn-ghost" onClick={() => setDelConfirm({step:0,reason:'',password:''})}><i className="fas fa-times" /> Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   AVATAR UPLOAD MODAL
════════════════════════════════════════════════════════════ */
function AvatarModal({ onClose, onSave, toast }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = f => {
    if (!f || !f.type.startsWith('image/')) { toast('e','Invalid file','Please upload an image file.'); return; }
    setFile(f);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const save = async () => {
    if (!file) { toast('w','','Please select an image.'); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append('avatar', file);
    try { await api.uploadAvatar(fd); } catch (_) {}
    setTimeout(() => { setLoading(false); onSave(preview); toast('s','Avatar Updated','Your profile photo has been updated.'); onClose(); }, 900);
  };

  return (
    <div className="modal-bd" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth:420 }}>
        <div className="modal-hdr"><div className="modal-ttl">UPDATE PHOTO</div><button className="modal-close" onClick={onClose}><i className="fas fa-times" /></button></div>
        <div className="modal-body">
          {preview
            ? <div style={{ textAlign:'center', marginBottom:20 }}>
                <img src={preview} alt="preview" style={{ width:140, height:140, borderRadius:'50%', objectFit:'cover', border:'4px solid rgba(232,25,44,.35)', margin:'0 auto 14px' }} />
                <button className="btn btn-ghost btn-sm" onClick={() => { setPreview(null); setFile(null); }}><i className="fas fa-redo" /> Choose Different</button>
              </div>
            : <div className={`upload-z${drag?'drag':''}`} onClick={() => fileRef.current?.click()} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}>
                <i className="fas fa-user-circle" style={{ fontSize:48, color:'var(--c-text3)', marginBottom:12, display:'block' }} />
                <div style={{ fontWeight:600, fontSize:14, marginBottom:6 }}>Drop your photo here</div>
                <div style={{ fontSize:12, color:'var(--c-text3)' }}>JPG or PNG, max 5MB. Square images work best.</div>
              </div>
          }
          <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleFile(e.target.files[0])} />
          <button className="btn btn-red" style={{ width:'100%', justifyContent:'center', padding:'13px', marginTop:12 }} onClick={save} disabled={!file||loading}>
            {loading ? <><i className="fas fa-spinner fa-spin" /> Uploading...</> : <><i className="fas fa-upload" /> Save Photo</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PROFILE HEADER (cover + avatar + meta)
════════════════════════════════════════════════════════════ */
function ProfileHeader({ user, onAvatarEdit, toast }) {
  const coverRef = useRef(null);

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('cover', file);
    try { await api.uploadCover(fd); } catch (_) {}
    toast('s','Cover Updated','Your cover image has been updated.');
  };

  return (
    <div style={{ marginBottom:24, borderRadius:22, overflow:'hidden', border:'1px solid var(--c-glass-bd)', background:'var(--c-glass)', backdropFilter:'blur(20px)', animation:'fadeUp .4s var(--ease) both' }}>
      {/* Cover */}
      <div style={{ position:'relative', height:160, background:'linear-gradient(135deg,rgba(139,0,0,.4) 0%,rgba(7,7,7,1) 100%)', overflow:'hidden' }}>
        {user.coverUrl && <img src={user.coverUrl} alt="cover" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:.6 }} />}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,transparent 40%,rgba(7,7,7,.8) 100%)' }} />
        <button onClick={() => coverRef.current?.click()} style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,.6)', border:'1px solid var(--c-glass-bd)', borderRadius:9, padding:'7px 12px', color:'var(--c-text2)', fontSize:11, fontWeight:600, display:'flex', alignItems:'center', gap:6, cursor:'pointer', transition:'all .2s', fontFamily:'var(--font-b)', backdropFilter:'blur(8px)' }}>
          <i className="fas fa-camera" /> Edit Cover
        </button>
        <input ref={coverRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleCoverUpload} />
      </div>

      {/* Avatar + info */}
      <div style={{ padding:'0 24px 24px', marginTop:-50 }}>
        <div style={{ display:'flex', alignItems:'flex-end', gap:18, flexWrap:'wrap' }}>
          <div style={{ position:'relative', flexShrink:0 }}>
            <div className="avatar-circle" style={{ width:90, height:90, fontSize:32, border:'4px solid var(--c-bg)' }}>
              {user.avatarUrl ? <img src={user.avatarUrl} alt={user.name} /> : user.name.charAt(0).toUpperCase()}
            </div>
            <button className="avatar-edit-btn" style={{ width:30, height:30 }} onClick={onAvatarEdit}>
              <i className="fas fa-camera" style={{ fontSize:11 }} />
            </button>
          </div>
          <div style={{ flex:1, minWidth:200, paddingBottom:4 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:4 }}>
              <h1 style={{ fontFamily:'var(--font-d)', fontSize:'clamp(22px,4vw,32px)', letterSpacing:2 }}>{user.name}</h1>
              {user.emailVerified && <span style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'3px 9px', borderRadius:6, fontSize:10, fontWeight:700, background:'rgba(79,163,255,.1)', color:'var(--c-blue)', border:'1px solid rgba(79,163,255,.2)' }}><i className="fas fa-check" /> Verified</span>}
              <span className="badge badge-prem"><i className="fas fa-crown" /> {user.plan}</span>
            </div>
            <div style={{ fontSize:13, color:'var(--c-text3)', marginBottom:6 }}>{user.username}</div>
            {user.bio && <p style={{ fontSize:13, color:'var(--c-text2)', lineHeight:1.65, maxWidth:500 }}>{user.bio}</p>}
            <div style={{ display:'flex', gap:16, marginTop:10, flexWrap:'wrap' }}>
              {user.website && <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:'var(--c-text3)', display:'flex', alignItems:'center', gap:5 }}><i className="fas fa-globe" />{user.website.replace('https://','')}</a>}
              <span style={{ fontSize:12, color:'var(--c-text3)', display:'flex', alignItems:'center', gap:5 }}><i className="fas fa-calendar" />Joined {new Date(user.joinDate).toLocaleDateString('en-US',{month:'long',year:'numeric'})}</span>
              {user.social.twitter && <a href={`https://twitter.com/${user.social.twitter}`} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:'var(--c-text3)', display:'flex', alignItems:'center', gap:5 }}><i className="fab fa-twitter" />@{user.social.twitter}</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SIDEBAR
════════════════════════════════════════════════════════════ */
const TABS = [
  { key:'overview',   icon:'fa-th-large',       label:'Overview'         },
  { key:'content',    icon:'fa-play-circle',     label:'My Content',  count: MOCK_PURCHASES.length },
  { key:'progress',   icon:'fa-chart-bar',       label:'Progress'         },
  { key:'purchases',  icon:'fa-receipt',         label:'Purchases',   count: MOCK_HISTORY.length },
  { key:'billing',    icon:'fa-crown',           label:'Plan & Billing'   },
  { key:'security',   icon:'fa-shield-alt',      label:'Security'         },
  { key:'settings',   icon:'fa-cog',             label:'Settings'         },
  { key:'affiliate',  icon:'fa-users',           label:'Affiliate',   count: 12 },
  { key:'support',    icon:'fa-headset',         label:'Support',     count: MOCK_TICKETS.filter(t=>t.status==='open').length },
];

const MOB_TABS = [
  { key:'overview',  icon:'fa-th-large',    label:'Home'     },
  { key:'content',   icon:'fa-play-circle', label:'Content'  },
  { key:'purchases', icon:'fa-receipt',     label:'Purchases'},
  { key:'settings',  icon:'fa-cog',         label:'Settings' },
  { key:'support',   icon:'fa-headset',     label:'Support'  },
];

function Sidebar({ active, setActive, user }) {
  const completion = useMemo(() => {
    let pts = 0;
    if (user.name) pts += 20; if (user.bio) pts += 15; if (user.avatarUrl) pts += 15;
    if (user.website) pts += 10; if (user.emailVerified) pts += 20;
    if (Object.values(user.social).some(v=>v)) pts += 10; if (user.username) pts += 10;
    return Math.min(pts, 100);
  }, [user]);

  return (
    <div id="pp-sidebar">
      <div className="sidebar-card" style={{ textAlign:'center' }}>
        <div className="avatar-ring">
          <div className="avatar-circle">
            {user.avatarUrl ? <img src={user.avatarUrl} alt={user.name} /> : user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div style={{ fontFamily:'var(--font-d)', fontSize:18, letterSpacing:2, marginBottom:3 }}>{user.name}</div>
        <div style={{ fontSize:12, color:'var(--c-text3)', marginBottom:12 }}>{user.username}</div>
        <span className="badge badge-prem" style={{ marginBottom:12 }}><i className="fas fa-crown" /> {user.plan} Plan</span>
        <div style={{ marginTop:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--c-text3)', marginBottom:6 }}>
            <span>Profile strength</span><span style={{ color:'var(--c-red)' }}>{completion}%</span>
          </div>
          <div style={{ height:4, background:'rgba(255,255,255,.06)', borderRadius:2 }}>
            <div style={{ height:'100%', background:'linear-gradient(90deg,var(--c-red),#ff8080)', borderRadius:2, width:`${completion}%`, transition:'width .6s' }} />
          </div>
        </div>
      </div>

      <div className="sidebar-card">
        <nav className="tab-nav">
          {TABS.map(t => (
            <button key={t.key} className={`tab-btn${active===t.key?' active':''}`} onClick={() => setActive(t.key)}>
              <i className={`fas ${t.icon}`} />
              {t.label}
              {t.count != null && <span className="tab-count">{t.count}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-card" style={{ background:'linear-gradient(135deg,rgba(232,25,44,.08),rgba(7,7,7,1))', border:'1px solid rgba(232,25,44,.15)' }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:1.2, color:'var(--c-red)', textTransform:'uppercase', marginBottom:8 }}><i className="fas fa-headset" style={{ marginRight:6 }} />Need Help?</div>
        <p style={{ fontSize:12, color:'var(--c-text2)', lineHeight:1.6, marginBottom:12 }}>Our support team responds within 24 hours on business days.</p>
        <button className="btn btn-red btn-sm" style={{ width:'100%', justifyContent:'center' }} onClick={() => setActive('support')}>
          <i className="fas fa-comment" /> Contact Support
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PROFILE PAGE
════════════════════════════════════════════════════════════ */
export default function ProfilePage({ initialUser, onLogout }) {
  const [user, setUser]           = useState(initialUser || MOCK_USER);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAvatar, setShowAvatar] = useState(false);
  const { toasts, toast, dismiss } = useToast();

  /* Inject styles once */
  useEffect(() => {
    if (!document.getElementById('vaultx-profile-styles')) {
      const el = document.createElement('style');
      el.id = 'vaultx-profile-styles';
      el.textContent = PROFILE_STYLES;
      document.head.appendChild(el);
    }
  }, []);

  const handleAvatarSave = useCallback((url) => {
    setUser(u => ({ ...u, avatarUrl: url }));
  }, []);

  const handleDeleteAccount = useCallback(() => {
    if (onLogout) onLogout();
  }, [onLogout]);

  const sectionProps = { user, setUser, toast };

  return (
    <>
      {/* Ambient background orbs */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:0 }}>
        <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'rgba(232,25,44,.04)', filter:'blur(120px)', top:-200, right:-100, animation:'orb1 18s ease-in-out infinite' }} />
        <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'rgba(139,0,0,.05)', filter:'blur(100px)', bottom:0, left:0, animation:'orb2 22s ease-in-out infinite' }} />
      </div>

      <div style={{ position:'relative', zIndex:1 }}>
        <div id="pp-wrap">
          {/* Sidebar */}
          <Sidebar active={activeTab} setActive={setActiveTab} user={user} />

          {/* Main content */}
          <div style={{ minWidth:0 }}>
            <ProfileHeader user={user} onAvatarEdit={() => setShowAvatar(true)} toast={toast} />

            {/* Tab content */}
            <div key={activeTab}>
              {activeTab === 'overview'   && <OverviewSection  {...sectionProps} />}
              {activeTab === 'content'    && <MyContentSection {...sectionProps} />}
              {activeTab === 'progress'   && <ProgressSection  {...sectionProps} />}
              {activeTab === 'purchases'  && <PurchasesSection {...sectionProps} />}
              {activeTab === 'billing'    && <BillingSection   {...sectionProps} />}
              {activeTab === 'security'   && <SecuritySection  {...sectionProps} />}
              {activeTab === 'settings'   && <SettingsSection  {...sectionProps} />}
              {activeTab === 'affiliate'  && <AffiliateSection {...sectionProps} />}
              {activeTab === 'support'    && <SupportSection   {...sectionProps} onDeleteAccount={handleDeleteAccount} />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="mob-tab-bar">
        {MOB_TABS.map(t => (
          <button key={t.key} className={`mob-tab${activeTab===t.key?' active':''}`} onClick={() => setActiveTab(t.key)}>
            <i className={`fas ${t.icon}`} />
            {t.label}
          </button>
        ))}
      </nav>

      {/* Avatar Modal */}
      {showAvatar && <AvatarModal onClose={() => setShowAvatar(false)} onSave={handleAvatarSave} toast={toast} />}

      {/* Toast System */}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </>
  );
}