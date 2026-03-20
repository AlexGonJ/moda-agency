'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../styles/splitText.module.scss'

interface SplitTextProps {
  children: React.ReactNode
}

export default function SplitText({ children }: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    if (!container) return

    const nodes = Array.from(container.childNodes)

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const fragment = document.createDocumentFragment()
        const words = node.textContent.split(/(\s+)/)

        words.forEach(word => {
          if (/\s+/.test(word)) {
            fragment.appendChild(document.createTextNode(word))
          } else {
            const span = document.createElement('span')
            span.textContent = word
            span.dataset.word = word
            span.style.display = 'inline-block'
            span.style.overflow = 'hidden'
            fragment.appendChild(span)
          }
        })

        container.replaceChild(fragment, node)
      }
    })

    const wordsSpans = container.querySelectorAll<HTMLSpanElement>('span[data-word]')

    gsap.fromTo(
      wordsSpans,
      { y: '120%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        stagger: 0.1,
        duration: 2.0,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <span ref={containerRef} className={styles.split}>
      {children}
    </span>
  )
}
