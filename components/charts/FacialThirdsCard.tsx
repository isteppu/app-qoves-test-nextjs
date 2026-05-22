'use client';

import React, { useState } from 'react';
import styles from './css/FacialThirdsChart.module.scss';

export default function FacialThirdsChart() {
  const [isAltered, setIsAltered] = useState(false);

  const lowerThird = isAltered ? 0.50 : 0.31;
  const middleThird = isAltered ? 0.25 : 0.38;
  const upperThird = isAltered ? 0.25 : 0.31;

  return (
    <div 
      onMouseEnter={() => setIsAltered(true)}
      onMouseLeave={() => setIsAltered(false)}
    >
      <div className={styles.cardHeader}>FACIAL THIRDS</div>

      <div className={styles.segmentWorkspace}>
        
        <div className={styles.labelRowTop}>
          <div style={{ width: `${lowerThird * 100}%` }} className={styles.textAnchorCenter}>
            LOWER THIRD [C]
          </div>
          <div style={{ width: `${middleThird * 100}%` }} className={styles.textAnchorCenter}>
            MIDDLE THIRD [B]
          </div>
          <div style={{ width: `${upperThird * 100}%` }} className={styles.textAnchorCenter}>
            UPPER THIRD [A]
          </div>
        </div>

        <div className={styles.segmentedProgressBar}>
          <div 
            className={`${styles.barSegment} ${styles.segmentDark}`} 
            style={{ width: `${lowerThird * 100}%` }} 
          />
          <div 
            className={`${styles.barSegment} ${styles.segmentMedium}`} 
            style={{ width: `${middleThird * 100}%` }} 
          />
          <div 
            className={`${styles.barSegment} ${styles.segmentLight}`} 
            style={{ width: `${upperThird * 100}%` }} 
          />
        </div>

        <div className={styles.labelRowBottom}>
          <div style={{ width: `${lowerThird * 100}%` }} className={styles.valueAnchor}>
            {lowerThird.toFixed(2)}
          </div>
          <div style={{ width: `${middleThird * 100}%` }} className={styles.valueAnchor}>
            {middleThird.toFixed(2)}
          </div>
          <div style={{ width: `${upperThird * 100}%` }} className={styles.valueAnchor}>
            {upperThird.toFixed(2)}
          </div>
        </div>

      </div>
    </div>
  );
}