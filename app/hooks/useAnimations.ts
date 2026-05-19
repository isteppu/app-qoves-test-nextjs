'use client';

import { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function useAnimations(
  containerRef: RefObject<HTMLDivElement | null>,
  styles: Record<string, string>,
) {
  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from(`.${styles.badge}`, { opacity: 0, y: -15, duration: 0.8 })
      .from(`.${styles.title}`, { opacity: 0, y: 30, duration: 1 }, '-=0.5')
      .from(`.${styles.subtitle}`, { opacity: 0, y: 20, duration: 1 }, '-=0.7');

    tl.from(`.${styles.visualCard}`, {
      opacity: 0,
      scale: 0.98,
      y: 40,
      stagger: 0.15,
      duration: 1.2,
      clearProps: 'all' // <--- ADD THIS LINE
    }, '-=0.6');

    tl.from(`.${styles.connectorLine}`, {
      strokeDashoffset: 100,
      opacity: 0,
      duration: 0.8
    }, '-=0.4');

    tl.from(`.${styles.stepCard}`, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8
    }, '-=0.5');

    const pathEl = containerRef.current.querySelector('.animated-progress-line') as SVGPathElement;

    if (pathEl) {
      const pathLength = pathEl.getTotalLength();

      gsap.set(pathEl, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      gsap.to(pathEl, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true,
      });
    }

  }, { scope: containerRef });

}