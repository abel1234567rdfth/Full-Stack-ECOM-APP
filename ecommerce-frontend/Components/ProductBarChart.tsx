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
  { month: "January", desktop: 200, mobile: 80 },
  { month: "February", desktop: 50, mobile: 50 },
  { month: "March", desktop: 90, mobile: 190 },
  { month: "April", desktop: 20, mobile: 120 },
  { month: "May", desktop: 170, mobile: 230 },
  { month: "June", desktop: 88, mobile: 40 },
];

const chartConfig = {
  desktop: {
    label: "Gadgets",
    color: "#067",
  },
  mobile: {
    label: "Wearables",
    color: "#e6e6e6",
  },
} satisfies ChartConfig;

export function ProductBarChartComponent() {
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
