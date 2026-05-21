"use client"

import React, { useRef, useState, useLayoutEffect } from "react";
import BellCurveChart from "./BellCurveChart";
import MatrixChart from "./MatrixChart";
import styles from "./css/Charts.module.scss";
import gsap from "gsap";
import LipSmoothnessChart from "./LipSmoothnessChart";
import MelaninSpectrumChart from "./MelaninSpectrumChart";
import FacialThirdsChart from "./FacialThirdsCard";
import SymmetryChart from "./SymmetryChart";

const X_DOMAIN: [number, number] = [-32, 32];

const Charts = ({ containerClass }: { containerClass: string }) => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [bellActive, setBellActive] = useState(false);

  const bellActiveRef = useRef(false);

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

    // initialize once after Recharts mounts
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

  const animateToThresh = (dataX: number) => {
    if (!clipRef.current || sizeRef.current.width === 0) return;

    isAnimating.current = true;
    gsap.killTweensOf(threshValue.current);

    gsap.to(threshValue.current, {
      x: dataToPixel(dataX, sizeRef.current.width),
      duration: 0.85,
      ease: "power2.inOut",
      onUpdate: updateClip,
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  };

  const onClickBellChart = () => {
    const next = !bellActiveRef.current;
    bellActiveRef.current = next;

    setHoveredCard(next ? 2 : null);

    // 🔑 START BOTH ANIMATIONS TOGETHER
    setBellActive(next);
    animateToThresh(next ? -10 : 16);
  };

  const getCardClasses = (id: number) => {
    let cls = `${containerClass} ${styles[`card${id}`]}`;
    return cls;
  };

  const hoverProps = (id: number) => ({
    onMouseEnter: () => setHoveredCard(id),
    onMouseLeave: () => setHoveredCard(null),
  });

  return (
    <div>
      <div className={getCardClasses(1)} {...hoverProps(1)}>
        <MatrixChart isHovered={hoveredCard === 1} />
      </div>
      <div className={getCardClasses(2)} onClick={onClickBellChart}>
        <BellCurveChart />
      </div>

      <div className={getCardClasses(3)} {...hoverProps(3)}>
        <LipSmoothnessChart />
      </div>

      <div className={getCardClasses(4)} {...hoverProps(4)}>
        <MelaninSpectrumChart />
      </div>

      <div className={getCardClasses(5)} {...hoverProps(5)}>
        <FacialThirdsChart />
      </div>

      <div className={getCardClasses(6)} {...hoverProps(6)}>
        <SymmetryChart />
      </div>
    </div>
  );
};

export default Charts;