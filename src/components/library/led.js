// LED Component Metadata
// Pure data — no React, no rendering logic

export const LED = {
  type: 'LED',
  width: 44,
  height: 30,
  color: '#ff4444',
  label: 'LED',
  ref: 'D',

  pins: {
    anode:   { x: -20, y: 15, side: 'left',  label: 'A' },
    cathode: { x:  64, y: 15, side: 'right', label: 'K' },
  },

  symbol: [
    // Triangle body
    { shape: 'polygon', points: [0, 0, 0, 30, 24, 15], filled: true, opacity: 0.2 },
    { shape: 'polygon', points: [0, 0, 0, 30, 24, 15], filled: false },
    // Cathode bar
    { shape: 'line', x1: 24, y1: 0,  x2: 24, y2: 30 },
    // Light rays
    { shape: 'line', x1: 28, y1: 5,  x2: 36, y2: -2 },
    { shape: 'line', x1: 28, y1: 11, x2: 38, y2: 6  },
    // Anode wire
    { shape: 'line', x1: -20, y1: 15, x2: 0,  y2: 15 },
    // Cathode wire
    { shape: 'line', x1: 24,  y1: 15, x2: 44, y2: 15 },
  ]
}