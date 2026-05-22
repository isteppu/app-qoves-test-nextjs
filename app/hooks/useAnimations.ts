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
    const tail1 = containerRef.current.querySelector('.tail-1') as SVGPathElement;
    const tail2 = containerRef.current.querySelector('.tail-2') as SVGPathElement;
    
    if (pathEl && tail1 && tail2) {
      const pathLength = pathEl.getTotalLength();
      const tailLength = 160; // Adjust length of the fading gradient tail segment here

      // Prepare tail strokes and head visibility properties
      gsap.set([tail1, tail2], { strokeDasharray: `${tailLength} ${pathLength}` });
      gsap.set(['.head-1', '.head-2'], { opacity: 1 });

      // Reusable timeline constructor function
      const createCometTimeline = (tailNode: SVGPathElement, headSelector: string, initialProgress: number) => {
        const tl = gsap.timeline({ repeat: -1 });

        // 1. Move the fading tail segment stroke
        tl.fromTo(tailNode, 
          { strokeDashoffset: tailLength }, 
          { 
            strokeDashoffset: -(pathLength - tailLength), 
            duration: 15, // Control rotation speed here
            ease: 'none' 
          }, 
          0
        );

        // 2. Lock the mini square head precisely to the front tip of the path vector
        tl.to(headSelector, {
          duration: 15,
          ease: 'none',
          motionPath: {
            path: pathEl,
            align: pathEl,
            alignOrigin: [0.5, 0.5], // Centers the square element directly on top of the line
            autoRotate: true,        // Rotates the square dynamically around corners
          }
        }, 0);

        // Advance timeline frame straight to initial offset location position
        tl.progress(initialProgress);
      };

      // Instantiate both paths: Comet 1 starts at 0% (Left), Comet 2 starts at 50% (Right)
      createCometTimeline(tail1, '.head-1', 0);
      createCometTimeline(tail2, '.head-2', 0.5);
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
