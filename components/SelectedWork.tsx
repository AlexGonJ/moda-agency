'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../styles/selected-work.module.scss'

const projects = [
  {
    title: 'Mobile App Experience',
    meta: '2023 — UI/UX',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
  },
  {
    title: 'Brand Identity System',
    meta: '2022 — Branding',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  },
  {
    title: 'Minimal Web Platform',
    meta: '2024 — Web Design',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
]

export default function SelectedWork() {
  const previewRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const preview = previewRef.current
    const img = imgRef.current
    const cursor = cursorRef.current
    if (!preview || !img || !cursor) return

    let mouseX = 0
    let mouseY = 0
    let x = 0
    let y = 0
    let isHovering = false
    let rafId: number | null = null

    gsap.set([preview, cursor], {
      opacity: 0,
      scale: 0.85,
      xPercent: -50,
      yPercent: -50,
    })

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const render = () => {
      // O loop continua mas só aplica transformações se estiver pairando
      x += (mouseX - x) * 0.12
      y += (mouseY - y) * 0.12

      gsap.set(preview, { x, y })
      gsap.set(cursor, { x, y })

      rafId = requestAnimationFrame(render)
    }

    const items = document.querySelectorAll('[data-project]')

    items.forEach(item => {
      const image = item.getAttribute('data-image')
      if (!image) return

      item.addEventListener('mouseenter', () => {
        isHovering = true
        if (image) img.src = image
        
        gsap.to(preview, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'power3.out',
        })

        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'power3.out',
        })
      })

      item.addEventListener('mouseleave', () => {
        isHovering = false
        gsap.to([preview, cursor], {
          opacity: 0,
          scale: 0.85,
          duration: 0.25,
          ease: 'power3.out',
        })
      })
    })

    window.addEventListener('mousemove', move)
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', move)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.selectedWork}>
      <h2>Selected Work</h2>

      <div className={styles.list}>
        {projects.map((project, index) => (
          <div
            key={index}
            className={styles.item}
            data-project
            data-image={project.image}
          >
            <h3>{project.title}</h3>
            <span>{project.meta}</span>
          </div>
        ))}
      </div>

      {/* BOTÃO MORE WORK */}
      <div className={styles.buttonWrapper}>
        <button className={styles.moreWorkBtn}>
          <span>More work</span>
        </button>
      </div>

      {/* PREVIEW FLUTUANTE */}
      <div ref={previewRef} className={styles.preview}>
        <img ref={imgRef} alt="Project Preview" />
      </div>

      {/* CURSOR VIEW */}
      <div ref={cursorRef} className={styles.viewCursor}>
        VIEW
      </div>
    </section>
  )
}