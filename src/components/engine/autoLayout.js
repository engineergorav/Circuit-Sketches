export const autoLayout = (

  components,
  connections = []

) => {

  const positions = {}

  /* ======================================
     ROLE SYSTEM
  ====================================== */

  const getRole = (type) => {

    if (
      type === 'ESP32' ||
      type === 'Arduino'
    ) return 'mcu'

    if (
      type === 'Button' ||
      type === 'DHT11' ||
      type === 'Sensor'
    ) return 'input'

    if (
      type === 'Resistor'
    ) return 'passive'

    return 'output'
  }

  /* ======================================
     FIND MCU
  ====================================== */

  const mcu = components.find(

    c =>
      getRole(c.type) === 'mcu'
  )

  if (!mcu)
    return positions

  /* ======================================
     PLACE MCU
  ====================================== */

  positions[mcu.id] = {

    x: 220,

    y: 300
  }

  /* ======================================
     HELPERS
  ====================================== */

  const findComponent = (id) => {

    return components.find(
      c => c.id === id
    )
  }

  const getConnectedComponents = (id) => {

    return connections.map(conn => {

      const fromId =
        conn.from.split('.')[0]

      const toId =
        conn.to.split('.')[0]

      if (fromId === id)
        return toId

      if (toId === id)
        return fromId

      return null

    }).filter(Boolean)
  }

  /* ======================================
     PLACE OUTPUT CHAINS
  ====================================== */

  let currentY = 280

  components.forEach(comp => {

    if (comp.id === mcu.id)
      return

    const role =
      getRole(comp.type)

    /* ====================================
       PASSIVES
    ==================================== */

    if (role === 'passive') {

      positions[comp.id] = {

        x: 520,

        y: currentY
      }

      return
    }

    /* ====================================
       OUTPUTS
    ==================================== */

    if (role === 'output') {

      const connected =
        getConnectedComponents(comp.id)

      const hasResistor =
        connected.some(id => {

          const c =
            findComponent(id)

          return c?.type === 'Resistor'
        })

      positions[comp.id] = {

        x: hasResistor
          ? 760
          : 520,

        y: currentY
      }

      currentY += 180
    }

    /* ====================================
       INPUTS
    ==================================== */

    if (role === 'input') {

      positions[comp.id] = {

        x: 40,

        y: currentY
      }

      currentY += 180
    }
  })

  return positions
}