'use client';

import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine
} from 'recharts';
import styles from './css/BellCurveChart.module.scss';


export default function BellCurveChart({ isActive }: { isActive: boolean }) {
  const xTicks = [-32, -24, -16, -8, 0, 8, 16, 24, 32];
  const yTicks = [0, 10, 20, 30, 40, 50, 60, 70];

  const chartData = useMemo(() => {
    // Determine where the shading starts (16 for normal tail, 0 for the exact middle)
    const shadingThreshold = isActive ? -10 : 16;

    return Array.from({ length: 65 }, (_, i) => {
      const x = i - 32;
      // Smooth bell curve formula
      const y = Math.exp(-(x * x) / 180) * 60;

      return {
        x,
        y,
        // Dynamically append shading values based on the threshold
        shadedY: x >= shadingThreshold ? y : 0
      };
    });
  }, [isActive]);

  return (
    <div className={styles.chartWrapper}>

      {/* 1. The Recharts Graphical Container */}
      <div className={styles.graphArea}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0 }} width={'100%'}>

            {/* Background Grid Pattern */}
            <CartesianGrid
              stroke="rgba(255, 255, 255, 0.18)"
              vertical={true}
              horizontal={true}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="x"
              type="number"
              domain={[-32, 32]}
              ticks={xTicks}
              hide
            />
            <YAxis
              type="number"
              domain={[0, 70]}
              tickCount={8}
              ticks={yTicks}
              interval={0}
              minTickGap={0}
              hide
            />

            {/* Selective Shaded Tail Area */}
            <Area
              type="monotone"
              dataKey="shadedY"
              stroke="none"
              fill="rgba(255, 255, 255, 0.15)"
              connectNulls={false}
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-in-out"
            />

            {/* Main Crisp White Bell Curve Path */}
            <Line
              type="monotone"
              dataKey="y"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth={1}
              dot={false}
              activeDot={false}
              isAnimationActive
              animationDuration={600}
              animationEasing="ease-in-out"
            />

            <Line
              data={[
                { x: isActive ? -10 : 16, y: 0 },
                { x: isActive ? -10 : 16, y: 70 },
              ]}
              dataKey="y"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeDasharray="3 3"
              isAnimationActive
              animationDuration={600}
              animationEasing="ease-in-out"
              dot={false}
            />

            {/* Three anchor dots across the path */}
            <ReferenceDot x={-29} y={2} r={3} fill="rgba(255,255,255,0.4)" stroke="none" />
            <ReferenceDot x={12} y={36} r={4} fill="#6ba4be" stroke="none" /> {/* Active User Indicator */}
            <ReferenceDot x={29} y={2} r={3} fill="rgba(255,255,255,0.8)" stroke="none" />

          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 2. The Timeline Axis & Square Metrics */}
      <div className={styles.axisTimeline}>
        <div className={styles.labelGroup}>
          <span className={styles.axisLabel}>LOW DENSITY</span>
          <div className={`${styles.squareIndicator} ${styles.sq1}`} />
        </div>

        <div className={styles.labelGroup}>
          <span className={styles.axisLabel}>MEDIUM DENSITY</span>
          <div className={`${styles.squareIndicator} ${styles.sq2}`} />
        </div>

        <div className={styles.labelGroup}>
          <div className={`${styles.squareIndicator} ${styles.sq3}`} />
          <div className={`${styles.squareIndicator} ${styles.sq4}`} />
          <span className={styles.axisLabel}>HIGH DENSITY</span>
        </div>
      </div>

      <div className={styles.cardFooterText}>
        <p>Your eyebrow density is in the mid 40th percentile</p>
      </div>
    </div>
  );
}