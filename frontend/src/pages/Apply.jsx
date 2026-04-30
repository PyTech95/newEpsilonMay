import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import { programs } from '../mock';

const EXP = ['0–3 years','3–5 years','5–10 years','10–15 years','15+ years'];

export default function Apply() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    programme: programs[0].title,
    fullName: '', email: '', phone: '',
    role: '', company: '', experience: EXP[2],
    why: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    try { localStorage.setItem('epsilon_application_'+Date.now(), JSON.stringify(form)); } catch {}
    setSent(true);
  };

  return (
    <div>
      <PageHero
        eyebrow="Apply"
        title="Begin your conversation with Epsilon."
        subtitle="Applications are reviewed personally by our admissions team. Tell us a little about you and what you want to learn — we will reach out to discuss fit, expectations, and next steps."
      />

      <section className="bg-cream py-20">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-14">
          <aside className="space-y-4">
            <ul className="space-y-4 font-editorial text-navy/80 text-[1.1rem]">
              <li className="flex gap-3"><span className="text-gold">◆</span> 12-week, live online cohort</li>
              <li className="flex gap-3"><span className="text-gold">◆</span> Roughly 15–20 hours per week</li>
              <li className="flex gap-3"><span className="text-gold">◆</span> Practitioner-led, capstone-anchored</li>
              <li className="flex gap-3"><span className="text-gold">◆</span> Personal conversation before admission</li>
            </ul>
          </aside>

          <div className="bg-white p-8 md:p-12 border border-navy/10">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 size={48} className="text-gold mx-auto mb-4" />
                <h3 className="font-display text-navy text-[1.8rem]">Application received.</h3>
                <p className="font-editorial text-navy/75 mt-3 max-w-md mx-auto">
                  Thank you. A member of our admissions team will reach out within two working days to schedule a conversation.
                </p>
                <Link to="/" className="link-gold mt-8 inline-flex">Return home →</Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">Programme</p>
                  <select className="fld-input" value={form.programme} onChange={(e)=>setForm({...form,programme:e.target.value})}>
                    {programs.map(p => <option key={p.slug} value={p.title}>{p.title}</option>)}
                  </select>
                </div>

                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">About You</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="fld-label">Full Name</label>
                      <input required className="fld-input" value={form.fullName} onChange={(e)=>setForm({...form,fullName:e.target.value})} />
                    </div>
                    <div>
                      <label className="fld-label">Email</label>
                      <input required type="email" className="fld-input" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
                    </div>
                    <div>
                      <label className="fld-label">Phone</label>
                      <input className="fld-input" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">Your Work</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="fld-label">Role</label>
                      <input className="fld-input" value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} />
                    </div>
                    <div>
                      <label className="fld-label">Company</label>
                      <input className="fld-input" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="fld-label">Years of experience</label>
                      <select className="fld-input" value={form.experience} onChange={(e)=>setForm({...form,experience:e.target.value})}>
                        {EXP.map(x => <option key={x} value={x}>{x}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">Your Why</p>
                  <label className="fld-label">What do you want to be able to do after twelve weeks?</label>
                  <textarea rows={5} className="fld-input" value={form.why} onChange={(e)=>setForm({...form,why:e.target.value})} />
                </div>

                <button type="submit" className="btn-gold">Submit Application <ArrowRight size={16} /></button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
