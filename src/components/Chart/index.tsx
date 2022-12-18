import React from "react";
import "./style.css";

import {
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianAxis,
} from "recharts";

interface ChartProps {
  data: {
    name: string;
    year: number;
    anime: string;
  }[];
}
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: any;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    console.log("payload", payload[0].payload);
    return (
      <div className="custom-tooltip">
        <p className="label">{label ? label : "No Year Specified"}</p>
        <p className="titles">
          {data.titles.map((item: string, index: number) => (
            <span className="title" key={index}>
              {item}
            </span>
          ))}
        </p>
      </div>
    );
  }

  return null;
};

export const Chart = ({ data }: ChartProps) => {
  return (
    <ResponsiveContainer minWidth={600} height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="year" />
        <YAxis dataKey="animes" />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid strokeDasharray="4" />
        <Area
          type="monotone"
          dataKey="animes"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          dot
          type="monotone"
          dataKey="titles"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
