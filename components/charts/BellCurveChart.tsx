"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
} from "recharts";
import styles from "./BellCurveChart.module.scss";
import gsap from "gsap";

const X_DOMAIN: [number, number] = [-32, 32];

const X_TICKS = [-32, -24, -16, -8, 0, 8, 16, 24, 32];
const Y_TICKS = [0, 10, 20, 30, 40, 50, 60, 70];


export default function BellCurveChart() {
    const [bellActive, setBellActive] = useState(false);
  
    const bellActiveRef = useRef(false);
    const valuesRef = useRef({ x: 16, y: 60 });
  
    const sizeRef = useRef({ width: 0, height: 0 });
    const clipRef = useRef<SVGRectElement | null>(null);
  
    const threshValue = useRef({ x: 0 });
    const isAnimating = useRef(false);
    const hasInit = useRef(false);

  
  const dataToPixel = (dataX: number, width: number) => {
    return ((dataX - X_DOMAIN[0]) / (X_DOMAIN[1] - X_DOMAIN[0])) * width;
  };

  const updateClip = () => {
    if (!clipRef.current) return;
    clipRef.current.setAttribute("x", String(threshValue.current.x));
    clipRef.current.setAttribute(
      "width",
      String(sizeRef.current.width - threshValue.current.x)
    );
  };

  const onResize = (width: number, height: number) => {
    sizeRef.current = { width, height };
    if (!clipRef.current) return;
    if (!hasInit.current) {
      threshValue.current.x = dataToPixel(16, width);
      updateClip();
      hasInit.current = true;
      return;
    }

    if (isAnimating.current) return;

    threshValue.current.x = dataToPixel(
      bellActiveRef.current ? -10 : 16,
      width
    );
    updateClip();
  };

  const animateToThresh = (dataX: number, dataY: number) => {
    if (!clipRef.current || sizeRef.current.width === 0) return;

    isAnimating.current = true;
    gsap.killTweensOf(threshValue.current);

    gsap.to(threshValue.current, {
      x: dataToPixel(dataX, sizeRef.current.width),
      y: dataToPixel(dataY, sizeRef.current.height),
      duration: 0.85,
      ease: "power2.inOut",
      onUpdate: updateClip,
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  };

  const onClickBellChart = (i: boolean) => {
    const next = i;
    bellActiveRef.current = next;
    valuesRef.current = { x: valuesRef.current.x === 16 ? -10 : 16, y: valuesRef.current.y === 60 ? 30 : 60 };
    setBellActive(next);
    animateToThresh(next ? -10 : 16, next ? 60 : 30);
  };

  const chartData = useMemo(
    () =>
      Array.from({ length: 65 }, (_, i) => {
        const fx = i - 32;
        const fy = Math.exp(-(fx * fx) / 180) * valuesRef.current.y;
        return { x: fx, y: fy, shadedY: fy };
      }),
    [valuesRef.current.y]
  );

  const dashLineData = useMemo(
    () => [
      { x: valuesRef.current.x, y: 0 },
      { x: valuesRef.current.x, y: 70 },
    ],
    [valuesRef.current]
  );

  return (
    <div className={styles.chartWrapper} onMouseEnter={() => onClickBellChart(true)} onMouseLeave={() => { onClickBellChart(false) }}>
      <ResponsiveContainer width="100%" height="100%" onResize={onResize}>
        <AreaChart data={chartData}>
          <defs>
            <clipPath id="tail-clip">
              <rect
                ref={clipRef}
                x={0}
                y={-1000}
                width={0}
                height={2000}
              />
            </clipPath>
          </defs>

          <CartesianGrid
            stroke="rgba(255,255,255,0.18)"
            strokeDasharray="3 3"
          />

          <XAxis type="number" dataKey="x" domain={[-32, 32]} ticks={X_TICKS} hide />
          <YAxis type="number" domain={[0, 70]} ticks={Y_TICKS} tickCount={8} interval={0} hide />

          <Area
            type="monotone"
            dataKey="shadedY"
            stroke="none"
            fill="rgba(255,255,255,0.15)"
            clipPath="url(#tail-clip)"
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey="y"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={1}
            dot={false}
            activeDot={false}
            isAnimationActive={true}
          />

          <Line
            data={dashLineData}
            dataKey="y"
            stroke="rgba(255,255,255,0.25)"
            strokeDasharray="3 3"
            dot={false}
            isAnimationActive={true}
          />

          <ReferenceDot
            x={valuesRef.current.x}
            y={Math.exp(-(valuesRef.current.x * valuesRef.current.x) / 180) * valuesRef.current.y}
            r={4}
            fill="#6ba4be"
            stroke="none"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className={styles.axisTimeline}>
        {[
          { label: "LOW DENSITY", sq: [styles.sq1] },
          { label: "MEDIUM DENSITY", sq: [styles.sq2] },
          { label: "HIGH DENSITY", sq: [styles.sq3, styles.sq4] },
        ].map(({ label, sq }) => (
          <div key={label} className={styles.labelGroup}>
            {label === "HIGH DENSITY" && sq.map(s => <div key={s} className={`${styles.squareIndicator} ${s}`} />)}
            <span className={styles.axisLabel}>{label}</span>
            {label !== "HIGH DENSITY" && sq.map(s => <div key={s} className={`${styles.squareIndicator} ${s}`} />)}
          </div>
        ))}
      </div>

      <div className={styles.cardFooterTextAlt}>
        <p>Your eyebrow density is in the mid 40th percentile</p>
      </div>
    </div>
  );
}