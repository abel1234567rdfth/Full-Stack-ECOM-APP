"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

export const description = "A simple pie chart";

const chartData = [
  { browser: "chrome", Users: 275, fill: "var(--color-chrome)" },
  { browser: "safari", Users: 200, fill: "var(--color-safari)" },
  { browser: "firefox", Users: 187, fill: "var(--color-firefox)" },
  { browser: "edge", Users: 173, fill: "var(--color-edge)" },
  { browser: "other", Users: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  Users: {
    label: "Users",
  },
  chrome: {
    label: "16-18",
    color: "var(--chart-1)",
  },
  safari: {
    label: "18-25",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "25-30",
    color: "var(--chart-3)",
  },
  edge: {
    label: "30-45",
    color: "var(--chart-4)",
  },
  other: {
    label: "45+",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ProductPieChart() {
  return (
    <Card className="flex flex-col w-[50%]">
      <CardHeader className="items-center pb-0">
        <CardTitle></CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="Users" nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total Users for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
