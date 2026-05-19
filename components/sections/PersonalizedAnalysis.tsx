"use client"
import React, { useRef, useState } from 'react'
import { useAnimations } from '@/app/hooks/useAnimations'
import styles from './PersonalizedAnalysis.module.scss'


const stepsData: StepItem[] = [
  { id: 1, text: 'Get your expert facial analysis' },
  { id: 2, text: 'Visualise your best looking self' },
  { id: 3, text: 'Get your personalized glow-up protocol' },
  { id: 4, text: 'Track your progress and see dramatic results' },
];


const PersonalizedAnalysis = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(2);

  useAnimations(containerRef, styles);

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
          <svg viewBox="0 0 1330 524" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="black" />
          </svg>

          <svg
            className={styles.vectorOverlay}
            viewBox="0 0 1330 524"
            preserveAspectRatio="none"
          >
            <path
              d="M447.443 0.5H15.5C7.19329 0.5 0.46832 7.25077 0.500086 15.5574L2.38536 508.557C2.41696 516.819 9.12337 523.5 17.3853 523.5H447.443C455.727 523.5 462.443 516.784 462.443 508.5V297.5C462.443 289.216 469.158 282.5 477.443 282.5H852.943C861.227 282.5 867.943 289.216 867.943 297.5V508.5C867.943 516.784 874.658 523.5 882.943 523.5H1314.44C1322.73 523.5 1329.44 516.784 1329.44 508.5V16.5C1329.44 8.21573 1322.73 1.5 1314.44 1.5H882.943C874.658 1.5 867.943 8.21573 867.943 16.5V230C867.943 238.284 861.227 245 852.943 245H477.443C469.158 245 462.443 238.284 462.443 230V15.5C462.443 7.21573 455.727 0.5 447.443 0.5Z"
              stroke="#e5e7eb"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              className="animated-progress-line"
              d="M447.443 0.5H15.5C7.19329 0.5 0.46832 7.25077 0.500086 15.5574L2.38536 508.557C2.41696 516.819 9.12337 523.5 17.3853 523.5H447.443C455.727 523.5 462.443 516.784 462.443 508.5V297.5C462.443 289.216 469.158 282.5 477.443 282.5H852.943C861.227 282.5 867.943 289.216 867.943 297.5V508.5C867.943 516.784 874.658 523.5 882.943 523.5H1314.44C1322.73 523.5 1329.44 516.784 1329.44 508.5V16.5C1329.44 8.21573 1322.73 1.5 1314.44 1.5H882.943C874.658 1.5 867.943 8.21573 867.943 16.5V230C867.943 238.284 861.227 245 852.943 245H477.443C469.158 245 462.443 238.284 462.443 230V15.5C462.443 7.21573 455.727 0.5 447.443 0.5Z"
              stroke="#4b5563"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
            />
          </svg>

          <div className={styles.showcaseGrid}>
            <div className={`${styles.visualCard} ${styles.beforeCard}`}>
            
            </div>
            <div className={styles.connectorSpacer}></div>
            <div className={`${styles.visualCard} ${styles.afterCard}`}>
             
            </div>
          </div>
        </div>

        <div className={styles.stepsRow}>
          {stepsData.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`${styles.stepCard} ${activeStep === step.id ? styles.activeStep : ''}`}
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