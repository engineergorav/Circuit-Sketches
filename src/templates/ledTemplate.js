export const ledTemplate = {

  components: [

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
      from: 'MCU.GPIO',
      to: 'r1.pin1'
    },

    {
      from: 'r1.pin2',
      to: 'd1.anode'
    },

    {
      from: 'd1.cathode',
      to: 'MCU.GND'
    }
  ]
}