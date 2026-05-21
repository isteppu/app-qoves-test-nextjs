'use client';

import React, { useState, useEffect } from 'react';
import styles from './css/LipSmoothnessChart.module.scss';

interface LipSmoothnessChartProps {
  className?: string;
}

export default function LipSmoothnessChart({ className }: LipSmoothnessChartProps) {
  // false = 56% (Default), true = 15% (Clicked State)
  const [isToggled, setIsToggled] = useState(false);
  const [displayValue, setDisplayValue] = useState(56);

  const targetValue = isToggled ? 15 : 56;

  // Smooth number ticker animation
  useEffect(() => {
    if (displayValue === targetValue) return;

    const step = targetValue > displayValue ? 1 : -1;
    const timer = setTimeout(() => {
      setDisplayValue((prev) => prev + step);
    }, 12); // Speed of the number countdown/countup

    return () => clearTimeout(timer);
  }, [displayValue, targetValue]);

  return (
    <div 
      onMouseEnter={() => setIsToggled(true)}
      onMouseLeave={() => setIsToggled(false)}
    >
      <div className={styles.cardHeader}>LIP SMOOTHNESS</div>
      
      {/* Animated Big Percentage Display */}
      <div className={styles.bigPercentage}>{displayValue}%</div>

      <div className={styles.sliderWorkspace}>
        
        {/* Floating Indicator Labels */}
        <div className={styles.labelRow}>
          <span className={styles.staticLabel}>Rough <span className={styles.dim}>(0%)</span></span>
          
          {/* This pill floats dynamically across the top of the bar */}
          <div 
            className={styles.floatingPill} 
            style={{ left: `${targetValue}%` }}
          >
            {displayValue}% (You)
          </div>

          <span className={styles.staticLabelRight}>Smooth <span className={styles.dim}>(100%)</span></span>
        </div>

        {/* The Progress Bar Tracker Arena */}
        <div className={styles.trackContainer}>
          
          {/* The base track line */}
          <div className={styles.baseTrack}>
            {/* The horizontal filling progress line */}
            <div 
              className={styles.trackFill} 
              style={{ width: `${targetValue}%` }}
            />
          </div>

          {/* The Vertical Dashed Pointer Line */}
          <div 
            className={styles.dashedDivider} 
            style={{ left: `${targetValue}%` }}
          >
            <div className={styles.topArrow} />
            <div className={styles.bottomIndicator} />
          </div>

        </div>
      </div>
    </div>
  );
}