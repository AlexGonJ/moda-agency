'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../styles/footer.module.scss'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56c0-1.08-.82-1.94-1.92-1.94s-1.93.86-1.93 1.94c0 1.06.82 1.93 1.9 1.93h.03c1.12 0 1.92-.87 1.92-1.93ZM20.44 13.08c0-3.5-1.86-5.13-4.35-5.13-2 0-2.9 1.1-3.4 1.88V8.5H9.31c.04.88 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.67.9-1.37 1.96-1.37 1.39 0 1.94 1.03 1.94 2.55V20H20v-6.92Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm0 1.8A3 3 0 0 0 4.8 7.8v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8Zm8.85 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" />
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.8 11.03c1.16-.57 1.72-1.44 1.72-2.65 0-2.08-1.62-3.38-4.22-3.38H2V20h5.58c2.79 0 4.57-1.43 4.57-3.76 0-1.68-.83-2.76-2.35-3.21ZM4.66 7.14H7c1.18 0 1.84.47 1.84 1.38 0 .95-.66 1.4-1.84 1.4H4.66V7.14Zm2.56 10.72H4.66v-3.02h2.56c1.32 0 2.02.5 2.02 1.5 0 1.03-.7 1.52-2.02 1.52ZM16.07 6.37h4.93v1.45h-4.93V6.37Zm5.74 8.84c.05-.33.07-.67.07-1.02 0-2.9-1.7-4.79-4.45-4.79-2.82 0-4.7 2.12-4.7 5.26 0 3.1 1.87 5.16 4.79 5.16 2.23 0 3.8-1.12 4.22-3h-2.54c-.27.56-.9.88-1.68.88-1.2 0-1.98-.77-2.04-2.03h6.33v-.46Zm-6.28-1.33c.15-1.08.85-1.73 1.9-1.73 1.06 0 1.72.61 1.78 1.73h-3.68Z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const innerContentRef = useRef<HTMLDivElement | null>(null)
  const orbRef = useRef<HTMLAnchorElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const copyRef = useRef<HTMLParagraphElement | null>(null)
  const socialsRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 769px)', () => {
        gsap.fromTo(
          innerContentRef.current,
          { y: '-18%' },
          {
            y: '0%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        )

        gsap.to(orbRef.current, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      reveal
        .from(titleRef.current, {
          y: 56,
          opacity: 0,
          duration: 1.05,
          ease: 'power4.out',
        })
        .from(
          [copyRef.current, orbRef.current, socialsRef.current],
          {
            y: 28,
            opacity: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.62'
        )
        .from(
          bottomRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out',
          },
          '-=0.42'
        )

      const orb = orbRef.current
      if (orb) {
        const move = (event: MouseEvent) => {
          const rect = orb.getBoundingClientRect()
          const x = event.clientX - rect.left - rect.width / 2
          const y = event.clientY - rect.top - rect.height / 2

          gsap.to(orb, {
            x: x * 0.12,
            y: y * 0.12,
            duration: 0.45,
            ease: 'power3.out',
          })
        }

        const leave = () => {
          gsap.to(orb, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.45)',
          })
        }

        orb.addEventListener('mousemove', move)
        orb.addEventListener('mouseleave', leave)

        return () => {
          orb.removeEventListener('mousemove', move)
          orb.removeEventListener('mouseleave', leave)
          mm.revert()
        }
      }

      return () => mm.revert()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={containerRef} className={styles.footer}>
      <div className={styles.roundedEdge} />
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.grid} />
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />
      </div>

      <div ref={innerContentRef} className={styles.inner}>
        <div className={styles.topLine}>
          <span>Selected collaborations for brands and digital products</span>
          <span>Available worldwide</span>
        </div>

        <div className={styles.main}>
          <div className={styles.copyColumn}>
            <p className={styles.kicker}>Final CTA</p>
            <h2 ref={titleRef} className={styles.title}>
              LET&apos;S BUILD
              <span className={styles.titleOffset}>SOMETHING WITH</span>
              LASTING PRESENCE
            </h2>

            <p ref={copyRef} className={styles.copy}>
              Brand systems, interfaces and motion with a more refined point of view,
              shaped to feel clear now and memorable later.
            </p>
          </div>

          <div className={styles.actionColumn}>
            <a ref={orbRef} href="#contato" className={styles.orb}>
              <svg className={styles.orbTrack} viewBox="0 0 220 220" aria-hidden="true">
                <defs>
                  <path
                    id="footer-orbit-path"
                    d="M110,110 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0"
                  />
                </defs>
                <text>
                  <textPath href="#footer-orbit-path" startOffset="0%">
                    START A CONVERSATION • START A CONVERSATION •
                  </textPath>
                </text>
              </svg>

              <span className={styles.orbCore}>
                <span className={styles.orbEyebrow}>Open a project</span>
                <span className={styles.orbLabel}>Let&apos;s talk</span>
                <span className={styles.orbMeta}>Brand, motion and interface direction</span>
              </span>

              <span className={styles.orbArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7 17 17 7M8.5 7H17v8.5" />
                </svg>
              </span>
            </a>

            <div ref={socialsRef} className={styles.socials}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div ref={bottomRef} className={styles.bottom}>
          <div className={styles.info}>
            <span>&copy; 2026 Alex Design</span>
            <span>
              Local Time {new Date().getHours()}:
              {new Date().getMinutes().toString().padStart(2, '0')}
            </span>
          </div>

          <div className={styles.metaLinks}>
            <a href="#projetos">Projects</a>
            <a href="#sobre">About</a>
            <a href="#contato">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
