'use client'

// Static SVG neural network — teal at low opacity, CSS-animated pulse on connections.
// Purely decorative; pointer-events disabled.

const NODES = [
  [12, 18], [28, 8],  [48, 14], [62, 6],  [78, 20],
  [90, 12], [8,  40], [32, 35], [55, 30], [74, 38],
  [92, 45], [18, 58], [42, 52], [65, 60], [85, 55],
  [10, 75], [35, 70], [58, 78], [80, 72], [95, 80],
  [22, 90], [50, 94], [72, 88], [88, 95],
] as const

const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],
  [0,6],[1,7],[2,8],[3,8],[4,9],[5,10],
  [6,7],[7,8],[8,9],[9,10],
  [6,11],[7,12],[8,12],[9,13],[10,14],
  [11,12],[12,13],[13,14],
  [11,15],[12,16],[13,17],[14,18],[14,19],
  [15,16],[16,17],[17,18],[18,19],
  [15,20],[16,20],[17,21],[18,22],[19,23],
  [20,21],[21,22],[22,23],
]

export default function NeuralBackground() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    >
      <defs>
        {EDGES.map((_, i) => (
          <style key={i}>{`
            .edge-${i} {
              animation: edgePulse ${4 + (i % 4)}s ease-in-out ${(i * 0.18) % 3}s infinite;
            }
          `}</style>
        ))}
        <style>{`
          @keyframes edgePulse {
            0%, 100% { opacity: 0.04; }
            50%       { opacity: 0.13; }
          }
          @keyframes nodePulse {
            0%, 100% { opacity: 0.10; }
            50%       { opacity: 0.22; }
          }
        `}</style>
      </defs>

      {/* Edges */}
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          className={`edge-${i}`}
          x1={NODES[a][0]}
          y1={NODES[a][1]}
          x2={NODES[b][0]}
          y2={NODES[b][1]}
          stroke="#2d7a6e"
          strokeWidth="0.25"
        />
      ))}

      {/* Nodes */}
      {NODES.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="0.7"
          fill="#2d7a6e"
          style={{
            animation: `nodePulse ${4 + (i % 3)}s ease-in-out ${(i * 0.22) % 2.5}s infinite`,
          }}
        />
      ))}
    </svg>
  )
}
