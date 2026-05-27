export const buttonTemplate = {

  name: 'button',

  keywords: [

    'button',

    'switch',

    'push button'
  ],

  components: [

    {
      id: 'b1',
      type: 'Button'
    }
  ],

  connections: [

    {
      from: 'b1.pin1',
      to: 'u1.GPIO4'
    },

    {
      from: 'b1.pin2',
      to: 'u1.GND'
    }
  ]
}