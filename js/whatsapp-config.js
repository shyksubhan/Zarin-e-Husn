/* ============================================================
   ZARIN-E-HUSN — Site Configuration
   Edit this file to update your WhatsApp number, social links, etc.
   ============================================================ */
const ZARINEHUSN_CONFIG = {
  /* ── WhatsApp ──
     Format: country code + number, no spaces, no +
     Example: Pakistan 0315-0727131 → '923150727131'          */
  whatsapp: {
    number:  '923150727131',
    message: 'Hi! I found you on Zarin-e-Husn and I have a question.',
  },
  /* ── Social Media ──
     Replace these URLs with your actual profile links         */
  social: {
    instagram: 'https://www.instagram.com/zarin_e_husn/',
    facebook:  'https://www.facebook.com/profile.php?id=61592598563035',
    whatsapp:  '',                                    // auto-built from number above
    tiktok:    '',                                    // optional — leave blank to hide
  },
  /* ── Contact ── */
  contact: {
    email:    'zarinehusn@gmail.com',
    phone:    '+92 315 0727131',
    location: 'Lahore, Punjab, Pakistan',
    hours:    'Monday – Saturday: 10am – 7pm',
  },
};
/* Auto-build WhatsApp URL */
ZARINEHUSN_CONFIG.social.whatsapp =
  `https://wa.me/${ZARINEHUSN_CONFIG.whatsapp.number}` +
  `?text=${encodeURIComponent(ZARINEHUSN_CONFIG.whatsapp.message)}`;
/* Make globally available */
window.ZARINEHUSN_CONFIG = ZARINEHUSN_CONFIG;

/* ============================================================
   AUTO-FILL CONTACT DETAILS
   Any element with data-zarinehusn="email" / "phone" / "location" / "hours"
   gets its text (and href, for <a> tags) filled in automatically from
   ZARINEHUSN_CONFIG.contact above.
   ============================================================ */
function applyZarinContactInfo(root) {
  root = root || document;
  const c = ZARINEHUSN_CONFIG.contact;

  root.querySelectorAll('[data-zarinehusn="email"]').forEach(el => {
    el.textContent = c.email;
    if (el.tagName === 'A') el.href = `mailto:${c.email}`;
  });
  root.querySelectorAll('[data-zarinehusn="phone"]').forEach(el => {
    el.textContent = c.phone;
    if (el.tagName === 'A') el.href = `tel:${c.phone.replace(/\s+/g, '')}`;
  });
  root.querySelectorAll('[data-zarinehusn="location"]').forEach(el => {
    el.textContent = c.location;
  });
  root.querySelectorAll('[data-zarinehusn="hours"]').forEach(el => {
    el.textContent = c.hours;
  });
}
/* Run once the page loads */
document.addEventListener('DOMContentLoaded', () => applyZarinContactInfo());
/* Expose globally so pages that inject HTML later (like policy.html)
   can re-run it on the newly added content */
window.applyZarinContactInfo = applyZarinContactInfo;
/* Keep legacy name working */
window.applyGolnisàContactInfo = applyZarinContactInfo;
