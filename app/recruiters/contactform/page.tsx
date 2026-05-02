'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Orb from '@/components/Orb';

type CompanyContactPayload = {
  companyName: string;
  industrySector: string;
  contactPersonName: string;
  designation: string;
  workEmail: string;
  contactNumber: string;
  recruitmentMonth: string;
  message: string;
};

const SECTORS = ['IT / Software', 'Core Engineering', 'Consulting / Analytics', 'Finance / Fintech', 'Other'];

const MONTHS = [
  { value: 'August - October', label: 'Aug – Oct', sub: 'Placement season start' },
  { value: 'November - January', label: 'Nov – Jan', sub: 'Peak placement season' },
  { value: 'February - April', label: 'Feb – Apr', sub: 'Late season drives' },
  { value: 'May - July', label: 'May – Jul', sub: 'Summer internships' },
];

const STATS = [
  { value: '500+', label: 'Eligible Students', sublabel: 'Across all branches' },
  { value: '12 LPA', label: 'Average Package', sublabel: 'Placement Year 2024–25' },
  { value: '45 LPA', label: 'Highest Package', sublabel: 'Placement Year 2024–25' },
  { value: '120+', label: 'Companies Visited', sublabel: 'Across all sectors' },
];

const HIGHLIGHTS = [
  { icon: '🏛️', title: 'AICTE Approved', desc: 'Fully accredited institution with a strong academic legacy.' },
  { icon: '🧪', title: 'Industry-Ready Labs', desc: 'Students trained on the latest tech stacks and industry tools.' },
  { icon: '📊', title: '95%+ Placement Rate', desc: 'Consistent high placements across all branches every year.' },
  { icon: '🤝', title: 'Dedicated T&P Cell', desc: 'A full-time team to coordinate every step of your campus drive.' },
  { icon: '🌐', title: 'Pan-India Recruiters', desc: 'Trusted by companies from startups to Fortune 500s.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'From form submission to drive date in under 2 weeks.' },
];

function AnimatedCounter({ value }: { value: string }) {
  const match = value.match(/(\d+)(.*)/);
  const num = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && num > 0) {
      const controls = animate(0, num, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) { setCount(Math.floor(value)); }
      });
      return () => controls.stop();
    }
  }, [inView, num]);

  if (!match) return <span>{value}</span>;
  return <span ref={ref}>{count}{suffix}</span>;
}

const inputClass = "w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 hover:shadow-md focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 outline-none text-slate-800 font-bold placeholder:text-gray-400 shadow-sm transform focus:-translate-y-1 hover:-translate-y-0.5";

export default function ContactForm() {
  const [form, setForm] = useState<CompanyContactPayload>({
    companyName: '',
    industrySector: 'IT / Software',
    contactPersonName: '',
    designation: '',
    workEmail: '',
    contactNumber: '',
    recruitmentMonth: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (key: keyof CompanyContactPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [key]: e.target.value }));

  const canSubmit = useMemo(() =>
    !!(form.companyName.trim() && form.contactPersonName.trim() &&
      form.designation.trim() && form.workEmail.trim() &&
      form.contactNumber.trim() && form.recruitmentMonth.trim()),
    [form]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/company-contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to submit the form.');
      setStatus('success');
      setForm({
        companyName: '', industrySector: 'IT / Software', contactPersonName: '',
        designation: '', workEmail: '', contactNumber: '', recruitmentMonth: '', message: ''
      });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <div className="bg-slate-50 overflow-x-hidden min-h-screen">

      {/* ══ HERO & STATS ══════════════════════════════════════════════════════ */}
      <div className="py-10 px-6">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-brand-800 text-white shadow-2xl flex flex-col items-center justify-center min-h-[380px] border border-brand-800/50">
          {/* Animated Background Component */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
            <Orb hoverIntensity={0.4} rotateOnHover={true} hue={215} forceHoverState={false} />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
              Hire the <span className="text-blue-400">Best Talent</span><br />from IET Lucknow
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Partner with us for campus recruitment and access technically strong,
              industry-ready graduates across all engineering disciplines.
            </motion.p>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="relative inline-block">
              {/* Animated ping/pulse effect behind button */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60 blur-md animate-pulse pointer-events-none" />
              <a href="#contact-form" className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all hover:scale-105 active:scale-95 text-lg">
                Register Your Company
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Animated Stats Below Hero */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="h-full"
            >
              <motion.div
                animate={{
                  backgroundColor: ["#ffffff", "#f0f9ff", "#ffffff"],
                  boxShadow: ["0 4px 15px rgba(59,130,246,0.1)", "0 15px 35px rgba(59,130,246,0.2)", "0 4px 15px rgba(59,130,246,0.1)"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="flex flex-col items-center justify-center text-center p-8 rounded-3xl h-full border border-blue-100"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-brand-800 mb-3 tracking-tight">
                  <AnimatedCounter value={s.value} />
                </div>
                <div className="text-sm font-bold text-gray-800 uppercase tracking-wide">{s.label}</div>
                <div className="text-xs text-gray-400 mt-2 font-medium">{s.sublabel}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══ WHY RECRUIT WITH US ══════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Why Recruit With Us</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-800 tracking-tight">What sets IET Lucknow apart</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-brand-800 rounded-full mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  className="w-full h-full flex flex-col p-8 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] border border-blue-400/40 rounded-3xl justify-center text-white relative overflow-hidden group shadow-[0_15px_40px_rgba(30,58,138,0.4)] hover:shadow-[0_25px_60px_rgba(30,58,138,0.7)] transition-shadow duration-300"
                >
                  <div className="absolute inset-0 bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="text-6xl mb-6 relative z-10">{h.icon}</div>
                  <h3 className="font-extrabold text-2xl mb-3 tracking-tight relative z-10 text-blue-50">{h.title}</h3>
                  <p className="text-sm text-blue-200/80 leading-relaxed font-medium relative z-10">{h.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ══ FORM ══════════════════════════════════════════════════════ */}
      <section id="contact-form" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-800 tracking-tight">Corporate Interest Form</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-brand-800 rounded-full mx-auto mt-6" />
            <p className="mt-6 text-gray-500 max-w-xl mx-auto text-lg leading-relaxed font-medium">
              Fill out the details below and our T&amp;P team will get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-blue-400 via-indigo-100 to-purple-400 shadow-[0_30px_80px_-15px_rgba(59,130,246,0.2)] hover:shadow-[0_40px_100px_-15px_rgba(59,130,246,0.3)] transition-shadow duration-500"
          >
            <div className="bg-white/95 backdrop-blur-3xl rounded-[2.4rem] p-8 md:p-14 relative overflow-hidden">
              {/* Decorative blurs for glass effect */}
              <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />
              <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />

              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-16">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-8 shadow-2xl shadow-green-500/30">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-extrabold text-brand-800 mb-4 tracking-tight">Expression of Interest Submitted!</h3>
                  <p className="text-gray-500 text-lg max-w-md mb-10 leading-relaxed font-medium">
                    Thank you! Our Training & Placement team will review your details and reach out to you shortly.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="px-8 py-4 bg-brand-800 text-white font-bold rounded-full hover:bg-brand-900 transition-all text-base shadow-lg shadow-brand-800/20 hover:scale-105 active:scale-95">
                    Submit Another Response
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-12">

                  {/* Company Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                      <h3 className="text-2xl font-extrabold text-slate-900 drop-shadow-sm pb-1">Company Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2.5">
                        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input type="text" required placeholder="e.g. Google, Microsoft, Tata Motors"
                          value={form.companyName} onChange={set('companyName')} className={inputClass} />
                      </div>
                      <div className="space-y-2.5">
                        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm">
                          Industry Sector <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {SECTORS.map(s => (
                            <button key={s} type="button"
                              onClick={() => setForm(p => ({ ...p, industrySector: s }))}
                              className={[
                                'px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all',
                                form.industrySector === s
                                  ? 'bg-brand-800 text-white border-brand-800 shadow-md'
                                  : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50',
                              ].join(' ')}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
                      <h3 className="text-2xl font-extrabold text-slate-900 drop-shadow-sm pb-1">Contact Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2.5">
                        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm">
                          Contact Person Name <span className="text-red-500">*</span>
                        </label>
                        <input type="text" required placeholder="Hiring Manager Name"
                          value={form.contactPersonName} onChange={set('contactPersonName')} className={inputClass} />
                      </div>
                      <div className="space-y-2.5">
                        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm">
                          Designation <span className="text-red-500">*</span>
                        </label>
                        <input type="text" required placeholder="e.g. HR Head, Talent Acquisition"
                          value={form.designation} onChange={set('designation')} className={inputClass} />
                      </div>
                      <div className="space-y-2.5">
                        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm">
                          Work Email Address <span className="text-red-500">*</span>
                        </label>
                        <input type="email" required placeholder="hr@company.com"
                          value={form.workEmail} onChange={set('workEmail')} className={inputClass} />
                      </div>
                      <div className="space-y-2.5">
                        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input type="tel" required placeholder="+91 XXXXX XXXXX"
                          value={form.contactNumber} onChange={set('contactNumber')} className={inputClass} />
                      </div>
                    </div>
                  </div>

                  {/* Window Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-2xl font-extrabold text-slate-900 drop-shadow-sm pb-1">Recruitment Window</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {MONTHS.map(m => (
                        <button key={m.value} type="button"
                          onClick={() => setForm(p => ({ ...p, recruitmentMonth: m.value }))}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${form.recruitmentMonth === m.value
                              ? 'border-blue-600 bg-blue-50/50 shadow-md'
                              : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                            }`}>
                          <p className={`text-sm font-extrabold mb-1 ${form.recruitmentMonth === m.value ? 'text-blue-700' : 'text-brand-800'}`}>
                            {m.label}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">{m.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-orange-400 rounded-full" />
                      <h3 className="text-2xl font-extrabold text-slate-900 drop-shadow-sm pb-1">Additional Requirements</h3>
                    </div>
                    <div className="space-y-3">
                      <textarea rows={4} maxLength={500}
                        placeholder="Briefly describe the job roles, eligibility criteria, or any specific requirements..."
                        value={form.message} onChange={set('message')}
                        className={inputClass + ' resize-none'} />
                      <div className="flex justify-between items-center ml-2 mr-2">
                        <div className="h-1.5 flex-1 mr-5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
                            style={{ width: `${(form.message.length / 500) * 100}%` }} />
                        </div>
                        <p className="text-xs font-bold text-gray-400">{form.message.length} / 500</p>
                      </div>
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 font-bold text-sm flex items-center gap-3">
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                      {error || 'Failed to submit. Please try again.'}
                    </div>
                  )}

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-400 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Data secured via 256-bit encryption
                    </p>

                    <button type="submit"
                      disabled={status === 'submitting' || !canSubmit}
                      className="w-full sm:w-auto px-10 py-4 bg-brand-800 hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-brand-800 disabled:cursor-not-allowed text-white font-extrabold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-base">
                      {status === 'submitting' ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Submitting…
                        </span>
                      ) : 'Submit Expression of Interest'}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </motion.div>



        </div>
      </section>

    </div>
  );
}
