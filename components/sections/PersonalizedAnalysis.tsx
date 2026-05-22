"use client"
import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { useAnalysisAnimations } from '@/app/hooks/useAnimations'
import { ANIMATED_VECTOR_PATH, ANALYSIS_STEPS, ANIMATED_VECTOR_TAIL } from '@/utils'
import styles from './css/PersonalizedAnalysis.module.scss'

const PersonalizedAnalysis = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(2);

  useAnalysisAnimations(containerRef, styles);

  return (
    <section ref={containerRef} className={styles.sectionWrapper}>
      <div className={styles.gridOverlay}>
        <div className={styles.gridContainer}>
          <div className={styles.horizontalLine} />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.headerBlock}>
          <span className={styles.badge}>Personalized Analysis</span>
          <h2 className={styles.title}>
            Get your personalised <span>Qoves plan</span>
          </h2>
          <p className={styles.subtitle}>
            Understand your facial features and start your glow-up today<br />
            with a proven action plan, no plastic surgery needed.
          </p>
        </div>

        <div className={styles.showcaseWrapper} style={{ position: 'relative' }}>
          <svg
            className={styles.vectorOverlay}
            viewBox="0 0 1330 524"
            fill='black'
            preserveAspectRatio="none"
          >

            <defs>
              <linearGradient id="comet-fade" gradientUnits="userSpaceOnUse">
                <stop offset="100%" stopColor="#CDDBE1" />
                <stop offset="100%" stopColor="#869AA1" />
              </linearGradient>
            </defs>

            <path
              className="track-path"
              d={ANIMATED_VECTOR_PATH}
              stroke="#D7E5EB"
              strokeWidth="1"
              fill="none"
            />

            {/* 2. Comet 1 Tail (1.5px fading stroke) */}
            <path
              className="tail-1"
              d={ANIMATED_VECTOR_PATH}
              stroke="url(#comet-fade)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* 3. Comet 2 Tail (1.5px fading stroke) */}
            <path
              className="tail-2"
              d={ANIMATED_VECTOR_PATH}
              stroke="url(#comet-fade)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* 4. Mini Square Heads (6x6px squares with slight 1px radius cornering) */}
            <rect className="head-1" width="6" height="6" fill="#869AA1" rx="1" style={{ opacity: 0 }} />
            <rect className="head-2" width="6" height="6" fill="#869AA1" rx="1" style={{ opacity: 0 }} />
          </svg>

          <div className={styles.showcaseGrid}>
            <div className={`${styles.visualCard} ${styles.beforeCard}`}>
              <span className={styles.cardLabel}>Before</span>
              <div className={styles.imagePlaceholder}>
                <Image
                  src="/assets/profile1.png"
                  alt="Facial Analysis Before"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                />
              </div>
            </div>
            <div className={styles.connectorSpacer}></div>
            <div className={`${styles.visualCard} ${styles.afterCard}`}>
              <span className={styles.cardLabel}>After</span>
              <div className={styles.imagePlaceholder}>
                <Image
                  src="/assets/profile2.png"
                  alt="Facial Analysis After"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.stepsRow}>
          {ANALYSIS_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={styles.stepCard}
            >
              <span className={styles.stepNumber}>{step.id}</span>
              <p className={styles.stepText}>{step.text}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PersonalizedAnalysis