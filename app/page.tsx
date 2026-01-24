'use client'
import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => { ScrollTrigger.refresh() }, 500)
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <div className="smooth-wrapper" style={{ opacity: isLoading ? 0 : 1 }}>
        <main style={{ backgroundColor: '#fff', position: 'relative', zIndex: 1 }}>
          <Navbar />
          <Hero start={!isLoading} />
          <About />
          <SelectedWork />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}