import { useState } from 'react'

import Groq from 'groq-sdk'

import {

  SchematicView

} from './components/renderer/SchematicView'

import {

  buildCircuitFromTemplates

} from './templates/templateEngine'

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
     GENERATE CIRCUIT
  ========================================= */

  const generateCircuit = async () => {

    if (!prompt || loading)
      return

    setLoading(true)

    try {

      /* ======================================
         TEMPLATE ENGINE
      ====================================== */

      const circuit =

        buildCircuitFromTemplates(
          prompt
        )

      /* ======================================
         AI CODE GENERATION
      ====================================== */

      const completion =

        await groq.chat.completions.create({

          model:
            'llama-3.3-70b-versatile',

          temperature: 0.2,

          messages: [

            {
              role: 'system',

              content: `You are an ESP32 and Arduino expert.

Generate ONLY valid code.

No markdown.

No explanations.

No extra text.`
            },

            {
              role: 'user',

              content: `Write code for:

"${prompt}"

Using ESP32.`
            }
          ]
        })

      const rawCode =

        completion.choices[0]
        ?.message
        ?.content || ''

      circuit.code =

        rawCode

          .replace(/```cpp/g, '')

          .replace(/```/g, '')

          .trim()

      console.log(
        'TEMPLATE CIRCUIT:',
        circuit
      )

      setResponse(circuit)

    } catch (error) {

      console.error(
        'Error:',
        error
      )

      alert(
        'Generation failed.'
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