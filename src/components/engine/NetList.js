export const isGNDNet = (name) => {

  const u = name.toUpperCase()

  return (
    u === 'GND' ||
    u === 'GROUND' ||
    u === 'VSS'
  )
}

export const isVCCNet = (name) => {

  const u = name.toUpperCase()

  return (
    u === 'VCC' ||
    u === '5V' ||
    u === '3V3' ||
    u === 'VIN' ||
    u === 'POWER'
  )
}

export const isPowerNet = (name) => {

  return (
    isGNDNet(name) ||
    isVCCNet(name)
  )
}

const normalizeNetName = (pinName) => {

  if (isGNDNet(pinName)) return 'GND'

  if (isVCCNet(pinName)) return 'VCC'

  return pinName.toUpperCase()
}

/* =========================================
   BUILD NETLIST
========================================= */

export const buildNetList = (connections) => {

  const nets = {}

  connections.forEach((conn) => {

    const [fromComp, fromPin] =
      conn.from.split('.')

    const [toComp, toPin] =
      conn.to.split('.')

    const fromNet =
      normalizeNetName(fromPin)

    const toNet =
      normalizeNetName(toPin)

    let netName = ''

    /* ==============================
       POWER NET PRIORITY
    ============================== */

    if (
      fromNet === 'GND' ||
      toNet === 'GND'
    ) {

      netName = 'GND'
    }

    else if (
      fromNet === 'VCC' ||
      toNet === 'VCC'
    ) {

      netName = 'VCC'
    }

    else {

      netName = fromNet
    }

    /* ==============================
       CREATE NET
    ============================== */

    if (!nets[netName]) {

      nets[netName] = {

        name: netName,

        isGND: netName === 'GND',

        isVCC: netName === 'VCC',

        isPower: isPowerNet(netName),

        pins: []
      }
    }

    /* ==============================
       ADD PINS
    ============================== */

    nets[netName].pins.push({

      componentId: fromComp,

      pinName: fromPin
    })

    nets[netName].pins.push({

      componentId: toComp,

      pinName: toPin
    })
  })

  /* ==============================
     REMOVE DUPLICATES
  ============================== */

  Object.values(nets).forEach((net) => {

    net.pins =
      net.pins.filter(

        (pin, index, self) => {

          return index === self.findIndex(

            (p) => (

              p.componentId === pin.componentId &&
              p.pinName === pin.pinName
            )
          )
        }
      )
  })

  return Object.values(nets)
}