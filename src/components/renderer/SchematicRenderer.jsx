import {

  Stage,
  Layer,
  Rect,
  Group,
  Line

} from 'react-konva'

import {

  SymbolRenderer

} from './SymbolRenderer'

import {

  WireRenderer

} from './WireRenderer'

/* =========================================
   ENGINEERING GRID
========================================= */

function EngineeringGrid({

  width,
  height

}) {

  const GRID_SIZE = 20

  const lines = []

  /* Vertical */

  for (
    let x = 0;
    x <= width;
    x += GRID_SIZE
  ) {

    lines.push(

      <Line

        key={`v-${x}`}

        points={[
          x,
          0,
          x,
          height
        ]}

        stroke='#f2f2f2'

        strokeWidth={0.5}
      />
    )
  }

  /* Horizontal */

  for (
    let y = 0;
    y <= height;
    y += GRID_SIZE
  ) {

    lines.push(

      <Line

        key={`h-${y}`}

        points={[
          0,
          y,
          width,
          y
        ]}

        stroke='#f2f2f2'

        strokeWidth={0.5}
      />
    )
  }

  return <>{lines}</>
}

/* =========================================
   SCHEMATIC PAPER
========================================= */

function SchematicPaper({

  width,
  height

}) {

  return (

    <Group>

      <Rect

        x={0}

        y={0}

        width={width}

        height={height}

        fill='#ffffff'
      />

      <EngineeringGrid

        width={width}

        height={height}
      />

      {/* border */}

      <Rect

        x={20}

        y={20}

        width={width - 40}

        height={height - 40}

        stroke='#cc0000'

        strokeWidth={1.5}
      />

    </Group>
  )
}

/* =========================================
   MAIN RENDERER
========================================= */

export function SchematicRenderer({

  components,

  connections,

  positions,

  onDrag,

  width = 950,

  height = 650

}) {

  if (

    !components ||

    !positions ||

    Object.keys(positions).length === 0

  ) {

    return (

      <div

        style={{

          width,

          height,

          display: 'flex',

          alignItems: 'center',

          justifyContent: 'center',

          color: '#666',

          background: '#101010',

          borderRadius: '12px',

          border: '1px solid #222'
        }}
      >

        🔌 Your schematic will appear here

      </div>
    )
  }

  return (

    <div

      style={{

        background: '#0f0f0f',

        padding: '20px',

        borderRadius: '16px',

        border: '1px solid #222',

        overflow: 'hidden'
      }}
    >

      <Stage

        width={width}

        height={height}
      >

        <Layer>

          {/* schematic paper */}

          <SchematicPaper

            width={width}

            height={height}
          />

          {/* wires */}

          <WireRenderer

            connections={connections}

            components={components}

            positions={positions}
          />

          {/* symbols */}

          {components.map(comp => (

            <SymbolRenderer

              key={comp.id}

              comp={{

                ...comp,

                ...positions[comp.id]
              }}

              onDragEnd={(e) =>

                onDrag(

                  comp.id,

                  {

                    x: e.target.x(),

                    y: e.target.y()
                  }
                )
              }
            />
          ))}

        </Layer>

      </Stage>

    </div>
  )
}