'use client'
import { useEffect, useRef } from 'react'

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0

    const update = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? scrolled / total : 0

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`
      }
      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <div ref={barRef} className="progress-bar" aria-hidden="true" />
}
