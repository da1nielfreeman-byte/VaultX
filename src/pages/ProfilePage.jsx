
//  VaultX — Premium Video Content Platform
//  ProfilePage.jsx  |  Production Ready  |  v2.0
// ═══════════════════════════════════════════════════════════════
//
//  ROUTE PROTECTION — Usage in your router:
//    React Router v6:
//      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
//    OR use the built-in redirect inside this file (see bottom).
//
//  ENDPOINTS USED:
//    GET    /me                      → fetch logged-in user profile
//    GET    /purchases/my-history    → fetch purchase history
//    PATCH  /user/update-email       → update email address
//    PATCH  /user/update-password    → update password
//
//  TOKEN:  read from localStorage key  "vx_access"
//          (same key written by the AuthModal TokenStore)
// ═══════════════════════════════════════════════════════════════

import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react';



/* ════════════════════════════════════════════════════════════
   STYLES  — same VaultX design system as HomePage.jsx
════════════════════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700&display=swap');

  :root {
    --c-bg:       #070707;
    --c-surface:  #0d0d0d;
    --c-glass:    rgba(255,255,255,.035);
    --c-glass-bd: rgba(255,255,255,.07);
    --c-glass-hv: rgba(255,255,255,.065);
    --c-text:     #f1f1f1;
    --c-text2:    #888;
    --c-text3:    #444;
    --c-red:      #e8192c;
    --c-red-dk:   #8b0000;
    --c-green:    #00c97a;
    --c-gold:     #d4a843;
    --c-blue:     #4fa3ff;
    --font-d:     'Bebas Neue', sans-serif;
    --font-b:     'Sora', sans-serif;
    --ease:       cubic-bezier(.4,0,.2,1);
    --r:          14px;
    --nav-h:      68px;
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body {
    font-family: var(--font-b);
    background:  var(--c-bg);
    color:       var(--c-text);
    min-height:  100vh;
    overflow-x:  hidden;
  }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:var(--c-bg); }
  ::-webkit-scrollbar-thumb { background:var(--c-red); border-radius:3px; }
  button { cursor:pointer; font-family:var(--font-b); }
  img    { display:block; }
  textarea { font-family:var(--font-b); resize:vertical; }
  a { color:inherit; text-decoration:none; }

  /* ── Keyframes ─────────────────────────────────────────── */
  @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes spin    { to{transform:rotate(360deg)} }
  @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes toastIn  { from{opacity:0;transform:translateX(110%)} to{opacity:1;transform:translateX(0)} }
  @keyframes toastOut { from{opacity:1;transform:translateX(0)}     to{opacity:0;transform:translateX(110%)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.45} }

  /* ── Glass card ────────────────────────────────────────── */
  .pf-card {
    background:     var(--c-glass);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border:         1px solid var(--c-glass-bd);
    border-radius:  var(--r);
    padding:        24px;
    animation:      fadeUp .4s var(--ease) both;
    transition:     border-color .25s;
  }
  .pf-card:hover { border-color: rgba(232,25,44,.18); }

  /* ── Buttons ───────────────────────────────────────────── */
  .btn { display:inline-flex; align-items:center; gap:8px; border:none; border-radius:10px;
         font-weight:600; font-size:14px; padding:11px 24px; transition:all .25s var(--ease);
         letter-spacing:.2px; font-family:var(--font-b); }
  .btn-red     { background:linear-gradient(135deg,var(--c-red),var(--c-red-dk)); color:#fff; }
  .btn-red:hover   { transform:translateY(-1px); box-shadow:0 8px 24px rgba(232,25,44,.4); }
  .btn-red:active  { transform:translateY(0); }
  .btn-red:disabled{ opacity:.5; pointer-events:none; }
  .btn-ghost   { background:var(--c-glass); border:1px solid var(--c-glass-bd); color:var(--c-text2); }
  .btn-ghost:hover { border-color:rgba(232,25,44,.3); color:var(--c-text); }
  .btn-danger  { background:rgba(232,25,44,.08); border:1px solid rgba(232,25,44,.22); color:var(--c-red); }
  .btn-danger:hover{ background:rgba(232,25,44,.15); }
  .btn-sm  { padding:8px 16px; font-size:12px; border-radius:8px; }
  .btn-xs  { padding:5px 12px; font-size:11px; border-radius:7px; }

  /* ── Inputs ────────────────────────────────────────────── */
  .inp {
    width:100%; background:rgba(255,255,255,.04); border:1px solid var(--c-glass-bd);
    border-radius:10px; padding:12px 16px; color:var(--c-text); font-size:14px;
    font-family:var(--font-b); outline:none; transition:all .22s var(--ease);
  }
  .inp:focus        { border-color:var(--c-red); background:rgba(232,25,44,.04); box-shadow:0 0 0 3px rgba(232,25,44,.1); }
  .inp::placeholder { color:var(--c-text3); }
  .inp:disabled     { opacity:.5; pointer-events:none; }
  .inp-icon-wrap    { position:relative; }
  .inp-icon-wrap i  { position:absolute; left:14px; top:50%; transform:translateY(-50%);
                      color:var(--c-text3); font-size:13px; pointer-events:none; }
  .inp-icon-wrap .inp { padding-left:38px; }
  .inp-eye  { position:absolute; right:12px; top:50%; transform:translateY(-50%);
              background:none; border:none; color:var(--c-text3); font-size:13px; cursor:pointer; }
  .lbl { display:block; font-size:11px; font-weight:700; color:var(--c-text2);
         margin-bottom:6px; text-transform:uppercase; letter-spacing:.6px; }
  .form-group { margin-bottom:18px; }
  .form-row   { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:560px) { .form-row { grid-template-columns:1fr; } }

  /* ── Skeleton loader ───────────────────────────────────── */
  .skel { background:linear-gradient(90deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.04) 100%);
          background-size:400px 100%; animation:shimmer 1.4s infinite; border-radius:8px; }

  /* ── Badge ─────────────────────────────────────────────── */
  .badge { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:50px;
           font-size:10px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; }
  .badge-pending  { background:rgba(212,168,67,.1);  color:var(--c-gold);  border:1px solid rgba(212,168,67,.22); }
  .badge-approved { background:rgba(0,201,122,.1);   color:var(--c-green); border:1px solid rgba(0,201,122,.22); }
  .badge-rejected { background:rgba(232,25,44,.1);   color:var(--c-red);   border:1px solid rgba(232,25,44,.22); }

  /* ── Password strength bar ─────────────────────────────── */
  .str-track { height:4px; background:rgba(255,255,255,.06); border-radius:2px; margin-top:8px; overflow:hidden; }
  .str-fill  { height:100%; border-radius:2px; transition:all .35s var(--ease); }

  /* ── Inline error/success ──────────────────────────────── */
  .field-error   { font-size:11px; color:var(--c-red);   margin-top:5px; display:flex; align-items:center; gap:5px; }
  .field-success { font-size:11px; color:var(--c-green); margin-top:5px; display:flex; align-items:center; gap:5px; }
  .form-error-box {
    display:flex; gap:10px; align-items:flex-start; padding:11px 14px; margin-bottom:16px;
    background:rgba(232,25,44,.07); border:1px solid rgba(232,25,44,.22); border-radius:10px;
    animation:fadeIn .2s;
  }
  .form-error-box i { color:var(--c-red); margin-top:1px; flex-shrink:0; }
  .form-error-box span { font-size:13px; color:var(--c-red); font-weight:500; line-height:1.5; }
  .form-success-box {
    display:flex; gap:10px; align-items:flex-start; padding:11px 14px; margin-bottom:16px;
    background:rgba(0,201,122,.07); border:1px solid rgba(0,201,122,.22); border-radius:10px;
    animation:fadeIn .2s;
  }
  .form-success-box i { color:var(--c-green); margin-top:1px; flex-shrink:0; }
  .form-success-box span { font-size:13px; color:var(--c-green); font-weight:500; line-height:1.5; }

  /* ── Toast ─────────────────────────────────────────────── */
  .toast-wrap { position:fixed; bottom:24px; right:24px; z-index:9999; display:flex; flex-direction:column; gap:8px; pointer-events:none; }
  .toast { display:flex; align-items:flex-start; gap:11px; background:rgba(10,10,10,.97); backdrop-filter:blur(20px);
           border:1px solid var(--c-glass-bd); border-radius:12px; padding:13px 16px; min-width:270px; max-width:340px;
           animation:toastIn .3s var(--ease); box-shadow:0 20px 60px rgba(0,0,0,.6); pointer-events:all; }
  .toast.exit { animation:toastOut .3s var(--ease) forwards; }
  .t-ico { width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; flex-shrink:0; margin-top:1px; }
  .t-s .t-ico { background:rgba(0,201,122,.15);  color:var(--c-green); border:1px solid rgba(0,201,122,.2); }
  .t-e .t-ico { background:rgba(232,25,44,.15);  color:var(--c-red);   border:1px solid rgba(232,25,44,.2); }
  .t-i .t-ico { background:rgba(79,163,255,.15); color:var(--c-blue);  border:1px solid rgba(79,163,255,.2); }
  .t-w .t-ico { background:rgba(212,168,67,.15); color:var(--c-gold);  border:1px solid rgba(212,168,67,.2); }
  @media(max-width:480px) { .toast-wrap { left:12px; right:12px; bottom:16px; } .toast { min-width:0; } }

  /* ── Nav ────────────────────────────────────────────────── */
  #pf-nav {
    position:fixed; top:0; left:0; right:0; z-index:800; height:var(--nav-h);
    display:flex; align-items:center; justify-content:space-between;
    padding:0 clamp(14px,4vw,52px);
    background:rgba(7,7,7,.88); backdrop-filter:blur(22px);
    border-bottom:1px solid var(--c-glass-bd);
  }
  .nav-logo { font-family:var(--font-d); font-size:26px; letter-spacing:4px; cursor:pointer; }
  .nav-logo span { color:var(--c-red); }
  .nav-back { display:flex; align-items:center; gap:7px; font-size:13px; font-weight:500;
              color:var(--c-text2); background:none; border:none; transition:color .2s; }
  .nav-back:hover { color:var(--c-text); }

  /* ── Layout ─────────────────────────────────────────────── */
  #pf-wrap { max-width:1100px; margin:0 auto; padding:calc(var(--nav-h) + 28px) clamp(14px,4vw,40px) 60px; }

  /* ── Sidebar tab nav ────────────────────────────────────── */
  .pf-layout { display:grid; grid-template-columns:220px 1fr; gap:24px; align-items:start; }
  @media(max-width:820px) { .pf-layout { grid-template-columns:1fr; } }

  .pf-sidebar { position:sticky; top:calc(var(--nav-h) + 24px); }
  @media(max-width:820px) { .pf-sidebar { position:static; } }

  /* Avatar block */
  .av-block { text-align:center; padding:26px 20px; border-bottom:1px solid var(--c-glass-bd); }
  .av-circle {
    width:76px; height:76px; border-radius:50%; margin:0 auto 14px;
    background:linear-gradient(135deg,var(--c-red),var(--c-red-dk));
    display:flex; align-items:center; justify-content:center;
    font-family:var(--font-d); font-size:30px; color:#fff; letter-spacing:1px;
    border:3px solid rgba(232,25,44,.3);
  }
  .av-name  { font-weight:700; font-size:15px; margin-bottom:3px; }
  .av-email { font-size:12px; color:var(--c-text2); word-break:break-all; }

  /* Sidebar tabs */
  .pf-tabs { padding:10px; }
  .pf-tab {
    display:flex; align-items:center; gap:10px; padding:11px 14px; border-radius:10px;
    width:100%; background:none; border:none; color:var(--c-text2); font-size:13px;
    font-weight:500; transition:all .2s; text-align:left; font-family:var(--font-b); cursor:pointer;
  }
  .pf-tab i { width:16px; text-align:center; font-size:14px; flex-shrink:0; }
  .pf-tab:hover { background:var(--c-glass-hv); color:var(--c-text); }
  .pf-tab.active { background:rgba(232,25,44,.1); color:var(--c-red); border:1px solid rgba(232,25,44,.15); font-weight:700; }
  .pf-tab.active i { color:var(--c-red); }

  /* Mobile tab bar */
  .mob-tabs { display:none; }
  @media(max-width:820px) {
    .mob-tabs { display:flex; gap:6px; overflow-x:auto; scrollbar-width:none; margin-bottom:20px; padding-bottom:2px; }
    .mob-tabs::-webkit-scrollbar { display:none; }
    .mob-tab-pill { flex-shrink:0; display:flex; align-items:center; gap:6px; padding:9px 18px;
                    border-radius:50px; border:1px solid var(--c-glass-bd); background:var(--c-glass);
                    color:var(--c-text2); font-size:12px; font-weight:600; cursor:pointer;
                    transition:all .22s; font-family:var(--font-b); }
    .mob-tab-pill.active { background:rgba(232,25,44,.1); border-color:rgba(232,25,44,.3); color:var(--c-red); }
    .pf-sidebar { display:none; }
  }

  /* ── Section header ─────────────────────────────────────── */
  .sec-hdr { margin-bottom:22px; }
  .sec-ttl { font-family:var(--font-d); font-size:clamp(20px,3vw,26px); letter-spacing:2px; margin-bottom:4px; }
  .sec-sub  { font-size:13px; color:var(--c-text2); }

  /* ── Purchase history table ─────────────────────────────── */
  .ph-tbl { width:100%; border-collapse:collapse; }
  .ph-tbl th {
    font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.7px;
    color:var(--c-text3); padding:10px 14px; text-align:left;
    border-bottom:1px solid var(--c-glass-bd); white-space:nowrap;
  }
  .ph-tbl td { padding:14px; font-size:13px; border-bottom:1px solid rgba(255,255,255,.03); vertical-align:middle; }
  .ph-tbl tr:last-child td { border-bottom:none; }
  .ph-tbl tbody tr { transition:background .15s; }
  .ph-tbl tbody tr:hover td { background:var(--c-glass); }
  .ph-tbl-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }

  /* Mobile purchase card */
  .ph-card { padding:16px; margin-bottom:10px; }
  .ph-card-row { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; flex-wrap:wrap; }
  .ph-cards { display:none; }
  @media(max-width:640px) { .ph-tbl-wrap { display:none; } .ph-cards { display:block; } }

  /* ── Divider ────────────────────────────────────────────── */
  .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(232,25,44,.2),transparent); margin:24px 0; }

  /* ── Spinner ─────────────────────────────────────────────── */
  .spinner { animation:spin .7s linear infinite; }

  /* ── Full-page loading ──────────────────────────────────── */
  #pf-loading {
    min-height:100vh; display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:14px;
  }

  /* ── Ambient orb ─────────────────────────────────────────── */
  .pf-orb { position:fixed; border-radius:50%; filter:blur(100px); pointer-events:none; z-index:0; }
  .pf-orb-1 { width:500px; height:500px; background:rgba(232,25,44,.05); top:-150px; right:-100px; }
  .pf-orb-2 { width:350px; height:350px; background:rgba(139,0,0,.04); bottom:0; left:-100px; }

  /* ── Proof image thumbnail ──────────────────────────────── */
  .proof-thumb { width:56px; height:40px; object-fit:cover; border-radius:7px;
                 border:1px solid var(--c-glass-bd); cursor:pointer; transition:opacity .2s; }
  .proof-thumb:hover { opacity:.8; }

  /* ── Proof lightbox ─────────────────────────────────────── */
  .lightbox-bd { position:fixed; inset:0; background:rgba(0,0,0,.88); z-index:2000;
                 display:flex; align-items:center; justify-content:center; padding:20px;
                 animation:fadeIn .2s; cursor:zoom-out; }
  .lightbox-img { max-width:90vw; max-height:88vh; border-radius:12px; object-fit:contain;
                  box-shadow:0 40px 120px rgba(0,0,0,.9); cursor:default; }
  .lightbox-close { position:fixed; top:18px; right:20px; width:38px; height:38px; border-radius:50%;
                    background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.15);
                    color:#fff; font-size:16px; display:flex; align-items:center; justify-content:center;
                    cursor:pointer; transition:background .2s; }
  .lightbox-close:hover { background:rgba(232,25,44,.3); }
`;

const TokenStore = {
  getAccess()  { return localStorage.getItem('vx_access'); },
  getRefresh() { return localStorage.getItem('vx_refresh'); },
  clear() {
    localStorage.removeItem('vx_access');
    localStorage.removeItem('vx_refresh');
  },
  exists() { return !!this.getAccess(); },
};

const BASE = 'https://vaultx-backend-51yt.onrender.com/api/v1';

async function req(method, path, body = null) {
  const token = TokenStore.getAccess();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const r = await fetch(`${BASE}${path}`, opts);

  let data;
  try { data = await r.json(); } catch (_) {_; data = { message: `HTTP ${r.status}` }; }

  if (!r.ok) {
    const err    = new Error(data?.message || `HTTP ${r.status}`);
    err.status   = r.status;
    err.data     = data;
    throw err;
  }
  return data;
}

const api = {
  getMe: () => req('GET', '/user/me'),
  getPurchaseHistory: () => req('GET', '/purchase/my-history'),
  updateEmail: (body) => req('PATCH', '/user/update-email', body),
  updatePassword: (body) => req('PATCH', '/user/update-password', body),
};

function pwStrength(p) {
  if (!p) return { score: 0, label: '', color: '' };
  let s = 0;
  if (p.length >= 8)           s++;
  if (/[A-Z]/.test(p))         s++;
  if (/[0-9]/.test(p))         s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  if (p.length >= 14)          s++;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const colors = ['', '#e8192c', 'orange', '#f0c040', 'var(--c-green)', 'var(--c-blue)'];
  return { score: s, label: labels[s], color: colors[s] };
}

let toastId = 0;
function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((type, title, msg) => {
    const id = ++toastId;
    setToasts(t => [...t, { id, type, title, msg }]);
    setTimeout(() => {
      setToasts(t => t.map(x => x.id === id ? { ...x, exiting: true } : x));
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 320);
    }, 4000);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(t => t.map(x => x.id === id ? { ...x, exiting: true } : x));
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 320);
  }, []);

  return { toasts, toast, dismiss };
}

function ToastContainer({ toasts, dismiss }) {
  const icons = { s: 'fa-check', e: 'fa-times', i: 'fa-info', w: 'fa-exclamation' };
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast t-${t.type}${t.exiting ? ' exit' : ''}`}>
          <div className="t-ico">
            <i className={`fas ${icons[t.type] || 'fa-info'}`} />
          </div>
          <div style={{ flex: 1 }}>
            {t.title && (
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2, color: 'var(--c-text)' }}>
                {t.title}
              </div>
            )}
            <div style={{ fontSize: 13, color: 'var(--c-text2)', lineHeight: 1.5 }}>{t.msg}</div>
          </div>
          <button
            onClick={() => dismiss(t.id)}
            style={{ background: 'none', border: 'none', color: 'var(--c-text3)', fontSize: 12, cursor: 'pointer', padding: '2px 4px' }}
          >
            <i className="fas fa-times" />
          </button>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending:  { cls: 'badge-pending',  icon: 'fa-clock',        label: 'Pending'  },
    approved: { cls: 'badge-approved', icon: 'fa-check-circle', label: 'Approved' },
    rejected: { cls: 'badge-rejected', icon: 'fa-times-circle', label: 'Rejected' },
  };
  const m = map[status?.toLowerCase()] || map.pending;
  return (
    <span className={`badge ${m.cls}`}>
      <i className={`fas ${m.icon}`} /> {m.label}
    </span>
  );
}


function Lightbox({ url, onClose }) {
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <div className="lightbox-bd" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}><i className="fas fa-times" /></button>
      <img
        src={url}
        alt="Payment proof"
        className="lightbox-img"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {[80, 120, 60, 70, 55, 90].map((w, i) => (
        <td key={i}>
          <div className="skel" style={{ height: 13, width: w }} />
        </td>
      ))}
    </tr>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: PURCHASE HISTORY
   GET /purchases/my-history
   Response: { status, results, data:{ history:[...] } }
════════════════════════════════════════════════════════════ */

function PurchaseHistorySection({ toast }) {
  const [history,  setHistory]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [proofUrl, setProofUrl] = useState(null);   // lightbox
  const [filter,   setFilter]   = useState('all');  // all | pending | approved | rejected

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        // GET /purchases/my-history
        // Response shape: { status:"success", results:2, data:{ history:[...] } }
        const res  = await api.getPurchaseHistory();
        const list = res?.data?.history || res?.history || [];
        setHistory(list);
      } catch (err) {
        const code = err?.status;
        if (code === 401) {
          setError('Your session has expired. Please sign in again.');
        } else if (code === 403) {
          setError('You do not have permission to view this data.');
        } else {
          setError(err?.message || 'Failed to load purchase history. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return history;
    return history.filter(h => h.status?.toLowerCase() === filter);
  }, [history, filter]);

  const fmt = d => new Date(d).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const totalSpent = useMemo(() =>
    history
      .filter(h => h.status?.toLowerCase() === 'approved')
      .reduce((s, h) => s + (h.amount || 0), 0)
  , [history]);

  return (
    <div>
      <div className="sec-hdr">
        <div className="sec-ttl grad-r" style={{ fontFamily: 'var(--font-d)', letterSpacing: 2 }}>
          PURCHASE HISTORY
        </div>
        <div className="sec-sub">All your payment submissions and their current status.</div>
      </div>

      {/* Summary strip */}
      {!loading && !error && history.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12, marginBottom: 22 }}>
          {[
            { label: 'Total Submissions', val: history.length,                                      icon: 'fa-receipt',      col: 'var(--c-text)' },
            { label: 'Approved',           val: history.filter(h => h.status === 'approved').length, icon: 'fa-check-circle', col: 'var(--c-green)' },
            { label: 'Pending',            val: history.filter(h => h.status === 'pending').length,  icon: 'fa-clock',        col: 'var(--c-gold)' },
            { label: 'Total Approved ($)', val: `$${totalSpent.toFixed(2)}`,                         icon: 'fa-dollar-sign',  col: 'var(--c-red)' },
          ].map((s, i) => (
            <div key={i} className="pf-card" style={{ padding: 16, textAlign: 'center', animationDelay: `${i * 0.07}s` }}>
              <i className={`fas ${s.icon}`} style={{ fontSize: 18, color: s.col, marginBottom: 8, display: 'block' }} />
              <div style={{ fontFamily: 'var(--font-d)', fontSize: 24, letterSpacing: 1, color: s.col }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--c-text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.4px', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filter pills */}
      {!loading && !error && history.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '7px 18px', borderRadius: 50, fontSize: 12, fontWeight: 600,
                border: `1px solid ${filter === f ? 'rgba(232,25,44,.35)' : 'var(--c-glass-bd)'}`,
                background: filter === f ? 'rgba(232,25,44,.1)' : 'var(--c-glass)',
                color: filter === f ? 'var(--c-red)' : 'var(--c-text2)',
                cursor: 'pointer', transition: 'all .2s', fontFamily: 'var(--font-b)',
                textTransform: 'capitalize',
              }}
            >
              {f}
              {f !== 'all' && (
                <span style={{ marginLeft: 6, opacity: .7 }}>
                  ({history.filter(h => h.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: 'rgba(232,25,44,.07)', border: '1px solid rgba(232,25,44,.2)', borderRadius: 12, marginBottom: 16 }}>
          <i className="fas fa-exclamation-circle" style={{ color: 'var(--c-red)', marginTop: 1 }} />
          <div style={{ fontSize: 13, color: 'var(--c-text2)' }}>{error}</div>
        </div>
      )}

      {/* ── Desktop table ── */}
      <div className="pf-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="ph-tbl-wrap">
          <table className="ph-tbl">
            <thead>
              <tr>
                <th>Content</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th>Proof</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
                : filtered.length === 0
                  ? (
                    <tr>
                      <td colSpan={7}>
                        <div style={{ textAlign: 'center', padding: '52px 20px', color: 'var(--c-text3)' }}>
                          <i className="fas fa-receipt" style={{ fontSize: 36, marginBottom: 12, display: 'block', color: 'var(--c-text3)', opacity: .5 }} />
                          <div style={{ fontWeight: 600, fontSize: 14 }}>
                            {filter === 'all' ? 'No purchase history yet.' : `No ${filter} purchases.`}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                  : filtered.map((h, i) => (
                    <tr key={h._id} style={{ animationDelay: `${i * 0.04}s` }}>
                      {/* Content */}
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--c-text)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {h.content?.title || '—'}
                        </div>
                        {h.content?.price != null && (
                          <div style={{ fontSize: 11, color: 'var(--c-text3)', marginTop: 2 }}>
                            Listed at ${h.content.price}
                          </div>
                        )}
                      </td>

                      {/* Amount paid */}
                      <td>
                        <span style={{ fontFamily: 'var(--font-d)', fontSize: 18, letterSpacing: 1, color: 'var(--c-text)' }}>
                          ${h.amount?.toFixed(2) ?? '—'}
                        </span>
                      </td>

                      {/* Payment method */}
                      <td>
                        <span style={{ fontSize: 12, color: 'var(--c-text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <i className="fas fa-credit-card" style={{ color: 'var(--c-text3)', fontSize: 11 }} />
                          {h.paymentMethod || '—'}
                        </span>
                      </td>

                      {/* Status */}
                      <td><StatusBadge status={h.status} /></td>

                      {/* Date */}
                      <td style={{ fontSize: 12, color: 'var(--c-text2)', whiteSpace: 'nowrap' }}>
                        {h.createdAt ? fmt(h.createdAt) : '—'}
                      </td>

                      {/* Payment proof thumbnail — no image shown if URL removed from backend */}
                      <td>
                        {h.paymentImageUrl ? (
                          <img
                            src={h.paymentImageUrl}
                            alt="proof"
                            className="proof-thumb"
                            onClick={() => setProofUrl(h.paymentImageUrl)}
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <span style={{ fontSize: 11, color: 'var(--c-text3)' }}>—</span>
                        )}
                      </td>

                      {/* Admin note */}
                      <td style={{ fontSize: 12, color: 'var(--c-text2)', maxWidth: 140 }}>
                        {h.adminNote
                          ? <span title={h.adminNote} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', maxWidth: 130 }}>{h.adminNote}</span>
                          : <span style={{ color: 'var(--c-text3)' }}>—</span>
                        }
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Mobile cards ── */}
      <div className="ph-cards">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="pf-card ph-card">
              <div className="skel" style={{ height: 14, marginBottom: 10, width: '60%' }} />
              <div className="skel" style={{ height: 11, marginBottom: 8, width: '40%' }} />
              <div className="skel" style={{ height: 26, borderRadius: 8 }} />
            </div>
          ))
          : filtered.length === 0
            ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--c-text3)' }}>
                <i className="fas fa-receipt" style={{ fontSize: 32, marginBottom: 10, display: 'block', opacity: .5 }} />
                <div style={{ fontWeight: 600 }}>
                  {filter === 'all' ? 'No purchase history yet.' : `No ${filter} purchases.`}
                </div>
              </div>
            )
            : filtered.map(h => (
              <div key={h._id} className="pf-card ph-card">
                <div className="ph-card-row" style={{ marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>
                      {h.content?.title || 'Unknown Content'}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--c-text3)' }}>
                      {h.paymentMethod} &bull; {h.createdAt ? fmt(h.createdAt) : ''}
                    </div>
                  </div>
                  <StatusBadge status={h.status} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-d)', fontSize: 22, letterSpacing: 1 }}>
                    ${h.amount?.toFixed(2) ?? '0.00'}
                  </span>
                  {h.paymentImageUrl && (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => setProofUrl(h.paymentImageUrl)}
                    >
                      <i className="fas fa-image" /> View Proof
                    </button>
                  )}
                </div>

                {h.adminNote ? (
                  <div style={{ marginTop: 10, fontSize: 12, color: 'var(--c-text2)', padding: '8px 12px', background: 'rgba(255,255,255,.03)', borderRadius: 8, borderLeft: '2px solid rgba(232,25,44,.3)' }}>
                    <i className="fas fa-comment" style={{ marginRight: 6, color: 'var(--c-text3)' }} />
                    {h.adminNote}
                  </div>
                ) : null}
              </div>
            ))
        }
      </div>

      {/* Lightbox */}
      {proofUrl && <Lightbox url={proofUrl} onClose={() => setProofUrl(null)} />}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: ACCOUNT SETTINGS
   — email update:    PATCH /user/update-email
   — password update: PATCH /user/update-password
════════════════════════════════════════════════════════════ */
function AccountSettingsSection({ user, toast }) {
  /* ── Email form state ── */
  const [emailForm, setEmailForm] = useState({ newEmail: '', currentPassword: '' });
  const [emailError,   setEmailError]   = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  /* ── Password form state ── */
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwError,   setPwError]   = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [showCur,   setShowCur]   = useState(false);
  const [showNew,   setShowNew]   = useState(false);

  const strength = pwStrength(pwForm.newPassword);

  const setE = k => e => setEmailForm(f => ({ ...f, [k]: e.target.value }));
  const setP = k => e => setPwForm(f => ({ ...f, [k]: e.target.value }));

  /* ── Submit email update ── */
  const submitEmail = async () => {
    setEmailError('');
    setEmailSuccess('');

    // Client-side validation
    if (!emailForm.newEmail.trim()) {
      setEmailError('Please enter a new email address.'); return;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(emailForm.newEmail)) {
      setEmailError('Please enter a valid email address.'); return;
    }
    if (emailForm.newEmail === user?.email) {
      setEmailError('This is already your current email address.'); return;
    }
    if (!emailForm.currentPassword) {
      setEmailError('Please enter your current password to confirm.'); return;
    }

    setEmailLoading(true);
    try {
      // PATCH /user/update-email  →  { status:"success", data:{ user:{...} } }
      await api.updateEmail({
        newEmail:        emailForm.newEmail,
        currentPassword: emailForm.currentPassword,
      });

      setEmailSuccess('Your email address has been updated successfully. You may need to verify the new address.');
      setEmailForm({ newEmail: '', currentPassword: '' });
      toast('s', 'Email Updated', 'Your email address has been changed.');
    } catch (err) {
      const code    = err?.status;
      const message = err?.data?.message || err?.message || '';

      if (code === 401) setEmailError('Incorrect password. Please check and try again.');
      else if (code === 409) setEmailError('That email address is already in use by another account.');
      else if (code === 400) setEmailError(message || 'Invalid details. Please check and try again.');
      else if (code >= 500) setEmailError('Server error. Please try again in a moment.');
      else setEmailError(message || 'Failed to update email. Please try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  /* ── Submit password update ── */
  const submitPassword = async () => {
    setPwError('');
    setPwSuccess('');

    // Client-side validation
    if (!pwForm.currentPassword) {
      setPwError('Please enter your current password.'); return;
    }
    if (!pwForm.newPassword) {
      setPwError('Please enter a new password.'); return;
    }
    if (pwForm.newPassword.length < 8) {
      setPwError('New password must be at least 8 characters long.'); return;
    }
    if (strength.score < 2) {
      setPwError('Password is too weak. Add uppercase letters, numbers, or symbols.'); return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError('The new passwords do not match.'); return;
    }
    if (pwForm.currentPassword === pwForm.newPassword) {
      setPwError('Your new password cannot be the same as your current password.'); return;
    }

    setPwLoading(true);
    try {
      // PATCH /user/update-password  →  { status:"success" }
      await api.updatePassword({
        password: pwForm.currentPassword,
        newPassword:     pwForm.newPassword,
        confirmPassword: pwForm.confirmPassword,
      });
      setPwSuccess('Your password has been changed successfully. Use it on your next sign-in.');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast('s', 'Password Changed', 'Your password has been updated.');
    } catch (err) {
      const code    = err?.status;
      const message = err?.data?.message || err?.message || '';

      if (code === 401) setPwError('Your current password is incorrect.');
      else if (code === 400) setPwError(message || 'Invalid request. Please check your input.');
      else if (code >= 500) setPwError('Server error. Please try again in a moment.');
      else setPwError(message || 'Failed to update password. Please try again.');
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div>
      <div className="sec-hdr">
        <div className="sec-ttl" style={{ fontFamily: 'var(--font-d)', letterSpacing: 2 }}>
          ACCOUNT <span style={{ color: 'var(--c-red)' }}>SETTINGS</span>
        </div>
        <div className="sec-sub">Update your email address and password.</div>
      </div>

      {/* ── Email Update Card ── */}
      <div className="pf-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(79,163,255,.1)', border: '1px solid rgba(79,163,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-envelope" style={{ color: 'var(--c-blue)', fontSize: 15 }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Email Address</div>
            <div style={{ fontSize: 12, color: 'var(--c-text3)' }}>
              Current: <span style={{ color: 'var(--c-text2)' }}>{user?.email || '—'}</span>
            </div>
          </div>
        </div>

        {emailError && (
          <div className="form-error-box">
            <i className="fas fa-exclamation-circle" />
            <span>{emailError}</span>
          </div>
        )}
        {emailSuccess && (
          <div className="form-success-box">
            <i className="fas fa-check-circle" />
            <span>{emailSuccess}</span>
          </div>
        )}

        <div className="form-group">
          <label className="lbl">New Email Address</label>
          <div className="inp-icon-wrap">
            <i className="fas fa-at" />
            <input
              className="inp"
              type="email"
              placeholder="newemail@example.com"
              value={emailForm.newEmail}
              onChange={setE('newEmail')}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="lbl">Current Password (to confirm)</label>
          <div className="inp-icon-wrap">
            <i className="fas fa-lock" />
            <input
              className="inp"
              type="password"
              placeholder="Enter your current password"
              value={emailForm.currentPassword}
              onChange={setE('currentPassword')}
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          className="btn btn-red"
          onClick={submitEmail}
          disabled={emailLoading}
        >
          {emailLoading
            ? <><i className="fas fa-spinner spinner" /> Updating...</>
            : <><i className="fas fa-save" /> Update Email</>
          }
        </button>
      </div>

      {/* ── Password Update Card ── */}
      <div className="pf-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(232,25,44,.1)', border: '1px solid rgba(232,25,44,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-shield-alt" style={{ color: 'var(--c-red)', fontSize: 15 }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Password</div>
            <div style={{ fontSize: 12, color: 'var(--c-text3)' }}>Choose a strong, unique password.</div>
          </div>
        </div>

        {pwError && (
          <div className="form-error-box">
            <i className="fas fa-exclamation-circle" />
            <span>{pwError}</span>
          </div>
        )}
        {pwSuccess && (
          <div className="form-success-box">
            <i className="fas fa-check-circle" />
            <span>{pwSuccess}</span>
          </div>
        )}

        {/* Current password */}
        <div className="form-group">
          <label className="lbl">Current Password</label>
          <div className="inp-icon-wrap" style={{ position: 'relative' }}>
            <i className="fas fa-lock" />
            <input
              className="inp"
              type={showCur ? 'text' : 'password'}
              placeholder="••••••••"
              value={pwForm.currentPassword}
              onChange={setP('currentPassword')}
              style={{ paddingRight: 42 }}
              autoComplete="current-password"
            />
            <button className="inp-eye" type="button" onClick={() => setShowCur(v => !v)}>
              <i className={`fas ${showCur ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
        </div>

        {/* New password */}
        <div className="form-group">
          <label className="lbl">New Password</label>
          <div className="inp-icon-wrap" style={{ position: 'relative' }}>
            <i className="fas fa-key" />
            <input
              className="inp"
              type={showNew ? 'text' : 'password'}
              placeholder="At least 8 characters"
              value={pwForm.newPassword}
              onChange={setP('newPassword')}
              style={{ paddingRight: 42 }}
              autoComplete="new-password"
            />
            <button className="inp-eye" type="button" onClick={() => setShowNew(v => !v)}>
              <i className={`fas ${showNew ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
          {/* Strength meter */}
          {pwForm.newPassword && (
            <>
              <div className="str-track">
                <div className="str-fill" style={{ width: `${(strength.score / 5) * 100}%`, background: strength.color }} />
              </div>
              <div style={{ fontSize: 11, color: strength.color, marginTop: 5, fontWeight: 600 }}>
                {strength.label}
              </div>
            </>
          )}
        </div>

        {/* Confirm new password */}
        <div className="form-group">
          <label className="lbl">Confirm New Password</label>
          <div className="inp-icon-wrap">
            <i className="fas fa-check-double" />
            <input
              className="inp"
              type="password"
              placeholder="••••••••"
              value={pwForm.confirmPassword}
              onChange={setP('confirmPassword')}
              autoComplete="new-password"
            />
          </div>
          {/* Live match indicator */}
          {pwForm.confirmPassword && (
            <div className={pwForm.newPassword === pwForm.confirmPassword ? 'field-success' : 'field-error'}>
              <i className={`fas ${pwForm.newPassword === pwForm.confirmPassword ? 'fa-check' : 'fa-times'}`} />
              {pwForm.newPassword === pwForm.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
            </div>
          )}
        </div>

        <button
          className="btn btn-red"
          onClick={submitPassword}
          disabled={pwLoading}
        >
          {pwLoading
            ? <><i className="fas fa-spinner spinner" /> Updating...</>
            : <><i className="fas fa-shield-alt" /> Change Password</>
          }
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION: OVERVIEW (profile summary)
════════════════════════════════════════════════════════════ */
function OverviewSection({ user, history }) {
  const approved = history.filter(h => h.status === 'approved');
  const pending  = history.filter(h => h.status === 'pending');
  const totalSpent = approved.reduce((s, h) => s + (h.amount || 0), 0);
  const fmt = d => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div>
      <div className="sec-hdr">
        <div className="sec-ttl" style={{ fontFamily: 'var(--font-d)', letterSpacing: 2 }}>
          WELCOME BACK, <span style={{ color: 'var(--c-red)' }}>{(user?.fullName || user?.name || 'User').split(' ')[0].toUpperCase()}</span>
        </div>
        <div className="sec-sub">Here is a summary of your VaultX account.</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { icon: 'fa-shopping-bag', label: 'Total Purchases', val: history.length,        col: 'var(--c-red)'   },
          { icon: 'fa-check-circle', label: 'Approved',         val: approved.length,       col: 'var(--c-green)' },
          { icon: 'fa-clock',        label: 'Pending',           val: pending.length,        col: 'var(--c-gold)'  },
          { icon: 'fa-dollar-sign',  label: 'Total Spent',       val: `$${totalSpent.toFixed(2)}`, col: 'var(--c-blue)'  },
        ].map((s, i) => (
          <div key={i} className="pf-card" style={{ padding: 18, textAlign: 'center', animationDelay: `${i * 0.08}s` }}>
            <i className={`fas ${s.icon}`} style={{ fontSize: 20, color: s.col, marginBottom: 10, display: 'block' }} />
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 28, letterSpacing: 1, color: s.col }}>{s.val}</div>
            <div style={{ fontSize: 10, color: 'var(--c-text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.4px', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Account details */}
      <div className="pf-card" style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--c-text2)' }}>
          <i className="fas fa-id-card" style={{ marginRight: 8 }} /> Account Details
        </div>
        {[
          { label: 'Full Name', val: user?.fullName || user?.name || '—', icon: 'fa-user' },
          { label: 'Email',     val: user?.email || '—',                   icon: 'fa-envelope' },
          { label: 'Role',      val: user?.role  || 'user',                icon: 'fa-tag' },
          { label: 'Member Since', val: user?.createdAt ? fmt(user.createdAt) : '—', icon: 'fa-calendar' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--c-glass-bd)' }}>
            <i className={`fas ${row.icon}`} style={{ color: 'var(--c-text3)', width: 16, textAlign: 'center', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--c-text3)', marginBottom: 2 }}>{row.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{row.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity preview */}
      {history.length > 0 && (
        <div className="pf-card">
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--c-text2)' }}>
            <i className="fas fa-history" style={{ marginRight: 8 }} /> Recent Purchases
          </div>
          {history.slice(0, 3).map(h => (
            <div key={h._id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.03)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(232,25,44,.08)', border: '1px solid rgba(232,25,44,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fas fa-shopping-bag" style={{ color: 'var(--c-red)', fontSize: 14 }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {h.content?.title || 'Unknown Content'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--c-text3)', marginTop: 2 }}>
                  {h.paymentMethod} &bull; {h.createdAt ? new Date(h.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : ''}
                </div>
              </div>
              <StatusBadge status={h.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NAVIGATION BAR
════════════════════════════════════════════════════════════ */
function ProfileNav({ user, onLogout, onHome }) {
  return (
    <nav id="pf-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <button className="btn-ghost" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onHome}>
          <div className="nav-logo">VAULT<span>X</span></div>
        </button>
        <button className="nav-back" onClick={onHome}>
          <i className="fas fa-chevron-left" style={{ fontSize: 11 }} /> Home
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, color: 'var(--c-text3)' }}>
          {user?.fullName || user?.name || user?.email}
        </span>
        <button className="btn btn-danger btn-sm" onClick={() => {onLogout(); TokenStore.clear()}}>
          <i className="fas fa-sign-out-alt" /> Sign Out
        </button>
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════════════════════════
   TABS CONFIG
════════════════════════════════════════════════════════════ */
const TABS = [
  { key: 'overview',  icon: 'fa-th-large',    label: 'Overview'         },
  { key: 'purchases', icon: 'fa-receipt',      label: 'Purchases'        },
  { key: 'settings',  icon: 'fa-cog',          label: 'Account Settings' },
];

/* ════════════════════════════════════════════════════════════
   PROTECTED ROUTE HOC
   — How to use it: explained below the main component
════════════════════════════════════════════════════════════ */
export function ProtectedRoute({ children, redirectTo = '/' }) {
  /*
   * WHAT THIS DOES:
   * Checks if a valid token exists in localStorage before rendering the
   * protected page. If no token is found, it immediately navigates the
   * user back to redirectTo (default: '/').
   *
   * HOW TO USE IN YOUR ROUTER  (React Router v6):
   *
   *   import { ProtectedRoute } from './ProfilePage';
   *
   *   <Routes>
   *     <Route path="/"        element={<HomePage />} />
   *     <Route path="/profile" element={
   *       <ProtectedRoute redirectTo="/">
   *         <ProfilePage />
   *       </ProtectedRoute>
   *     } />
   *   </Routes>
   *
   * HOW TO USE WITHOUT A ROUTER (single-page / hash routing):
   *   The ProfilePage itself handles this internally — see the
   *   "sessionChecked" and redirect logic inside the main export below.
   */
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (TokenStore.exists()) {
      setAllowed(true);
    } else {
      // No token — redirect immediately
      window.location.href = redirectTo;
    }
    setChecked(true);
  }, [redirectTo]);

  if (!checked) return null;
  if (!allowed)  return null;  // redirect in progress
  return children;
}

/* ════════════════════════════════════════════════════════════
   MAIN PROFILE PAGE COMPONENT
════════════════════════════════════════════════════════════ */
export default function ProfilePage({ onNavigateHome, onLogout: parentLogout }) {
  const [user,           setUser]           = useState(null);
  const [history,        setHistory]        = useState([]);
  const [pageLoading,    setPageLoading]    = useState(true);  // initial full-page load
  const [sessionError,   setSessionError]   = useState('');
  const [activeTab,      setActiveTab]      = useState('overview');
  const { toasts, toast, dismiss }          = useToast();

  /* ── Inject styles once ── */
  useEffect(() => {
    if (!document.getElementById('vx-profile-styles')) {
      const el = document.createElement('style');
      el.id = 'vx-profile-styles';
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
  }, []);

  /* ══════════════════════════════════════════════════════════
     ROUTE PROTECTION — runs before any data fetch
     If there is no token, send the user back to home.

     WHY HERE AND NOT ONLY IN ProtectedRoute:
     The ProtectedRoute HOC above handles React Router usage.
     This internal check handles the case where ProfilePage is
     rendered directly (e.g. state-based routing on a single page).
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!TokenStore.exists()) {
      // No token in localStorage — user is not logged in
      // Navigate back to home immediately
      if (onNavigateHome) {
        onNavigateHome();
      } else {
        // Fallback: if used standalone or with React Router, replace history
        window.location.replace('/');
      }
      return;
    }

    // Token exists — fetch profile and history in parallel
    const init = async () => {
      setPageLoading(true);
      try {
        // Fire both requests at the same time for speed
        const [meRes, histRes] = await Promise.all([
          api.getMe(),                  // GET /me
          api.getPurchaseHistory(),     // GET /purchases/my-history
        ]);

        // Parse /me  →  { status, data:{ user:{...} } }
        const userData = meRes?.data?.user || meRes?.user || meRes?.data || {};
        setUser(userData);

        // Parse /purchases/my-history  →  { status, results, data:{ history:[...] } }
        const histData = histRes?.data?.history || histRes?.history || [];
        setHistory(histData);

      } catch (err) {
        const code = err?.status;

        if (code === 401) {
          // Token expired and refresh failed — clear and redirect
          TokenStore.clear();
          setSessionError('Your session has expired. Please sign in again.');
          setTimeout(() => {
            if (onNavigateHome) onNavigateHome();
            else window.location.replace('/');
          }, 2200);
        } else {
          setSessionError(err?.message || 'Failed to load your profile. Please refresh the page.');
        }
      } finally {
        setPageLoading(false);
      }
    };

    init();
  }, []);

  /* ── Logout handler ── */
  const handleLogout = useCallback(() => {
    TokenStore.clear();
    localStorage.removeItem("user");
    toast('i', 'Signed out', 'You have been signed out successfully.');
    setTimeout(() => {
      if (parentLogout)    parentLogout();
      if (onNavigateHome)  onNavigateHome();
      else window.location.replace('/');
    }, 600);
  }, [parentLogout, onNavigateHome, toast]);

  /* ── Home navigation ── */
  const handleHome = useCallback(() => {
    if (onNavigateHome) onNavigateHome();
    else window.location.href = '/';
  }, [onNavigateHome]);

  /* ── Full-page loading screen ── */
  if (pageLoading) {
    return (
      <>
        <div style={{ position: 'fixed', inset: 0, background: 'var(--c-bg)', zIndex: 0 }} />
        <div id="pf-loading" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 28, letterSpacing: 4, color: 'var(--c-text)' }}>
            VAULT<span style={{ color: 'var(--c-red)' }}>X</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--c-text3)' }}>
            <i className="fas fa-spinner spinner" />
            Loading your profile...
          </div>
        </div>
      </>
    );
  }

  /* ── Session error screen ── */
  if (sessionError) {
    return (
      <>
        <div style={{ position: 'fixed', inset: 0, background: 'var(--c-bg)', zIndex: 0 }} />
        <div id="pf-loading" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 24 }}>
          <i className="fas fa-exclamation-triangle" style={{ fontSize: 38, color: 'var(--c-red)', marginBottom: 16, display: 'block' }} />
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{sessionError}</div>
          <div style={{ fontSize: 13, color: 'var(--c-text3)', marginBottom: 24 }}>Redirecting you to the home page...</div>
          <button className="btn btn-red" onClick={handleHome}>
            <i className="fas fa-home" /> Go Home Now
          </button>
        </div>
      </>
    );
  }

  /* ── Compute initials for avatar ── */
  const initials = (() => {
    const name = user?.fullName || user?.name || user?.email || '';
    return name
      .split(' ')
      .map(w => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?';
  })();

  /* ── Render ── */
  return (
    <>
      {/* Ambient orbs */}
      <div className="pf-orb pf-orb-1" />
      <div className="pf-orb pf-orb-2" />

      {/* Nav */}
      <ProfileNav user={user} onLogout={handleLogout} onHome={handleHome} />

      <div id="pf-wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* Mobile tab pills (visible below 820px) */}
        <div className="mob-tabs">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`mob-tab-pill${activeTab === t.key ? ' active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              <i className={`fas ${t.icon}`} /> {t.label}
            </button>
          ))}
        </div>

        <div className="pf-layout">

          {/* ── Sidebar ── */}
          <aside className="pf-sidebar">
            <div className="pf-card" style={{ padding: 0, overflow: 'hidden' }}>

              {/* Avatar block */}
              <div className="av-block">
                <div className="av-circle">{initials}</div>
                <div className="av-name">{user?.fullName || user?.name || 'User'}</div>
                <div className="av-email">{user?.email}</div>
                {user?.role && (
                  <div style={{ marginTop: 10 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 50, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', background: user.role === 'admin' ? 'rgba(79,163,255,.1)' : 'rgba(0,201,122,.1)', color: user.role === 'admin' ? 'var(--c-blue)' : 'var(--c-green)', border: `1px solid ${user.role === 'admin' ? 'rgba(79,163,255,.2)' : 'rgba(0,201,122,.2)'}` }}>
                      <i className={`fas ${user.role === 'admin' ? 'fa-crown' : 'fa-user'}`} />
                      {user.role}
                    </span>
                  </div>
                )}
              </div>

              {/* Tab links */}
              <div className="pf-tabs">
                {TABS.map(t => (
                  <button
                    key={t.key}
                    className={`pf-tab${activeTab === t.key ? ' active' : ''}`}
                    onClick={() => setActiveTab(t.key)}
                  >
                    <i className={`fas ${t.icon}`} />
                    {t.label}
                  </button>
                ))}

                <div className="divider" style={{ margin: '12px 0' }} />

                <button className="pf-tab" style={{ color: 'var(--c-red)' }} onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main key={activeTab} style={{ animation: 'fadeUp .3s var(--ease)' }}>
            {activeTab === 'overview' && (
              <OverviewSection user={user} history={history} />
            )}
            {activeTab === 'purchases' && (
              <PurchaseHistorySection toast={toast} />
            )}
            {activeTab === 'settings' && (
              <AccountSettingsSection user={user} toast={toast} />
            )}
          </main>

        </div>
      </div>

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </>
  );
}