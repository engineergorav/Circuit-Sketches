import { useState } from 'react'
import Groq from 'groq-sdk'

import { SchematicView }
from './components/renderer/SchematicView'

import './App.css'

const groq = new Groq({

  apiKey:
    import.meta.env.VITE_GROQ_API_KEY,

  dangerouslyAllowBrowser: true
})

function App() {

  const [prompt, setPrompt] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [response, setResponse] =
    useState(null)

  /* =========================================
     CLEAN AI RESPONSE
  ========================================= */

  const extractJSON = (text) => {

    if (!text)
      return null

    let clean = text

      .replace(/```json/g, '')

      .replace(/```/g, '')

      .trim()

    const start =
      clean.indexOf('{')

    const end =
      clean.lastIndexOf('}')

    if (
      start === -1 ||
      end === -1
    ) {

      throw new Error(
        'No valid JSON found'
      )
    }

    clean =
      clean.slice(start, end + 1)

    return JSON.parse(clean)
  }

  /* =========================================
     GENERATE CIRCUIT
  ========================================= */

  const generateCircuit = async () => {

    if (!prompt || loading)
      return

    setLoading(true)

    try {

      const completion =
        await groq.chat.completions.create({

          model:
            'llama-3.3-70b-versatile',

          temperature: 0.2,

          messages: [

            {
              role: 'system',

              content: `You are an electronics expert.

Always respond with ONLY valid JSON.

Never include markdown.

Never include explanations.

Never include comments.

Never include x/y coordinates.

Use only supported component types.

Code must use escaped newlines like \\n.`
            },

            {
              role: 'user',

              content: `The user wants:

"${prompt}"

Return ONLY this JSON format:

{
  "components": [
    {
      "id": "u1",
      "type": "ESP32"
    }
  ],

  "connections": [
    {
      "from": "u1.GPIO2",
      "to": "d1.anode"
    }
  ],

  "code": "void setup() {\\n}"

}

Allowed components:
ESP32
Arduino
LED
Resistor
Button
Buzzer
DHT11
Sensor
OLED
Relay

ESP32 pins:
GPIO2
GPIO4
GPIO5
GPIO12
GPIO13
GPIO14
GPIO15
GND
VIN
3V3

LED pins:
anode
cathode

Resistor pins:
pin1
pin2

Button pins:
pin1
pin2

DHT11 pins:
VCC
DATA
GND

Relay pins:
VCC
GND
IN
COM
NO
NC

OLED pins:
VCC
GND
SCL
SDA`
            }
          ]
        })

      const raw =
        completion.choices[0]
        ?.message
        ?.content

      console.log(
        'RAW AI RESPONSE:',
        raw
      )

      const parsed =
        extractJSON(raw)

      /* code formatting */

      if (parsed.code) {

        parsed.code =
          parsed.code

            .replace(/\\n/g, '\n')

            .replace(/\\t/g, '\t')
      }

      console.log(
        'PARSED:',
        parsed
      )

      setResponse(parsed)

    } catch (error) {

      console.error(
        'Error:',
        error
      )

      alert(
        'AI returned invalid data. Check console.'
      )
    }

    setLoading(false)
  }

  /* =========================================
     UI
  ========================================= */

  return (

    <div className='app'>

      {/* HEADER */}

      <div className='header'>

        <h1>
          ⚡ AI Circuit Builder
        </h1>

        <p>
          Describe your circuit in plain English
        </p>

      </div>

      {/* INPUT */}

      <div className='input-section'>

        <input

          type='text'

          className='prompt-input'

          placeholder='e.g. Blink LED with ESP32'

          value={prompt}

          onChange={(e) =>
            setPrompt(e.target.value)
          }

          onKeyDown={(e) => {

            if (e.key === 'Enter') {

              generateCircuit()
            }
          }}
        />

        <button

          className='generate-btn'

          onClick={generateCircuit}

          disabled={loading}
        >

          {
            loading

              ? 'Generating...'

              : 'Generate Circuit'
          }

        </button>

      </div>

      {/* SCHEMATIC */}

      <div

        style={{

          margin: '20px',

          border:
            '1px solid #222',

          borderRadius: '10px',

          overflow: 'auto',

          background: '#ffffff'
        }}
      >

        {

          response

            ? (

              <SchematicView

                components={
                  response.components
                }

                connections={
                  response.connections
                }

                title={prompt}

                width={1200}

                height={800}
              />
            )

            : (

              <div

                style={{

                  height: '800px',

                  display: 'flex',

                  alignItems: 'center',

                  justifyContent: 'center',

                  color: '#777',

                  fontSize: '1rem'
                }}
              >

                🔌 Your schematic
                will appear here

              </div>
            )
        }

      </div>

      {/* CODE */}

      {

        response?.code && (

          <div

            style={{

              margin: '20px',

              background: '#0d1117',

              color: '#00ff88',

              borderRadius: '10px',

              padding: '20px',

              overflowX: 'auto',

              fontFamily: 'monospace',

              whiteSpace: 'pre-wrap'
            }}
          >

            {response.code}

          </div>
        )
      }

    </div>
  )
}

export default App