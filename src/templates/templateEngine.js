import { ledTemplate } from './ledTemplate'
import { buttonTemplate } from './buttonTemplate'
const templates = [

  ledTemplate,

  buttonTemplate

]

/* =========================================
   DETECT TEMPLATES
========================================= */

function detectTemplates(prompt) {

  const lower = prompt.toLowerCase()

  return templates.filter((template) => {

    if (!template.keywords)
      return false

    return template.keywords.some((keyword) => {

      return lower.includes(
        keyword.toLowerCase()
      )
    })
  })
}

/* =========================================
   BUILD CIRCUIT
========================================= */

export function buildCircuitFromTemplates(prompt) {

  const matchedTemplates =
    detectTemplates(prompt)

  if (matchedTemplates.length === 0) {

    return {

      components: [
        {
          id: 'u1',
          type: 'ESP32'
        }
      ],

      connections: [],

      code:
        '// No matching template found'
    }
  }

  const finalCircuit = {

    components: [],

    connections: [],

    code: ''
  }

  matchedTemplates.forEach((template) => {

    if (template.components) {

      finalCircuit.components.push(
        ...template.components
      )
    }

    if (template.connections) {

      finalCircuit.connections.push(
        ...template.connections
      )
    }
  })

  return finalCircuit
}