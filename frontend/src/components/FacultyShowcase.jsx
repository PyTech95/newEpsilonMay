import React from 'react';
import { leadFaculty as mockLead, guestLecturers as mockGuests } from '../mock';
import { useSiteContent } from '../context/SiteContent';

export default function FacultyShowcase() {
  const ctx = useSiteContent();
  const lead = (ctx?.leadFaculty?.[0]) || mockLead[0];
  const guestLecturers = (ctx?.guestLecturers?.length ? ctx.guestLecturers : mockGuests);

  return (
    <section className="relative bg-navy-deep text-cream py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />

      <div className="container-x relative">
        {/* Lead instructor split */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,440px)_1fr] gap-12 lg:gap-20 items-center">
          {/* Portrait with gold badge */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-[440px]">
            <div className="aspect-[4/5] overflow-hidden bg-navy">
              <img
                src={lead.image}
                alt={lead.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gold badge bottom-right overlay */}
            <div className="absolute right-[-10px] bottom-[-10px] md:right-[-14px] md:bottom-[-14px] bg-gold text-navy-deep px-7 py-5 md:px-9 md:py-6 max-w-[75%]">
              <p className="font-caps text-[0.65rem] tracking-[0.22em] text-navy-deep/80 mb-1">
                {lead.badge}
              </p>
              <p className="font-display text-navy-deep text-[1.15rem] md:text-[1.35rem] leading-tight">
                {lead.name}
              </p>
            </div>
          </div>

          {/* Right content */}
          <div>
            <h3 className="font-editorial italic text-gold text-[1.6rem] md:text-[2rem] leading-tight mb-6">
              {lead.heroHeading}
            </h3>
            <p className="font-sans text-cream/90 text-[1rem] md:text-[1.08rem] leading-[1.8] max-w-2xl">
              {lead.heroBlurb}
            </p>

            {/* Credentials split */}
            <div className="mt-10 grid grid-cols-2 gap-8 max-w-xl border-t border-b border-gold/25 py-7">
              {lead.credentials.map((c) => (
                <div key={c.institution}>
                  <p className="font-editorial italic text-gold text-[1.3rem] md:text-[1.5rem] leading-tight">
                    {c.institution}
                  </p>
                  <p className="font-caps text-[0.62rem] tracking-[0.22em] text-cream/65 mt-2">
                    {c.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visiting Faculty & Industry Experts */}
        <div className="mt-24 md:mt-28">
          <p className="font-caps text-[0.72rem] tracking-[0.28em] text-cream/65 text-center">
            Visiting Faculty &amp; Industry Experts
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {guestLecturers.map((g) => (
              <div key={g.slug} className="flex flex-col items-center text-center group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-gold/20 group-hover:border-gold/60 transition-colors">
                  <img
                    src={g.image}
                    alt={g.name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="font-editorial italic text-cream text-[1.1rem] md:text-[1.2rem] mt-6 leading-tight">
                  {g.name}
                </p>
                <p className="font-caps text-[0.62rem] tracking-[0.25em] text-cream/60 mt-3">
                  {g.expertise}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
