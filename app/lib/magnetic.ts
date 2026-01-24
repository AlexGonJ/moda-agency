import gsap from 'gsap'

export function magneticHover(
  element: HTMLElement,
  strength = 0.3
) {
  const rect = () => element.getBoundingClientRect()

  const onMouseMove = (e: MouseEvent) => {
    const r = rect()

    const x =
      (e.clientX - (r.left + r.width / 2)) * strength
    const y =
      (e.clientY - (r.top + r.height / 2)) * strength

    gsap.to(element, {
      x,
      y,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  element.addEventListener('mousemove', onMouseMove)
  element.addEventListener('mouseleave', onMouseLeave)

  return () => {
    element.removeEventListener('mousemove', onMouseMove)
    element.removeEventListener('mouseleave', onMouseLeave)
  }
}
