'use client'

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollReveal.css'

interface ScrollRevealProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement>
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
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
  const containerRef = useRef<HTMLDivElement>(null)

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word
      return (
        <span
          className="word"
          key={index}
          style={{ display: 'inline-block', willChange: 'opacity, filter' }}
        >
          {word}
        </span>
      )
    })
  }, [children])

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const el = containerRef.current
    if (!el) return

    const scroller =
      scrollContainerRef?.current ?? window

    const wordElements = el.querySelectorAll<HTMLElement>('.word')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { rotate: baseRotation, opacity: 0 },
        {
          rotate: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
          y: 10,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
    }
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, blurStrength])

  return (
    <div
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`}
      style={{ overflow: 'visible' }}
    >
      <p className={`scroll-reveal-text ${textClassName}`}>
        {splitText}
      </p>
    </div>
  )
}

export default ScrollReveal
