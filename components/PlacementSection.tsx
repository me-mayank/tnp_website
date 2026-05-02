'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle, ReferenceLine, Legend, Sector, type BarShapeProps, type CartesianViewBox } from 'recharts';
import { useMotionValueEvent, useSpring, motion, AnimatePresence } from 'motion/react';
import NumberFlow from '@number-flow/react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

interface StatCard {
  value: string;
  label: string;
  suffix?: string;
}

const PlacementSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);

  const displayedGraph = activeCard !== null ? activeCard : 0;

  useEffect(() => {
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

  const stats: StatCard[] = [
    { value: '1700', label: 'Placement Offers', suffix: '+' },
    { value: '12', label: 'Peak Average', suffix: ' LPA' },
    { value: '60', label: 'Highest CTC', suffix: ' LPA' },
    { value: '70', label: 'Placement in Core', suffix: '%+' }
  ];

  // --- Recharts Data Sets (From Demographic Page) ---
  const placementData = [
    { year: '2020-21', offers: 172 },
    { year: '2021-22', offers: 246 },
    { year: '2022-23', offers: 384 },
    { year: '2023-24', offers: 404 },
    { year: '2024-25', offers: 518 },
  ];

  const averageData = [
    { year: '2022', avg: 8 },
    { year: '2023', avg: 7 },
    { year: '2024', avg: 12 },
    { year: '2025', avg: 7 },
  ];

  const highestData = [
    { year: '2022', highest: 45 },
    { year: '2023', highest: 49 },
    { year: '2024', highest: 60 },
    { year: '2025', highest: 54 },
  ];

  const coreData = [
    { name: 'Core Engg', value: 72, fill: '#2563eb' },
    { name: 'Other', value: 28, fill: '#dbeafe' },
  ];

  const renderGraphContainer = () => (
    <div className={`bg-gradient-to-br from-brand-50 to-white rounded-lg p-3 lg:p-4 lg:py-3 border border-brand-100 shadow-lg h-full flex flex-col justify-between ${montserrat.className}`}>
      <div className="mb-2 border-b border-brand-100/50 pb-2">
        <h3 className="text-xl font-bold text-brand-900 tracking-tight mb-1">
          {displayedGraph === 0 && "Placement Offers"}
          {displayedGraph === 1 && "Peak Average CTC"}
          {displayedGraph === 2 && "Highest CTC"}
          {displayedGraph === 3 && "Core Engineering Subjects"}
        </h3>
        <p className="text-xs font-medium text-slate-500 leading-relaxed">
          {displayedGraph === 0 && "Total job offers recorded over the last 5 academic sessions."}
          {displayedGraph === 1 && "Trend analysis of the average package offered to students."}
          {displayedGraph === 2 && "Trend analysis of the highest package offered to students."}
          {displayedGraph === 3 && "A huge percentage of our traditional engineering students placed in core sectors."}
        </p>
      </div>

      <div className="flex-1 w-full min-h-[310px] sm:min-h-0 sm:aspect-[4/3] lg:aspect-auto lg:min-h-[310px] relative">
        {displayedGraph === 0 && (
          <div className="absolute inset-0">
            <PlacementOffersChart data={placementData} />
          </div>
        )}

        {displayedGraph === 1 && (
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <AreaChart data={averageData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #dbeafe', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="avg" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorAvg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {displayedGraph === 2 && (
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <LineChart data={highestData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} domain={[0, 75]} ticks={[0, 15, 30, 45, 60, 75]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #dbeafe', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Line type="monotone" dataKey="highest" stroke="#2563eb" strokeWidth={4} dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {displayedGraph === 3 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <PieChart>
                <Pie
                  data={coreData}
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
                  {coreData.map((entry, index) => (
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
    <section id="placement" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-800 mb-4">Placement Statistics & Insights</h2>
          <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto"></div>
          <p className="text-muted mt-6 max-w-3xl mx-auto">Comprehensive placement data showcasing the success of our students in the job market</p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Side - Stats Cards */}
          <div className="flex flex-col gap-6">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div
                  key={index}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                    setActiveCard(activeCard === index ? null : index);
                  } else {
                    setActiveCard(index);
                  }
                }}
                className="relative overflow-hidden cursor-pointer group bg-white py-5 px-4 border-2 border-[#dbeafe] flex flex-col justify-center items-center text-center transition-shadow hover:shadow-md"
              >
                {/* Base text (normal state) */}
                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="placement-stat-value text-[32px] md:text-[36px] font-black text-[#60a5fa] leading-none mb-1.5" data-target={stat.value} data-suffix={stat.suffix}>
                    0
                  </div>
                  <h5 className="text-[12px] md:text-[13px] font-black text-black uppercase tracking-normal leading-none">{stat.label}</h5>
                </div>

                {/* Fill layer (active/hover state) */}
                <div
                  className={`absolute inset-0 bg-[#60a5fa] flex flex-col justify-center items-center text-center z-20 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeCard === index ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]'}`}
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

          {/* Right Side - Graph/Chart */}
          <div className="hidden lg:block h-full">
            {renderGraphContainer()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementSection;

// --- Custom Evil Hover Trace Bar Chart Implementation ---
const CHART_MARGIN = 38;

interface HoverTraceLabelProps {
  viewBox?: CartesianViewBox;
  value: number;
}

const HoverTraceLabel = ({ viewBox, value }: HoverTraceLabelProps) => {
  const x = viewBox?.x ?? 0;
  const y = viewBox?.y ?? 0;
  const formattedValue = value.toLocaleString();
  const width = formattedValue.length * 8 + 12;

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
        x={x - CHART_MARGIN + 7}
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

function PlacementOffersChart({ data }: { data: any[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const maxData = React.useMemo(
    () =>
      data.reduce(
        (max, item, index) =>
          item.offers > max.value ? { index, year: item.year, value: item.offers } : max,
        { index: 0, year: data[0].year, value: data[0].offers },
      ),
    [data],
  );

  const selectedData =
    activeIndex != null && data[activeIndex]
      ? {
          index: activeIndex,
          year: data[activeIndex].year,
          value: data[activeIndex].offers,
        }
      : maxData;

  const valueSpring = useSpring(selectedData.value, {
    stiffness: 110,
    damping: 20,
  });
  const [springValue, setSpringValue] = useState(selectedData.value);

  const handleBarHover = React.useCallback(
    (index: number) => {
      setActiveIndex(index);
      valueSpring.set(data[index]?.offers ?? maxData.value);
    },
    [maxData.value, valueSpring, data],
  );

  useMotionValueEvent(valueSpring, "change", (latest) => {
    setSpringValue(Math.round(Number(latest)));
  });

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-end justify-between px-2">
        <div className="flex flex-col justify-end">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Placement Offers</p>
          <p className="text-[#2563eb] text-4xl font-black tracking-tighter leading-none">
            <NumberFlow value={selectedData.value} />
          </p>
        </div>

        <div className="flex flex-col justify-end text-right">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Academic Year</p>
          <p className="text-brand-900 text-[28px] md:text-3xl font-black tracking-tighter leading-none flex items-baseline justify-end">
            <NumberFlow value={parseInt(selectedData.year.split('-')[0])} format={{ useGrouping: false }} />
            <span className="mx-1 text-xl font-bold text-slate-400">-</span>
            <NumberFlow value={parseInt(selectedData.year.split('-')[1])} format={{ useGrouping: false, minimumIntegerDigits: 2 }} />
          </p>
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
            dataKey="offers"
            fill="#2563eb"
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
            label={<HoverTraceLabel value={selectedData.value} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

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

