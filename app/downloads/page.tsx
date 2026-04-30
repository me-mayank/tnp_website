import Link from 'next/link';

const instituteDocs = [
  {
    title: 'Placement Brochure',
    subtitle: 'Official Guide 2025-26',
    href: '/files/Placement_Brouchure_2025-26.pdf',
    type: 'PDF'
  },
  {
    title: 'Job Notification Form',
    subtitle: 'Recruiter Registration (JNF)',
    href: '/files/JNF_IET_Lucknow_2025-26.docx',
    type: 'DOCX'
  }
];

const studentDocs = [
  { name: 'Placement Policy', href: '/files/Student_Placement_Policy.pdf', type: 'PDF' },
  { name: 'Training Form', href: '/files/SUMMER_INTERNSHIP_NOC.pdf', type: 'PDF' },
  { name: 'Internship NOC', href: '/files/FINAL_SEMESTER_INTERNSHIP_NOC.pdf', type: 'PDF' }
];

const departmentDocs = [
  { name: 'Computer Science & Eng.', href: '/files/CSE_brochure.pdf' },
  { name: 'Chemical Engineering', href: '/files/Chemical_dept_2019-20.pdf' },
  { name: 'Civil Engineering', href: '/files/Civil_dept_2019-20.pdf' },
  { name: 'Electrical Engineering', href: '/files/Electrical_dept_2019-20.pdf' },
  { name: 'Electronics Engineering', href: '/files/Electronics_dept_2019-20.pdf' },
  { name: 'Mechanical Engineering', href: '/files/Mechanical_dept_2019-20.pdf' }
];

export default function DownloadsPage() {
  return (
    <>
      <main className="bg-gray-50/50 py-16" id="downloads">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-extrabold text-brand-800 tracking-tight">Resources</h1>
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
            <p className="mt-6 text-muted max-w-2xl mx-auto text-lg">
              Official documents, placement policies, and department-specific brochures for students and recruiters.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-xl font-bold text-brand-800 mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-accent rounded-full"></span>
              INSTITUTE DOCUMENTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {instituteDocs.map((doc) => (
                <div key={doc.title} className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all group flex items-center gap-6">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-brand-800 text-lg truncate">{doc.title}</h3>
                    <p className="text-xs text-muted mb-4">{doc.subtitle}</p>
                    <a href={doc.href} download className="text-brand-700 font-bold text-sm flex items-center gap-2 hover:text-brand-accent transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      Download {doc.type}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-xl font-bold text-brand-800 mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-accent rounded-full"></span>
              STUDENT POLICIES &amp; FORMS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentDocs.map((doc) => (
                <div key={doc.name} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                  <div className="text-[10px] font-bold text-brand-accent uppercase mb-2">{doc.type}</div>
                  <h3 className="font-bold text-brand-800 mb-6 h-10 overflow-hidden text-sm leading-tight">{doc.name}</h3>
                  <a href={doc.href} download className="w-full py-2 bg-blue-400 text-white rounded-lg text-xs font-bold hover:bg-brand-700 hover:text-white transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-xl font-bold text-brand-800 mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-accent rounded-full"></span>
              DEPARTMENT BROCHURES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentDocs.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-brand-accent transition-all group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </div>
                    <span className="text-sm font-bold text-brand-800 truncate">{dept.name}</span>
                  </div>
                  <a href={dept.href} download className="p-2 text-brand-700 hover:bg-brand-700 hover:text-white rounded-lg transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div id="study-material" className="pt-10">
            <div className="bg-brand-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div>
                    <h2 className="text-3xl font-bold">Placement Preparation Hub</h2>
                    <p className="text-white/60 mt-2">Curated resources to crack top-tier technical and HR interviews.</p>
                  </div>
                  <a href="#" className="bg-brand-accent text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-accent/20 hover:scale-105 transition-transform text-center">View All Assets</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    </div>
                    <h4 className="font-bold text-lg mb-2">DSA Handbooks</h4>
                    <p className="text-sm text-white/50 mb-4">Topic-wise data structures &amp; algorithms notes from top alumni.</p>
                    <a href="#" className="text-brand-accent text-sm font-bold flex items-center gap-2">Access Drive <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></a>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Interview Experiences</h4>
                    <p className="text-sm text-white/50 mb-4">Archive of technical interview questions from FAANG &amp; Top MNCs.</p>
                    <a href="#" className="text-brand-accent text-sm font-bold flex items-center gap-2">Read Blogs <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></a>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Aptitude &amp; Core</h4>
                    <p className="text-sm text-white/50 mb-4">Practice sets for Quant, Logical, and Core Subjects (OS, DBMS).</p>
                    <a href="#" className="text-brand-accent text-sm font-bold flex items-center gap-2">Download Packs <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></a>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
