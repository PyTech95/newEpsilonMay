import React from 'react';
import { useSiteContent } from '../context/SiteContent';

/**
 * Floating WhatsApp button — bottom-left.
 *
 * The phone number is read from site_content.home.contact.whatsapp (admin-editable).
 * Falls back to home.contact.phone, then to a sensible default.
 * If no number is set at all, the button is hidden.
 */
export default function WhatsAppFloat() {
  const ctx = useSiteContent();
  const contact = ctx?.home?.contact || {};
  const raw = contact.whatsapp || contact.phone || '';

  // Strip everything except digits (WhatsApp wa.me requires E.164 without "+").
  const digits = String(raw).replace(/\D/g, '');
  if (!digits || digits.length < 8) return null;

  const message = encodeURIComponent(
    "Hi Epsilon team, I'd like to know more about your programs.",
  );
  const href = `https://wa.me/${digits}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-testid="whatsapp-float-btn"
      className="fixed bottom-5 left-5 z-[60] group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 wa-pulse pointer-events-none" />
      <span
        className="relative w-14 h-14 md:w-[60px] md:h-[60px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:bg-[#1ebd5b] transition-colors"
      >
        {/* Official WhatsApp glyph */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          className="md:w-[34px] md:h-[34px]"
          aria-hidden="true"
        >
          <path
            fill="#FFFFFF"
            d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.945 2.722.945.817 0 2.15-.515 2.478-1.318.144-.36.144-.673.044-.974-.13-.27-2.32-1.78-2.578-1.78zM16.42 26.99c-1.748 0-3.469-.46-4.974-1.346l-3.58.94.96-3.475a9.785 9.785 0 0 1-1.346-4.96c0-5.435 4.42-9.855 9.855-9.855 5.435 0 9.855 4.42 9.855 9.855 0 5.435-4.42 9.84-9.77 9.84zm0-21.708c-6.547 0-11.853 5.305-11.853 11.853 0 2.092.546 4.13 1.59 5.92L4 30l7.057-2.292a11.872 11.872 0 0 0 5.605 1.42h.005c6.55 0 11.886-5.328 11.886-11.875 0-3.176-1.232-6.157-3.474-8.4-2.244-2.252-5.225-3.572-8.4-3.572z"
          />
        </svg>
      </span>
    </a>
  );
}
