// ESP32 Component Metadata
// Pure data — no React, no rendering logic

export const ESP32 = {
  type: 'ESP32',
  width: 100,
  height: 200,
  color: '#0066ff',
  label: 'ESP32',
  ref: 'U',

  pins: {
    // Right side — GPIO outputs
    GPIO2:  { x: 120, y: 40,  side: 'right', label: 'GPIO2'  },
    GPIO4:  { x: 120, y: 60,  side: 'right', label: 'GPIO4'  },
    GPIO5:  { x: 120, y: 80,  side: 'right', label: 'GPIO5'  },
    GPIO12: { x: 120, y: 100, side: 'right', label: 'GPIO12' },
    GPIO13: { x: 120, y: 120, side: 'right', label: 'GPIO13' },
    GPIO14: { x: 120, y: 140, side: 'right', label: 'GPIO14' },
    GPIO15: { x: 120, y: 160, side: 'right', label: 'GPIO15' },

    // Left side — power + control
    GND:   { x: -20, y: 40,  side: 'left', label: 'GND'  },
    VIN:   { x: -20, y: 60,  side: 'left', label: 'VIN'  },
    EN:    { x: -20, y: 80,  side: 'left', label: 'EN'   },
    '3V3': { x: -20, y: 100, side: 'left', label: '3V3'  },
  },

  symbol: [
    // Main IC body
    { shape: 'rect', x: 0, y: 0, width: 100, height: 200, filled: false },

    // VCC arrow top
    { shape: 'line', x1: 50, y1: 0,   x2: 50,  y2: -20 },
    { shape: 'line', x1: 44, y1: -14, x2: 50,  y2: -20 },
    { shape: 'line', x1: 56, y1: -14, x2: 50,  y2: -20 },

    // GND symbol bottom
    { shape: 'line', x1: 50, y1: 200, x2: 50,  y2: 220 },
    { shape: 'line', x1: 38, y1: 212, x2: 62,  y2: 212 },
    { shape: 'line', x1: 42, y1: 217, x2: 58,  y2: 217 },
    { shape: 'line', x1: 46, y1: 222, x2: 54,  y2: 222 },
  ],

  // Text labels inside body
  texts: [
    { text: 'ESP32',     x: 50, y: 85,  fontSize: 14, fontStyle: 'bold', align: 'center' },
    { text: 'WROOM-32',  x: 50, y: 105, fontSize: 8,  fontStyle: 'normal', align: 'center' },
  ]
}