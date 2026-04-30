'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

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
  const [error, setError] = useState<string>('');

  const canSubmit = useMemo(() => {
    return (
      form.companyName.trim() &&
      form.industrySector.trim() &&
      form.contactPersonName.trim() &&
      form.designation.trim() &&
      form.workEmail.trim() &&
      form.contactNumber.trim() &&
      form.recruitmentMonth.trim()
    );
  }, [form]);

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
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to submit the form.');
      }

      setStatus('success');
      setForm({
        companyName: '',
        industrySector: 'IT / Software',
        contactPersonName: '',
        designation: '',
        workEmail: '',
        contactNumber: '',
        recruitmentMonth: '',
        message: '',
      });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <div className="bg-white">
      {/* MAIN CONTENT */}
      <main className="bg-gray-50/50 py-16" id="company-contact">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-brand-800 tracking-tight">Corporate Interest Form</h1>
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4 shadow-sm"></div>
            <p className="mt-6 text-muted max-w-2xl mx-auto text-lg leading-relaxed">
              Partner with IET Lucknow for your recruitment needs. Please fill out the details below, and our T&P team will
              get back to you shortly.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-50 rounded-full blur-3xl opacity-50"></div>

            <form onSubmit={onSubmit} className="space-y-8 relative z-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-800 uppercase tracking-wider ml-1">Company Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Google, Microsoft, Tata Motors"
                    value={form.companyName}
                    onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-brand-accent focus:bg-white focus:ring-0 transition-all outline-none text-brand-800 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-800 uppercase tracking-wider ml-1">Industry Sector</label>
                  <select
                    required
                    value={form.industrySector}
                    onChange={(e) => setForm((prev) => ({ ...prev, industrySector: e.target.value }))}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-brand-accent focus:bg-white focus:ring-0 transition-all outline-none text-brand-800 font-medium appearance-none"
                  >
                    <option>IT / Software</option>
                    <option>Core Engineering</option>
                    <option>Consulting / Analytics</option>
                    <option>Finance / Fintech</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-800 uppercase tracking-wider ml-1">Contact Person Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Hiring Manager Name"
                    value={form.contactPersonName}
                    onChange={(e) => setForm((prev) => ({ ...prev, contactPersonName: e.target.value }))}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-brand-accent focus:bg-white focus:ring-0 transition-all outline-none text-brand-800 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-800 uppercase tracking-wider ml-1">Designation</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. HR Head, Talent Acquisition"
                    value={form.designation}
                    onChange={(e) => setForm((prev) => ({ ...prev, designation: e.target.value }))}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-brand-accent focus:bg-white focus:ring-0 transition-all outline-none text-brand-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-800 uppercase tracking-wider ml-1">Work Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="hr@company.com"
                    value={form.workEmail}
                    onChange={(e) => setForm((prev) => ({ ...prev, workEmail: e.target.value }))}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-brand-accent focus:bg-white focus:ring-0 transition-all outline-none text-brand-800 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-800 uppercase tracking-wider ml-1">Contact Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={form.contactNumber}
                    onChange={(e) => setForm((prev) => ({ ...prev, contactNumber: e.target.value }))}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-brand-accent focus:bg-white focus:ring-0 transition-all outline-none text-brand-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-800 uppercase tracking-wider ml-1">Proposed Recruitment Month</label>
                <div className="relative group">
                  <select 
                    required
                    value={form.recruitmentMonth}
                    onChange={(e) => setForm((prev) => ({ ...prev, recruitmentMonth: e.target.value }))}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-brand-accent focus:bg-white focus:ring-0 transition-all outline-none text-brand-800 font-medium appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a month range</option>
                    <option value="August - October">August - October</option>
                    <option value="November - January">November - January</option>
                    <option value="February - April">February - April</option>
                    <option value="May - July">May - July (Summer Internships)</option>
                  </select>

                  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-brand-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-800 uppercase tracking-wider ml-1">Additional Requirements / Message</label>
                <textarea 
                  rows={4}
                  placeholder="Briefly describe the job roles, eligibility criteria, or any specific requirements..."
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-brand-accent focus:bg-white focus:ring-0 transition-all outline-none text-brand-800 font-medium resize-none"
                ></textarea>
              </div>

              {status === 'success' && (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-800 font-semibold">
                  Thanks! Your response has been submitted and emailed to the T&amp;P team.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-800 font-semibold">
                  {error || 'Failed to submit. Please try again.'}
                </div>
              )}

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={status === 'submitting' || !canSubmit}
                  className="w-full md:w-auto px-10 py-4 bg-brand-800 hover:bg-brand-900 disabled:opacity-60 disabled:hover:bg-brand-800 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-glow-sm hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
                >
                  {status === 'submitting' ? 'Submitting…' : 'Submit Expression of Interest'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}