import React from 'react';
import PageHero from '../components/PageHero';
import { faculty } from '../mock';

export default function Faculty() {
  return (
    <div>
      <PageHero
        eyebrow="Faculty"
        title="People who do the work — teaching how to do it well."
        subtitle="Our faculty are senior practitioners and educators — advisors, founders, and researchers who bring real problems into the classroom and rigorous frameworks back out."
      />

      <section className="bg-cream py-24">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {faculty.map((f) => (
            <div key={f.slug} className="bg-white border border-navy/10 group hover:border-gold/60 transition-colors">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={f.image} alt={f.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="p-7">
                <p className="font-caps text-[0.6rem] text-gold">{f.role}</p>
                <h3 className="font-display text-navy text-[1.4rem] leading-tight mt-2">{f.name}</h3>
                <p className="font-editorial text-navy/75 text-base leading-relaxed mt-4">{f.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <span key={t} className="font-caps text-[0.55rem] tracking-[0.22em] text-navy/70 border border-navy/20 px-2 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
