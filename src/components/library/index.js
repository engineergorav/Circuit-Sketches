// =========================================
// COMPONENT LIBRARY INDEX
// Single source of truth
// =========================================

import { ESP32 } from './esp32'
import { LED } from './led'
import { RESISTOR } from './resistor'
import { BUTTON } from './button'
import { BUZZER } from './buzzer'
import { DHT11 } from './dht11'

/* =========================================
   MAIN COMPONENT LIBRARY
========================================= */

export const COMPONENT_LIBRARY = {

  ESP32,

  LED,

  Resistor: RESISTOR,

  Button: BUTTON,

  Buzzer: BUZZER,

  DHT11,
}

/* =========================================
   GET COMPONENT
========================================= */

export const getComponent = (type) => {

  return COMPONENT_LIBRARY[type] || null
}

/* =========================================
   GET PIN COORDS
========================================= */

export const getPinCoords = (

  type,
  pinName,
  compPos

) => {

  const comp =
    getComponent(type)

  if (!comp)
    return null

  const pin =
    comp.pins[pinName]

  if (!pin)
    return null

  return {

    x: compPos.x + pin.x,

    y: compPos.y + pin.y,

    side: pin.side,

    type: pin.type
  }
}

/* =========================================
   COMPONENT ROLE SYSTEM
========================================= */

const ROLES = {

  ESP32: 'mcu',

  Arduino: 'mcu',

  Button: 'input',

  LDR: 'input',

  DHT11: 'input',

  Sensor: 'input',

  LED: 'output',

  Buzzer: 'output',

  Relay: 'output',

  Servo: 'output',

  OLED: 'output',

  Resistor: 'passive',
}

const getRole = (type) => {

  return ROLES[type] || 'output'
}

/* =========================================
   AUTO LAYOUT ENGINE
========================================= */

export const autoLayout = (

  components,
  connections = []

) => {

  const positions = {}

  /* ======================================
     FIND MCU
  ====================================== */

  const mcu = components.find(

    c =>
      c.type === 'ESP32' ||
      c.type === 'Arduino'
  )

  if (!mcu)
    return positions

  /* ======================================
     PLACE MCU CENTER
  ====================================== */

  positions[mcu.id] = {

    x: 300,

    y: 220
  }

  /* ======================================
     HELPERS
  ====================================== */

  const getConnectedTo = (id) => {

    return connections.filter(conn => {

      return (
        conn.from.startsWith(id + '.') ||
        conn.to.startsWith(id + '.')
      )
    })
  }

  const getComponentByPin = (pinRef) => {

    const compId =
      pinRef.split('.')[0]

    return components.find(
      c => c.id === compId
    )
  }

  /* ======================================
     PLACE COMPONENTS
  ====================================== */

  let rightX = 520

  let leftX = 120

  let outputY = 180

  let inputY = 180

  components.forEach(comp => {

    if (comp.id === mcu.id)
      return

    const role = getRole(comp.type)

    /* ====================================
       INPUTS
    ==================================== */

    if (role === 'input') {

      positions[comp.id] = {

        x: leftX,

        y: inputY
      }

      inputY += 160

      return
    }

    /* ====================================
       PASSIVES
    ==================================== */

    if (role === 'passive') {

      const nets =
        getConnectedTo(comp.id)

      let connectedOutput =
        null

      nets.forEach(net => {

        const other =
          getComponentByPin(
            net.from.includes(comp.id)
              ? net.to
              : net.from
          )

        if (
          other &&
          getRole(other.type)
            === 'output'
        ) {

          connectedOutput = other
        }
      })

      positions[comp.id] = {

        x: 520,

        y: outputY
      }

      return
    }

    /* ====================================
       OUTPUTS
    ==================================== */

    if (role === 'output') {

      positions[comp.id] = {

        x: 760,

        y: outputY
      }

      outputY += 160
    }
  })

  return positions
}