import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Quote, Sparkles, CheckCircle2, Download } from 'lucide-react';
import { useSiteContent } from '../context/SiteContent';
import {
  programs as mockPrograms,
  testimonials as mockTestimonials,
  leadFaculty as mockLead,
} from '../mock';

/* ---------- Helper bits ---------- */

function Eyebrow({ children }) {
  return (
    <p className="font-caps text-[0.65rem] tracking-[0.28em] text-gold">{children}</p>
  );
}

function GoldRule() {
  return <span className="block w-12 h-px bg-gold/60 mt-3" />;
}

/* ====================== HOME 2 ====================== */
export default function Home2() {
  const ctx = useSiteContent();
  const home = ctx?.home || {};
  const programs = ctx?.programs?.length ? ctx.programs : mockPrograms;
  const testimonials = ctx?.testimonials?.length ? ctx.testimonials : mockTestimonials;
  const lead = (ctx?.leadFaculty?.[0]) || mockLead[0];
  const guests = ctx?.guestLecturers || [];
  const hero = home.hero || {};
  const heroImage = hero.heroImage || '/generated/hero-indian-online-learner.png';
  const featured = programs.find((p) => p.featured) || programs[0];
  const others = programs.filter((p) => p.slug !== featured?.slug);
  const stats = hero.stats || [
    { value: '12 weeks', label: 'Cohort duration' },
    { value: 'Live online', label: 'Executive-friendly' },
    { value: '15–20 hrs', label: 'Per-week commitment' },
    { value: 'Capstone', label: 'Portfolio outcome' },
  ];

  return (
    <div>
      {/* ---------- 1. HERO — split editorial ---------- */}
      <section className="relative bg-navy-deep text-cream pt-[160px] md:pt-[180px] pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 starfield opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full glow-gold pointer-events-none" />

        <div className="container-x relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-center">
          {/* Copy */}
          <div>
            <Eyebrow>{hero.eyebrow || 'The AI era of executive education'}</Eyebrow>
            <GoldRule />
            <h1 className="font-display uppercase text-[2.1rem] md:text-[3.5rem] leading-[1.04] mt-7">
              {hero.titleLine1 || 'Turning technical fluency'}
            </h1>
            <h2 className="font-editorial italic text-gold text-[2rem] md:text-[3rem] leading-[1.05] mt-3">
              {hero.titleLine2Italic || 'into strategic value.'}
            </h2>
            <p className="font-editorial text-cream/80 text-[1.15rem] md:text-[1.25rem] leading-relaxed mt-8 max-w-xl">
              {hero.subtitle ||
                'Live online cohorts for working professionals who want to translate AI, data, and modern decision systems into evidence-based action — not theatre.'}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/apply" className="btn-gold" data-testid="home2-hero-apply">
                {hero.primaryCtaText || 'Apply Now'} <ArrowRight size={16} />
              </Link>
              <Link to="/programs" className="btn-outline-gold">
                Explore Programs <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] max-w-[520px] w-full mx-auto">
            <div className="absolute inset-0 overflow-hidden">
              <img src={heroImage} alt="An Epsilon learner in session" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent" />
            </div>
            {/* Decorative gold corners */}
            <span className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-gold/70" />
            <span className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-gold/70" />
            <span className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-gold/70" />
            <span className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-gold/70" />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-gold/95 text-navy-deep px-5 py-4">
              <p className="font-caps text-[0.6rem] tracking-[0.22em]">
                {hero.badgeEyebrow || 'Cohort 04 · 15 March 2026'}
              </p>
              <p className="font-display text-[1.15rem] leading-tight mt-1">
                {hero.badgeTitle || 'Applications open.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. STAT STRIP ---------- */}
      <section className="bg-navy text-cream border-y border-gold/20">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x divide-gold/15">
          {stats.map((s) => (
            <div key={s.label} className="py-7 px-5 first:pl-0 last:pr-0">
              <p className="font-display text-cream text-[1.5rem] md:text-[1.7rem] leading-tight">{s.value}</p>
              <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold/80 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 3. PROGRAMS — editorial grid ---------- */}
      <section className="bg-cream py-24 md:py-28">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>Programs</Eyebrow>
            <span className="block w-12 h-px bg-gold/60 mt-3 mx-auto" />
            <h2 className="font-display text-navy text-[2.1rem] md:text-[2.8rem] leading-[1.08] mt-7">
              {home.sections?.programsHeading || 'Cohort programs for the AI era.'}
            </h2>
            <p className="font-editorial text-navy/75 text-[1.1rem] leading-relaxed mt-5">
              Live online · capstone-anchored · taught by practitioners.
            </p>
          </div>

          {/* Featured big card */}
          {featured && (
            <Link
              to={`/programs/${featured.slug}`}
              className="mt-14 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] bg-white border border-navy/10 hover:border-gold/60 transition-colors group overflow-hidden"
              data-testid="home2-featured-program"
            >
              <div className="relative aspect-[5/4] lg:aspect-auto overflow-hidden bg-navy-deep">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-gold text-navy-deep font-caps text-[0.6rem] tracking-[0.22em] px-3 py-1.5">
                  {home.sections?.flagshipEyebrow || 'Flagship Program'}
                </span>
              </div>
              <div className="p-9 md:p-12 flex flex-col justify-center">
                <p className="font-caps text-[0.62rem] tracking-[0.22em] text-gold">
                  {featured.weeks} weeks · {featured.levelLabel}
                </p>
                <h3 className="font-display text-navy text-[1.9rem] md:text-[2.4rem] leading-[1.06] mt-4">
                  {featured.subtitle}
                </h3>
                <p className="font-editorial italic text-gold text-[1.1rem] mt-3">{featured.tagline}</p>
                <p className="font-editorial text-navy/80 text-[1.05rem] leading-relaxed mt-5 max-w-xl">
                  {featured.short}
                </p>
                <span className="link-gold mt-7 inline-flex">
                  Explore the program <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          )}

          {/* Other programs */}
          {others.length > 0 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {others.slice(0, 3).map((p) => (
                <Link
                  to={`/programs/${p.slug}`}
                  key={p.slug || p._id}
                  className="group bg-white border border-navy/10 hover:border-gold/60 transition-colors lift-card"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold">
                      {p.weeks} weeks · {p.levelLabel}
                    </p>
                    <h3 className="font-display text-navy text-[1.2rem] leading-tight mt-3">{p.subtitle}</h3>
                    <p className="font-editorial italic text-navy/70 text-base mt-2">{p.tagline}</p>
                    <span className="link-gold mt-5 inline-flex">
                      Explore <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- 4. WHY EPSILON — three-column belief ---------- */}
      <section className="bg-bone py-24 md:py-28">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-end mb-14">
            <div>
              <Eyebrow>Why Epsilon</Eyebrow>
              <span className="block w-12 h-px bg-gold/60 mt-3" />
              <h2 className="font-display text-navy text-[2rem] md:text-[2.6rem] leading-[1.08] mt-6">
                A different bar, by design.
              </h2>
            </div>
            <p className="font-editorial text-navy/80 text-[1.15rem] leading-[1.7] max-w-2xl lg:justify-self-end">
              We exist for the people who decide. Epsilon's programs are short, intense, and built around senior cohorts and practitioner faculty — with a defended capstone, not a participation certificate, at the end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy/10">
            {[
              { n: '01', t: 'Senior cohorts', b: 'Decision-makers learning alongside other decision-makers — not undergrads chasing a credential.' },
              { n: '02', t: 'Practitioner faculty', b: 'Educators who have built and shipped — not consultants reading slides.' },
              { n: '03', t: 'Defended capstone', b: 'Every program ends with a public, defended portfolio artefact. Capability, not attendance.' },
            ].map((b) => (
              <div key={b.n} className="bg-white p-9">
                <Sparkles size={20} className="text-gold" />
                <p className="font-display text-gold text-[2.2rem] leading-none mt-5">{b.n}</p>
                <h3 className="font-display text-navy text-[1.3rem] leading-tight mt-3">{b.t}</h3>
                <p className="font-editorial text-navy/75 text-[1rem] leading-relaxed mt-4">{b.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 5. FACULTY TEASER ---------- */}
      <section className="bg-navy-deep text-cream py-24 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full glow-gold pointer-events-none" />

        <div className="container-x relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-caps text-[0.65rem] tracking-[0.28em] text-gold">Faculty</p>
            <span className="block w-12 h-px bg-gold/60 mx-auto mt-3" />
            <h2 className="font-display uppercase text-cream text-[2rem] md:text-[2.6rem] leading-[1.08] mt-7">
              The people who <span className="italic font-editorial normal-case text-gold">do the work.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
            {lead && (
              <Link to="/faculty" className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-navy">
                  <img src={lead.image} alt={lead.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold mt-5">{lead.badge || 'Lead Faculty'}</p>
                <h3 className="font-display text-cream text-[1.5rem] leading-tight mt-2">{lead.name}</h3>
                <p className="font-editorial italic text-cream/75 text-[1rem] leading-snug mt-1">{lead.role}</p>
              </Link>
            )}

            {guests.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                {guests.slice(0, 4).map((g) => (
                  <Link key={g.slug || g._id} to="/faculty" className="group">
                    <div className="aspect-[4/5] overflow-hidden bg-navy/30 border border-gold/10 group-hover:border-gold/50 transition-colors">
                      <img src={g.image} alt={g.name} className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <p className="font-display text-cream text-[1rem] mt-4 leading-tight">{g.name}</p>
                    <p className="font-caps text-[0.55rem] tracking-[0.22em] text-gold mt-2">{g.expertise}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-14 text-center">
            <Link to="/faculty" className="btn-outline-gold border-cream/30 text-cream hover:text-gold">
              Meet the full faculty <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- 6. TESTIMONIALS — quote rail ---------- */}
      {testimonials.length > 0 && (
        <section className="bg-cream py-24 md:py-28">
          <div className="container-x">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Eyebrow>From the cohort</Eyebrow>
              <span className="block w-12 h-px bg-gold/60 mt-3 mx-auto" />
              <h2 className="font-display text-navy text-[2rem] md:text-[2.6rem] leading-[1.08] mt-7">
                What our learners say.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t) => (
                <figure
                  key={t._id || t.name}
                  className="bg-white border border-navy/10 p-8 lift-card hover:border-gold/40"
                >
                  <Quote size={22} className="text-gold" />
                  <blockquote className="font-editorial text-navy/85 text-[1.1rem] leading-relaxed mt-5">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-navy/10 pt-5">
                    {t.avatar && (
                      <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                    )}
                    <div>
                      <p className="font-display text-navy text-[1rem] leading-tight">{t.name}</p>
                      <p className="font-caps text-[0.55rem] tracking-[0.22em] text-gold mt-1">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- 7. BROCHURE STRIP ---------- */}
      <section className="bg-bone py-20 md:py-24">
        <div className="container-x">
          <div className="bg-navy-deep text-cream relative overflow-hidden p-10 md:p-16 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full glow-gold pointer-events-none" />

            <div className="relative">
              <Eyebrow>Program Brochure</Eyebrow>
              <span className="block w-12 h-px bg-gold/60 mt-3" />
              <h3 className="font-display text-cream text-[2rem] md:text-[2.6rem] leading-[1.06] mt-6">
                The whole program,{' '}
                <span className="italic font-editorial text-gold">on a single PDF.</span>
              </h3>
              <p className="font-editorial text-cream/80 text-[1.05rem] leading-relaxed mt-5 max-w-xl">
                28-page PDF · program overview, modules, fees, capstone, faculty and admissions.
              </p>
              <ul className="mt-7 space-y-2 max-w-md">
                {['Curriculum & weekly modules', 'Capstone defence framework', 'Fees & cohort dates'].map((b) => (
                  <li key={b} className="flex gap-3 text-cream/85 font-editorial text-[1rem]">
                    <CheckCircle2 size={16} className="text-gold mt-1 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative text-center lg:text-left">
              <Link to="/#brochure" className="btn-gold w-full justify-center md:w-auto">
                <Download size={16} /> Download the brochure
              </Link>
              <p className="font-caps text-[0.55rem] tracking-[0.22em] text-cream/55 mt-4">
                Available instantly · Free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 8. FINAL CTA ---------- */}
      <section className="bg-navy-deep text-cream py-24 md:py-28 relative overflow-hidden border-t border-gold/10">
        <div className="absolute inset-0 starfield opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full glow-gold pointer-events-none" />
        <div className="relative container-x text-center">
          <Eyebrow>Take the next step</Eyebrow>
          <h2 className="font-display uppercase text-[2rem] md:text-[3rem] leading-[1.05] max-w-3xl mx-auto mt-5">
            Build the judgement your{' '}
            <span className="italic font-editorial text-gold normal-case">next decade demands.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="btn-gold">Apply <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline-gold border-cream/30 text-cream hover:text-gold">
              Talk to Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
