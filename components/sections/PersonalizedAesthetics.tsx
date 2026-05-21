'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './css/PersonalizedAesthetic.module.scss';
import { useAestheticAnimations } from '@/app/hooks/useAnimations';
import Charts from '../charts/Charts';

export default function PersonalizedAesthetics() {
  const containerRef = useRef<HTMLElement>(null);
  useAestheticAnimations(containerRef, styles)

  return (
    <section id="aesthetic-section" className={styles.sectionWrapper} ref={containerRef}>
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

      <div className={styles.arena}>
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

        <Charts containerClass={styles.glassCard} />

      </div>
    </section>
  );
}