'use client'

export default function VideoBanner() {
  return (
    <section
      style={{
        width: '100%',
        position: 'relative',
        background: '#02060f',
        /* ── overflow hidden so the video fills edge-to-edge ── */
        overflow: 'hidden',
      }}
    >
      {/* Top fade from hero */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(to bottom, #04080f, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Bottom fade to next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(to top, #04080f, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Video header bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px clamp(16px, 5vw, 56px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {['#dc2626', '#f59e0b', '#22c55e'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.85 }} />
          ))}
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            color: 'rgba(180,200,255,0.35)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginLeft: 8,
          }}>
            COPILO_PITCH.MP4 · 33s
          </span>
        </div>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10,
          color: 'rgba(0,207,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          // DÉMO
        </div>
      </div>

      {/* ── Full-width video ── */}
      <video
        src="/copilo-demo.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          display: 'block',
          width: '100%',
          /* Clamp height: min 240px on small screens, natural aspect on large, max 640px */
          maxHeight: '640px',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Side vignettes */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(4,8,15,0.6) 0%, transparent 10%, transparent 90%, rgba(4,8,15,0.6) 100%)',
      }} />
    </section>
  )
}
