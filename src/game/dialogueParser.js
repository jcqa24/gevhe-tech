export function parseDialogue(text) {
  const blocks = text
    .split('---------')
    .map(block => block.trim())
    .filter(Boolean)

  return blocks
    .map(block => {
      const lines = block
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)

      if (lines.length === 0) {
        return null
      }

      const type = lines[0].toUpperCase()

      if (type === 'DIALOGO') {
        return parseDialogueBlock(lines)
      }

      if (type === 'SLIDE') {
        return parseSlideBlock(lines)
      }

      return null
    })
    .filter(Boolean)
}


function parseDialogueBlock(lines) {
  const dialogue = {
    type: 'dialogue',
    image: null,
    text: ''
  }

  const textLines = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('IMAGEN:')) {
      dialogue.image = line
        .replace('IMAGEN:', '')
        .trim()

      continue
    }

    textLines.push(line)
  }

  dialogue.text = textLines.join('\n')

  return dialogue
}


function parseSlideBlock(lines) {
  const slide = {
    type: 'slide',
    title: '',
    subtitle: '',
    image: null,
    content: '',
    items: []
  }

  let readingContent = false
  const contentLines = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('TITULO:')) {
      slide.title = line
        .replace('TITULO:', '')
        .trim()

      readingContent = false
      continue
    }

    if (line.startsWith('SUBTITULO:')) {
      slide.subtitle = line
        .replace('SUBTITULO:', '')
        .trim()

      readingContent = false
      continue
    }

    if (line.startsWith('IMAGEN:')) {
      slide.image = line
        .replace('IMAGEN:', '')
        .trim()

      readingContent = false
      continue
    }

    if (line.startsWith('ITEM:')) {
      slide.items.push(
        line
          .replace('ITEM:', '')
          .trim()
      )

      readingContent = false
      continue
    }

    if (line.startsWith('CONTENIDO:')) {
      readingContent = true
      continue
    }

    if (readingContent) {
      contentLines.push(line)
    }
  }

  slide.content = contentLines.join('\n')

  return slide
}