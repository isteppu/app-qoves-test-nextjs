'use client';

import React, { useMemo, useState } from 'react';
import styles from './css/SymmetryChart.module.scss';

export default function SymmetryChart() {
  const [isReordered, setIsReordered] = useState(false);

  const metrics ={
      ideal: isReordered ? 92 : 86,
      you: isReordered ? 65 : 82,
      average: isReordered ? 42 : 60,
  }

  return (
    <div
      onMouseEnter={() =>  setIsReordered(true)}
      onMouseLeave={() => setIsReordered(false)}
    >
      <div className={styles.graphBoundaryArena}>

        {/* Background Canvas: 10 Vertical Alignment Grid Wires */}
        <div className={styles.verticalGridContainer}>
          {Array.from({ length: 11 }).map((_, idx) => (
            <div key={idx} className={styles.gridLineWire} />
          ))}
        </div>

        {/* Data Layer: The Horizontal Analysis Rows */}
        <div className={styles.rowsDataLayer}>

          {/* Row 1: IDEAL */}
          <div className={styles.metricRow}>
            <div className={styles.vectorTrackContainer}>
              <div className={styles.solidLineFill1} style={{ width: `${metrics.ideal}%` }} />
              <div className={styles.badgePillAnchor} style={{ left: `${metrics.ideal}%` }}>
                <div className={styles.badgePill}><span className={styles.tokenSquare} style={{ backgroundColor: '#CDDBE1' }} />IDEAL</div>
              </div>
            </div>
          </div>

          {/* Row 2: YOU */}
          <div className={styles.metricRow}>
            <div className={styles.vectorTrackContainer}>
              <div className={styles.solidLineFill2} style={{ width: `${metrics.you}%` }} />
              <div className={styles.badgePillAnchor} style={{ left: `${metrics.you}%` }}>
                <div className={styles.badgePill}><span className={styles.tokenSquare} style={{ backgroundColor: '#9AAEB5' }} />YOU</div>
              </div>
            </div>
          </div>

          {/* Row 3: AVERAGE */}
          <div className={styles.metricRow}>
            <div className={styles.vectorTrackContainer}>
              <div className={styles.solidLineFill3} style={{ width: `${metrics.average}%` }} />
              <div className={styles.badgePillAnchor} style={{ left: `${metrics.average}%` }}>
                <div className={styles.badgePill}><span className={styles.tokenSquare} style={{ backgroundColor: '#5D767E' }} />AVERAGE</div>
              </div>
            </div>
          </div>

        </div>

        {/* Baseline Axis Typography Labels */}
        <div className={styles.axisLabelRow}>
          <span className={styles.axisLabel}>ASYMMETRICAL</span>
          <span className={`${styles.axisLabel} ${styles.blurLabel}`}>SYMMETRICAL</span>
        </div>

      </div>
    </div>
  );
}