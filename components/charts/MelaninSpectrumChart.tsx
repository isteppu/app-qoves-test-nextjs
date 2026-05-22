'use client';

import React, { useState } from 'react';
import styles from './css/MelaninSpectrumChart.module.scss';
import { SPECTRUM_COLORS } from '@/utils';

export default function MelaninSpectrumCard() {
  const [isShifted, setIsShifted] = useState(false);

  const activeIndex = isShifted ? 2 : 14;
  const activeColor = SPECTRUM_COLORS[activeIndex];
  const activeLabel = isShifted ? 'LIGHT' : 'DARK BROWN';

  const topPercentage = `${(activeIndex / (SPECTRUM_COLORS.length - 1)) * 100}%`;

  return (
    <div 
      onMouseEnter={() => setIsShifted(true)}
      onMouseLeave={() => setIsShifted(false)}
    >
      <div className={styles.cardHeader}>MELANIN CONCENTRATION</div>

      <div className={styles.spectrumWorkspace}>
        
        {/* Static Section Text Labels alongside the blocks */}
        <div className={styles.staticGuide} style={{ top: '8%' }}>
          <span className={styles.guideLine}></span>
          <span className={styles.guideText}>Blue</span>
        </div>
        
        <div className={styles.staticGuide} style={{ top: '30%', left: '30%' }}>
          <span className={styles.guideText}>Green</span>
          <span className={styles.guideLine}></span>
        </div>

        <div className={styles.staticGuide} style={{ top: '50%' }}>
          <span className={styles.guideLine}></span>
          <span className={styles.guideText}>Brown</span>
        </div>

        <div className={styles.staticGuide} style={{ top: '70%', left: '30%' }}>
          <span className={styles.guideText}>Deep</span>
          <span className={styles.guideLine}></span>
        </div>

        {/* The Track Container holding individual boxes */}
        <div className={styles.verticalBarContainer}>
          <div className={styles.colorBarContainer}>
            {SPECTRUM_COLORS.map((color, idx) => (
              <div 
                key={idx}
                className={styles.colorTile}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          {/* Active indicator ring that snaps directly over the selected colored box */}
          <div 
            className={styles.activeHighlightFrame} 
            style={{ top: topPercentage }}
          />
        </div>

        {/* Dynamic Crosshair matching the targeted box layer */}
        <div 
          className={styles.crosshairContainer} 
          style={{ top: topPercentage }}
        >
          {/* Left Side: Solid Palette Token + Label */}
          <div className={styles.colorBadge}>
            <span 
              className={styles.colorSquare} 
              style={{ backgroundColor: activeColor }}
            />
            {activeLabel}
          </div>

          {/* Crosshair Center Wire */}
          <div className={styles.horizontalDashedLine} />

          {/* Right Side User Flag */}
          <div className={styles.youPill}>YOU</div>
        </div>

      </div>

      <p className={styles.cardFooterTextAlt}>
        You have a <span>high melanin</span> concentration.
      </p>
    </div>
  );
}