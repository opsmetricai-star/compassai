"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function UsageChart({ data }: { data: { day: string; credits: number }[] }) {
  return (
    <div className="mt-4 h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} stroke="#e4e4e4" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="#727272" />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} stroke="#727272" width={28} />
          <Tooltip cursor={{ fill: "#f5f5ff" }} />
          <Bar dataKey="credits" fill="#343ced" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
