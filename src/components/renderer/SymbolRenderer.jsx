import {

  Group,
  Rect,
  Line,
  Circle,
  Text

} from 'react-konva'

import {

  getComponent

} from '../library/index.js'

/* =========================================
   DRAW SHAPE
========================================= */

function DrawShape({

  shape,
  color,
  opacity = 1

}) {

  const stroke = color

  const fill = shape.filled

    ? color + '22'

    : 'transparent'

  /* RECT */

  if (shape.shape === 'rect') {

    return (

      <Rect

        x={shape.x}

        y={shape.y}

        width={shape.width}

        height={shape.height}

        fill={fill}

        stroke={stroke}

        strokeWidth={1.5}

        opacity={opacity}
      />
    )
  }

  /* LINE */

  if (shape.shape === 'line') {

    return (

      <Line

        points={[

          shape.x1,
          shape.y1,

          shape.x2,
          shape.y2
        ]}

        stroke={stroke}

        strokeWidth={1.5}

        lineCap='round'

        lineJoin='round'

        dash={
          shape.dashed
            ? [4, 3]
            : undefined
        }

        opacity={opacity}
      />
    )
  }

  /* POLYGON */

  if (shape.shape === 'polygon') {

    return (

      <Line

        points={shape.points}

        closed

        fill={
          shape.filled
            ? color + '22'
            : 'transparent'
        }

        stroke={stroke}

        strokeWidth={1.5}

        lineJoin='round'

        opacity={opacity}
      />
    )
  }

  /* CIRCLE */

  if (shape.shape === 'circle') {

    return (

      <Circle

        x={shape.x}

        y={shape.y}

        radius={shape.radius}

        fill={
          shape.filled
            ? color + '22'
            : 'transparent'
        }

        stroke={stroke}

        strokeWidth={1.5}

        opacity={opacity}
      />
    )
  }

  return null
}

/* =========================================
   DRAW PIN
========================================= */

function DrawPin({

  pinName,
  pin,
  color

}) {

  const isRight =
    pin.side === 'right'

  return (

    <Group>

      {/* pin line */}

      <Line

        points={

          isRight

            ? [

              pin.x - 18,
              pin.y,

              pin.x,
              pin.y
            ]

            : [

              pin.x,
              pin.y,

              pin.x + 18,
              pin.y
            ]
        }

        stroke={color}

        strokeWidth={1.5}
      />

      {/* junction */}

      <Circle

        x={pin.x}

        y={pin.y}

        radius={2.5}

        fill={color}
      />

      {/* label */}

      <Text

        x={
          isRight
            ? pin.x - 70
            : pin.x + 8
        }

        y={pin.y - 8}

        text={pinName}

        fontSize={8}

        fill='#666'

        width={60}

        align={
          isRight
            ? 'right'
            : 'left'
        }
      />

    </Group>
  )
}

/* =========================================
   DRAW TEXT
========================================= */

function DrawText({

  textDef,
  color

}) {

  return (

    <Text

      x={
        textDef.align === 'center'

          ? textDef.x

          : textDef.x
      }

      y={textDef.y}

      text={textDef.text}

      fontSize={textDef.fontSize}

      fontStyle={textDef.fontStyle}

      fill={color}

      width={120}

      align={
        textDef.align || 'left'
      }
    />
  )
}

/* =========================================
   DRAW POWER SYMBOLS
========================================= */

function DrawPowerSymbol({

  type,
  x,
  y

}) {

  if (type === 'vcc') {

    return (

      <Group>

        <Line

          points={[
            x,
            y,

            x,
            y - 20
          ]}

          stroke='#ff4444'

          strokeWidth={1.5}
        />

        <Line

          points={[

            x - 6,
            y - 14,

            x,
            y - 20,

            x + 6,
            y - 14
          ]}

          stroke='#ff4444'

          strokeWidth={1.5}
        />

      </Group>
    )
  }

  if (type === 'gnd') {

    return (

      <Group>

        <Line

          points={[
            x,
            y,

            x,
            y + 16
          ]}

          stroke='#00cc88'

          strokeWidth={1.5}
        />

        <Line

          points={[
            x - 10,
            y + 16,

            x + 10,
            y + 16
          ]}

          stroke='#00cc88'

          strokeWidth={2}
        />

        <Line

          points={[
            x - 6,
            y + 20,

            x + 6,
            y + 20
          ]}

          stroke='#00cc88'

          strokeWidth={2}
        />

      </Group>
    )
  }

  return null
}

/* =========================================
   MAIN RENDERER
========================================= */

export function SymbolRenderer({

  comp,
  onDragEnd

}) {

  const {

    type,
    x = 0,
    y = 0,
    value

  } = comp

  const meta =
    getComponent(type)

  /* fallback */

  if (!meta) {

    return (

      <Group

        x={x}
        y={y}

        draggable

        onDragEnd={onDragEnd}
      >

        <Rect

          width={80}

          height={60}

          fill='#111'

          stroke='#666'

          strokeWidth={2}
        />

        <Text

          text={type}

          fontSize={10}

          fill='#666'

          width={80}

          align='center'

          y={22}
        />

      </Group>
    )
  }

  const {

    color,
    symbol,
    pins,
    texts,
    width,
    height,
    ref,
    powerSymbols

  } = meta

  return (

    <Group

      x={x}

      y={y}

      draggable

      onDragEnd={onDragEnd}
    >

      {/* symbol */}

      {symbol?.map((s, i) => (

        <DrawShape

          key={`shape-${i}`}

          shape={s}

          color={color}
        />
      ))}

      {/* texts */}

      {texts?.map((t, i) => (

        <DrawText

          key={`text-${i}`}

          textDef={t}

          color={color}
        />
      ))}

      {/* pins */}

      {Object.entries(pins).map(

        ([pinName, pin]) => (

          <DrawPin

            key={`pin-${pinName}`}

            pinName={pinName}

            pin={pin}

            color={color}
          />
        )
      )}

      {/* value */}

      {value && (

        <Text

          text={value}

          fontSize={9}

          fill={color}

          x={0}

          y={-16}

          width={width}

          align='center'
        />
      )}

      {/* ref */}

      <Text

        text={

          ref

            ? `${ref}?`

            : type
        }

        fontSize={9}

        fill='#555'

        x={4}

        y={4}
      />

      {/* metadata-driven power symbols */}

      {powerSymbols?.map((p, i) => (

        <DrawPowerSymbol

          key={i}

          type={p.type}

          x={p.x}

          y={p.y}
        />
      ))}

    </Group>
  )
}