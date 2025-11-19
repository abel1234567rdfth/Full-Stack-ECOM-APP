"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartData = [
  { month: "January", desktop: 400, mobile: 350 },
  { month: "February", desktop: 600, mobile: 350 },
  { month: "March", desktop: 200, mobile: 300 },
  { month: "April", desktop: 400, mobile: 600 },
  { month: "May", desktop: 210, mobile: 280 },
  { month: "June", desktop: 50, mobile: 160 },
];

const chartConfig = {
  desktop: {
    label: "Foreign",
    color: "#067",
  },
  mobile: {
    label: "Local",
    color: "#e6e6e6",
  },
} satisfies ChartConfig;

export function OrderBarChartComponent() {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-[50%]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
