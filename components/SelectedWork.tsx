'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from '../styles/selected-work.module.scss'

const projects = [
  {
    title: 'Animale SS26',
    meta: 'Branding & Campanha — Direção Criativa',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80',
  },
  {
    title: 'Reserva Essentials',
    meta: 'Conteúdo Digital — Estratégia de Marca',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
  },
  {
    title: 'Farm Rio Global',
    meta: 'Expansão Internacional — Rebranding',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80',
  },
  {
    title: 'Osklen Archive',
    meta: 'Campanha Editorial — Fotografia & Motion',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
  },
]

export default function SelectedWork() {
  const sectionRef   = useRef<HTMLElement>(null)
  const previewRef   = useRef<HTMLDivElement>(null)
  const cursorRef    = useRef<HTMLDivElement>(null)
  const imgARef      = useRef<HTMLImageElement>(null)
  const imgBRef      = useRef<HTMLImageElement>(null)
  const activeSlot   = useRef<'a' | 'b'>('a')
  const currentIndex = useRef<number>(-1)
  const lastY        = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    isVisibleRef.current = isVisible
  }, [isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { rootMargin: '800px 0px' }
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  // Limpa as imagens do desktop e reseta o index quando sai da tela para economizar memória
  useEffect(() => {
    if (!isVisible && !isMobile) {
      if (imgARef.current) imgARef.current.src = ''
      if (imgBRef.current) imgBRef.current.src = ''
      currentIndex.current = -1
    }
  }, [isVisible, isMobile])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const btnRef = useRef<HTMLAnchorElement>(null)

useEffect(() => {
  const btn = btnRef.current
  if (!btn) return

  const strength = 0.25

  const move = (e: MouseEvent) => {
    const rect = btn.getBoundingClientRect()

    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power3.out',
    })

    gsap.to(btn.querySelector('span'), {
      x: x * strength * 0.4,
      y: y * strength * 0.4,
      duration: 0.4,
    })
  }

  const leave = () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    gsap.to(btn.querySelector('span'), { x: 0, y: 0, duration: 0.6 })
  }

  btn.addEventListener('mousemove', move)
  btn.addEventListener('mouseleave', leave)

  return () => {
    btn.removeEventListener('mousemove', move)
    btn.removeEventListener('mouseleave', leave)
  }
}, [])

  useEffect(() => {
    if (isMobile) return

    const preview = previewRef.current
    const cursor  = cursorRef.current
    const imgA    = imgARef.current
    const imgB    = imgBRef.current
    if (!preview || !cursor || !imgA || !imgB) return

    gsap.set(preview, { opacity: 0, scale: 0.9, xPercent: -50, yPercent: -50 })
    gsap.set(cursor,  { opacity: 0, xPercent: -50, yPercent: -50 })
    gsap.set(imgB,    { yPercent: 0, opacity: 0 })

    const previewXTo = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3.out' })
    const previewYTo = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3.out' })
    const cursorXTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'none' })
    const cursorYTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'none' })

    let mouseX = 0, mouseY = 0

    const onMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return

      lastY.current = mouseY
      mouseX = e.clientX
      mouseY = e.clientY

      if (currentIndex.current !== -1) {
        previewXTo(e.clientX)
        previewYTo(e.clientY)
        cursorXTo(e.clientX)
        cursorYTo(e.clientY)
      }
    }
    window.addEventListener('mousemove', onMove)

    const items = sectionRef.current?.querySelectorAll('[data-project-item]') ?? []
    const offs: (() => void)[] = []

    items.forEach((item, index) => {
      const enter = () => {
        const src = item.getAttribute('data-image') ?? ''
        const isFirst = currentIndex.current === -1

        if (isFirst) {
          imgA.src = src
          gsap.set(imgA, { yPercent: 0, opacity: 1 })

          // Instant set to current mouse position to prevent gliding from old values
          gsap.set(preview, { x: mouseX, y: mouseY })
          gsap.set(cursor,  { x: mouseX, y: mouseY })

          // Reset quickTo targets to current mouse position
          previewXTo(mouseX)
          previewYTo(mouseY)
          cursorXTo(mouseX)
          cursorYTo(mouseY)

          gsap.to(preview, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' })
          gsap.to(cursor,  { opacity: 1, duration: 0.3, ease: 'power3.out' })
        } else {
          const goingDown = index > currentIndex.current
          const incoming  = activeSlot.current === 'a' ? imgB : imgA
          const outgoing  = activeSlot.current === 'a' ? imgA : imgB

          incoming.src = src
          gsap.set(incoming, { yPercent: goingDown ? 100 : -100, opacity: 1, zIndex: 2 })
          gsap.set(outgoing, { zIndex: 1 })
          gsap.to(incoming,  { yPercent: 0, duration: 0.55, ease: 'power3.out' })
          gsap.to(outgoing,  { yPercent: goingDown ? -40 : 40, opacity: 0, duration: 0.45, ease: 'power3.in' })

          activeSlot.current = activeSlot.current === 'a' ? 'b' : 'a'
        }

        currentIndex.current = index
      }

      item.addEventListener('mouseenter', enter)
      offs.push(() => item.removeEventListener('mouseenter', enter))
    })

    const onHoverCheck = (e: MouseEvent) => {
      if (!isVisibleRef.current) return

      const el = e.target as Element
      const overItem = !!el.closest('[data-project-item]')

      if (!overItem && currentIndex.current !== -1) {
        gsap.to([preview, cursor], { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power3.in' })
        currentIndex.current = -1
        activeSlot.current = 'a'
      }
    }

    window.addEventListener('mousemove', onHoverCheck)
    offs.push(() => window.removeEventListener('mousemove', onHoverCheck))

    return () => {
      window.removeEventListener('mousemove', onMove)
      offs.forEach(fn => fn())
    }
  }, [isMobile])

const handleGlow = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  btn.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
  btn.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
}

  return (
    <section id="projetos" ref={sectionRef} className={styles.selectedWork}>
      <p className={styles.sectionLabel}>Cases</p>

      <ul className={styles.list}>
        {projects.map((project, i) => (
          <li
            key={i}
            className={styles.item}
            data-project-item
            data-image={project.image}
          >
            {isMobile && (
              <div className={styles.mobileImage}>
                {isVisible && <img src={project.image} alt={project.title} />}
              </div>
            )}
            <div className={styles.itemContent}>
              <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.itemCenter}>
                <h3>{project.title}</h3>
                <span className={styles.itemMeta}>{project.meta}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

<div className={styles.buttonWrapper}>
 <a
  ref={btnRef}
  className={styles.moreWorkBtn}
  onMouseMove={handleGlow}
><div className={styles.borderGlow}></div>
  <span>Ver todos os cases</span>
 </a>
</div>

      {!isMobile && (
        <>
          <div ref={previewRef} className={styles.preview} aria-hidden="true">
            <div className={styles.previewBg} />
            <div className={styles.previewImgWrap}>
              <img ref={imgARef} className={styles.previewImg} alt="" />
              <img ref={imgBRef} className={styles.previewImg} alt="" />
            </div>
          </div>

          <div ref={cursorRef} className={styles.viewCursor} aria-hidden="true">
            VER
          </div>
        </>
      )}
    </section>
  )
}
