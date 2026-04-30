import Image from 'next/image';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <>
      <main className="bg-white py-20" id="about">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-brand-800">Training &amp; Placement Cell</h1>
            <p className="mt-4 text-muted max-w-3xl mx-auto leading-relaxed">
              The Placement Office at IET Lucknow is dedicated to connecting students with recruiters
              and ensuring smooth execution of all placement activities through a structured,
              well-equipped system and a highly coordinated student team.
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-glow-md rounded-2xl p-8 mb-20">
            <h2 className="text-2xl font-bold text-brand-800 mb-4 border-l-4 border-brand-accent pl-4">
              The Cell
            </h2>
            <p className="text-muted leading-relaxed text-justify">
              The Placement Office is responsible for campus placement at IET Lucknow. The Placement-in-Charge,
              the Assistant Placement Officer, the Placement Office staff and the student representatives handle
              various crucial tasks like reaching out to companies, scheduling activities and managing all official
              communication. The team strives to create a balance between recruiter expectations and student aspirations.
              The Placement Managers, Company Coordinators and Department Placement Coordinators ensure policies are
              followed,
              recruiters are assisted, and students are industry-ready. The office is supported with excellent
              infrastructure
              to handle every stage of the placement process smoothly.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-brand-800 mb-10 text-center">
              Facilities
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-white rounded-2xl shadow-glow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-accent/40 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/facilities/workspace.webp"
                    alt="Workspace"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-700 mb-2">Workspace</h3>
                  <p className="text-muted text-sm">
                    A modern workspace for all official placement processes.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl shadow-glow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-accent/40 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/facilities/interview.jpg"
                    alt="Interview Rooms"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-700 mb-2">Interview Rooms</h3>
                  <p className="text-muted text-sm">
                    6 air-conditioned interview cabins equipped with WiFi-enabled PCs and printing facilities.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl shadow-glow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-accent/40 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/facilities/gd.jpg"
                    alt="Group Discussion Room"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-700 mb-2">Group Discussion Room</h3>
                  <p className="text-muted text-sm">
                    A dedicated Group Discussion Hall for placement procedure rounds by visiting companies.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl shadow-glow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-accent/40 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/facilities/computer.png"
                    alt="Computer Center"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-700 mb-2">Computer Center</h3>
                  <p className="text-muted text-sm">
                    Department labs with modern systems for conducting online technical rounds.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl shadow-glow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-accent/40 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/facilities/presentation.jpg"
                    alt="Presentation Room"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-700 mb-2">Presentation Room</h3>
                  <p className="text-muted text-sm">
                    A connected lecture theatre with AC, projector, sound system and seating for 120.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl shadow-glow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-accent/40 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/facilities/audi.jpg"
                    alt="Auditorium"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-700 mb-2">Auditorium</h3>
                  <p className="text-muted text-sm">
                    State of art auditorium (850 capacity) for Pre-Placement Talks and Seminars.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl shadow-glow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-accent/40 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/facilities/training.jpg"
                    alt="Training Classroom"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-700 mb-2">Training Classroom</h3>
                  <p className="text-muted text-sm">
                    Dedicated training space for technical and professional skill development.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl shadow-glow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-accent/40 transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src="/images/facilities/other_facilities.png"
                    alt="Other Facilities"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-700 mb-2">Other Facilities</h3>
                  <p className="text-muted text-sm">
                    Lodging &amp; transport for HR teams along with customized meal options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section id="records" className="py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-800">Past Impressive Records</h2>
                <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
                <p className="text-muted mt-6 max-w-2xl mx-auto text-lg">
                  IET Lucknow has consistently delivered excellent placement outcomes, showcasing a steady upward trajectory
                  in salary packages and recruiter trust.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {[
                  {
                    year: "2024",
                    description: "500+ students placed across leading product & service companies.",
                    highest: "52 LPA",
                    average: "12 LPA",
                    recruiters: [
                      { name: "Amazon", logo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128" },
                      { name: "Microsoft", logo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128" },
                      { name: "TCS", logo: "/images/pastRecruiter/tcs1.png" },
                    ]
                  },
                  {
                    year: "2023",
                    description: "470+ offers across multiple engineering branches.",
                    highest: "45 LPA",
                    average: "8.5 LPA",
                    recruiters: [
                      { name: "Wipro", logo: "https://www.google.com/s2/favicons?domain=wipro.com&sz=128" },
                      { name: "HCL", logo: "/images/pastRecruiter/hcl1.png" },
                      { name: "Capgemini", logo: "https://www.google.com/s2/favicons?domain=capgemini.com&sz=128" }
                    ]
                  },
                  {
                    year: "2022",
                    description: "Strong campus presence with core and IT companies.",
                    highest: "38 LPA",
                    average: "7.8 LPA",
                    recruiters: [
                      { name: "TCS", logo: "/images/pastRecruiter/tcs1.png" },
                      { name: "Infosys", logo: "https://www.google.com/s2/favicons?domain=infosys.com&sz=128" },
                      { name: "IBM", logo: "/images/pastRecruiter/ibm-logo-hd.png" }
                    ]
                  },
                  {
                    year: "2021",
                    description: "Resilient performance despite global challenges.",
                    highest: "32 LPA",
                    average: "7.1 LPA",
                    recruiters: [
                      { name: "Accenture", logo: "https://www.google.com/s2/favicons?domain=accenture.com&sz=128" },
                      { name: "Cognizant", logo: "https://www.google.com/s2/favicons?domain=cognizant.com&sz=128" },
                      { name: "Tech Mahindra", logo: "https://www.google.com/s2/favicons?domain=techmahindra.com&sz=128" }
                    ]
                  }
                ].map((record, index) => (
                  <div key={index} className="relative">
                    <article className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 hover:relative hover:z-20 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-3xl font-extrabold text-brand-800 group-hover:text-brand-accent transition-colors">{record.year}</h3>
                          <div className="p-2 bg-brand-50 rounded-lg text-brand-accent">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                          </div>
                        </div>

                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                          <div className="overflow-hidden">
                            <p className="text-sm text-brand-800 font-semibold mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                              {record.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-gray-50 mt-auto">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted uppercase tracking-wider">Highest CTC</span>
                          <span className="text-brand-accent font-bold">{record.highest}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted uppercase tracking-wider">Average CTC</span>
                          <span className="text-brand-800 font-bold">{record.average}</span>
                        </div>
                        <div className="mt-4">
                          <span className="text-[10px] text-muted uppercase font-bold tracking-widest block mb-3">Top Recruiters</span>
                          <div className="flex items-center justify-between w-full">
                            {record.recruiters.map((recruiter, idx) => (
                              <Image
                                key={idx}
                                src={recruiter.logo}
                                alt={recruiter.name}
                                title={recruiter.name}
                                className="h-10 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200"
                                width={128}
                                height={40}
                                sizes="(max-width: 1024px) 80px, 120px"
                                unoptimized={recruiter.logo.startsWith('http')}
                                loading="lazy"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
