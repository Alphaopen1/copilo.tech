'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide default cursor on desktop
    document.documentElement.style.cursor = 'none'

    let raf = 0
    let mx = -100, my = -100 // mouse pos
    let rx = -100, ry = -100 // ring pos (lerped)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const loop = () => {
      // Dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px,${my}px)`
      }
      // Ring lerps
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px,${ry}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a,button,[role="button"],[data-hover]')) {
        ringRef.current?.classList.add('hovering')
        dotRef.current?.style.setProperty('transform', `translate(${mx}px,${my}px) scale(1.6)`)
      }
    }
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a,button,[role="button"],[data-hover]')) {
        ringRef.current?.classList.remove('hovering')
      }
    }
    const onDown = () => ringRef.current?.classList.add('clicking')
    const onUp   = () => ringRef.current?.classList.remove('clicking')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout',  onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.style.cursor = ''
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout',  onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
