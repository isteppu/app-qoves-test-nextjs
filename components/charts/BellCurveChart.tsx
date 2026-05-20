'use client';

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from 'recharts';

// Generate mock normal distribution data
const data = Array.from({ length: 50 }, (_, i) => {
  const x = i - 25;
  // Basic bell curve math formula implementation
  const y = Math.exp(-(x * x) / 100) * 100; 
  return { x, y };
});

export default function BellCurveChart({ isActive }: { isActive: boolean }) {
  const [percentage, setPercentage] = useState(56);

  // Simulating the number tick-up animation seen in your video when hovered
  useEffect(() => {
    if (isActive) {
      setPercentage(15);
      const timer = setTimeout(() => setPercentage(79), 300);
      return () => clearTimeout(timer);
    } else {
      setPercentage(56);
    }
  }, [isActive]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ height: '120px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="x" hide />
            <YAxis hide domain={[0, 120]} />
            <Area 
              type="monotone" 
              dataKey="y" 
              stroke="#ffffff" 
              fillOpacity={1} 
              fill="url(#colorY)" 
              strokeWidth={2}
            />
            {/* The dot on the curve */}
            <ReferenceDot x={5} y={77} r={4} fill="#ffffff" stroke="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* The big number at the bottom */}
      <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 'auto' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 300, color: '#fff' }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}