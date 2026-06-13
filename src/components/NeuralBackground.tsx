'use client'

import { useEffect, useRef } from 'react'

const COUNT = 50
const LINK_DIST = 180
const BASE_SPEED = 18       // px/s
const PULSE_INTERVAL = 3500 // ms between pulse spawns
const PULSE_MS = 1500       // ms for a pulse to travel one hop
const MAX_HOP = 2
const BASE_OPACITY = 0.12
const PULSE_OPACITY = 0.35

interface Node {
  x: number; y: number
  vx: number; vy: number
}

interface Pulse {
  a: number; b: number      // from node a → node b
  t: number                 // 0..1 progress along segment
  hop: number
  opacity: number
}

function randSpeed() { return (Math.random() - 0.5) * 2 * BASE_SPEED }

function buildNodes(w: number, h: number): Node[] {
  return Array.from({ length: COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: randSpeed(),
    vy: randSpeed(),
  }))
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let lastTime = 0
    let nextPulse = PULSE_INTERVAL
    let raf = 0

    function init() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width  = canvas!.offsetWidth  * dpr
      canvas!.height = canvas!.offsetHeight * dpr
      ctx!.scale(dpr, dpr)
      nodes = buildNodes(canvas!.offsetWidth, canvas!.offsetHeight)
      pulses = []
    }

    function neighbors(i: number): number[] {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      const out: number[] = []
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue
        const dx = nodes[j].x - nodes[i].x
        const dy = nodes[j].y - nodes[i].y
        if (Math.sqrt(dx * dx + dy * dy) < LINK_DIST / Math.max(w, h) * Math.min(w, h)) {
          out.push(j)
        }
      }
      return out
    }

    function spawnPulse(src: number, exclude: number, hop: number) {
      const nb = neighbors(src).filter(n => n !== exclude)
      if (!nb.length) return
      const dst = nb[Math.floor(Math.random() * nb.length)]
      pulses.push({ a: src, b: dst, t: 0, hop, opacity: PULSE_OPACITY })
      if (hop < MAX_HOP) {
        setTimeout(() => spawnPulse(dst, src, hop + 1), PULSE_MS * 0.7)
      }
    }

    function tick(ts: number) {
      const dt = Math.min((ts - lastTime) / 1000, 0.05)
      lastTime = ts
      nextPulse -= dt * 1000
      if (nextPulse <= 0) {
        spawnPulse(Math.floor(Math.random() * COUNT), -1, 0)
        nextPulse = PULSE_INTERVAL + Math.random() * 1000
      }

      const W = canvas!.offsetWidth
      const H = canvas!.offsetHeight

      // Move nodes with soft wraparound
      for (const n of nodes) {
        n.x += n.vx * dt
        n.y += n.vy * dt
        if (n.x < -20) n.x = W + 10
        if (n.x > W + 20) n.x = -10
        if (n.y < -20) n.y = H + 10
        if (n.y > H + 20) n.y = -10
      }

      // Advance pulses
      for (const p of pulses) {
        p.t += dt / (PULSE_MS / 1000)
        // Opacity envelope: ramp 0-20%, hold 20-70%, fade 70-100%
        const t = p.t
        if (t < 0.2) p.opacity = PULSE_OPACITY * (t / 0.2)
        else if (t < 0.7) p.opacity = PULSE_OPACITY
        else p.opacity = PULSE_OPACITY * (1 - (t - 0.7) / 0.3)
      }
      // Remove finished pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        if (pulses[i].t >= 1) pulses.splice(i, 1)
      }

      // --- Draw ---
      ctx!.clearRect(0, 0, W, H)

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            const alpha = BASE_OPACITY * (1 - dist / LINK_DIST)
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.strokeStyle = `rgba(45,122,110,${alpha})`
            ctx!.lineWidth = 0.8
            ctx!.stroke()
          }
        }
      }

      // Pulse signals (glowing dot traveling along edge)
      for (const p of pulses) {
        const na = nodes[p.a]
        const nb = nodes[p.b]
        if (!na || !nb) continue
        const px = na.x + (nb.x - na.x) * p.t
        const py = na.y + (nb.y - na.y) * p.t
        ctx!.beginPath()
        ctx!.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(45,122,110,${p.opacity})`
        ctx!.fill()
      }

      // Nodes
      for (const n of nodes) {
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, 2, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(45,122,110,${BASE_OPACITY * 1.4})`
        ctx!.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    init()
    raf = requestAnimationFrame(ts => { lastTime = ts; tick(ts) })

    const ro = new ResizeObserver(init)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
