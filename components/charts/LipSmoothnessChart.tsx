'use client';

import React, { useState, useEffect } from 'react';
import styles from './LipSmoothnessChart.module.scss';

export default function LipSmoothnessChart() {
  const [isToggled, setIsToggled] = useState(false);
  const [displayValue, setDisplayValue] = useState(56);

  const targetValue = isToggled ? 15 : 56;

  useEffect(() => {
    if (displayValue === targetValue) return;

    const step = targetValue > displayValue ? 1 : -1;
    const timer = setTimeout(() => {
      setDisplayValue((prev) => prev + step);
    }, 12);

    return () => clearTimeout(timer);
  }, [displayValue, targetValue]);

  return (
    <div
      onMouseEnter={() => setIsToggled(true)}
      onMouseLeave={() => setIsToggled(false)}
    >
      <div className={styles.cardHeader}>LIP SMOOTHNESS</div>

      <div className={styles.bigPercentage}>{displayValue}%</div>

      <div className={styles.sliderWorkspace}>

        <div className={styles.labelRow}>
          <span className={styles.staticLabel}>Rough <span className={styles.dim}>(0%)</span></span>

          <div
            className={styles.floatingPill}
            style={{ left: `${targetValue}%` }}
          >
            {displayValue}% (You)
          </div>

          <span className={styles.staticLabelRight}>Smooth <span className={styles.dim}>(100%)</span></span>
        </div>

        <div className={styles.trackContainer}>

          <div className={styles.baseTrack}>
            <div
              className={styles.trackFill}
              style={{ width: `${targetValue}%` }}
            />
          </div>

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