'use client'

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 3,
  blurStrength = 10,
  containerClassName = '',
  textClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index} style={{ display: 'inline-block', willChange: 'opacity, filter' }}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const wordElements = el.querySelectorAll<HTMLElement>('.word');

    // 1. Rotação inicial do bloco (ocorre rápido no início)
    gsap.fromTo(
      el,
      { rotate: baseRotation, opacity: 0 },
      {
        rotate: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 90%', 
          toggleActions: "play none none reverse", // Toca ao entrar, não faz nada ao descer mais
        }
      }
    );

    // 2. Animação das Palavras (Disparada uma única vez, sem scrub longo)
    gsap.fromTo(
      wordElements,
      { 
        opacity: baseOpacity, 
        filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
        y: 10 // Leve subidinha para dar mais elegância
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        stagger: 0.03, // Velocidade entre as palavras (ajuste aqui se quiser mais rápido)
        duration: 0.8,  // Duração da animação de cada palavra
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 85%', // Começa quando o topo do texto entra 15% na tela
          toggleActions: "play none none none", // IMPORTANTE: "play" faz a animação rodar até o fim e parar.
          once: true // Garante que a animação não se repita ou reverta
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`} style={{ overflow: 'visible' }}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;