'use client';

import React, { useState } from 'react';
import styles from './css/MelaninSpectrumChart.module.scss';

export default function MelaninSpectrumCard() {
  // false = Dark Brown (Default index 13), true = Deep espresso (Clicked State index 18)
  const [isShifted, setIsShifted] = useState(false);

  // The exact progression of discrete color blocks from top to bottom seen in your image
  const spectrumColors = [
    '#ACD6DA', '#D4E7F4', '#698DB5', '#6C97C0', '#91AEC4', // Blue tones
    '#ADB291', '#252F38', '#4E676E', '#72736D', '#7E9F9A', // Grey/Green transitions
    '#292D39', '#988155', '#A58345', '#C6A363', '#624934', // Khaki/Amber steps
    '#AA886C', '#B9805B', '#BB956E', '#775A38', '#814642', // Brown / Dark Brown
    '#8B5644', '#B06045', '#170C08', '#482F33', '#5A3139',
    '#5C4A56'
  ];

  const activeIndex = isShifted ? 2 : 14; // Index positions matching your data lines
  const activeColor = spectrumColors[activeIndex];
  const activeLabel = isShifted ? 'LIGHT' : 'DARK BROWN';

  // Calculate percentage dynamically based on index position to drive crosshair positions
  const topPercentage = `${(activeIndex / (spectrumColors.length - 1)) * 100}%`;

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
            {spectrumColors.map((color, idx) => (
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