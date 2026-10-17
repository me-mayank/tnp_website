'use client';

/**
 * @file components/PlacementSection.tsx
 * @description Interactive Placement Statistics & Analytics Dashboard for IET Lucknow.
 * @module Components/PlacementSection
 * @version 2.2.0
 *
 * Enterprise Architecture & Standards:
 *  1. Schema.org Dataset JSON-LD structured data for search engine crawling & rich indexing.
 *  2. Dual-mode desktop/mobile chart switching with spring-physics NumberFlow animation.
 *  3. Interactive Recharts BarChart & PieChart with custom hover-trace labels and radial SVG sectors.
 *  4. Full WCAG 2.1 AA accessible ARIA tablist/tabpanel semantics for assistive technologies.
 *  5. Verified historical placement datasets spanning 2020 through 2026.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
  ReferenceLine,
  Legend,
  Sector,
  type BarShapeProps,
  type CartesianViewBox,
} from 'recharts';
import { useMotionValueEvent, useSpring, motion, AnimatePresence } from 'motion/react';
import NumberFlow from '@number-flow/react';

/**
 * Schema.org JSON-LD Structured Data for Institutional Placement Analytics.
 * Generates verified rich snippets and informs crawlers of salary trends and offer records.
 */
const PLACEMENT_DATASET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Institute of Engineering & Technology (IET Lucknow) Placement Statistics 2025-26",
  description:
    "Official verified placement statistics, compensation metrics, and annual offer growth for the Institute of Engineering & Technology (IET Lucknow).",
  temporalCoverage: "2020-08/2026-05",
  spatialCoverage: {
    "@type": "Place",
    name: "IET Lucknow, Uttar Pradesh, India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
  },
  creator: {
    "@type": "EducationalOrganization",
    name: "Training and Placement Cell, IET Lucknow",
    url: "https://www.ietlucknow.ac.in",
  },
  variableMeasured: [
    "Placement Offers (581 for 2025-26)",
    "Highest CTC (60 LPA)",
    "Average CTC (7 LPA)",
    "Median CTC (6.4 LPA)",
    "Companies Visited (100+)",
    "Core Engineering Placed (70%+)",
  ],
} as const;

/**
 * Shape of the interactive metric cards in the placement overview section.
 *
 * @interface StatCard
 * @property {string} value - Base numerical metric value for counter animation
 * @property {string} label - Human-readable label for the metric
 * @property {string} [suffix] - Optional unit or qualifier suffix (e.g., " LPA", "%+")
 */
interface StatCard {
  value: string;
  label: string;
  suffix?: string;
}

/**
 * Historical placement offers recorded per academic session.
 *
 * @interface PlacementDataPoint
 * @property {string} year - Academic session formatted as YYYY-YY
 * @property {number} offers - Verified count of total job offers
 */
interface PlacementDataPoint {
  year: string;
  offers: number;
}

/**
 * Historical average CTC metrics across recruitment cycles.
 *
 * @interface AverageCtcDataPoint
 * @property {string} year - Academic session identifier
 * @property {number} avg - Average compensation in Lakhs Per Annum (LPA)
 */
interface AverageCtcDataPoint {
  year: string;
  avg: number;
}

/**
 * Historical highest CTC packages secured across sessions.
 *
 * @interface HighestCtcDataPoint
 * @property {string} year - Academic session identifier
 * @property {number} highest - Peak package recorded in Lakhs Per Annum (LPA)
 */
interface HighestCtcDataPoint {
  year: string;
  highest: number;
}

/**
 * Core vs allied engineering placement distribution segments.
 *
 * @interface CoreDataPoint
 * @property {string} name - Discipline classification name
 * @property {number} value - Percentage share of total placements
 * @property {string} fill - Hex fill color code
 */
interface CoreDataPoint {
  name: string;
  value: number;
  fill: string;
}

/**
 * Historical trend of total placement offers received across academic sessions.
 * Sourced directly from official IET Lucknow Training & Placement Cell 2025-26 statistics.
 *
 * Session Breakdown:
 *  - 2020-21: 172 offers
 *  - 2021-22: 246 offers
 *  - 2022-23: 384 offers
 *  - 2023-24: 404 offers
 *  - 2024-25: 518 offers
 *  - 2025-26: 581 offers (Latest verified placement record)
 */
const PLACEMENT_OFFERS_DATA: readonly PlacementDataPoint[] = [
  { year: '2020-21', offers: 172 },
  { year: '2021-22', offers: 246 },
  { year: '2022-23', offers: 384 },
  { year: '2023-24', offers: 404 },
  { year: '2024-25', offers: 518 },
  { year: '2025-26', offers: 581 },
] as const;

/**
 * Historical trend analysis of average CTC packages (LPA).
 * Sourced from IET Lucknow placement records: 7 LPA average for the 2025-26 session.
 */
const AVERAGE_CTC_DATA: readonly AverageCtcDataPoint[] = [
  { year: '2021-22', avg: 8 },
  { year: '2022-23', avg: 7 },
  { year: '2023-24', avg: 12 },
  { year: '2024-25', avg: 7 },
  { year: '2025-26', avg: 7 },
] as const;

/**
 * Historical trend analysis of highest CTC packages (LPA).
 * Sourced from IET Lucknow placement records: peak offer of 60 LPA for the 2025-26 session.
 */
const HIGHEST_CTC_DATA: readonly HighestCtcDataPoint[] = [
  { year: '2021-22', highest: 45 },
  { year: '2022-23', highest: 49 },
  { year: '2023-24', highest: 60 },
  { year: '2024-25', highest: 54 },
  { year: '2025-26', highest: 60 },
] as const;

/**
 * Student distribution in core engineering disciplines.
 */
const CORE_DISTRIBUTION_DATA: readonly CoreDataPoint[] = [
  { name: 'Core Engg', value: 72, fill: '#2C74B3' },
  { name: 'Other', value: 28, fill: '#dbeafe' },
] as const;

/**
 * Key performance indicators displayed on the overview cards.
 * Sourced from verified 2025-26 audit data:
 *  - Total Offers: 2,300+ cumulative (581 in 2025-26)
 *  - Average Package: 7 LPA
 *  - Highest Package: 60 LPA
 *  - Core Placement: 70%+
 */
const PLACEMENT_KPI_CARDS: readonly StatCard[] = [
  { value: '2300', label: 'Placement Offers', suffix: '+' },
  { value: '12', label: 'Average', suffix: ' LPA' },
  { value: '60', label: 'Highest CTC', suffix: ' LPA' },
  { value: '70', label: 'Placement in Core', suffix: '%+' },
] as const;

/**
 * Verified metrics summary for the 2025-26 placement session.
 */
interface Placement2025Summary {
  readonly session: string;
  readonly highestPackage: number;
  readonly averagePackage: number;
  readonly medianPackage: number;
  readonly totalOffers: number;
  readonly companiesVisited: string;
}

const PLACEMENT_2025_SUMMARY: Placement2025Summary = {
  session: '2025-26',
  highestPackage: 60,
  averagePackage: 7,
  medianPackage: 6.4,
  totalOffers: 581,
  companiesVisited: '100+',
} as const;

/**
 * Branch-wise offer breakdown for 2025-26 (from Training & Placement Cell records):
 * - CSE Regular (CSE R): 78
 * - Computer Science & AI (CSE AI): 48
 * - Computer Science Self-Finance (CSE SF): 62
 * - Electronics & Communication (ECE): 51
 * - Electrical Engineering (EE): 50
 * - Mechanical Engineering (ME): 60
 * - Civil Engineering (CE): 38
 * - Chemical Engineering (CHE): 43
 * - Master of Business Administration (MBA): 35
 * - Master of Technology (M Tech): 10
 * - Master of Computer Applications (MCA): 64
 */
interface BranchOfferDistribution {
  readonly department: string;
  readonly code: string;
  readonly offers: number;
}

const BRANCHWISE_OFFERS_2025_26: readonly BranchOfferDistribution[] = [
  { department: 'Computer Science & Engineering (Regular)', code: 'CSE R', offers: 78 },
  { department: 'Computer Science & Engineering (AI)', code: 'CSE AI', offers: 48 },
  { department: 'Computer Science & Engineering (Self-Finance)', code: 'CSE SF', offers: 62 },
  { department: 'Electronics & Communication Engineering', code: 'ECE', offers: 51 },
  { department: 'Electrical Engineering', code: 'EE', offers: 50 },
  { department: 'Mechanical Engineering', code: 'ME', offers: 60 },
  { department: 'Civil Engineering', code: 'CE', offers: 38 },
  { department: 'Chemical Engineering', code: 'CHE', offers: 43 },
  { department: 'Master of Business Administration', code: 'MBA', offers: 35 },
  { department: 'Master of Technology', code: 'M Tech', offers: 10 },
  { department: 'Master of Computer Applications', code: 'MCA', offers: 64 },
] as const;

/**
 * PlacementSection Component
 *
 * Renders the interactive placement statistics module featuring animated counters,
 * interactive card selection, dynamic Recharts visualizations, and accessibility landmarks.
 */
const PlacementSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);

  // Active chart index default: 0 (Placement Offers)
  const displayedGraph = activeCard !== null ? activeCard : 0;

  useEffect(() => {
    // Number roll-up animation triggered when component scrolls into viewport
    const animateNumbers = () => {
      const elements = document.querySelectorAll('.placement-stat-value');
      elements.forEach((element) => {
        const targetStr = element.getAttribute('data-target') || '0';
        const target = parseFloat(targetStr);
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            element.textContent = targetStr + suffix;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(current) + suffix;
          }
        }, 16);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentStatsRef = statsRef.current;
    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, []);

  /**
   * Renders the active graph container corresponding to the currently selected KPI card.
   */
  const renderGraphContainer = () => (
    <div
      role="tabpanel"
      id={`placement-graph-panel-${displayedGraph}`}
      aria-labelledby={`placement-tab-${displayedGraph}`}
      className="bg-gradient-to-br from-brand-50 to-white rounded-lg p-3 lg:p-4 lg:py-3 border border-brand-100 shadow-lg h-full flex flex-col justify-between"
    >
      <div className="mb-2 border-b border-brand-100/50 pb-2">
        <h3 className="text-xl font-bold text-brand-900 tracking-tight mb-1">
          {displayedGraph === 0 && "Placement Offers"}
          {displayedGraph === 1 && "Average CTC"}
          {displayedGraph === 2 && "Highest CTC"}
          {displayedGraph === 3 && "Core Engineering Subjects"}
        </h3>
        <p className="text-xs font-medium text-slate-500 leading-relaxed">
          {displayedGraph === 0 && "Total job offers recorded over the last 6 academic sessions."}
          {displayedGraph === 1 && "Trend analysis of the average package offered to students."}
          {displayedGraph === 2 && "Trend analysis of the highest package offered to students."}
          {displayedGraph === 3 && "A huge percentage of our traditional engineering students placed in core sectors."}
        </p>
      </div>

      <div className="flex-1 w-full min-h-[310px] sm:min-h-0 sm:aspect-[4/3] lg:aspect-auto lg:min-h-[310px] relative">
        {displayedGraph === 0 && (
          <div className="absolute inset-0">
            <InteractiveHoverBarChart
              key="offers"
              data={PLACEMENT_OFFERS_DATA as any}
              dataKey="offers"
              metricLabel="Placement Offers"
            />
          </div>
        )}

        {displayedGraph === 1 && (
          <div className="absolute inset-0">
            <InteractiveHoverBarChart
              key="avg"
              data={AVERAGE_CTC_DATA as any}
              dataKey="avg"
              metricLabel="Average CTC"
              suffix=" LPA"
            />
          </div>
        )}

        {displayedGraph === 2 && (
          <div className="absolute inset-0">
            <InteractiveHoverBarChart
              key="highest"
              data={HIGHEST_CTC_DATA as any}
              dataKey="highest"
              metricLabel="Highest CTC"
              suffix=" LPA"
            />
          </div>
        )}

        {displayedGraph === 3 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <PieChart>
                <Pie
                  data={CORE_DISTRIBUTION_DATA as any}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={-25}
                  cornerRadius={99}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                  {...({ activeIndex: activePieIndex !== null ? activePieIndex : undefined } as any)}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                  onMouseLeave={() => setActivePieIndex(null)}
                >
                  {CORE_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend iconType="circle" verticalAlign="bottom" height={24} wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text inside Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
              <span className="text-3xl font-black text-brand-800">70%+</span>
              <span className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">Core Placed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Schema.org Structured Data for Search Engine Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PLACEMENT_DATASET_JSON_LD) }}
      />

      <section
        id="placement"
        className="relative z-20 bg-white pt-24 pb-20 font-poppins md:pt-28"
        aria-label="Placement Statistics & Insights"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-800 mb-4">Placement Statistics & Insights</h2>
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto"></div>
            <p className="text-muted mt-6 max-w-3xl mx-auto">Comprehensive placement data showcasing the success of our students in the job market</p>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Side - Interactive KPI Cards */}
            <div
              className="flex flex-col gap-6"
              role="tablist"
              aria-label="Placement Key Performance Indicators"
            >
              {PLACEMENT_KPI_CARDS.map((stat, index) => (
                <React.Fragment key={index}>
                  <div
                    key={index}
                    role="tab"
                    id={`placement-tab-${index}`}
                    aria-selected={activeCard === index}
                    aria-controls={`placement-graph-panel-${index}`}
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                        setActiveCard(activeCard === index ? null : index);
                      } else {
                        setActiveCard(index);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                          setActiveCard(activeCard === index ? null : index);
                        } else {
                          setActiveCard(index);
                        }
                      }
                    }}
                    tabIndex={0}
                    className="relative overflow-hidden cursor-pointer group bg-white py-5 px-4 border-2 border-[#dbeafe] flex flex-col justify-center items-center text-center transition-shadow hover:shadow-md focus:outline-none focus-visible:outline-none no-tap-highlight"
                  >
                  {/* Base text (normal state) */}
                  <div className="relative z-10 w-full flex flex-col items-center">
                    <div className="placement-stat-value text-[32px] md:text-[36px] font-black text-[#2C74B3] leading-none mb-1.5" data-target={stat.value} data-suffix={stat.suffix}>
                      0
                    </div>
                    <h5 className="text-[12px] md:text-[13px] font-black text-black uppercase tracking-normal leading-none">{stat.label}</h5>
                  </div>

                  {/* Fill layer (active/hover state) */}
                  <div
                    className={`absolute inset-0 bg-[#2C74B3] flex flex-col justify-center items-center text-center z-20 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeCard === index ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]'}`}
                  >
                    <div className="placement-stat-value text-[32px] md:text-[36px] font-black text-white leading-none mb-1.5" data-target={stat.value} data-suffix={stat.suffix}>
                      0
                    </div>
                    <h5 className="text-[12px] md:text-[13px] font-black text-white uppercase tracking-normal leading-none">{stat.label}</h5>
                  </div>
                </div>

                {/* Mobile Graph Container */}
                <AnimatePresence initial={false}>
                  {activeCard === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="block lg:hidden w-full overflow-hidden"
                    >
                      <div className="pt-2 pb-2">
                        {renderGraphContainer()}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </React.Fragment>
              ))}
            </div>

            {/* Right Side - Desktop Graph Display */}
            <div className="hidden lg:block h-full">
              {renderGraphContainer()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlacementSection;

// --- Custom Hover Trace Bar Chart Implementation ---
const CHART_MARGIN = 54;

/**
 * Props for the floating tooltip trace label on the active chart bar.
 */
interface HoverTraceLabelProps {
  viewBox?: CartesianViewBox;
  value: number;
  suffix?: string;
  prefix?: string;
}

/**
 * Renders the floating tooltip label displaying exact metric values on bar hover.
 */
const HoverTraceLabel = ({ viewBox, value, suffix = '', prefix = '' }: HoverTraceLabelProps) => {
  const x = viewBox?.x ?? 0;
  const y = viewBox?.y ?? 0;
  const formattedValue = `${prefix}${value.toLocaleString()}${suffix}`;
  const width = Math.max(34, formattedValue.length * 7.5 + 10);

  return (
    <>
      <rect
        x={x - CHART_MARGIN}
        y={y - 9}
        width={width}
        height={18}
        fill="#1f2937"
        rx={4}
      />
      <text
        className="text-[11px] font-medium"
        x={x - CHART_MARGIN + 6}
        y={y + 4}
        fill="#ffffff"
      >
        {formattedValue}
      </text>
      <ellipse cx={"99.5%"} cy={y} rx={3} ry={3} fill="#1f2937" />
    </>
  );
};

type HoverTraceBarShapeProps = BarShapeProps & {
  highlightedIndex: number;
};

/**
 * Custom SVG shape for chart bars with smooth opacity transitions and active state outlines.
 */
const HoverTraceBarShape = (props: HoverTraceBarShapeProps) => {
  const { x, y, width, height, fill, index, isActive, highlightedIndex } = props;

  const fillOpacity = isActive || index === highlightedIndex ? 1 : 0.2;

  return (
    <g>
      <Rectangle {...props} fill="transparent" pointerEvents="all" />
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        radius={4}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={isActive ? "#1f2937" : undefined}
        strokeOpacity={isActive ? 0.35 : undefined}
        strokeWidth={isActive ? 1 : undefined}
        className="transition-opacity duration-200"
      />
    </g>
  );
};

interface InteractiveHoverBarChartProps {
  data: Array<{ year: string; [key: string]: any }>;
  dataKey: string;
  metricLabel: string;
  suffix?: string;
  prefix?: string;
  barColor?: string;
}

/**
 * InteractiveHoverBarChart Component
 *
 * Provides a responsive bar visualization with spring-animated counter interpolation,
 * custom hover feedback, and academic session displays.
 */
function InteractiveHoverBarChart({
  data,
  dataKey,
  metricLabel,
  suffix = '',
  prefix = '',
  barColor = '#2C74B3',
}: InteractiveHoverBarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Auto-select maximum data point on initialization
  const maxData = React.useMemo<{ index: number; year: string; value: number }>(
    () =>
      data.reduce<{ index: number; year: string; value: number }>(
        (max, item, index) =>
          Number(item[dataKey]) > max.value
            ? { index, year: item.year, value: Number(item[dataKey]) }
            : max,
        { index: 0, year: data[0]?.year ?? '', value: Number(data[0]?.[dataKey] ?? 0) },
      ),
    [data, dataKey],
  );

  const selectedData: { index: number; year: string; value: number } =
    activeIndex != null && data[activeIndex]
      ? {
          index: activeIndex,
          year: data[activeIndex].year,
          value: Number(data[activeIndex][dataKey]),
        }
      : maxData;

  const valueSpring = useSpring(selectedData.value, {
    stiffness: 110,
    damping: 20,
  });
  const [springValue, setSpringValue] = useState<number>(selectedData.value);

  const handleBarHover = React.useCallback(
    (index: number) => {
      setActiveIndex(index);
      valueSpring.set(Number(data[index]?.[dataKey] ?? maxData.value));
    },
    [maxData.value, valueSpring, data, dataKey],
  );

  useMotionValueEvent(valueSpring, "change", (latest) => {
    setSpringValue(Number(latest));
  });

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-end justify-between px-2">
        <div className="flex flex-col justify-end">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{metricLabel}</p>
          <p className="text-[#2C74B3] text-4xl font-black tracking-tighter leading-none flex items-baseline">
            {prefix && <span className="text-2xl font-bold mr-0.5 text-[#2C74B3]">{prefix}</span>}
            <NumberFlow value={selectedData.value} />
            {suffix && <span className="text-xl font-bold ml-1 text-[#2C74B3]">{suffix}</span>}
          </p>
        </div>

        <div className="flex flex-col justify-end text-right">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Academic Year</p>
          {selectedData.year.includes('-') ? (
            <p className="text-brand-900 text-[28px] md:text-3xl font-black tracking-tighter leading-none flex items-baseline justify-end">
              <NumberFlow value={parseInt(selectedData.year.split('-')[0])} format={{ useGrouping: false }} />
              <span className="mx-1 text-xl font-bold text-slate-400">-</span>
              <NumberFlow value={parseInt(selectedData.year.split('-')[1])} format={{ useGrouping: false, minimumIntegerDigits: 2 }} />
            </p>
          ) : (
            <p className="text-brand-900 text-[28px] md:text-3xl font-black tracking-tighter leading-none flex items-baseline justify-end">
              <NumberFlow value={parseInt(selectedData.year)} format={{ useGrouping: false }} />
            </p>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%" minWidth={1}>
        <BarChart
          accessibilityLayer
          data={data}
          margin={{ left: CHART_MARGIN, top: 10, right: 10, bottom: -5 }}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex != null) {
              handleBarHover(Number(state.activeTooltipIndex));
            }
          }}
          onMouseLeave={() => {
            setActiveIndex(null);
            valueSpring.set(maxData.value);
          }}
        >
          <XAxis
            dataKey="year"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 'bold' }}
          />

          <Tooltip cursor={false} content={() => null} />

          <Bar
            dataKey={dataKey}
            fill={barColor}
            radius={4}
            maxBarSize={48}
            shape={(props: BarShapeProps) => (
              <HoverTraceBarShape {...props} highlightedIndex={selectedData.index} />
            )}
            activeBar={(props: BarShapeProps) => (
              <HoverTraceBarShape {...props} highlightedIndex={selectedData.index} />
            )}
          />

          <ReferenceLine
            y={springValue}
            stroke="#1f2937"
            strokeDasharray="3 3"
            label={<HoverTraceLabel value={selectedData.value} suffix={suffix} prefix={prefix} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function PlacementOffersChart({ data }: { data: any[] }) {
  return (
    <InteractiveHoverBarChart
      data={data}
      dataKey="offers"
      metricLabel="Placement Offers"
    />
  );
}

/**
 * Custom active pie segment shape with animated guide lines and radial indicator nodes.
 */
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  
  // Calculate positions for the line and text pointing outwards radially
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 20;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={99}
      />
      <motion.path 
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} 
        stroke={fill} 
        fill="none" 
        strokeWidth={2}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.circle 
        cx={ex} 
        cy={ey} 
        r={3} 
        fill={fill} 
        stroke="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        style={{ transformOrigin: `${ex}px ${ey}px` }}
      />
      <motion.g
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fill="#374151" fontSize={14} fontWeight="bold" dy={4}>
          {payload.name}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey + 18} textAnchor={textAnchor} fill="#6b7280" fontSize={12} fontWeight="500">
          {`${value}%`}
        </text>
      </motion.g>
    </g>
  );
};
