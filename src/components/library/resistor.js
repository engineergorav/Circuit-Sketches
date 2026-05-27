// Resistor Component Metadata
// Pure data — no React, no rendering logic

export const RESISTOR = {
  type: 'Resistor',
  width: 50,
  height: 24,
  color: '#ff9900',
  label: 'Resistor',
  ref: 'R',

  pins: {
    pin1: { x: -20, y: 12, side: 'left',  label: '1' },
    pin2: { x:  70, y: 12, side: 'right', label: '2' },
  },

  symbol: [
    // Body rectangle
    { shape: 'rect', x: 0, y: 0, width: 50, height: 24, filled: false },
    // Left wire
    { shape: 'line', x1: -20, y1: 12, x2: 0,  y2: 12 },
    // Right wire
    { shape: 'line', x1: 50,  y1: 12, x2: 70, y2: 12 },
  ]
}