import { Group, Rect, Text, Line, Circle } from 'react-konva'
import { COMPONENT_LIBRARY } from './library'

// Color scheme
const C = {
  body: '#0d0d1a',
  wire: '#00ccff',
  pinDot: '#00ccff',
  pinLabel: '#888888',
  junction: '#00ccff',
  vcc: '#ff4444',
  gnd: '#00ccff',
}

// ─── ESP32 Symbol ───────────────────────────────────────────
function ESP32Symbol({ x, y, onDragEnd }) {
  const lib = COMPONENT_LIBRARY.ESP32
  const { width: w, height: h, color, pins } = lib

  return (
    <Group x={x} y={y} draggable onDragEnd={onDragEnd}>
      {/* Body */}
      <Rect width={w} height={h} fill={C.body} stroke={color} strokeWidth={2} />

      {/* Reference + Name */}
      <Text text='U1' fontSize={9} fill={C.pinLabel} x={4} y={4} />
      <Text text='ESP32' fontSize={13} fontStyle='bold' fill={color} width={w} align='center' y={h/2 - 18} />
      <Text text='WROOM-32' fontSize={8} fill={C.pinLabel} width={w} align='center' y={h/2} />

      {/* Right side pins */}
      {Object.entries(pins).filter(([, p]) => p.side === 'right').map(([name, p]) => (
        <Group key={name}>
          <Line points={[w, p.y, w + 20, p.y]} stroke={color} strokeWidth={1.5} />
          <Text text={name} fontSize={8} fill={C.pinLabel} x={w - 52} y={p.y - 9} width={50} align='right' />
          <Circle x={w + 20} y={p.y} radius={2.5} fill={color} />
        </Group>
      ))}

      {/* Left side pins */}
      {Object.entries(pins).filter(([, p]) => p.side === 'left').map(([name, p]) => (
        <Group key={name}>
          <Line points={[0, p.y, -20, p.y]} stroke={color} strokeWidth={1.5} />
          <Text text={name} fontSize={8} fill={C.pinLabel} x={4} y={p.y - 9} />
          <Circle x={-20} y={p.y} radius={2.5} fill={color} />
        </Group>
      ))}

      {/* VCC top */}
      <Line points={[w/2, 0, w/2, -20]} stroke={C.vcc} strokeWidth={1.5} />
      <Line points={[w/2-6, -14, w/2, -20, w/2+6, -14]} stroke={C.vcc} strokeWidth={1.5} />
      <Text text='VCC' fontSize={8} fill={C.vcc} x={w/2 - 10} y={-32} />

      {/* GND bottom */}
      <Line points={[w/2, h, w/2, h+18]} stroke={C.gnd} strokeWidth={1.5} />
      <Line points={[w/2-8, h+12, w/2+8, h+12]} stroke={C.gnd} strokeWidth={1.5} />
      <Line points={[w/2-4, h+16, w/2+4, h+16]} stroke={C.gnd} strokeWidth={1.5} />
      <Text text='GND' fontSize={8} fill={C.gnd} x={w/2 - 10} y={h+20} />
    </Group>
  )
}

// ─── Arduino Symbol ──────────────────────────────────────────
function ArduinoSymbol({ x, y, onDragEnd }) {
  const lib = COMPONENT_LIBRARY.Arduino
  const { width: w, height: h, color, pins } = lib

  return (
    <Group x={x} y={y} draggable onDragEnd={onDragEnd}>
      <Rect width={w} height={h} fill={C.body} stroke={color} strokeWidth={2} />
      <Text text='U1' fontSize={9} fill={C.pinLabel} x={4} y={4} />
      <Text text='Arduino' fontSize={12} fontStyle='bold' fill={color} width={w} align='center' y={h/2 - 18} />
      <Text text='UNO' fontSize={9} fill={C.pinLabel} width={w} align='center' y={h/2} />

      {Object.entries(pins).filter(([, p]) => p.side === 'right').map(([name, p]) => (
        <Group key={name}>
          <Line points={[w, p.y, w+20, p.y]} stroke={color} strokeWidth={1.5} />
          <Text text={name} fontSize={8} fill={C.pinLabel} x={w-52} y={p.y-9} width={50} align='right' />
          <Circle x={w+20} y={p.y} radius={2.5} fill={color} />
        </Group>
      ))}

      {Object.entries(pins).filter(([, p]) => p.side === 'left').map(([name, p]) => (
        <Group key={name}>
          <Line points={[0, p.y, -20, p.y]} stroke={color} strokeWidth={1.5} />
          <Text text={name} fontSize={8} fill={C.pinLabel} x={4} y={p.y-9} />
          <Circle x={-20} y={p.y} radius={2.5} fill={color} />
        </Group>
      ))}

      <Line points={[w/2, 0, w/2, -20]} stroke={C.vcc} strokeWidth={1.5} />
      <Line points={[w/2-6, -14, w/2, -20, w/2+6, -14]} stroke={C.vcc} strokeWidth={1.5} />
      <Text text='VCC' fontSize={8} fill={C.vcc} x={w/2-10} y={-32} />

      <Line points={[w/2, h, w/2, h+18]} stroke={C.gnd} strokeWidth={1.5} />
      <Line points={[w/2-8, h+12, w/2+8, h+12]} stroke={C.gnd} strokeWidth={1.5} />
      <Line points={[w/2-4, h+16, w/2+4, h+16]} stroke={C.gnd} strokeWidth={1.5} />
      <Text text='GND' fontSize={8} fill={C.gnd} x={w/2-10} y={h+20} />
    </Group>
  )
}

// ─── LED Symbol ──────────────────────────────────────────────
function LEDSymbol({ x, y, onDragEnd, color = '#ff4444' }) {
  return (
    <Group x={x} y={y} draggable onDragEnd={onDragEnd}>
      {/* Anode wire */}
      <Line points={[-20, 15, 0, 15]} stroke={C.wire} strokeWidth={1.5} />
      {/* Triangle */}
      <Line points={[0, 0, 0, 30, 24, 15]} closed fill={color + '33'} stroke={color} strokeWidth={1.5} />
      {/* Cathode bar */}
      <Line points={[24, 0, 24, 30]} stroke={color} strokeWidth={2} />
      {/* Cathode wire */}
      <Line points={[24, 15, 44, 15]} stroke={C.wire} strokeWidth={1.5} />
      {/* Light rays */}
      <Line points={[28, 5, 36, -2]} stroke={color} strokeWidth={1.5} />
      <Line points={[28, 11, 38, 6]} stroke={color} strokeWidth={1.5} />
      {/* Pin dots */}
      <Circle x={-20} y={15} radius={2.5} fill={C.pinDot} />
      <Circle x={44} y={15} radius={2.5} fill={C.pinDot} />
      {/* Labels */}
      <Text text='D1' fontSize={9} fill={C.pinLabel} x={0} y={34} />
      <Text text='LED' fontSize={9} fill={color} x={0} y={44} width={44} align='center' />
      <Text text='A' fontSize={8} fill={C.pinLabel} x={-18} y={2} />
      <Text text='K' fontSize={8} fill={C.pinLabel} x={26} y={2} />
    </Group>
  )
}

// ─── Resistor Symbol ─────────────────────────────────────────
function ResistorSymbol({ x, y, onDragEnd, value = 'R' }) {
  const color = '#ff9900'
  return (
    <Group x={x} y={y} draggable onDragEnd={onDragEnd}>
      <Line points={[-20, 12, 0, 12]} stroke={C.wire} strokeWidth={1.5} />
      <Rect x={0} y={0} width={50} height={24} fill={C.body} stroke={color} strokeWidth={2} />
      <Line points={[50, 12, 70, 12]} stroke={C.wire} strokeWidth={1.5} />
      <Circle x={-20} y={12} radius={2.5} fill={C.pinDot} />
      <Circle x={70} y={12} radius={2.5} fill={C.pinDot} />
      <Text text={value} fontSize={9} fill={color} width={50} align='center' y={7} />
      <Text text='R1' fontSize={9} fill={C.pinLabel} x={0} y={27} />
      <Text text='1' fontSize={8} fill={C.pinLabel} x={-16} y={0} />
      <Text text='2' fontSize={8} fill={C.pinLabel} x={62} y={0} />
    </Group>
  )
}

// ─── Button Symbol ───────────────────────────────────────────
function ButtonSymbol({ x, y, onDragEnd }) {
  const color = '#00cc44'
  return (
    <Group x={x} y={y} draggable onDragEnd={onDragEnd}>
      <Line points={[-20, 15, 0, 15]} stroke={C.wire} strokeWidth={1.5} />
      <Line points={[0, 5, 0, 25]} stroke={color} strokeWidth={2} />
      <Line points={[30, 5, 30, 25]} stroke={color} strokeWidth={2} />
      <Line points={[2, 8, 28, 8]} stroke={color} strokeWidth={1.5} dash={[4, 3]} />
      <Line points={[30, 15, 50, 15]} stroke={C.wire} strokeWidth={1.5} />
      <Circle x={-20} y={15} radius={2.5} fill={C.pinDot} />
      <Circle x={50} y={15} radius={2.5} fill={C.pinDot} />
      <Text text='SW1' fontSize={9} fill={C.pinLabel} x={4} y={28} />
      <Text text='BTN' fontSize={9} fill={color} width={30} align='center' y={-14} />
    </Group>
  )
}

// ─── Buzzer Symbol ───────────────────────────────────────────
function BuzzerSymbol({ x, y, onDragEnd }) {
  const color = '#ff6600'
  return (
    <Group x={x} y={y} draggable onDragEnd={onDragEnd}>
      <Rect x={0} y={0} width={60} height={60} fill={C.body} stroke={color} strokeWidth={2} cornerRadius={30} />
      <Text text='BZ1' fontSize={9} fill={C.pinLabel} x={4} y={4} />
      <Text text='BUZZ' fontSize={10} fontStyle='bold' fill={color} width={60} align='center' y={22} />
      <Line points={[-20, 20, 0, 20]} stroke={C.wire} strokeWidth={1.5} />
      <Line points={[-20, 40, 0, 40]} stroke={C.wire} strokeWidth={1.5} />
      <Circle x={-20} y={20} radius={2.5} fill={C.pinDot} />
      <Circle x={-20} y={40} radius={2.5} fill={C.pinDot} />
      <Text text='+' fontSize={9} fill={C.vcc} x={4} y={13} />
      <Text text='-' fontSize={9} fill={C.gnd} x={4} y={33} />
    </Group>
  )
}

// ─── DHT11 Symbol ────────────────────────────────────────────
function DHT11Symbol({ x, y, onDragEnd }) {
  const color = '#0099ff'
  return (
    <Group x={x} y={y} draggable onDragEnd={onDragEnd}>
      <Rect x={0} y={0} width={70} height={80} fill={C.body} stroke={color} strokeWidth={2} />
      <Text text='S1' fontSize={9} fill={C.pinLabel} x={4} y={4} />
      <Text text='DHT11' fontSize={11} fontStyle='bold' fill={color} width={70} align='center' y={28} />
      <Text text='TEMP/HUM' fontSize={7} fill={C.pinLabel} width={70} align='center' y={44} />
      {[['VCC', 20], ['DATA', 40], ['GND', 60]].map(([name, py]) => (
        <Group key={name}>
          <Line points={[0, py, -20, py]} stroke={C.wire} strokeWidth={1.5} />
          <Circle x={-20} y={py} radius={2.5} fill={C.pinDot} />
          <Text text={name} fontSize={8} fill={C.pinLabel} x={4} y={py - 9} />
        </Group>
      ))}
      <Line points={[70, 40, 90, 40]} stroke={C.wire} strokeWidth={1.5} />
      <Circle x={90} y={40} radius={2.5} fill={C.pinDot} />
      <Text text='OUT' fontSize={8} fill={C.pinLabel} x={48} y={31} />
    </Group>
  )
}

// ─── Generic Sensor Symbol ───────────────────────────────────
function SensorSymbol({ x, y, onDragEnd, label = 'Sensor' }) {
  const color = '#9900ff'
  return (
    <Group x={x} y={y} draggable onDragEnd={onDragEnd}>
      <Rect x={0} y={0} width={70} height={80} fill={C.body} stroke={color} strokeWidth={2} />
      <Text text={label} fontSize={10} fontStyle='bold' fill={color} width={70} align='center' y={30} />
      {[['VCC', 20], ['DATA', 40], ['GND', 60]].map(([name, py]) => (
        <Group key={name}>
          <Line points={[0, py, -20, py]} stroke={C.wire} strokeWidth={1.5} />
          <Circle x={-20} y={py} radius={2.5} fill={C.pinDot} />
          <Text text={name} fontSize={8} fill={C.pinLabel} x={4} y={py - 9} />
        </Group>
      ))}
      <Line points={[70, 40, 90, 40]} stroke={C.wire} strokeWidth={1.5} />
      <Circle x={90} y={40} radius={2.5} fill={C.pinDot} />
      <Text text='OUT' fontSize={8} fill={C.pinLabel} x={48} y={31} />
    </Group>
  )
}

// ─── Main Component Renderer ─────────────────────────────────
export function CircuitComponent({ comp, onDrag }) {
  const { type, x, y, value } = comp
  const handleDragEnd = (e) => onDrag(comp.id, { x: e.target.x(), y: e.target.y() })
  const props = { x, y, onDragEnd: handleDragEnd }

  if (type === 'ESP32') return <ESP32Symbol {...props} />
  if (type === 'Arduino') return <ArduinoSymbol {...props} />
  if (type === 'LED') return <LEDSymbol {...props} />
  if (type === 'Resistor') return <ResistorSymbol {...props} value={value} />
  if (type === 'Button') return <ButtonSymbol {...props} />
  if (type === 'Buzzer') return <BuzzerSymbol {...props} />
  if (type === 'DHT11') return <DHT11Symbol {...props} />
  return <SensorSymbol {...props} label={type} />
}

// ─── Wire Router ─────────────────────────────────────────────
export function WireRouter({ connections, components, positions }) {
  if (!connections || !positions || Object.keys(positions).length === 0) return null

  const getPin = (compId, pinName) => {
    const pos = positions[compId]
    const comp = components.find(c => c.id === compId)
    if (!pos || !comp) return null

    const lib = COMPONENT_LIBRARY[comp.type]
    if (!lib) return null

    const pin = lib.pins[pinName]
    if (!pin) {
      // Fallback — use right side of component
      return { x: pos.x + lib.width + 20, y: pos.y + lib.height / 2 }
    }

    return { x: pos.x + pin.x, y: pos.y + pin.y }
  }

  return (
    <>
      {connections.map((conn, i) => {
        const fromId = conn.from.split('.')[0]
        const fromPin = conn.from.split('.')[1]
        const toId = conn.to.split('.')[0]
        const toPin = conn.to.split('.')[1]

        const from = getPin(fromId, fromPin)
        const to = getPin(toId, toPin)
        if (!from || !to) return null

        const midX = (from.x + to.x) / 2

        return (
          <Group key={i}>
            {/* Orthogonal wire */}
            <Line
              points={[from.x, from.y, midX, from.y, midX, to.y, to.x, to.y]}
              stroke='#00ccff'
              strokeWidth={1.5}
              tension={0}
            />
            {/* Junction dots */}
            <Circle x={from.x} y={from.y} radius={3} fill='#00ccff' />
            <Circle x={to.x} y={to.y} radius={3} fill='#00ccff' />
            {/* Pin name labels */}
            <Text
              x={from.x + 4}
              y={from.y - 14}
              text={fromPin}
              fontSize={8}
              fill='#0088aa'
              fontStyle='bold'
            />
            <Text
              x={to.x - 30}
              y={to.y - 14}
              text={toPin}
              fontSize={8}
              fill='#0088aa'
              fontStyle='bold'
            />
          </Group>
        )
      })}
    </>
  )
}