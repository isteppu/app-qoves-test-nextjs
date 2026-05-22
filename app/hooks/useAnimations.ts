'use client';

import { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin);
  gsap.registerPlugin(ScrollTrigger);
}

export function useAnalysisAnimations(
  containerRef: RefObject<HTMLDivElement | null>,
  styles: Record<string, string>,
) {
  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from(`.${styles.badge}`, { opacity: 0, y: -15, duration: 0.8 })
      .from(`.${styles.title}`, { opacity: 0, y: 30, duration: 1 }, '-=0.5')
      .from(`.${styles.subtitle}`, { opacity: 0, y: 20, duration: 1 }, '-=0.7')
      .from(`.${styles.stepsRow}`, { opacity: 0, y: 30, duration: 1 }, '-=0.9');

    tl.from(`.${styles.visualCard}`, {
      opacity: 0,
      scale: 0.98,
      y: 40,
      stagger: 0.15,
      duration: 1.2,
      clearProps: 'all'
    }, '-=0.6');

    tl.from(`.${styles.connectorSpacer}`, {
      strokeDashoffset: 100,
      opacity: 0,
      duration: 0.8
    }, '-=0.4');

    const pathEl = containerRef.current.querySelector('.track-path') as SVGPathElement;
    const tailEl = containerRef.current.querySelector('.animated-tail') as SVGPathElement;

    if (pathEl) {
      const pathLength = pathEl.getTotalLength();
      const tailLength = 150;

      gsap.set('.animated-tail', {
        strokeDasharray: `${tailLength} ${pathLength}`, 
        strokeDashoffset: pathLength,
      });

      gsap.to('.animated-tail', {
        strokeDashoffset: 0,
        duration: 10,
        ease: 'none',
        repeat: -1,
        // stagger: 5, 
      });

      gsap.to('.progress-head', {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 10,
        ease: 'none',
        repeat: -1,
        motionPath: {
          path: '.track-path',
          align: '.track-path',
          alignOrigin: [0, 0],
          autoRotate: true,       
        }
      });
    }
  }, { scope: containerRef });

}

export function useAestheticAnimations(
  containerRef: RefObject<HTMLElement | null>,
  styles: Record<string, string>,
){
  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.to(`.${styles.parallaxSubject}`, {
      scale: 1.1,      
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',  
        scrub: 1,   
        markers: false,        
      }
    });

    gsap.to(`.${styles.headerBlock}`, {
      y: 50,      
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',  
        scrub: 1,   
        markers: false,        
      }
    });

    gsap.to(`.${styles.glassCard}`, {
      y: 100,      
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',  
        scrub: 1,   
        markers: false,        
      }
    });


    ScrollTrigger.refresh();
  }, { scope: containerRef });
}
