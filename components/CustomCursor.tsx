'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../styles/cursor.module.scss'

export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursor.current
    if (!el) return

    gsap.set(el, { xPercent: -50, yPercent: -50 })

    const move = (e: MouseEvent) => {
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: 'power3.out',
      })
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor]')) {
        gsap.to(el, { scale: 2, duration: 0.25, ease: 'power3.out' })
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor]')) {
        gsap.to(el, { scale: 1, duration: 0.25, ease: 'power3.out' })
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return <div ref={cursor} className={styles.cursor} />
}
