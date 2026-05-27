import {

  COMPONENT_LIBRARY

} from '../library/index.js'

/* =========================================
   HELPERS
========================================= */

const getRole = (type) => {

  const component =
    COMPONENT_LIBRARY[type]

  if (!component)
    return 'misc'

  return (
    component.category ||
    'misc'
  )
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

  const mcu =

    components.find(

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

    x: 320,

    y: 260
  }

  /* ======================================
     BUILD CONNECTION MAP
  ====================================== */

  const connectedMap = {}

  connections.forEach((conn) => {

    const [fromComp] =
      conn.from.split('.')

    const [toComp] =
      conn.to.split('.')

    if (!connectedMap[fromComp]) {

      connectedMap[fromComp] = []
    }

    if (!connectedMap[toComp]) {

      connectedMap[toComp] = []
    }

    connectedMap[fromComp]
      .push(toComp)

    connectedMap[toComp]
      .push(fromComp)
  })

  /* ======================================
     PLACE CONNECTED COMPONENTS
  ====================================== */

  let leftY  = 180
  let rightY = 180

  components.forEach((comp) => {

    if (comp.id === mcu.id)
      return

    const role =
      getRole(comp.type)

    const connectedToMCU =

      connections.some((conn) => {

        return (

          conn.from.startsWith(
            mcu.id
          ) &&

          conn.to.startsWith(
            comp.id
          )

        ) ||

        (

          conn.to.startsWith(
            mcu.id
          ) &&

          conn.from.startsWith(
            comp.id
          )
        )
      })

    /* ====================================
       INPUTS LEFT
    ==================================== */

    if (

      role === 'input' ||

      role === 'sensor'
    ) {

      positions[comp.id] = {

        x: 120,

        y: leftY
      }

      leftY += 140

      return
    }

    /* ====================================
       PASSIVES CENTER-RIGHT
    ==================================== */

    if (

      role === 'passive'
    ) {

      positions[comp.id] = {

        x: 520,

        y: 240
      }

      return
    }

    /* ====================================
       OUTPUTS RIGHT
    ==================================== */

    if (

      role === 'output' ||

      role === 'display'
    ) {

      positions[comp.id] = {

        x: 720,

        y: rightY
      }

      rightY += 140

      return
    }

    /* ====================================
       DEFAULT
    ==================================== */

    positions[comp.id] = {

      x: 600,

      y: 300
    }
  })

  return positions
}