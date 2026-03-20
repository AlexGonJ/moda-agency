'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../styles/splitText.module.scss'

interface SplitTextProps {
  children: React.ReactNode
  animate?: boolean   // true = anima imediatamente, false = aguarda
}

export default function SplitText({ children, animate = false }: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const container = containerRef.current
    if (!container) return

    // Split por palavras
    const nodes = Array.from(container.childNodes)
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const fragment = document.createDocumentFragment()
        const words = node.textContent.split(/(\s+)/)

        words.forEach(word => {
          if (/\s+/.test(word)) {
            fragment.appendChild(document.createTextNode(word))
          } else {
            const outer = document.createElement('span')
            outer.style.display = 'inline-block'
            outer.style.overflow = 'hidden'
            outer.style.verticalAlign = 'bottom'

            const inner = document.createElement('span')
            inner.textContent = word
            inner.dataset.word = word
            inner.style.display = 'inline-block'
            inner.style.transform = 'translateY(110%)'

            outer.appendChild(inner)
            fragment.appendChild(outer)
          }
        })

        container.replaceChild(fragment, node)
      }
    })
  }, [])

  // Dispara quando animate muda para true
  useEffect(() => {
    if (!animate) return

    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll<HTMLSpanElement>('span[data-word]')

    gsap.to(words, {
      y: '0%',
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.06,
    })
  }, [animate])

  return (
    <span ref={containerRef} className={styles.split}>
      {children}
    </span>
  )
}