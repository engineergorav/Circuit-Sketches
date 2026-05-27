import {

  Group,
  Line,
  Text,
  Circle

} from 'react-konva'

import {

  getPinCoords

} from '../library/index.js'

import {

  buildNetList

} from '../engine/NetList.js'

import {

  generateRoute,
  getJunctions

} from '../engine/router.js'

/* =========================================
   COLORS
========================================= */

const WC = {

  signal: '#00ccff',

  power: '#ff5555',

  ground: '#00cc88',

  label: '#88ddff'
}

/* =========================================
   POWER SYMBOLS
========================================= */

function GNDSymbol({

  x,
  y

}) {

  return (

    <Group>

      <Line
        points={[x, y, x, y + 14]}
        stroke={WC.ground}
        strokeWidth={1.5}
      />

      <Line
        points={[x - 10, y + 14, x + 10, y + 14]}
        stroke={WC.ground}
        strokeWidth={2}
      />

      <Line
        points={[x - 6, y + 18, x + 6, y + 18]}
        stroke={WC.ground}
        strokeWidth={2}
      />

      <Line
        points={[x - 2, y + 22, x + 2, y + 22]}
        stroke={WC.ground}
        strokeWidth={2}
      />

      <Text
        text='GND'
        x={x - 12}
        y={y + 26}
        fontSize={8}
        fill={WC.ground}
      />

    </Group>
  )
}

function VCCSymbol({

  x,
  y

}) {

  return (

    <Group>

      <Line
        points={[x, y, x, y - 14]}
        stroke={WC.power}
        strokeWidth={1.5}
      />

      <Line
        points={[
          x - 6,
          y - 8,
          x,
          y - 14,
          x + 6,
          y - 8
        ]}
        stroke={WC.power}
        strokeWidth={1.5}
      />

      <Text
        text='VCC'
        x={x - 12}
        y={y - 28}
        fontSize={8}
        fill={WC.power}
      />

    </Group>
  )
}

/* =========================================
   JUNCTION DOT
========================================= */

function Junction({

  x,
  y

}) {

  return (

    <Circle

      x={x}

      y={y}

      radius={3.5}

      fill={WC.signal}
    />
  )
}

/* =========================================
   SIGNAL WIRE
========================================= */

function SignalWire({

  from,
  to,
  index,
  label

}) {

  if (!from || !to)
    return null

  const points =
    generateRoute(
      from,
      to,
      index
    )

  const junctions =
    getJunctions([points])

  return (

    <Group>

      {/* route */}

      <Line

        points={points}

        stroke={WC.signal}

        strokeWidth={1.6}

        lineCap='round'

        lineJoin='round'
      />

      {/* junctions */}

      {junctions.map((j, i) => (

        <Junction
          key={i}
          x={j.x}
          y={j.y}
        />
      ))}

      {/* net label */}

      {label && (

        <Text

          text={label}

          x={
            points[2] + 6
          }

          y={
            points[3] - 14
          }

          fontSize={9}

          fill={WC.label}
        />
      )}

    </Group>
  )
}

/* =========================================
   MAIN RENDERER
========================================= */

export function WireRenderer({

  connections,
  components,
  positions

}) {

  if (

    !connections ||

    !positions

  ) {

    return null
  }

  const nets =
    buildNetList(connections)

  return (

    <>

      {nets.map((net, netIndex) => {

        /* ==================================
           POWER NETS
        ================================== */

        if (net.isPower) {

          return (

            <Group key={net.name}>

              {net.pins.map((pin, i) => {

                const comp =
                  components.find(

                    c =>
                      c.id ===
                      pin.componentId
                  )

                if (!comp)
                  return null

                const pos =
                  positions[
                    pin.componentId
                  ]

                if (!pos)
                  return null

                const coords =
                  getPinCoords(

                    comp.type,
                    pin.pinName,
                    pos
                  )

                if (!coords)
                  return null

                return net.isGND

                  ? (
                    <GNDSymbol
                      key={i}
                      x={coords.x}
                      y={coords.y}
                    />
                  )

                  : (
                    <VCCSymbol
                      key={i}
                      x={coords.x}
                      y={coords.y}
                    />
                  )
              })}

            </Group>
          )
        }

        /* ==================================
           SIGNAL NETS
        ================================== */

        if (net.pins.length < 2)
          return null

        const first =
          net.pins[0]

        return (

          <Group key={net.name}>

            {net.pins.slice(1).map((pin, i) => {

              const fromComp =
                components.find(

                  c =>
                    c.id ===
                    first.componentId
                )

              const toComp =
                components.find(

                  c =>
                    c.id ===
                    pin.componentId
                )

              if (
                !fromComp ||
                !toComp
              ) return null

              const fromPos =
                positions[
                  first.componentId
                ]

              const toPos =
                positions[
                  pin.componentId
                ]

              if (
                !fromPos ||
                !toPos
              ) return null

              const from =
                getPinCoords(

                  fromComp.type,
                  first.pinName,
                  fromPos
                )

              const to =
                getPinCoords(

                  toComp.type,
                  pin.pinName,
                  toPos
                )

              if (!from || !to)
                return null

              return (

                <SignalWire

                  key={i}

                  from={from}

                  to={to}

                  index={

                    netIndex + i

                  }

                  label={net.name}
                />
              )
            })}

          </Group>
        )
      })}

    </>
  )
}