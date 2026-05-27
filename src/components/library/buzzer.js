// Buzzer Component Metadata
// Pure data — no React, no rendering logic

export const BUZZER = {
  type: 'Buzzer',
  width: 60,
  height: 60,
  color: '#ff6600',
  label: 'Buzzer',
  ref: 'BZ',

  pins: {
    VCC: { x: -20, y: 20, side: 'left', label: '+' },
    GND: { x: -20, y: 40, side: 'left', label: '-' },
  },

  symbol: [
    // Circle body
    { shape: 'circle', x: 30, y: 30, radius: 28, filled: false },
    // Left wires
    { shape: 'line', x1: -20, y1: 20, x2: 0,  y2: 20 },
    { shape: 'line', x1: -20, y1: 40, x2: 0,  y2: 40 },
    // Sound waves
    { shape: 'arc', x: 42, y: 30, radius: 8,  startAngle: -60, endAngle: 60 },
    { shape: 'arc', x: 42, y: 30, radius: 14, startAngle: -60, endAngle: 60 },
  ],

  texts: [
    { text: 'BZ', x: 30, y: 24, fontSize: 11, fontStyle: 'bold', align: 'center' },
  ]
}