'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Só inicia lógica de mouse se NÃO for mobile
    if (window.innerWidth > 1024) {
      const preview = previewRef.current
      const img = imgRef.current
      const cursor = cursorRef.current
      if (!preview || !img || !cursor) return

      let mouseX = 0, mouseY = 0, x = 0, y = 0
      let rafId: number | null = null

      gsap.set([preview, cursor], { opacity: 0, scale: 0.85, xPercent: -50, yPercent: -50 })

      const move = (e: MouseEvent) => {
        mouseX = e.clientX
        mouseY = e.clientY
      }

      const render = () => {
        x += (mouseX - x) * 0.12
        y += (mouseY - y) * 0.12
        gsap.set(preview, { x, y })
        gsap.set(cursor, { x, y })
        rafId = requestAnimationFrame(render)
      }

      const items = document.querySelectorAll('[data-project]')
      items.forEach(item => {
        item.addEventListener('mouseenter', () => {
          const image = item.getAttribute('data-image')
          if (image && img) img.src = image
          gsap.to(preview, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' })
          gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.25, ease: 'power3.out' })
        })
        item.addEventListener('mouseleave', () => {
          gsap.to([preview, cursor], { opacity: 0, scale: 0.85, duration: 0.25, ease: 'power3.out' })
        })
      })

      window.addEventListener('mousemove', move)
      rafId = requestAnimationFrame(render)

      return () => {
        window.removeEventListener('mousemove', move)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className={styles.selectedWork}>
      <h2 className={styles.sectionTitle}>Selected Work</h2>

      <div className={styles.list}>
        {projects.map((project, index) => (
          <div
            key={index}
            className={styles.item}
            data-project
            data-image={project.image}
          >
            {/* Imagem visível APENAS no Mobile */}
            <div className={styles.mobileImage}>
              <img src={project.image} alt={project.title} />
            </div>

            <div className={styles.itemContent}>
              <h3>{project.title}</h3>
              <span>{project.meta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.moreWorkBtn}>
          <span>More work</span>
        </button>
      </div>

      {/* Preview e Cursor: Renderizados apenas no Desktop */}
      {!isMobile && (
        <>
          <div ref={previewRef} className={styles.preview}>
            <img ref={imgRef} alt="Preview" />
          </div>
          <div ref={cursorRef} className={styles.viewCursor}>VIEW</div>
        </>
      )}
    </section>
  )
}