export const COMPONENT_LIBRARY = {

  /* =========================================
     MICROCONTROLLERS
  ========================================= */

  ESP32: {

  ref: 'U',

  category: 'microcontroller',

  width: 120,

  height: 220,

  color: '#0066ff',

  /* NEW */

  powerSymbols: [

    {
      type: 'vcc',

      x: 60,
      y: 0
    },

    {
      type: 'gnd',

      x: 60,
      y: 220
    }
  ],

  /* REAL SYMBOL */

  symbol: [

    {
      shape: 'rect',
      x: 0,
      y: 0,
      width: 120,
      height: 220
    }
  ],

  texts: [

    {
      text: 'ESP32',
      x: 0,
      y: 100,
      align: 'center',
      fontSize: 16,
      fontStyle: 'bold'
    }
  ],

  pins: {

    GPIO2:  { x: 120, y: 40,  side: 'right', type: 'signal' },
    GPIO4:  { x: 120, y: 60,  side: 'right', type: 'signal' },
    GPIO5:  { x: 120, y: 80,  side: 'right', type: 'signal' },
    GPIO12: { x: 120, y: 100, side: 'right', type: 'signal' },
    GPIO13: { x: 120, y: 120, side: 'right', type: 'signal' },
    GPIO14: { x: 120, y: 140, side: 'right', type: 'signal' },
    GPIO15: { x: 120, y: 160, side: 'right', type: 'signal' },

    GND: { x: 0, y: 40, side: 'left', type: 'ground' },

    VIN: { x: 0, y: 70, side: 'left', type: 'power' },

    EN: { x: 0, y: 100, side: 'left', type: 'signal' },

    '3V3': { x: 0, y: 130, side: 'left', type: 'power' }
  }
},

  /* =========================================
     LED
  ========================================= */

  LED: {

    ref: 'D',

    category: 'output',

    width: 60,

    height: 34,

    color: '#ff4444',

    symbol: [

      /* wire left */

      {
        shape: 'line',
        x1: 0,
        y1: 17,
        x2: 16,
        y2: 17
      },

      /* diode triangle */

      {
        shape: 'polygon',

        points: [

          16,6,

          16,28,

          38,17
        ]
      },

      /* diode line */

      {
        shape: 'line',
        x1: 38,
        y1: 6,
        x2: 38,
        y2: 28
      },

      /* right wire */

      {
        shape: 'line',
        x1: 38,
        y1: 17,
        x2: 60,
        y2: 17
      },

      /* arrow 1 */

      {
        shape: 'line',
        x1: 26,
        y1: 4,
        x2: 34,
        y2: -6
      },

      {
        shape: 'line',
        x1: 34,
        y1: -6,
        x2: 31,
        y2: -1
      },

      {
        shape: 'line',
        x1: 34,
        y1: -6,
        x2: 28,
        y2: -6
      },

      /* arrow 2 */

      {
        shape: 'line',
        x1: 32,
        y1: 10,
        x2: 40,
        y2: 0
      },

      {
        shape: 'line',
        x1: 40,
        y1: 0,
        x2: 37,
        y2: 5
      },

      {
        shape: 'line',
        x1: 40,
        y1: 0,
        x2: 34,
        y2: 0
      }
    ],

    texts: [

      {
        text: 'LED',
        x: 0,
        y: 38,
        align: 'center',
        fontSize: 10,
        fontStyle: 'bold'
      }
    ],

    pins: {

      anode: {

        x: 0,
        y: 17,

        side: 'left',

        type: 'signal'
      },

      cathode: {

        x: 60,
        y: 17,

        side: 'right',

        type: 'ground'
      }
    }
  },

  /* =========================================
     RESISTOR
  ========================================= */

  Resistor: {

    ref: 'R',

    category: 'passive',

    width: 70,

    height: 24,

    color: '#ff9900',

    symbol: [

      {
        shape: 'line',
        x1: 0,
        y1: 12,
        x2: 12,
        y2: 12
      },

      {
        shape: 'polygon',

        points: [

          12,12,

          18,4,

          24,20,

          30,4,

          36,20,

          42,4,

          48,20,

          54,12
        ]
      },

      {
        shape: 'line',
        x1: 54,
        y1: 12,
        x2: 70,
        y2: 12
      }
    ],

    texts: [

      {
        text: 'R',
        x: 0,
        y: 26,
        align: 'center',
        fontSize: 10,
        fontStyle: 'bold'
      }
    ],

    pins: {

      pin1: {

        x: 0,
        y: 12,

        side: 'left',

        type: 'signal'
      },

      pin2: {

        x: 70,
        y: 12,

        side: 'right',

        type: 'signal'
      }
    }
  },

  /* =========================================
     RELAY
  ========================================= */

  Relay: {

    ref: 'K',

    category: 'output',

    width: 110,

    height: 90,

    color: '#cc0000',

    symbol: [

      {
        shape: 'rect',
        x: 20,
        y: 10,
        width: 50,
        height: 60
      },

      /* coil */

      {
        shape: 'circle',
        x: 45,
        y: 40,
        radius: 12
      },

      /* switch */

      {
        shape: 'line',
        x1: 76,
        y1: 30,
        x2: 96,
        y2: 20
      },

      {
        shape: 'line',
        x1: 96,
        y1: 20,
        x2: 96,
        y2: 60
      }
    ],

    texts: [

      {
        text: 'RELAY',
        x: 0,
        y: 74,
        align: 'center',
        fontSize: 10,
        fontStyle: 'bold'
      }
    ],

    pins: {

      VCC: { x: 0, y: 20, side: 'left', type: 'power' },
      GND: { x: 0, y: 45, side: 'left', type: 'ground' },
      IN:  { x: 0, y: 70, side: 'left', type: 'signal' },

      COM: { x: 110, y: 20, side: 'right', type: 'signal' },
      NO:  { x: 110, y: 45, side: 'right', type: 'signal' },
      NC:  { x: 110, y: 70, side: 'right', type: 'signal' }
    }
  },

  /* =========================================
     DHT11
  ========================================= */

  DHT11: {

    ref: 'U',

    category: 'sensor',

    width: 80,

    height: 90,

    color: '#0099ff',

    symbol: [

      {
        shape: 'rect',
        x: 0,
        y: 0,
        width: 80,
        height: 90
      }
    ],

    texts: [

      {
        text: 'DHT11',
        x: 0,
        y: 38,
        align: 'center',
        fontSize: 14,
        fontStyle: 'bold'
      }
    ],

    pins: {

      VCC: {

        x: 0,
        y: 20,

        side: 'left',

        type: 'power'
      },

      DATA: {

        x: 80,
        y: 45,

        side: 'right',

        type: 'signal'
      },

      GND: {

        x: 0,
        y: 70,

        side: 'left',

        type: 'ground'
      }
    }
  },

  /* =========================================
     OLED
  ========================================= */

  OLED: {

    ref: 'DS',

    category: 'display',

    width: 100,

    height: 70,

    color: '#ffffff',

    symbol: [

      {
        shape: 'rect',
        x: 0,
        y: 0,
        width: 100,
        height: 70
      },

      {
        shape: 'rect',
        x: 16,
        y: 16,
        width: 68,
        height: 34,
        filled: true
      }
    ],

    texts: [

      {
        text: 'OLED',
        x: 0,
        y: 54,
        align: 'center',
        fontSize: 12,
        fontStyle: 'bold'
      }
    ],

    pins: {

      VCC: {

        x: 0,
        y: 15,

        side: 'left',

        type: 'power'
      },

      GND: {

        x: 0,
        y: 35,

        side: 'left',

        type: 'ground'
      },

      SCL: {

        x: 0,
        y: 55,

        side: 'left',

        type: 'signal'
      },

      SDA: {

        x: 100,
        y: 35,

        side: 'right',

        type: 'signal'
      }
    }
  }
}

/* =========================================
   GET COMPONENT
========================================= */

export const getComponent = (

  componentType

) => {

  return COMPONENT_LIBRARY[componentType]
}

/* =========================================
   PIN COORDS
========================================= */

export const getPinCoords = (

  componentType,
  pinName,
  position

) => {

  const component =
    COMPONENT_LIBRARY[componentType]

  if (!component)
    return null

  const pin =
    component.pins[pinName]

  if (!pin)
    return null

  return {

    x: position.x + pin.x,

    y: position.y + pin.y,

    side: pin.side,

    type: pin.type
  }
}