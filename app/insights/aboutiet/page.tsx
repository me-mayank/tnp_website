import Image from "next/image";
import Link from "next/link";

export default function AboutIetPage() {
  return (
    <>
      <main className="bg-white py-20" id="about-iet">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-brand-800">About IET</h1>
            <p className="mt-4 text-muted max-w-3xl mx-auto leading-relaxed">
              Institute of Engineering &amp; Technology, Lucknow — nurturing excellence since 1984.
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-glow-md rounded-2xl p-6 md:p-10 mb-16 overflow-hidden">
            <h2 className="text-2xl font-bold text-brand-800 mb-6 border-l-4 border-brand-accent pl-4 text-left">
              Overview
            </h2>

            <div className="block">
              <div className="w-full lg:w-2/5 lg:float-right lg:ml-8 mb-6 lg:mb-4">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                  <Image
                    src="/images/ietlko.png"
                    alt="IET Lucknow Campus"
                    className="w-full h-auto object-contain block"
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>

              <div className="text-muted text-justify leading-relaxed">
                <p className="mb-4">
                  The institute of engineering and technology since its first batch commencement in 1984 has been functioning to achieve excellence in
                  every field of education. It has been an outstanding institute in developing and nourishing creativity and passion in the field of
                  engineering.
                </p>

                <p className="mb-4">
                  After its establishment in 1984, the Institute of Engineering and Technology has been preceptor to the young minds from over state of
                  Uttar Pradesh. The institute has proven its excellence in every sector ranging from academic competition to co-curricular activities
                  and events, and its consistency in achieving success and results separates it from other institutes.
                </p>

                <p className="mb-4">
                  Our students strive for excellence and have been consistently maintaining excellent results in academics and co-curricular activities.
                  The college has the distinction of being ranked first among all the colleges of AKTU. Our students have been proving their excellence by
                  securing top ranks in various competitive exams since years.
                </p>

                <p>
                  It is a matter of pride for the College to maintain a superlative overall academic performance over the years. Our focus is to provide
                  excellent academic growth to the geniuses mind of the state, to foster future leaders and achievers of the world and to develop
                  technical manpower to meet current and future industrial demands. The Institute emphasizes practical education and research aligned with
                  industrial needs, alongside the development of interpersonal and intrapersonal qualities in young students.
                </p>
              </div>

              <div className="clear-both"></div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-brand-800 mb-8 text-center">Vision &amp; Mission</h2>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-glow-sm p-8 hover:shadow-glow-md transition-all">
                <h3 className="text-2xl font-bold text-brand-700 mb-4">VISION</h3>
                <p className="text-muted leading-relaxed text-justify">
                  To effectively contribute towards the national endeavor of producing world class manpower and to usher in technology driven
                  economic development of the country in order to enrich the quality of life of its citizens by promoting innovative technologies and
                  optimal utilization of resources for sustainable development.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-glow-sm p-8 hover:shadow-glow-md transition-all">
                <h3 className="text-2xl font-bold text-brand-700 mb-4">MISSION</h3>
                <p className="text-muted leading-relaxed mb-3 text-justify">
                  To establish global state-of-the-art facilities and resources that will prepare and enrich the human resource by promoting
                  all-inclusive research and developments.
                </p>
                <p className="text-muted leading-relaxed mb-3 text-justify">
                  To inculcate entrepreneurship skills in the students in order to optimize resources to achieve the economic growth by improving
                  the quality of life of the citizens.
                </p>
                <p className="text-muted leading-relaxed text-justify">
                  To instill problem-solving skills for overcoming real life challenges by imparting values-based professional education.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-brand-800 mb-8 text-center">Highlights</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-glow-sm hover:shadow-glow-md transition-all">
                <h3 className="text-xl font-bold text-brand-700 mb-2">Top Rank</h3>
                <p className="text-muted text-sm">
                  IET is ranked 1st among the 700+ engineering colleges under DR APJ Abdul Kalam Technical University.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-glow-sm hover:shadow-glow-md transition-all">
                <h3 className="text-xl font-bold text-brand-700 mb-2">Placement Excellence</h3>
                <p className="text-muted text-sm">
                  Has an excellent record of placement with a 21% increase in placement offers this year.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-glow-sm hover:shadow-glow-md transition-all">
                <h3 className="text-xl font-bold text-brand-700 mb-2">National Recognition</h3>
                <p className="text-muted text-sm">
                  Hon&apos;ble Education Minister Shri Prakash Javadekar presented IET with the &apos;India Excellence Award 2017&apos; as the best government
                  engineering college in North India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}