'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Link from 'next/link';

// Define types for our data structure
type ProgramData = {
  labels: string[];
  values: number[];
  colors: string[];
};

type AllData = {
  programs: ProgramData;
  btech: ProgramData;
  mtech: ProgramData;
  mba: ProgramData;
  mca: ProgramData;
};

type PlacementOffersData = {
  labels: string[];
  values: number[];
};

type PackagesData = {
  labels: string[];
  highest: number[];
  average: number[];
};

// Data Constants
const DATA: AllData = {
  programs: {
    labels: ["MBA", "MCA", "B.Tech", "M.Tech"],
    values: [57, 67, 541, 108],
    colors: ["#F6C06E", "#F6A8BF", "#B79AD6", "#6E98A3"],
  },
  btech: {
    labels: ["CS-R", "CS-AI", "CS-SF", "ECE", "ME", "CHE", "EE", "CE"],
    values: [74, 69, 72, 72, 64, 64, 57, 69],
    colors: [
      "#F6C06E", "#F6A78E", "#F6A8BF", "#E5B2D9",
      "#B79AD6", "#9CA8D6", "#7F9CC7", "#6E98A3",
    ],
  },
  mtech: {
    labels: [
      "Electrical", "Structural", "Biotech",
      "Environmental", "Mechanical", "Micro Electronics",
    ],
    values: [20, 22, 18, 16, 18, 14],
    colors: [
      "#F6C06E", "#F6A78E", "#F6A8BF",
      "#E5B2D9", "#B79AD6", "#6E98A3",
    ],
  },
  mba: {
    labels: ["Finance", "Marketing", "Operations", "Human Resources"],
    values: [28, 12, 8, 9],
    colors: ["#F6C06E", "#F6A78E", "#F6A8BF", "#B79AD6"],
  },
  mca: {
    labels: ["Year 1", "Year 2", "Year 3"],
    values: [22, 23, 22],
    colors: ["#9EB0E6", "#B79AD6", "#8CC1A8"],
  },
};

const PLACEMENT_OFFERS: PlacementOffersData = {
  labels: ["2020-21", "2021-22", "2022-23", "2023-24", "2024-25"],
  values: [172, 246, 384, 404, 518],
};

const PACKAGES_OFFERED: PackagesData = {
  labels: ["2022", "2023", "2024", "2025"],
  highest: [45, 49, 60, 54],
  average: [8, 7, 12, 7],
};

export default function Demographic() {
  const [activeProgram, setActiveProgram] = useState<keyof AllData | 'overview'>('overview');
  const [currentData, setCurrentData] = useState<ProgramData>(DATA.programs);
  const [desc, setDesc] = useState({ title: 'Overview', text: 'Program distribution across degree types (MBA, MCA, B.Tech, M.Tech).' });
  const [isChartReady, setIsChartReady] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const barChartInstance = useRef<any>(null);
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Chart) {
      setIsChartReady(true);
    }
  }, []);

  // Handle Chart Initialization and Updates
  useEffect(() => {
    if (isChartReady && chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // @ts-ignore - Chart is loaded via CDN script
      const ctx = chartRef.current.getContext('2d');
      // @ts-ignore
      chartInstance.current = new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: currentData.labels,
          datasets: [
            {
              data: currentData.values,
              backgroundColor: currentData.colors,
              borderColor: "#FFFFFF",
              borderWidth: 2,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: { 
                // @ts-ignore
                label: (ctx) => `${ctx.label}: ${ctx.parsed}` 
              },
            },
          },
        },
      });
    }
  }, [isChartReady, currentData]);

  useEffect(() => {
    if (isChartReady && barChartRef.current) {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      // @ts-ignore - Chart is loaded via CDN script
      const ctx = barChartRef.current.getContext('2d');
      // @ts-ignore
      barChartInstance.current = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: PLACEMENT_OFFERS.labels,
          datasets: [
            {
              label: 'Placement Offers',
              data: PLACEMENT_OFFERS.values,
              backgroundColor: [
                '#6FE7EA',
                '#46B9D6',
                '#2F88B5',
                '#2D5A95',
                '#0B3B84',
              ],
              borderColor: [
                '#5DD6DA',
                '#3AA7C2',
                '#2A78A1',
                '#274F83',
                '#082F6C',
              ],
              borderWidth: 1,
              borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
              borderSkipped: 'bottom',
              barThickness: 56,
              maxBarThickness: 64,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: { top: 16, right: 12, bottom: 8, left: 8 },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#6B7280', font: { size: 12 } },
              title: {
                display: true,
                text: 'Academic Year',
                color: '#374151',
                font: { size: 12, weight: '600' },
              },
            },
            y: {
              beginAtZero: true,
              suggestedMax: 600,
              grid: { color: 'rgba(15, 23, 42, 0.10)' },
              ticks: { color: '#6B7280', stepSize: 100 },
              title: {
                display: true,
                text: 'Total Number of Job Offers',
                color: '#374151',
                font: { size: 12, weight: '600' },
              },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                // @ts-ignore
                label: (ctx) => `${ctx.parsed.y}`,
              },
            },
          },
        },
        plugins: [
          {
            id: 'valueLabels',
            // @ts-ignore
            afterDatasetsDraw: (chart) => {
              const { ctx } = chart;
              ctx.save();
              ctx.font = '12px serif';
              ctx.fillStyle = '#111827';
              ctx.textAlign = 'center';
              // @ts-ignore
              const meta = chart.getDatasetMeta(0);
              // @ts-ignore
              meta.data.forEach((bar, index) => {
                const value = chart.data.datasets[0].data[index];
                // @ts-ignore
                ctx.fillText(value, bar.x, bar.y - 6);
              });
              ctx.restore();
            },
          },
        ],
      });
    }
  }, [isChartReady]);

  useEffect(() => {
    if (isChartReady && lineChartRef.current) {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      // @ts-ignore - Chart is loaded via CDN script
      const ctx = lineChartRef.current.getContext('2d');
      // @ts-ignore
      lineChartInstance.current = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: PACKAGES_OFFERED.labels,
          datasets: [
            {
              label: 'Highest',
              data: PACKAGES_OFFERED.highest,
              borderColor: '#1E4FA2',
              backgroundColor: '#1E4FA2',
              pointBackgroundColor: '#1E4FA2',
              pointRadius: 4,
              pointHoverRadius: 5,
              borderWidth: 3,
              tension: 0.3,
            },
            {
              label: 'Average',
              data: PACKAGES_OFFERED.average,
              borderColor: '#70D3FF',
              backgroundColor: '#70D3FF',
              pointBackgroundColor: '#70D3FF',
              pointRadius: 4,
              pointHoverRadius: 5,
              borderWidth: 3,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 10, right: 18, bottom: 8, left: 8 } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#6B7280' },
              title: {
                display: true,
                text: 'Years',
                color: '#374151',
                font: { size: 12, weight: '600' },
              },
            },
            y: {
              beginAtZero: true,
              suggestedMax: 60,
              grid: { color: 'rgba(15, 23, 42, 0.18)' },
              ticks: { color: '#6B7280', stepSize: 10 },
              title: {
                display: true,
                text: 'Package',
                color: '#374151',
                font: { size: 12, weight: '600' },
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 8,
                color: '#111827',
                font: { size: 12, weight: '600' },
              },
            },
            tooltip: {
              callbacks: {
                // @ts-ignore
                label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
              },
            },
          },
        },
      });
    }
  }, [isChartReady]);

  const handleProgramChange = (program: string) => {
    if (program === 'overview') {
      setActiveProgram('overview');
      setCurrentData(DATA.programs);
      setDesc({ title: 'Overview', text: 'Program distribution across degree types (MBA, MCA, B.Tech, M.Tech).' });
    } else if (program === 'btech') {
      setActiveProgram('btech');
      setCurrentData(DATA.btech);
      setDesc({ title: "Bachelor's of Technology", text: "The B.Tech program is divided among 6 departments and 8 branches. Click a branch to highlight it in the chart (legend keeps actual counts)." });
    } else if (program === 'mtech') {
      setActiveProgram('mtech');
      setCurrentData(DATA.mtech);
      setDesc({ title: "Master's of Technology", text: "The college promotes in-depth study and research and hosts diverse higher studies programs." });
    } else if (program === 'mba') {
      setActiveProgram('mba');
      setCurrentData(DATA.mba);
      setDesc({ title: "Master's of Business Administration", text: "MBA program is divided among departments; the legend shows department names and counts." });
    } else if (program === 'mca') {
      setActiveProgram('mca');
      setCurrentData(DATA.mca);
      setDesc({ title: "Master of Computer Application", text: "MCA program distribution (year wise)." });
    }
  };

  const handleBranchClick = (branch: string) => {
    const idx = DATA.btech.labels.indexOf(branch);
    if (idx === -1 || !chartInstance.current) return;

    // Emphasize the selected slice logic from original HTML
    const emphasizedValues = DATA.btech.values.map((v, i) =>
      i === idx ? Math.round(v * 1.18) : v
    );

    // Update chart data only, keep legend data same
    chartInstance.current.data.datasets[0].data = emphasizedValues;
    chartInstance.current.update();
  };

  return (
    <div className="bg-white">
      {/* Load Chart.js from CDN */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/chart.js" 
        strategy="afterInteractive"
        onReady={() => setIsChartReady(true)}
      />

      {/* MAIN CONTENT */}
      <main className="bg-white py-20" id="demographics">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Placement Offers Bar Chart */}
          <section className="mb-12">
            <div className="mb-6 text-center lg:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-800/5 text-brand-800 font-semibold">
                PLACEMENT OFFERS
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-gray-900">Session-wise Placement Offers</h2>
              <p className="mt-2 text-muted max-w-3xl">
                Placement offers across recent academic sessions.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-glow-md">
              <div className="h-[360px] w-full">
                <canvas ref={barChartRef} id="placementOffersChart" className="w-full h-full"></canvas>
              </div>
            </div>
          </section>

           {/* Packages Offered Line Chart */}
          <section className="mb-12">
            <div className="mb-6 text-center lg:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-800/5 text-brand-800 font-semibold">
                PACKAGES OFFERED
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-gray-900">Highest vs Average Packages</h2>
              <p className="mt-2 text-muted max-w-3xl">
                Year-wise comparison of highest and average packages offered.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-glow-md">
              <div className="h-[360px] w-full">
                <canvas ref={lineChartRef} id="packagesLineChart" className="w-full h-full"></canvas>
              </div>
            </div>
          </section>

          {/* Top title */}
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-800/5 text-brand-800 font-semibold">
              ACADEMIC PROGRAMMES
            </div>
            <p className="mt-4 text-muted max-w-3xl">
              The college has various under graduation and post graduations program, each run and supervised by its own departments, with most no. of students in B Tech degree program totaling up to 541.
            </p>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: selector & descriptions */}
            <aside className="lg:col-span-3 space-y-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-brand-800 mb-3">
                  Select Program
                </h3>

                <div className="space-y-2">
                  <button
                    onClick={() => handleProgramChange('overview')}
                    className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 active:bg-gray-100 transition font-medium ${activeProgram === 'overview' ? 'bg-brand-800/5' : ''}`}
                  >
                    Overview (All Programs)
                  </button>
                  <button
                    onClick={() => handleProgramChange('btech')}
                    className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 active:bg-gray-100 transition font-medium ${activeProgram === 'btech' ? 'bg-brand-800/5' : ''}`}
                  >
                    B.Tech (541)
                  </button>
                  <button
                    onClick={() => handleProgramChange('mtech')}
                    className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 active:bg-gray-100 transition font-medium ${activeProgram === 'mtech' ? 'bg-brand-800/5' : ''}`}
                  >
                    M.Tech (108)
                  </button>
                  <button
                    onClick={() => handleProgramChange('mba')}
                    className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 active:bg-gray-100 transition font-medium ${activeProgram === 'mba' ? 'bg-brand-800/5' : ''}`}
                  >
                    MBA (57)
                  </button>
                  <button
                    onClick={() => handleProgramChange('mca')}
                    className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 active:bg-gray-100 transition font-medium ${activeProgram === 'mca' ? 'bg-brand-800/5' : ''}`}
                  >
                    MCA (67)
                  </button>
                </div>
              </div>

              {/* Program description */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-sm text-muted space-y-3">
                <div className="text-brand-800 font-semibold">{desc.title}</div>
                <div>{desc.text}</div>
              </div>

              {/* B.Tech branch quick selector (only visible when B.Tech selected) */}
              {activeProgram === 'btech' && (
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-sm font-semibold text-brand-800 mb-3">
                    B.Tech Branches
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {DATA.btech.labels.map((branch) => (
                      <button
                        key={branch}
                        onClick={() => handleBranchClick(branch)}
                        className="px-3 py-2 text-left rounded-md hover:bg-gray-50 focus:font-semibold focus:text-brand-800 group"
                      >
                        {branch}
                        <span className="ml-2 text-brand-800 hidden group-focus:inline">➜</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* CENTER: Chart card */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-glow-md min-h-[380px] flex flex-col items-center justify-center">
                <div className="w-[260px] sm:w-[320px] md:w-[380px]">
                  <canvas ref={chartRef} id="mainChart"></canvas>
                </div>

                {/* Mini Legend */}
                <div className="mt-6 w-full max-w-xl hidden sm:block">
                  <div className="flex flex-wrap gap-3">
                    {currentData.labels.map((label, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted">
                        <span 
                          style={{ 
                            background: currentData.colors[i],
                            width: '12px',
                            height: '12px',
                            borderRadius: '3px',
                            display: 'inline-block',
                            border: '1px solid rgba(0,0,0,0.04)'
                          }}
                        ></span>
                        <div>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Legend & counts */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-semibold text-brand-800 mb-4">Legend</h4>
                <div className="space-y-3 text-sm">
                  {currentData.labels.map((label, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2">
                      <div className="flex items-center gap-3">
                        <span 
                          style={{
                            background: currentData.colors[idx],
                            width: '16px',
                            height: '16px',
                            display: 'inline-block',
                            borderRadius: '4px',
                            border: '1px solid rgba(0,0,0,0.05)'
                          }}
                        ></span>
                        <div className="text-sm font-medium" style={{ color: '#0A2647' }}>
                          {label}
                        </div>
                      </div>
                      <div className="ml-auto text-sm text-muted">
                        {currentData.values[idx]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}