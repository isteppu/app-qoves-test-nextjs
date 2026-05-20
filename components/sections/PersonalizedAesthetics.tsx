'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import BellCurveChart from '../charts/BellCurveChart';
import MatrixChart from '../charts/MatrixChart';
import styles from './css/PersonalizedAesthetic.module.scss';
import { useAestheticAnimations } from '@/app/hooks/useAnimations';

export default function PersonalizedAesthetics() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useAestheticAnimations(containerRef, styles)

  const getCardClasses = (cardId: number) => {
    let classes = `${styles.glassCard} ${styles[`card${cardId}`]}`;
    if (hoveredCard !== null) {
      if (hoveredCard === cardId) {
        classes += ` ${styles.isHovered}`;
      } else {
        classes += ` ${styles.isDimmed}`;
      }
    }
    return classes;
  };

  return (
    <section id="aesthetic-section" className={styles.sectionWrapper} ref={containerRef}>
      {/* Header */}
      <div className={styles.headerBlock}>
        <span className={styles.badge}>PERSONALIZED AESTHETICS</span>
        <h2 className={styles.title}>
          Your complete <span>facial analysis</span>
        </h2>
        <p className={styles.subtitle}>
          Every face is unique. We assess more than 100 unique facial markers to<br />
          give you a precise understanding of your aesthetics.
        </p>
      </div>

      {/* Main Visual Arena */}
      <div className={styles.arena}>

        {/* Central Subject Image */}
        <div className={styles.subjectWrapper}>
          <div className={styles.parallaxSubject}>
            <Image
              src="/assets/profile3.png"
              alt="Facial Analysis Subject"
              fill
              priority
            />
            <div className={styles.glowBehind}></div>
          </div>
        </div>

        {/* CARD 1: Matrix Grid Analysis */}
        <div
          className={getCardClasses(1)}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <MatrixChart isHovered={hoveredCard === 1} />
        </div>

        {/* CARD 2: Recharts Bell Curve */}
        <div
          className={getCardClasses(2)}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={styles.chartContainer}>
            <BellCurveChart isActive={hoveredCard === 2} />
          </div>
          <div className={styles.chartXAxis}>
            <span>LOW DENSITY</span>
            <span>AVERAGE DENSITY</span>
            <span>HIGH DENSITY</span>
          </div>
          <p className={styles.cardFooterTextAlt}>Your eyebrow density is in the mid 40th percentile</p>
        </div>

        {/* CARD 3: Percentage & Slider */}
        <div
          className={getCardClasses(3)}
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={styles.cardHeader}>LIP SWEETNESS</div>
          <div className={styles.bigPercentage}>56%</div>
          <div className={styles.sliderContainer}>
            <div className={styles.sliderTrack}>
              <div className={styles.sliderFill} style={{ width: '56%' }}></div>
              <div className={styles.sliderThumb} style={{ left: '56%' }}></div>
            </div>
            <div className={styles.sliderLabels}>
              <span>Rough (0%)</span>
              <span>Smooth (100%)</span>
            </div>
          </div>
        </div>

        {/* CARD 4: Vertical Color Spectrum */}
        <div
          className={getCardClasses(4)}
          onMouseEnter={() => setHoveredCard(4)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={styles.spectrumContainer}>
            <div className={styles.spectrumBar}></div>
            <div className={styles.spectrumTarget} style={{ top: '65%' }}>
              <span className={styles.targetLabel}>DARK BROWN</span>
            </div>
          </div>
          <p className={styles.cardFooterText}>You have a medium melanin concentration.</p>
        </div>

        {/* CARD 5: Horizontal Symmetry Metrics */}
        <div
          className={getCardClasses(5)}
          onMouseEnter={() => setHoveredCard(5)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={styles.cardHeader}>FACIAL THIRDS</div>

          <div className={styles.thirdsContainer}>
            <div className={styles.thirdBar}>
              <span className={styles.barLabel}>LOWER THIRD [C]</span>
              <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '31%' }}>0.31</div></div>
            </div>
            <div className={styles.thirdBar}>
              <span className={styles.barLabel}>MIDDLE THIRD [B]</span>
              <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '33%' }}>0.33</div></div>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.symmetryContainer}>
            <div className={styles.symLabels}>
              <span>ASYMMETRICAL</span>
              <span>SYMMETRICAL</span>
            </div>

            {/* Symmetry Lines */}
            {[85, 92, 50].map((val, idx) => (
              <div key={idx} className={styles.symLine}>
                <div className={styles.symDot} style={{ left: `${val}%` }}>
                  {idx === 2 && <span className={styles.symDotLabel}>AVERAGE</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}