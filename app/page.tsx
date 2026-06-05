'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import About from '@/components/About'
import Clients from '@/components/Clients'
import MotionShowcase from '@/components/MotionShowcase'
import EditorialBreak from '@/components/EditorialBreak'
import Contact from '@/components/Contact'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      const refreshScrollTrigger = async () => {
        if (typeof window === 'undefined') return

        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        ScrollTrigger.refresh()
      }

      setTimeout(refreshScrollTrigger, 500)
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="smooth-wrapper" style={{ opacity: isLoading ? 0 : 1 }}>
        <main style={{ backgroundColor: 'var(--color-surface)', position: 'relative', zIndex: 1 }}>
          <Navbar />
          <Hero start={!isLoading} />
          <About />
          <Clients />
          <SelectedWork />
          <MotionShowcase />
          <EditorialBreak />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}
