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
              <linearGradient id="tailGradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="70%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              className="track-path"
              d={ANIMATED_VECTOR_PATH}
              stroke="#D7E5EB"
              fill="none"
            />

            <path
              className="animated-tail"
              d={ANIMATED_VECTOR_PATH}
              stroke={ANIMATED_VECTOR_TAIL.stroke}
              strokeWidth={ANIMATED_VECTOR_TAIL.strokeWidth}
              fill="none"
              strokeLinecap="square"
              strokeLinejoin="round"
            />

            {/* <path
              className="animated-tail"
              d={ANIMATED_VECTOR_PATH}
              stroke={ANIMATED_VECTOR_TAIL.stroke}
              strokeWidth={ANIMATED_VECTOR_TAIL.strokeWidth}
              fill="none"
              strokeLinecap="square"
              strokeLinejoin="round"
            /> */}

            <rect
              className="progress-head"
              width="10"
              height="10"
              fill="#4b5563"
              rx="2"
              style={{ opacity: 0 }}
            />

            {/* <path
              className="animated-tail"
              d={ANIMATED_VECTOR_PATH}
              stroke="url(#comet-fade)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="square"
              strokeLinejoin="round"
            /> */}
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