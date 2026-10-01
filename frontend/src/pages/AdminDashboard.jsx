import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* ─────────────── theme tokens ─────────────── */
const THEMES = {
  dark: {
    bg: '#1a1a1f',
    sidebar: '#141418',
    sidebarBorder: '#2a2a30',
    surface: '#1f1f26',
    surfaceBorder: '#2e2e38',
    surfaceHover: '#26262f',
    activeNav: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)',
    text: '#e8e8f0',
    textMuted: '#8888a0',
    textLabel: '#5a5a72',
    accent: '#6366f1',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    inputBg: '#26262f',
    inputBorder: '#3a3a4a',
    badgeSuccess: { bg: '#14532d', color: '#4ade80' },
    badgePending: { bg: '#3a3000', color: '#fbbf24' },
    badgeFailed:  { bg: '#450a0a', color: '#f87171' },
    toggle: '#2a2a35',
  },
  light: {
    bg: '#f5f5fa',
    sidebar: '#ffffff',
    sidebarBorder: '#e5e5ef',
    surface: '#ffffff',
    surfaceBorder: '#e8e8f0',
    surfaceHover: '#f0f0f8',
    activeNav: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)',
    text: '#111118',
    textMuted: '#6b6b80',
    textLabel: '#9999aa',
    accent: '#6366f1',
    success: '#16a34a',
    warning: '#d97706',
    danger: '#dc2626',
    inputBg: '#f5f5fa',
    inputBorder: '#d5d5e0',
    badgeSuccess: { bg: '#dcfce7', color: '#16a34a' },
    badgePending: { bg: '#fef9c3', color: '#ca8a04' },
    badgeFailed:  { bg: '#fee2e2', color: '#dc2626' },
    toggle: '#e5e5ef',
  },
};

/* ─────────────── helpers ─────────────── */
const fmt = n => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('accessToken')}` });

function StatusBadge({ status, t }) {
  const map = { success: t.badgeSuccess, pending: t.badgePending, failed: t.badgeFailed, refunded: t.badgePending };
  const s = map[status] || t.badgePending;
  return (
    <span style={{
      display:'inline-block', padding:'3px 10px', borderRadius:'20px',
      fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase',
      background: s.bg, color: s.color,
    }}>{status}</span>
  );
}

/* ─────────────── sidebar nav items ─────────────── */
const NAV_MAIN = [
  { id:'overview',  label:'Overview',  icon:'⊞' },
  { id:'donations', label:'Donations', icon:'◈' },
  { id:'campaigns', label:'Campaigns', icon:'◉' },
  { id:'events',    label:'Events',    icon:'◷' },
  { id:'gallery',   label:'Gallery',   icon:'⬡' },
];

function Sidebar({ active, setActive, onLogout, dark, setDark, t }) {
  return (
    <aside style={{
      width:'240px', minHeight:'100vh', background:t.sidebar,
      borderRight:`1px solid ${t.sidebarBorder}`,
      display:'flex', flexDirection:'column',
      padding:'1.5rem 1rem', boxSizing:'border-box',
      position:'sticky', top:0,
    }}>
      {/* Brand */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.75rem' }}>
        <div style={{
          width:34, height:34, borderRadius:'10px',
          background:'linear-gradient(135deg,#4f46e5,#7c3aed)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1rem', color:'#fff', boxShadow:'0 2px 8px rgba(79,70,229,0.3)',
        }}>⚡</div>
        <span style={{ color:t.text, fontWeight:800, fontSize:'1rem', letterSpacing:'-0.01em' }}>
          SpeedTrust
        </span>
      </div>

      {/* Nav main */}
      <p style={{ color:t.textLabel, fontSize:'0.62rem', letterSpacing:'0.1em', fontWeight:700, margin:'0 0 0.5rem 0.5rem' }}>MAIN</p>
      <nav style={{ display:'flex', flexDirection:'column', gap:'3px', marginBottom:'1.5rem' }}>
        {NAV_MAIN.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)} style={{
            display:'flex', alignItems:'center', gap:'0.75rem',
            width:'100%', padding:'0.6rem 0.85rem',
            background: active === n.id ? t.activeNav : 'transparent',
            border:'none', borderRadius:'10px',
            color: active === n.id ? '#fff' : t.textMuted,
            fontSize:'0.88rem', fontWeight: active === n.id ? 600 : 500,
            cursor:'pointer', textAlign:'left', transition:'all 0.15s ease',
          }}>
            <span style={{ fontSize:'1rem', opacity: active === n.id ? 1 : 0.7 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      {/* Section divider */}
      <div style={{ height:'1px', background:t.sidebarBorder, margin:'auto 0 1rem' }} />

      <p style={{ color:t.textLabel, fontSize:'0.62rem', letterSpacing:'0.1em', fontWeight:700, margin:'0 0 0.5rem 0.5rem' }}>ACCOUNT</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'3px' }}>
        {/* Dark/light toggle */}
        <button onClick={() => setDark(!dark)} style={{
          display:'flex', alignItems:'center', gap:'0.75rem',
          width:'100%', padding:'0.55rem 0.85rem',
          background:'transparent', border:'none', borderRadius:'8px',
          color:t.textMuted, fontSize:'0.86rem', fontWeight:500,
          cursor:'pointer', textAlign:'left',
        }}>
          <span>{dark ? '☀' : '☾'}</span>
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={onLogout} style={{
          display:'flex', alignItems:'center', gap:'0.75rem',
          width:'100%', padding:'0.55rem 0.85rem',
          background:'transparent', border:'none', borderRadius:'8px',
          color:t.textMuted, fontSize:'0.86rem', fontWeight:500,
          cursor:'pointer', textAlign:'left',
        }}>
          <span>↩</span> Logout
        </button>
      </div>
    </aside>
  );
}

/* ─────────────── stat card ─────────────── */
function StatCard({ title, value, sub, icon, accent, t }) {
  return (
    <div style={{
      background:t.surface, border:`1px solid ${t.surfaceBorder}`,
      borderRadius:'14px', padding:'1.4rem 1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <p style={{ margin:'0 0 0.5rem', fontSize:'0.73rem', fontWeight:600, color:t.textMuted, letterSpacing:'0.07em', textTransform:'uppercase' }}>{title}</p>
          <p style={{ margin:0, fontSize:'1.85rem', fontWeight:800, letterSpacing:'-0.03em', color:t.text }}>{value}</p>
          {sub && <p style={{ margin:'0.3rem 0 0', fontSize:'0.75rem', color:t.textMuted }}>{sub}</p>}
        </div>
        <div style={{
          width:42, height:42, borderRadius:'11px',
          background: accent || t.activeNav,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.15rem', color:'#fff',
        }}>{icon}</div>
      </div>
    </div>
  );
}

/* ─────────────── modal / slide panel ─────────────── */
function Panel({ open, onClose, title, children, t }) {
  if (!open) return null;
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:100,
      display:'flex', alignItems:'flex-end', justifyContent:'flex-end',
    }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)' }} />
      <div style={{
        position:'relative', width:'500px', maxWidth:'96vw', height:'100vh',
        background:t.surface, borderLeft:`1px solid ${t.surfaceBorder}`,
        overflowY:'auto', display:'flex', flexDirection:'column',
        boxShadow:'-8px 0 32px rgba(0,0,0,0.2)',
      }}>
        <div style={{ padding:'1.5rem', borderBottom:`1px solid ${t.surfaceBorder}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ margin:0, fontSize:'1.05rem', fontWeight:700, color:t.text }}>{title}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:t.textMuted, fontSize:'1.2rem', cursor:'pointer' }}>✕</button>
        </div>
        <div style={{ padding:'1.5rem', flex:1 }}>{children}</div>
      </div>
    </div>
  );
}

/* ─────────────── form field ─────────────── */
function Field({ label, t, children }) {
  return (
    <div style={{ marginBottom:'1rem' }}>
      <label style={{ display:'block', fontSize:'0.74rem', fontWeight:600, color:t.textMuted, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:'0.35rem' }}>{label}</label>
      {children}
    </div>
  );
}
function Input({ t, ...props }) {
  return (
    <input {...props} style={{
      width:'100%', padding:'0.6rem 0.8rem',
      background:t.inputBg, border:`1px solid ${t.inputBorder}`,
      borderRadius:'8px', color:t.text, fontSize:'0.875rem',
      outline:'none', boxSizing:'border-box', fontFamily:'inherit',
      ...props.style,
    }} />
  );
}
function Textarea({ t, ...props }) {
  return (
    <textarea {...props} style={{
      width:'100%', padding:'0.6rem 0.8rem', minHeight:'90px',
      background:t.inputBg, border:`1px solid ${t.inputBorder}`,
      borderRadius:'8px', color:t.text, fontSize:'0.875rem',
      outline:'none', boxSizing:'border-box', fontFamily:'inherit', resize:'vertical',
      ...props.style,
    }} />
  );
}
function Select({ t, children, ...props }) {
  return (
    <select {...props} style={{
      width:'100%', padding:'0.6rem 0.8rem',
      background:t.inputBg, border:`1px solid ${t.inputBorder}`,
      borderRadius:'8px', color:t.text, fontSize:'0.875rem',
      outline:'none', boxSizing:'border-box', fontFamily:'inherit',
    }}>{children}</select>
  );
}
function Btn({ children, t, variant='primary', ...props }) {
  const styles = {
    primary: { background:'linear-gradient(135deg,#4f46e5,#7c3aed)', color:'#fff', border:'none' },
    ghost:   { background:'transparent', color:t.textMuted, border:`1px solid ${t.inputBorder}` },
    danger:  { background:t.badgeFailed.bg, color:t.badgeFailed.color, border:'none' },
  };
  return (
    <button {...props} style={{
      padding:'0.55rem 1.1rem', borderRadius:'8px', fontSize:'0.86rem', fontWeight:600,
      cursor:'pointer', fontFamily:'inherit', ...styles[variant], ...props.style,
    }}>{children}</button>
  );
}

/* ─────────────── overview tab ─────────────── */
function OverviewTab({ stats, t }) {
  return (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:'1.1rem', marginBottom:'2rem' }}>
        <StatCard title="Total Donations" value={stats.total_donations} sub="Successful" icon="◈" t={t} />
        <StatCard title="Revenue" value={`₹${fmt(stats.total_amount)}`} sub="Collected" icon="₹" accent="linear-gradient(135deg,#059669,#10b981)" t={t} />
        <StatCard title="Campaigns" value={stats.active_campaigns} sub="Active now" icon="◉" accent="linear-gradient(135deg,#d97706,#f59e0b)" t={t} />
        <StatCard title="Pending" value={stats.pending_donations ?? 0} sub="Awaiting confirmation" icon="◷" accent="linear-gradient(135deg,#dc2626,#ef4444)" t={t} />
      </div>

      <div style={{ background:t.surface, border:`1px solid ${t.surfaceBorder}`, borderRadius:'14px', padding:'1.5rem' }}>
        <h2 style={{ margin:'0 0 1.2rem', fontSize:'0.95rem', fontWeight:700, color:t.text }}>Recent Donations</h2>
        {!stats.recent_donations?.length ? (
          <p style={{ color:t.textMuted, textAlign:'center', padding:'2rem 0' }}>No donations yet.</p>
        ) : (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.86rem' }}>
              <thead>
                <tr>{['Donor','Email','Amount','Status','Date'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'0.65rem 1rem', fontSize:'0.68rem', fontWeight:700, color:t.textMuted, letterSpacing:'0.08em', textTransform:'uppercase', borderBottom:`1px solid ${t.surfaceBorder}` }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {stats.recent_donations.map((d, i) => (
                  <tr key={d.id} style={{ background: i%2!==0 ? t.surfaceHover : 'transparent' }}>
                    <td style={{ padding:'0.85rem 1rem', color:t.text, fontWeight:500, borderBottom:`1px solid ${t.surfaceBorder}` }}>{d.name}</td>
                    <td style={{ padding:'0.85rem 1rem', color:t.textMuted, borderBottom:`1px solid ${t.surfaceBorder}` }}>{d.email}</td>
                    <td style={{ padding:'0.85rem 1rem', color:t.text, fontWeight:600, borderBottom:`1px solid ${t.surfaceBorder}` }}>₹{fmt(d.amount)}</td>
                    <td style={{ padding:'0.85rem 1rem', borderBottom:`1px solid ${t.surfaceBorder}` }}><StatusBadge status={d.status} t={t} /></td>
                    <td style={{ padding:'0.85rem 1rem', color:t.textMuted, fontSize:'0.8rem', borderBottom:`1px solid ${t.surfaceBorder}` }}>{d.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────── donations tab ─────────────── */
function DonationsTab({ t }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/payment/donations/', { headers: authHeaders() });
      setDonations(Array.isArray(res.data) ? res.data : (res.data.results || []));
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = donations.filter(d => {
    const matchStatus = filter === 'all' || d.status === filter;
    const query = search.trim().toLowerCase();
    const matchQuery = !query ||
      (d.donor_name && d.donor_name.toLowerCase().includes(query)) ||
      (d.donor_email && d.donor_email.toLowerCase().includes(query)) ||
      (d.donation_id && String(d.donation_id).toLowerCase().includes(query));
    return matchStatus && matchQuery;
  });

  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem', flexWrap:'wrap', gap:'0.75rem' }}>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          {['all', 'success', 'pending', 'failed'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding:'0.35rem 0.85rem', borderRadius:'20px', fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
              border:`1px solid ${t.surfaceBorder}`,
              background: filter === s ? t.activeNav : t.surface,
              color: filter === s ? '#fff' : t.textMuted, textTransform:'capitalize',
            }}>{s}</button>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', background:t.inputBg, border:`1px solid ${t.inputBorder}`, borderRadius:'8px', padding:'0.4rem 0.75rem' }}>
          <span style={{ color:t.textMuted, fontSize:'0.85rem' }}>⌕</span>
          <input
            placeholder="Search donor or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background:'transparent', border:'none', outline:'none', color:t.text, fontSize:'0.82rem', fontFamily:'inherit' }}
          />
        </div>
      </div>

      <div style={{ background:t.surface, border:`1px solid ${t.surfaceBorder}`, borderRadius:'14px', overflow:'hidden' }}>
        {loading ? (
          <p style={{ padding:'3rem', color:t.textMuted, textAlign:'center' }}>Loading donations…</p>
        ) : filtered.length === 0 ? (
          <p style={{ padding:'3rem', color:t.textMuted, textAlign:'center' }}>No matching donations found.</p>
        ) : (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.86rem' }}>
              <thead>
                <tr>{['Donor','Email','Amount','Type','Status','Date','Action'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'0.7rem 1rem', fontSize:'0.68rem', fontWeight:700, color:t.textMuted, letterSpacing:'0.08em', textTransform:'uppercase', borderBottom:`1px solid ${t.surfaceBorder}` }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr key={d.id || d.donation_id} style={{ background: i%2!==0 ? t.surfaceHover : 'transparent' }}>
                    <td style={{ padding:'0.85rem 1rem', color:t.text, fontWeight:600, borderBottom:`1px solid ${t.surfaceBorder}` }}>
                      {d.is_anonymous ? 'Anonymous' : d.donor_name}
                    </td>
                    <td style={{ padding:'0.85rem 1rem', color:t.textMuted, borderBottom:`1px solid ${t.surfaceBorder}` }}>{d.donor_email}</td>
                    <td style={{ padding:'0.85rem 1rem', color:t.text, fontWeight:600, borderBottom:`1px solid ${t.surfaceBorder}` }}>₹{fmt(d.amount)}</td>
                    <td style={{ padding:'0.85rem 1rem', color:t.textMuted, fontSize:'0.8rem', borderBottom:`1px solid ${t.surfaceBorder}`, textTransform:'capitalize' }}>{d.donation_type}</td>
                    <td style={{ padding:'0.85rem 1rem', borderBottom:`1px solid ${t.surfaceBorder}` }}><StatusBadge status={d.status} t={t} /></td>
                    <td style={{ padding:'0.85rem 1rem', color:t.textMuted, fontSize:'0.8rem', borderBottom:`1px solid ${t.surfaceBorder}` }}>
                      {d.created_at ? new Date(d.created_at).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td style={{ padding:'0.85rem 1rem', borderBottom:`1px solid ${t.surfaceBorder}` }}>
                      <Btn t={t} variant="ghost" onClick={() => setSelected(d)} style={{ padding:'0.3rem 0.7rem', fontSize:'0.78rem' }}>View</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Donation Detail Panel */}
      <Panel open={!!selected} onClose={() => setSelected(null)} title="Donation Details" t={t}>
        {selected && (
          <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
            <div style={{ background:t.surfaceHover, padding:'1rem', borderRadius:'10px' }}>
              <p style={{ margin:'0 0 0.25rem', fontSize:'0.72rem', color:t.textMuted, textTransform:'uppercase' }}>Amount</p>
              <p style={{ margin:0, fontSize:'1.75rem', fontWeight:800, color:t.text }}>₹{fmt(selected.amount)}</p>
              <div style={{ marginTop:'0.5rem' }}><StatusBadge status={selected.status} t={t} /></div>
            </div>

            <div>
              <Field label="Donor Name" t={t}><p style={{ margin:0, color:t.text, fontWeight:600 }}>{selected.donor_name} {selected.is_anonymous && '(Anonymous)'}</p></Field>
              <Field label="Donor Email" t={t}><p style={{ margin:0, color:t.text }}>{selected.donor_email}</p></Field>
              {selected.donor_phone && <Field label="Phone" t={t}><p style={{ margin:0, color:t.text }}>{selected.donor_phone}</p></Field>}
              <Field label="Donation ID" t={t}><p style={{ margin:0, color:t.textMuted, fontSize:'0.8rem', wordBreak:'break-all' }}>{selected.donation_id}</p></Field>
              <Field label="Donation Type" t={t}><p style={{ margin:0, color:t.text, textTransform:'capitalize' }}>{selected.donation_type}</p></Field>
              {selected.message && <Field label="Message" t={t}><p style={{ margin:0, color:t.text, fontStyle:'italic' }}>"{selected.message}"</p></Field>}
            </div>

            {selected.status === 'success' && (
              <a
                href={`/api/payment/download-receipt/${selected.donation_id}/`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                  padding:'0.65rem', borderRadius:'8px', background:'linear-gradient(135deg,#4f46e5,#7c3aed)',
                  color:'#fff', textDecoration:'none', fontWeight:600, fontSize:'0.86rem', marginTop:'0.5rem',
                }}
              >
                📄 Download Tax Receipt PDF
              </a>
            )}
          </div>
        )}
      </Panel>
    </>
  );
}

/* ─────────────── campaigns tab ─────────────── */
const CAMP_BLANK = { name:'', slug:'', category:'general', goal_amount:'', description:'', image_url:'', is_active:true };
const CAMP_CATS = [
  { value:'general', label:'General Fund' },
  { value:'education', label:'Education Fund' },
  { value:'food', label:'Food Program' },
  { value:'medical', label:'Medical Care' },
  { value:'infrastructure', label:'Infrastructure' },
  { value:'emergency', label:'Emergency Relief' },
];

function CampaignsTab({ t }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState(false);
  const [form, setForm] = useState(CAMP_BLANK);
  const [editSlug, setEditSlug] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/payment/campaigns/', { headers: authHeaders() });
      setCampaigns(Array.isArray(res.data) ? res.data : (res.data.results || []));
    } catch {
      setMsg('Failed to load campaigns.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openNew() { setForm(CAMP_BLANK); setEditSlug(null); setPanel(true); }
  function openEdit(c) { setForm({...c}); setEditSlug(c.slug); setPanel(true); }

  async function save() {
    setSaving(true); setMsg('');
    try {
      if (editSlug) await axios.put(`/api/payment/campaigns/${editSlug}/`, form, { headers: authHeaders() });
      else {
        const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        await axios.post('/api/payment/campaigns/', { ...form, slug }, { headers: authHeaders() });
      }
      setPanel(false); load();
    } catch {
      setMsg('Save failed. Make sure name, slug, and goal are valid.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
        <h2 style={{ margin:0, fontSize:'0.95rem', fontWeight:700, color:t.text }}>Campaigns ({campaigns.length})</h2>
        <Btn t={t} onClick={openNew}>+ New Campaign</Btn>
      </div>
      {msg && <p style={{ color:t.danger, fontSize:'0.85rem', marginBottom:'1rem' }}>{msg}</p>}

      {loading ? (
        <p style={{ color:t.textMuted, textAlign:'center', padding:'3rem' }}>Loading campaigns…</p>
      ) : campaigns.length === 0 ? (
        <p style={{ color:t.textMuted, textAlign:'center', padding:'3rem' }}>No campaigns found. Create your first campaign!</p>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.25rem' }}>
          {campaigns.map(c => {
            const goal = Number(c.goal_amount) || 1;
            const raised = Number(c.raised_amount) || 0;
            const pct = Math.min(100, Math.round((raised / goal) * 100));
            return (
              <div key={c.id || c.slug} style={{ background:t.surface, border:`1px solid ${t.surfaceBorder}`, borderRadius:'14px', padding:'1.3rem', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem' }}>
                    <span style={{ fontSize:'0.7rem', fontWeight:700, color:t.accent, textTransform:'uppercase', letterSpacing:'0.06em' }}>{c.category}</span>
                    <span style={{
                      background: c.is_active ? t.badgeSuccess.bg : t.badgePending.bg,
                      color: c.is_active ? t.badgeSuccess.color : t.badgePending.color,
                      borderRadius:'20px', padding:'2px 8px', fontSize:'0.68rem', fontWeight:700, textTransform:'uppercase',
                    }}>{c.is_active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <h3 style={{ margin:'0 0 0.5rem', fontSize:'1.05rem', fontWeight:700, color:t.text }}>{c.name}</h3>
                  <p style={{ margin:'0 0 1rem', fontSize:'0.8rem', color:t.textMuted, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{c.description}</p>
                </div>

                <div>
                  {/* Progress bar */}
                  <div style={{ height:'6px', background:t.surfaceHover, borderRadius:'6px', overflow:'hidden', marginBottom:'0.5rem' }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg,#4f46e5,#7c3aed)', borderRadius:'6px' }} />
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', marginBottom:'1rem' }}>
                    <span style={{ color:t.text, fontWeight:600 }}>₹{fmt(raised)} raised</span>
                    <span style={{ color:t.textMuted }}>Goal: ₹{fmt(goal)} ({pct}%)</span>
                  </div>

                  <Btn t={t} variant="ghost" onClick={() => openEdit(c)} style={{ width:'100%', padding:'0.45rem', fontSize:'0.82rem' }}>Edit Campaign</Btn>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Campaign Modal */}
      <Panel open={panel} onClose={() => setPanel(false)} title={editSlug ? 'Edit Campaign' : 'New Campaign'} t={t}>
        <Field label="Campaign Name" t={t}><Input t={t} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Free Breakfast for School Children" /></Field>
        <Field label="Category" t={t}>
          <Select t={t} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            {CAMP_CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </Select>
        </Field>
        <Field label="Goal Amount (₹)" t={t}><Input t={t} type="number" value={form.goal_amount} onChange={e=>setForm({...form,goal_amount:e.target.value})} placeholder="100000" /></Field>
        <Field label="Description" t={t}><Textarea t={t} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe what this campaign supports…" /></Field>
        <Field label="Cover Image URL" t={t}><Input t={t} value={form.image_url||''} onChange={e=>setForm({...form,image_url:e.target.value})} placeholder="https://..." /></Field>
        <Field label="Active Status" t={t}>
          <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer', color:t.text, fontSize:'0.875rem' }}>
            <input type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})} />
            Active on public site
          </label>
        </Field>
        {msg && <p style={{ color:t.danger, fontSize:'0.82rem', marginBottom:'0.75rem' }}>{msg}</p>}
        <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem' }}>
          <Btn t={t} onClick={save} disabled={saving} style={{ flex:1 }}>{saving ? 'Saving…' : 'Save Campaign'}</Btn>
          <Btn t={t} variant="ghost" onClick={() => setPanel(false)}>Cancel</Btn>
        </div>
      </Panel>
    </>
  );
}

/* ─────────────── events tab ─────────────── */
const EVENT_BLANK = { title:'', category:'Community', description:'', details:'', date:'', location:'', beneficiaries:'', volunteers:'', donor:'', donor_initials:'', is_published:true };
const EVENT_CATS  = ['Nutrition','Education','Healthcare','Community','Sports','Celebrations','Arts'];

function EventsTab({ t }) {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel]   = useState(false);
  const [form, setForm]     = useState(EVENT_BLANK);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/payment/admin/events/', { headers: authHeaders() });
      setItems(Array.isArray(res.data) ? res.data : (res.data.results || []));
    } catch { setMsg('Failed to load events.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openNew() { setForm(EVENT_BLANK); setEditId(null); setPanel(true); }
  function openEdit(item) { setForm({...item}); setEditId(item.id); setPanel(true); }

  async function save() {
    setSaving(true); setMsg('');
    try {
      if (editId) await axios.put(`/api/payment/admin/events/${editId}/`, form, { headers: authHeaders() });
      else        await axios.post('/api/payment/admin/events/', form, { headers: authHeaders() });
      setPanel(false); load();
    } catch { setMsg('Save failed. Check required fields.'); }
    finally { setSaving(false); }
  }

  async function del(id) {
    if (!window.confirm('Delete this event?')) return;
    try { await axios.delete(`/api/payment/admin/events/${id}/`, { headers: authHeaders() }); load(); }
    catch { setMsg('Delete failed.'); }
  }

  async function togglePublish(item) {
    try {
      await axios.patch(`/api/payment/admin/events/${item.id}/`, { is_published: !item.is_published }, { headers: authHeaders() });
      load();
    } catch { setMsg('Update failed.'); }
  }

  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
        <h2 style={{ margin:0, fontSize:'0.95rem', fontWeight:700, color:t.text }}>Events ({items.length})</h2>
        <Btn t={t} onClick={openNew}>+ New Event</Btn>
      </div>
      {msg && <p style={{ color:t.danger, fontSize:'0.85rem', marginBottom:'1rem' }}>{msg}</p>}

      <div style={{ background:t.surface, border:`1px solid ${t.surfaceBorder}`, borderRadius:'14px', overflow:'hidden' }}>
        {loading ? (
          <p style={{ padding:'2rem', color:t.textMuted, textAlign:'center' }}>Loading…</p>
        ) : items.length === 0 ? (
          <p style={{ padding:'2rem', color:t.textMuted, textAlign:'center' }}>No events yet. Create your first event!</p>
        ) : (
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.86rem' }}>
            <thead>
              <tr>{['Title','Category','Date','Location','Published',''].map(h => (
                <th key={h} style={{ textAlign:'left', padding:'0.7rem 1rem', fontSize:'0.68rem', fontWeight:700, color:t.textMuted, letterSpacing:'0.08em', textTransform:'uppercase', borderBottom:`1px solid ${t.surfaceBorder}` }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} style={{ background: i%2!==0 ? t.surfaceHover : 'transparent' }}>
                  <td style={{ padding:'0.8rem 1rem', color:t.text, fontWeight:600, borderBottom:`1px solid ${t.surfaceBorder}`, maxWidth:'200px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</td>
                  <td style={{ padding:'0.8rem 1rem', color:t.textMuted, borderBottom:`1px solid ${t.surfaceBorder}` }}>{item.category}</td>
                  <td style={{ padding:'0.8rem 1rem', color:t.textMuted, borderBottom:`1px solid ${t.surfaceBorder}` }}>{item.date}</td>
                  <td style={{ padding:'0.8rem 1rem', color:t.textMuted, borderBottom:`1px solid ${t.surfaceBorder}`, maxWidth:'150px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.location}</td>
                  <td style={{ padding:'0.8rem 1rem', borderBottom:`1px solid ${t.surfaceBorder}` }}>
                    <button onClick={() => togglePublish(item)} style={{
                      background: item.is_published ? t.badgeSuccess.bg : t.badgePending.bg,
                      color: item.is_published ? t.badgeSuccess.color : t.badgePending.color,
                      border:'none', borderRadius:'20px', padding:'2px 10px',
                      fontSize:'0.7rem', fontWeight:700, cursor:'pointer', textTransform:'uppercase',
                    }}>{item.is_published ? 'Live' : 'Draft'}</button>
                  </td>
                  <td style={{ padding:'0.8rem 1rem', borderBottom:`1px solid ${t.surfaceBorder}` }}>
                    <div style={{ display:'flex', gap:'0.5rem' }}>
                      <Btn t={t} variant="ghost" onClick={() => openEdit(item)} style={{ padding:'0.3rem 0.7rem', fontSize:'0.78rem' }}>Edit</Btn>
                      <Btn t={t} variant="danger" onClick={() => del(item.id)} style={{ padding:'0.3rem 0.7rem', fontSize:'0.78rem' }}>Delete</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Panel open={panel} onClose={() => setPanel(false)} title={editId ? 'Edit Event' : 'New Event'} t={t}>
        <Field label="Title" t={t}><Input t={t} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Event title" /></Field>
        <Field label="Category" t={t}>
          <Select t={t} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            {EVENT_CATS.map(c=><option key={c}>{c}</option>)}
          </Select>
        </Field>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
          <Field label="Date" t={t}><Input t={t} value={form.date} onChange={e=>setForm({...form,date:e.target.value})} placeholder="Oct 12, 2024" /></Field>
          <Field label="Location" t={t}><Input t={t} value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="City, State" /></Field>
        </div>
        <Field label="Description" t={t}><Textarea t={t} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Short description…" /></Field>
        <Field label="Details" t={t}><Textarea t={t} value={form.details} onChange={e=>setForm({...form,details:e.target.value})} placeholder="Full event details…" style={{minHeight:'120px'}} /></Field>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
          <Field label="Beneficiaries" t={t}><Input t={t} value={form.beneficiaries} onChange={e=>setForm({...form,beneficiaries:e.target.value})} placeholder="250+ Families" /></Field>
          <Field label="Volunteers" t={t}><Input t={t} value={form.volunteers} onChange={e=>setForm({...form,volunteers:e.target.value})} placeholder="80 Volunteers" /></Field>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
          <Field label="Donor" t={t}><Input t={t} value={form.donor} onChange={e=>setForm({...form,donor:e.target.value})} placeholder="Jane Doe" /></Field>
          <Field label="Donor Initials" t={t}><Input t={t} value={form.donor_initials} onChange={e=>setForm({...form,donor_initials:e.target.value})} placeholder="JD" maxLength={5} /></Field>
        </div>
        <Field label="Published" t={t}>
          <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer', color:t.text, fontSize:'0.875rem' }}>
            <input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form,is_published:e.target.checked})} />
            Show on public events page
          </label>
        </Field>
        {msg && <p style={{ color:t.danger, fontSize:'0.82rem', marginBottom:'0.75rem' }}>{msg}</p>}
        <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem' }}>
          <Btn t={t} onClick={save} disabled={saving} style={{ flex:1 }}>{saving ? 'Saving…' : 'Save Event'}</Btn>
          <Btn t={t} variant="ghost" onClick={() => setPanel(false)}>Cancel</Btn>
        </div>
      </Panel>
    </>
  );
}

/* ─────────────── gallery tab ─────────────── */
const GAL_BLANK = { title:'', category:'community', aspect:'square', image_url:'', date:'', location:'', summary:'', story:'', impact:'', likes:0, author:'', author_role:'', donor_support:'', tags:[], is_published:true };
const GAL_CATS  = ['education','nutrition','arts','sports','celebrations','healthcare','community'];
const GAL_ASPECTS = ['square','tall','wide'];

function GalleryTab({ t }) {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel]   = useState(false);
  const [form, setForm]     = useState(GAL_BLANK);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState('');
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/payment/admin/gallery/', { headers: authHeaders() });
      setItems(Array.isArray(res.data) ? res.data : (res.data.results || []));
    } catch { setMsg('Failed to load gallery.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openNew() { setForm(GAL_BLANK); setEditId(null); setPanel(true); }
  function openEdit(item) { setForm({...item, tags: item.tags||[] }); setEditId(item.id); setPanel(true); }

  async function save() {
    setSaving(true); setMsg('');
    const payload = { ...form, tags: typeof form.tags === 'string' ? form.tags.split(',').map(t=>t.trim()) : form.tags };
    try {
      if (editId) await axios.put(`/api/payment/admin/gallery/${editId}/`, payload, { headers: authHeaders() });
      else        await axios.post('/api/payment/admin/gallery/', payload, { headers: authHeaders() });
      setPanel(false); load();
    } catch { setMsg('Save failed. Check required fields.'); }
    finally { setSaving(false); }
  }

  async function del(id) {
    if (!window.confirm('Delete this gallery item?')) return;
    try { await axios.delete(`/api/payment/admin/gallery/${id}/`, { headers: authHeaders() }); load(); }
    catch { setMsg('Delete failed.'); }
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);

  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem', flexWrap:'wrap', gap:'0.75rem' }}>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
          {['all', ...GAL_CATS].map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding:'0.3rem 0.8rem', borderRadius:'20px', fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
              border:`1px solid ${t.surfaceBorder}`,
              background: filter===c ? t.activeNav : t.surface,
              color: filter===c ? '#fff' : t.textMuted,
            }}>{c}</button>
          ))}
        </div>
        <Btn t={t} onClick={openNew}>+ Add Photo</Btn>
      </div>
      {msg && <p style={{ color:t.danger, fontSize:'0.85rem', marginBottom:'1rem' }}>{msg}</p>}

      {loading ? (
        <p style={{ color:t.textMuted, textAlign:'center', padding:'3rem' }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <p style={{ color:t.textMuted, textAlign:'center', padding:'3rem' }}>No gallery items. Add your first photo!</p>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1rem' }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background:t.surface, border:`1px solid ${t.surfaceBorder}`, borderRadius:'12px', overflow:'hidden' }}>
              <div style={{ height:'140px', background:t.surfaceHover, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', position:'relative' }}>
                {item.image_src || item.image_url ? (
                  <img src={item.image_src || item.image_url} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                ) : (
                  <span style={{ fontSize:'2.5rem', opacity:0.3 }}>⬡</span>
                )}
                <div style={{ position:'absolute', top:8, right:8 }}>
                  <span style={{
                    background: item.is_published ? t.badgeSuccess.bg : t.badgePending.bg,
                    color: item.is_published ? t.badgeSuccess.color : t.badgePending.color,
                    borderRadius:'20px', padding:'2px 8px', fontSize:'0.65rem', fontWeight:700,
                  }}>{item.is_published ? 'Live' : 'Draft'}</span>
                </div>
              </div>
              <div style={{ padding:'0.85rem' }}>
                <p style={{ margin:'0 0 0.25rem', fontSize:'0.82rem', fontWeight:700, color:t.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</p>
                <p style={{ margin:'0 0 0.75rem', fontSize:'0.73rem', color:t.textMuted }}>{item.category} · {item.aspect}</p>
                <div style={{ display:'flex', gap:'0.5rem' }}>
                  <Btn t={t} variant="ghost" onClick={() => openEdit(item)} style={{ flex:1, padding:'0.3rem', fontSize:'0.78rem' }}>Edit</Btn>
                  <Btn t={t} variant="danger" onClick={() => del(item.id)} style={{ padding:'0.3rem 0.6rem', fontSize:'0.78rem' }}>✕</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Panel open={panel} onClose={() => setPanel(false)} title={editId ? 'Edit Gallery Item' : 'New Gallery Item'} t={t}>
        <Field label="Title" t={t}><Input t={t} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Photo title" /></Field>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
          <Field label="Category" t={t}>
            <Select t={t} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
              {GAL_CATS.map(c=><option key={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Aspect" t={t}>
            <Select t={t} value={form.aspect} onChange={e=>setForm({...form,aspect:e.target.value})}>
              {GAL_ASPECTS.map(a=><option key={a}>{a}</option>)}
            </Select>
          </Field>
        </div>
        <Field label="Image URL" t={t}><Input t={t} value={form.image_url||''} onChange={e=>setForm({...form,image_url:e.target.value})} placeholder="https://..." /></Field>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
          <Field label="Date" t={t}><Input t={t} value={form.date} onChange={e=>setForm({...form,date:e.target.value})} placeholder="Feb 2025" /></Field>
          <Field label="Location" t={t}><Input t={t} value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="City" /></Field>
        </div>
        <Field label="Summary" t={t}><Textarea t={t} value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})} placeholder="One-line summary…" /></Field>
        <Field label="Story" t={t}><Textarea t={t} value={form.story} onChange={e=>setForm({...form,story:e.target.value})} placeholder="Full story…" style={{minHeight:'100px'}} /></Field>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
          <Field label="Impact" t={t}><Input t={t} value={form.impact} onChange={e=>setForm({...form,impact:e.target.value})} placeholder="180+ Students" /></Field>
          <Field label="Likes" t={t}><Input t={t} type="number" value={form.likes} onChange={e=>setForm({...form,likes:e.target.value})} /></Field>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
          <Field label="Author" t={t}><Input t={t} value={form.author} onChange={e=>setForm({...form,author:e.target.value})} /></Field>
          <Field label="Author Role" t={t}><Input t={t} value={form.author_role} onChange={e=>setForm({...form,author_role:e.target.value})} /></Field>
        </div>
        <Field label="Tags (comma-separated)" t={t}><Input t={t} value={Array.isArray(form.tags)?form.tags.join(', '):form.tags} onChange={e=>setForm({...form,tags:e.target.value})} placeholder="#Tag1, #Tag2" /></Field>
        <Field label="Published" t={t}>
          <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer', color:t.text, fontSize:'0.875rem' }}>
            <input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form,is_published:e.target.checked})} />
            Show on public gallery page
          </label>
        </Field>
        {msg && <p style={{ color:t.danger, fontSize:'0.82rem', marginBottom:'0.75rem' }}>{msg}</p>}
        <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem' }}>
          <Btn t={t} onClick={save} disabled={saving} style={{ flex:1 }}>{saving ? 'Saving…' : 'Save Item'}</Btn>
          <Btn t={t} variant="ghost" onClick={() => setPanel(false)}>Cancel</Btn>
        </div>
      </Panel>
    </>
  );
}

/* ─────────────── root component ─────────────── */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [dark, setDark]     = useState(true);
  const t = THEMES[dark ? 'dark' : 'light'];

  // Automatic JWT refresh interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      res => res,
      async err => {
        const original = err.config;
        if (err.response?.status === 401 && !original._retry) {
          original._retry = true;
          const refresh = localStorage.getItem('refreshToken');
          if (refresh) {
            try {
              const res = await axios.post('/api/token/refresh/', { refresh });
              const newAccess = res.data.access;
              localStorage.setItem('accessToken', newAccess);
              original.headers.Authorization = `Bearer ${newAccess}`;
              return axios(original);
            } catch {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              navigate('/admin/login');
            }
          } else {
            navigate('/admin/login');
          }
        }
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/payment/admin/stats/', { headers: authHeaders() });
        setStats(res.data);
      } catch (e) {
        if (e.response?.status === 401) {
          localStorage.removeItem('accessToken');
          navigate('/admin/login');
        } else {
          setError('Failed to load dashboard data.');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/admin/login');
  };

  const PAGE = {
    overview:  active === 'overview'  && !loading && stats && <OverviewTab stats={stats} t={t} />,
    donations: active === 'donations' && <DonationsTab t={t} />,
    campaigns: active === 'campaigns' && <CampaignsTab t={t} />,
    events:    active === 'events'    && <EventsTab t={t} />,
    gallery:   active === 'gallery'   && <GalleryTab t={t} />,
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:"'Inter','Roboto',sans-serif", background:t.bg, color:t.text }}>

      {/* inject spinner kf */}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <Sidebar active={active} setActive={setActive} onLogout={logout} dark={dark} setDark={setDark} t={t} />

      <main style={{ flex:1, padding:'2rem 2.5rem', overflowY:'auto', boxSizing:'border-box', minWidth:0 }}>

        {/* Header */}
        <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', paddingBottom:'1.25rem', borderBottom:`1px solid ${t.surfaceBorder}` }}>
          <div>
            <h1 style={{ fontSize:'1.5rem', fontWeight:800, margin:0, letterSpacing:'-0.02em', color:t.text, textTransform:'capitalize' }}>{active}</h1>
            <p style={{ margin:'0.2rem 0 0', color:t.textMuted, fontSize:'0.8rem' }}>
              {new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
            </p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#4f46e5,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:'0.9rem' }}>A</div>
            <div>
              <p style={{ margin:0, fontSize:'0.82rem', fontWeight:600, color:t.text }}>Admin</p>
              <p style={{ margin:0, fontSize:'0.73rem', color:t.textMuted }}>SpeedTrust</p>
            </div>
          </div>
        </header>

        {loading && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'40vh' }}>
            <div style={{ width:28, height:28, border:`3px solid ${t.surfaceBorder}`, borderTop:`3px solid ${t.accent}`, borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
            <p style={{ color:t.textMuted, marginTop:'1rem', fontSize:'0.875rem' }}>Loading dashboard…</p>
          </div>
        )}
        {error && <p style={{ color:t.danger, padding:'1rem', background:t.badgeFailed.bg, borderRadius:'8px' }}>{error}</p>}

        {PAGE[active]}
      </main>
    </div>
  );
}
