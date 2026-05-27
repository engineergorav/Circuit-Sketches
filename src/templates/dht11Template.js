export const dht11Template = {

  name: 'dht11',

  keywords: [
    'temperature',
    'humidity',
    'dht11'
  ],

  components: [

    {
      id: 'dht1',
      type: 'DHT11'
    }
  ],

  connections: [

    {
      from: 'dht1.VCC',
      to: 'MCU.3V3'
    },

    {
      from: 'dht1.DATA',
      to: 'MCU.GPIO4'
    },

    {
      from: 'dht1.GND',
      to: 'MCU.GND'
    }
  ]
}