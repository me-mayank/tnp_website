"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const chartData = [
  { year: "2022", companies: 70, offers: 150 },
  { year: "2023", companies: 85, offers: 210 },
  { year: "2024", companies: 95, offers: 320 },
  { year: "2025", companies: 110, offers: 410 },
  { year: "2026", companies: 130, offers: 550 },
];

const chartConfig = {
  companies: {
    label: "No. of companies",
    color: "var(--chart-2)",
  },
  offers: {
    label: "Companies Offering",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function DottedMultiLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Placement Trajectory
          <Badge
            variant="outline"
            className="text-green-500 bg-green-500/10 border-none ml-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span>+33.5%</span>
          </Badge>
        </CardTitle>
        <CardDescription>2022 - 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="companies"
              type="linear"
              stroke="var(--color-companies)"
              dot={false}
              strokeDasharray="4 4"
            />
            <Line dataKey="offers" type="linear" stroke="var(--color-offers)" />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
