/**
 * Capture l'animation CopiloIntro en MP4.
 *
 * Usage : node scripts/capture-logo-mp4.js
 *
 * Préconditions :
 *  - npm run dev tourne sur localhost:3000
 *  - ffmpeg installé (brew install ffmpeg)
 *
 * Process :
 *  1. Ouvre une page Chromium headless
 *  2. Navigue sur /brand
 *  3. Capture 5.2s de frames (30 fps = 156 frames) en PNG ciblés sur l'orbe + texte
 *  4. ffmpeg compile en MP4 H.264 (yuv420p, qualité élevée)
 *  5. Range tout dans brand/copilo-intro.mp4
 */
const puppeteer = require('puppeteer')
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const URL = process.env.URL || 'http://localhost:3000/brand'
const OUT = path.resolve(__dirname, '../../brand/copilo-intro.mp4')
const FRAMES_DIR = path.resolve(__dirname, '../.tmp-logo-frames')
const FPS = 30
const DURATION_MS = 5200           // 1 cycle complet + petite marge
const FRAME_COUNT = Math.round((DURATION_MS / 1000) * FPS)
const W = 900
const H = 700

async function main() {
  // Reset frames dir
  if (fs.existsSync(FRAMES_DIR)) {
    fs.rmSync(FRAMES_DIR, { recursive: true })
  }
  fs.mkdirSync(FRAMES_DIR, { recursive: true })

  console.log(`▶ Launching headless Chromium…`)
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1280, height: 900, deviceScaleFactor: 2 },
  })
  const page = await browser.newPage()

  console.log(`▶ Loading ${URL}`)
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })

  // Wait extra so animations are initialized and dev server is ready
  await new Promise((r) => setTimeout(r, 1500))

  // Locate the CopiloIntro wrapper precisely. Strategy :
  //   1) trouve l'<img src="*copilo-orb-blank*">
  //   2) remonte jusqu'à l'ancêtre `display:flex; flex-direction:column`
  //      (= le wrapper racine du composant CopiloIntro qui englobe
  //         orbe + halo + texte Copilo.tech).
  //   3) scrollIntoView pour qu'il soit dans la viewport.
  const target = await page.evaluate(() => {
    const img = document.querySelector('img[src*="copilo-orb-blank"]')
    if (!img) return null

    let el = img
    for (let i = 0; i < 8; i++) {
      const parent = el.parentElement
      if (!parent) break
      const cs = window.getComputedStyle(parent)
      if (cs.display === 'flex' && cs.flexDirection === 'column') {
        el = parent
        break
      }
      el = parent
    }
    el.scrollIntoView({ block: 'center', inline: 'center' })
    const r = el.getBoundingClientRect()
    return { x: r.x, y: r.y, w: r.width, h: r.height }
  })

  if (!target) {
    console.error('❌ Section "Intro animée" not found on the page.')
    await browser.close()
    process.exit(1)
  }

  // Compute clip with padding
  const PADDING = 40
  const clip = {
    x: Math.max(0, Math.floor(target.x - PADDING)),
    y: Math.max(0, Math.floor(target.y - PADDING)),
    width: Math.min(W, Math.ceil(target.w + 2 * PADDING)),
    height: Math.min(H, Math.ceil(target.h + 2 * PADDING)),
  }

  console.log(`▶ Capturing ${FRAME_COUNT} frames @ ${FPS}fps (${DURATION_MS}ms)`)
  console.log(`  Clip: ${clip.width}×${clip.height} at (${clip.x},${clip.y})`)

  // We want to start AT the beginning of an animation cycle for a clean
  // looping MP4. The component resets state at mount; reload + wait, then
  // capture immediately so frame 0 is t≈0 of the cycle.
  await page.reload({ waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 200))

  const startTs = Date.now()
  for (let i = 0; i < FRAME_COUNT; i++) {
    const targetTs = startTs + (i * 1000) / FPS
    const now = Date.now()
    if (targetTs > now) {
      await new Promise((r) => setTimeout(r, targetTs - now))
    }
    await page.screenshot({
      path: path.join(FRAMES_DIR, `f${String(i).padStart(4, '0')}.png`),
      clip,
      omitBackground: false,
    })
    if (i % 30 === 0) process.stdout.write(`  frame ${i}/${FRAME_COUNT}\r`)
  }
  console.log(`\n  ${FRAME_COUNT} frames captured.`)

  await browser.close()

  console.log(`▶ Encoding MP4 via ffmpeg → ${OUT}`)
  if (fs.existsSync(OUT)) fs.unlinkSync(OUT)

  await new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', [
      '-y',
      '-framerate', String(FPS),
      '-i', path.join(FRAMES_DIR, 'f%04d.png'),
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-crf', '17',
      '-vf', 'pad=ceil(iw/2)*2:ceil(ih/2)*2',
      '-movflags', '+faststart',
      OUT,
    ])
    ff.stderr.on('data', (d) => {
      // print only progress-ish lines, not every codec init
      const s = d.toString()
      if (s.includes('frame=')) process.stdout.write('  ' + s.split('\n').pop())
    })
    ff.on('close', (code) => (code === 0 ? resolve() : reject(new Error('ffmpeg exit ' + code))))
  })

  // Cleanup frames
  fs.rmSync(FRAMES_DIR, { recursive: true })

  const stat = fs.statSync(OUT)
  console.log(`\n✅ Done → ${OUT} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
