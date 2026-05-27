// Button Component Metadata
// Pure data — no React, no rendering logic

export const BUTTON = {
  type: 'Button',
  width: 30,
  height: 30,
  color: '#00cc44',
  label: 'Button',
  ref: 'SW',

  pins: {
    pin1: { x: -20, y: 15, side: 'left',  label: '1' },
    pin2: { x:  50, y: 15, side: 'right', label: '2' },
  },

  symbol: [
    // Left wire
    { shape: 'line', x1: -20, y1: 15, x2: 0,  y2: 15 },
    // Left terminal
    { shape: 'line', x1: 0,   y1: 5,  x2: 0,  y2: 25 },
    // Right terminal
    { shape: 'line', x1: 30,  y1: 5,  x2: 30, y2: 25 },
    // Bridge (open switch — dashed)
    { shape: 'line', x1: 0,   y1: 8,  x2: 30, y2: 8, dashed: true },
    // Right wire
    { shape: 'line', x1: 30,  y1: 15, x2: 50, y2: 15 },
  ]
}
