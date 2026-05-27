export const ledTemplate = {

  name: 'led',

  keywords: [

    'led',

    'blink',

    'light'
  ],

  components: [

    {
      id: 'u1',
      type: 'ESP32'
    },

    {
      id: 'r1',
      type: 'Resistor',
      value: '220Ω'
    },

    {
      id: 'd1',
      type: 'LED'
    }
  ],

  connections: [

    {
      from: 'u1.GPIO2',
      to: 'r1.pin1'
    },

    {
      from: 'r1.pin2',
      to: 'd1.anode'
    },

    {
      from: 'd1.cathode',
      to: 'u1.GND'
    }
  ]
}