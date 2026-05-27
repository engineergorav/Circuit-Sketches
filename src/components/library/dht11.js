// DHT11 Component Metadata
// Pure data — no React, no rendering logic

export const DHT11 = {
  type: 'DHT11',
  width: 70,
  height: 80,
  color: '#0099ff',
  label: 'DHT11',
  ref: 'S',

  pins: {
    VCC:  { x: -20, y: 20, side: 'left',  label: 'VCC'  },
    DATA: { x: -20, y: 40, side: 'left',  label: 'DATA' },
    GND:  { x: -20, y: 60, side: 'left',  label: 'GND'  },
    OUT:  { x:  90, y: 40, side: 'right', label: 'OUT'  },
  },

  symbol: [
    // Body rectangle
    { shape: 'rect', x: 0, y: 0, width: 70, height: 80, filled: false },
    // Left pin wires
    { shape: 'line', x1: -20, y1: 20, x2: 0,  y2: 20 },
    { shape: 'line', x1: -20, y1: 40, x2: 0,  y2: 40 },
    { shape: 'line', x1: -20, y1: 60, x2: 0,  y2: 60 },
    // Right pin wire
    { shape: 'line', x1: 70,  y1: 40, x2: 90, y2: 40 },
  ],

  texts: [
    { text: 'DHT11',    x: 35, y: 22, fontSize: 11, fontStyle: 'bold',   align: 'center' },
    { text: 'TEMP/HUM', x: 35, y: 38, fontSize: 7,  fontStyle: 'normal', align: 'center' },
  ]
}