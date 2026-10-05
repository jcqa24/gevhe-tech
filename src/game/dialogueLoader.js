import { parseDialogue } from './dialogueParser'

const dialogueFiles = import.meta.glob(
  '../data/characters/*.txt',
  {
    query: '?raw',
    import: 'default',
    eager: true
  }
)

console.log('ARCHIVOS TXT ENCONTRADOS:', dialogueFiles)

const dialogues = {}

for (const path in dialogueFiles) {
  const fileName = path
    .split('/')
    .pop()
    .replace('.txt', '')

  console.log('Cargando:', fileName)

  dialogues[fileName] = parseDialogue(
    dialogueFiles[path]
  )
}

console.log('DIÁLOGOS CARGADOS:', dialogues)

export function getDialogue(characterId) {
  return dialogues[characterId] || []
}