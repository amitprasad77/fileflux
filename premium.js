/**
 * FileFlux Premium — Simple Ad Removal
 * ======================================
 * NO backend. NO server. NO database.
 *
 * How it works:
 *  1. User pays on Lemon Squeezy → gets license key by email
 *  2. User clicks "Go Premium" on your site → enters the key
 *  3. Key is validated via Lemon Squeezy public API (no secret needed)
 *  4. If valid → all .ad-banner elements hidden forever (localStorage)
 *
 * HOW TO USE: Add to every page before </body>:
 *   <script src="/premium.js"></script>
 *
 * SETUP: Replace the two CHECKOUT URLs below with your Lemon Squeezy links.
 */

(function () {
  const LS_VALID = 'ff_premium';
  const CHECKOUT_MONTHLY = 'https://fileflux.lemonsqueezy.com/checkout/buy/b84c6f53-d92e-4c4c-ba4f-02a6e3bc3c07';
  const CHECKOUT_YEARLY  = 'https://fileflux.lemonsqueezy.com/checkout/buy/43f6f91b-78f9-4fcb-818e-0166bd8ffbff';

  const isPremium = localStorage.getItem(LS_VALID) === '1';
  window.isPremium = isPremium;

  if (isPremium) {
    onReady(applyPremium);
  } else {
    onReady(injectBtn);
  }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else { fn(); }
  }

  /* ── Hide ads + show badge ── */
  function applyPremium() {
    window.isPremium = true;
    document.querySelectorAll('.ad-banner, ins.adsbygoogle, .ad-slot').forEach(el => {
      el.style.display = 'none';
    });
    const nav = document.querySelector('nav');
    if (nav && !nav.querySelector('.ff-badge')) {
      const b = document.createElement('span');
      b.className = 'ff-badge';
      b.textContent = '⭐ Premium';
      b.style.cssText = 'background:linear-gradient(135deg,#f5c842,#e0a800);color:#000;font-size:0.72rem;font-weight:800;padding:0.25rem 0.7rem;border-radius:100px;';
      nav.appendChild(b);
    }
  }

  /* ── Inject Go Premium button ── */
  function injectBtn() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const btn = document.createElement('button');
    btn.className = 'ff-go-premium';
    btn.textContent = '⭐ Go Premium';
    btn.style.cssText = 'background:linear-gradient(135deg,#f5c842,#e0a800);color:#000;border:none;padding:0.4rem 1rem;border-radius:8px;font-weight:700;font-size:0.82rem;cursor:pointer;white-space:nowrap;';
    btn.onclick = openModal;
    nav.appendChild(btn);
  }

  /* ── Modal ── */
  function openModal() {
    if (document.getElementById('ff-modal')) {
      document.getElementById('ff-modal').style.display = 'flex'; return;
    }
    const m = document.createElement('div');
    m.id = 'ff-modal';
    m.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:99999;font-family:'DM Sans',sans-serif;";
    m.innerHTML = `
<div style="background:#12121a;border:1px solid #2a2a3a;border-radius:18px;padding:2rem;max-width:400px;width:92%;text-align:center;">
  <div style="display:flex;gap:0.5rem;margin-bottom:1.5rem;">
    <button id="fft1" onclick="ffTab('buy')" style="flex:1;padding:0.6rem;border-radius:8px;border:2px solid #f5c842;background:rgba(245,200,66,0.12);color:#f5c842;font-weight:700;font-size:0.85rem;cursor:pointer;">💳 Buy Premium</button>
    <button id="fft2" onclick="ffTab('key')" style="flex:1;padding:0.6rem;border-radius:8px;border:1px solid #2a2a3a;background:none;color:#8888aa;font-weight:700;font-size:0.85rem;cursor:pointer;">🔑 I Have a Key</button>
  </div>
  <div id="ffp-buy">
    <div style="font-size:2.5rem;margin-bottom:0.5rem;">⭐</div>
    <h2 style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:#f0f0f8;margin-bottom:0.5rem;">Go Ad-Free</h2>
    <p style="color:#8888aa;font-size:0.85rem;line-height:1.7;margin-bottom:1.2rem;">Remove every ad on FileFlux — all tools, all pages.<br/>License key emailed instantly after purchase.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.7rem;margin-bottom:1.2rem;">
      <div onclick="window.open('${CHECKOUT_MONTHLY}','_blank')" style="background:#1a1a26;border:1px solid #2a2a3a;border-radius:10px;padding:1rem;cursor:pointer;">
        <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.5rem;color:#f0f0f8;">$5</div>
        <div style="font-size:0.75rem;color:#8888aa;margin-bottom:0.5rem;">/ month</div>
        <div style="background:#f5c842;color:#000;border-radius:6px;padding:0.3rem;font-size:0.75rem;font-weight:700;">Buy Monthly</div>
      </div>
      <div onclick="window.open('${CHECKOUT_YEARLY}','_blank')" style="background:#1a1a26;border:2px solid #f5c842;border-radius:10px;padding:1rem;cursor:pointer;position:relative;">
        <div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#43e97b;color:#000;font-size:0.65rem;font-weight:800;padding:0.15rem 0.5rem;border-radius:100px;white-space:nowrap;">BEST VALUE</div>
        <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.5rem;color:#f0f0f8;">$39</div>
        <div style="font-size:0.75rem;color:#8888aa;margin-bottom:0.5rem;">/ year</div>
        <div style="background:#f5c842;color:#000;border-radius:6px;padding:0.3rem;font-size:0.75rem;font-weight:700;">Buy Yearly</div>
      </div>
    </div>
    <p style="font-size:0.72rem;color:#555;">After paying, click "I Have a Key" and enter the key from your email.</p>
  </div>
  <div id="ffp-key" style="display:none;">
    <div style="font-size:2rem;margin-bottom:0.6rem;">🔑</div>
    <h2 style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:#f0f0f8;margin-bottom:0.4rem;">Enter License Key</h2>
    <p style="color:#8888aa;font-size:0.83rem;margin-bottom:1rem;">Check your Lemon Squeezy receipt email.</p>
    <input id="ff-key" type="text" placeholder="XXXX-XXXX-XXXX-XXXX" oninput="this.value=this.value.toUpperCase()"
      style="width:100%;background:#1a1a26;border:1px solid #2a2a3a;color:#f0f0f8;padding:0.75rem;border-radius:10px;font-size:0.95rem;outline:none;text-align:center;letter-spacing:0.08em;margin-bottom:0.5rem;" />
    <div id="ff-err" style="color:#ff6b6b;font-size:0.78rem;min-height:18px;margin-bottom:0.5rem;"></div>
    <button id="ff-act" onclick="ffActivate()"
      style="width:100%;background:linear-gradient(135deg,#f5c842,#e0a800);color:#000;border:none;padding:0.85rem;border-radius:10px;font-family:'Syne',sans-serif;font-weight:800;font-size:0.92rem;cursor:pointer;">
      ✅ Activate — Remove All Ads
    </button>
  </div>
  <button onclick="document.getElementById('ff-modal').style.display='none'"
    style="background:none;border:none;color:#555;cursor:pointer;font-size:0.8rem;margin-top:1rem;width:100%;padding:0.3rem;">✕ Close</button>
</div>`;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) m.style.display = 'none'; });
  }

  /* ── Tab toggle ── */
  window.ffTab = function(tab) {
    const isBuy = tab === 'buy';
    document.getElementById('ffp-buy').style.display = isBuy ? 'block' : 'none';
    document.getElementById('ffp-key').style.display  = isBuy ? 'none'  : 'block';
    document.getElementById('fft1').style.cssText = `flex:1;padding:0.6rem;border-radius:8px;border:${isBuy?'2px solid #f5c842':'1px solid #2a2a3a'};background:${isBuy?'rgba(245,200,66,0.12)':'none'};color:${isBuy?'#f5c842':'#8888aa'};font-weight:700;font-size:0.85rem;cursor:pointer;`;
    document.getElementById('fft2').style.cssText = `flex:1;padding:0.6rem;border-radius:8px;border:${!isBuy?'2px solid #f5c842':'1px solid #2a2a3a'};background:${!isBuy?'rgba(245,200,66,0.12)':'none'};color:${!isBuy?'#f5c842':'#8888aa'};font-weight:700;font-size:0.85rem;cursor:pointer;`;
  };

  /* ── Validate key ── */
  window.ffActivate = async function() {
    const key   = (document.getElementById('ff-key').value || '').trim();
    const err   = document.getElementById('ff-err');
    const btn   = document.getElementById('ff-act');
    err.textContent = '';
    if (!key) { err.textContent = 'Please enter your license key.'; return; }
    btn.textContent = '⏳ Validating…'; btn.disabled = true;

    try {
      const res  = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ license_key: key, instance_name: 'FileFlux' }),
      });
      const data = await res.json();
      if (data.valid) {
        activate();
      } else {
        err.textContent = data.error || 'Invalid or expired license key.';
        btn.textContent = '✅ Activate — Remove All Ads'; btn.disabled = false;
      }
    } catch {
      // Network fallback — accept if key looks valid (min 20 chars with dashes)
      if (/^[A-Z0-9\-]{20,}$/.test(key)) { activate(); }
      else { err.textContent = 'Could not connect. Check your internet and try again.'; btn.textContent = '✅ Activate — Remove All Ads'; btn.disabled = false; }
    }
  };

  function activate() {
    localStorage.setItem(LS_VALID, '1');
    document.getElementById('ff-modal').style.display = 'none';
    document.querySelector('.ff-go-premium')?.remove();
    applyPremium();
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:2rem;right:2rem;background:linear-gradient(135deg,#43e97b,#38d26a);color:#000;padding:0.9rem 1.4rem;border-radius:12px;font-weight:700;font-size:0.88rem;z-index:999999;box-shadow:0 8px 24px rgba(67,233,123,0.3);';
    t.textContent = '🎉 Premium activated! All ads removed forever.';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 5000);
  }

})();
