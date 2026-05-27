import { useEffect, useState } from 'react'

import {
  Stage,
  Layer,
  Rect,
  Line,
  Text,
  Group,
  Circle
} from 'react-konva'

import {

  getComponent,
  getPinCoords

} from '../library/index.js'

import {

  autoLayout

} from '../engine/autoLayout.js'

import {

  buildNetList

} from '../engine/NetList.js'

const SC = {

  border: '#cc0000',

  component: '#cc0000',

  wire: '#00aa88',

  background: '#ffffff',

  text: '#cc0000',

  pinLabel: '#cc0000',

  netLabel: '#008866',

  grid: '#ffdddd',

  gnd: '#cc0000',

  vcc: '#cc0000',
}

/* =========================================
   GRID BORDER
========================================= */

function GridBorder({ width, height }) {

  const BORDER = 40

  const rows = ['A', 'B', 'C', 'D', 'E']

  const cols = [1, 2, 3, 4, 5, 6]

  const cellW =
    (width - BORDER * 2) / cols.length

  const cellH =
    (height - BORDER * 2) / rows.length

  return (

    <Group>

      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={SC.background}
      />

      <Rect
        x={BORDER}
        y={BORDER}
        width={width - BORDER * 2}
        height={height - BORDER * 2}
        fill='transparent'
        stroke={SC.border}
        strokeWidth={2}
      />

      {rows.map((r, i) => (

        <Text
          key={r}

          x={8}

          y={
            BORDER +
            i * cellH +
            cellH / 2 -
            6
          }

          text={r}

          fontSize={12}

          fill={SC.border}

          fontStyle='bold'
        />
      ))}

      {cols.map((c, i) => (

        <Text
          key={c}

          x={
            BORDER +
            i * cellW +
            cellW / 2 -
            4
          }

          y={12}

          text={String(c)}

          fontSize={12}

          fill={SC.border}

          fontStyle='bold'
        />
      ))}

    </Group>
  )
}

/* =========================================
   TITLE BLOCK
========================================= */

function TitleBlock({

  width,
  height,
  title

}) {

  const bx = width - 320

  const by = height - 90

  return (

    <Group>

      <Rect

        x={bx}

        y={by}

        width={280}

        height={70}

        fill='white'

        stroke={SC.border}

        strokeWidth={1.5}
      />

      <Line

        points={[
          bx,
          by + 22,
          bx + 280,
          by + 22
        ]}

        stroke={SC.border}

        strokeWidth={1}
      />

      <Text

        text='Title:'

        fontSize={9}

        fill={SC.text}

        x={bx + 6}

        y={by + 6}
      />

      <Text

        text={
          title ||
          'AI Circuit Builder'
        }

        fontSize={9}

        fill={SC.text}

        x={bx + 40}

        y={by + 6}

        width={230}
      />

      <Text

        text={`Date: ${new Date().toLocaleDateString()}`}

        fontSize={9}

        fill={SC.text}

        x={bx + 6}

        y={by + 28}
      />

    </Group>
  )
}

/* =========================================
   POWER SYMBOLS
========================================= */

function GNDSymbol({ x, y }) {

  return (

    <Group>

      <Line
        points={[x, y, x, y + 16]}
        stroke={SC.gnd}
        strokeWidth={1.5}
      />

      <Line
        points={[x - 10, y + 16, x + 10, y + 16]}
        stroke={SC.gnd}
        strokeWidth={2}
      />

      <Line
        points={[x - 6, y + 20, x + 6, y + 20]}
        stroke={SC.gnd}
        strokeWidth={2}
      />

      <Line
        points={[x - 2, y + 24, x + 2, y + 24]}
        stroke={SC.gnd}
        strokeWidth={2}
      />

      <Text
        text='GND'
        fontSize={8}
        fill={SC.gnd}
        x={x - 10}
        y={y + 28}
      />

    </Group>
  )
}

function VCCSymbol({ x, y }) {

  return (

    <Group>

      <Line
        points={[x, y, x, y - 16]}
        stroke={SC.vcc}
        strokeWidth={1.5}
      />

      <Line
        points={[
          x - 6,
          y - 10,
          x,
          y - 16,
          x + 6,
          y - 10
        ]}
        stroke={SC.vcc}
        strokeWidth={1.5}
      />

      <Text
        text='VCC'
        fontSize={8}
        fill={SC.vcc}
        x={x - 10}
        y={y - 30}
      />

    </Group>
  )
}

/* =========================================
   SCHEMATIC SYMBOL
========================================= */

function SchematicSymbol({

  comp,
  onDragEnd

}) {

  const meta =
    getComponent(comp.type)

  if (!meta)
    return null

  const w = meta.width

  const h = meta.height

  return (

    <Group

      x={comp.x}

      y={comp.y}

      draggable

      onDragEnd={onDragEnd}
    >

      <Rect

        width={w}

        height={h}

        fill='white'

        stroke={SC.component}

        strokeWidth={1.5}
      />

      <Text

        text={comp.type}

        fontSize={11}

        fontStyle='bold'

        fill={SC.text}

        width={w}

        align='center'

        y={h / 2 - 8}
      />

      {Object.entries(meta.pins).map(

        ([pinName, pin]) => (

          <Group key={pinName}>

            <Line

              points={
                pin.side === 'right'

                  ? [w, pin.y, w + 20, pin.y]

                  : [-20, pin.y, 0, pin.y]
              }

              stroke={SC.component}

              strokeWidth={1.5}
            />

            <Circle

              x={
                pin.side === 'right'

                  ? w + 20

                  : -20
              }

              y={pin.y}

              radius={2.5}

              fill={SC.component}
            />

            <Text

              x={
                pin.side === 'right'

                  ? w - 54

                  : 4
              }

              y={pin.y - 9}

              text={pinName}

              fontSize={7}

              fill={SC.pinLabel}

              width={52}

              align={
                pin.side === 'right'

                  ? 'right'

                  : 'left'
              }
            />

          </Group>
        )
      )}

    </Group>
  )
}

/* =========================================
   MAIN VIEW
========================================= */

export function SchematicView({

  components,
  connections,
  title,
  width = 1100,
  height = 750

}) {

  const [positions, setPositions] =
    useState({})

  /* ======================================
     AUTO LAYOUT
  ====================================== */

  useEffect(() => {

    if (
      components &&
      components.length > 0
    ) {

      setPositions(
        autoLayout(
          components,
          connections
      )
      )
    }

  }, [components])

  const nets =
    connections
      ? buildNetList(connections)
      : []

  /* ======================================
     RENDER NETS
  ====================================== */

  const renderNets = () => {

    if (
      !connections ||
      Object.keys(positions).length === 0
    ) {

      return null
    }

    return nets.map((net, netIndex) => {

      /* ==============================
         POWER NETS
      ============================== */

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

      /* ==============================
         SIGNAL NETS
      ============================== */

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

            const offset =
              30 + ((i + netIndex) * 8)

            return (

              <Group key={i}>

                <Line

                  points={[

                    from.x,
                    from.y,

                    from.x + offset,
                    from.y,

                    from.x + offset,
                    to.y,

                    to.x,
                    to.y
                  ]}

                  stroke={SC.wire}

                  strokeWidth={1.5}

                  lineCap='round'

                  lineJoin='round'
                />

                <Circle
                  x={from.x}
                  y={from.y}
                  radius={3}
                  fill={SC.wire}
                />

                <Circle
                  x={to.x}
                  y={to.y}
                  radius={3}
                  fill={SC.wire}
                />

                <Text

                  text={net.name}

                  x={
                    from.x +
                    offset +
                    4
                  }

                  y={
                    from.y - 12
                  }

                  fontSize={8}

                  fill={SC.netLabel}
                />

              </Group>
            )
          })}

        </Group>
      )
    })
  }

  return (

    <div style={{ position: 'relative' }}>

      <Stage

        width={width}

        height={height}
      >

        <Layer>

          <GridBorder
            width={width}
            height={height}
          />

          {renderNets()}

          {components?.map(comp => (

            <SchematicSymbol

              key={comp.id}

              comp={{
                ...comp,
                ...positions[comp.id]
              }}

              onDragEnd={(e) =>

                setPositions(prev => ({

                  ...prev,

                  [comp.id]: {

                    x: e.target.x(),

                    y: e.target.y()
                  }
                }))
              }
            />
          ))}

          <TitleBlock
            width={width}
            height={height}
            title={title}
          />

        </Layer>

      </Stage>

    </div>
  )
}