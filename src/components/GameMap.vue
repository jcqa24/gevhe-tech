<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import DialogueBox from './DialogueBox.vue'
import { getDialogue } from '../game/dialogueLoader'
import Presentation from './Presentation.vue'

const activeCharacter = ref(null)
const activeDialogue = ref(null)
const dialogueIndex = ref(0)

const player = ref({
  x: 50,
  y: 75,
})

const speed = 0.8

const interactionDistance = 9

const nearbyCharacter = ref(null)

function calculateDistance(character) {
  const dx = player.value.x - character.x
  const dy = player.value.y - character.y

  return Math.sqrt(
    dx * dx + dy * dy
  )
}

function startDialogue() {
  if (!nearbyCharacter.value) {
    return
  }

  const character = nearbyCharacter.value

  const dialogue = getDialogue(character.id)

  if (!dialogue.length) {
    return
  }

  activeCharacter.value = character
  dialogueIndex.value = 0
  activeDialogue.value = dialogue[0]
}

function continueDialogue() {
  if (!activeCharacter.value) {
    return
  }

  const dialogue = getDialogue(
    activeCharacter.value.id
  )

  dialogueIndex.value++

  if (dialogueIndex.value >= dialogue.length) {
    closeDialogue()
    return
  }

  activeDialogue.value =
    dialogue[dialogueIndex.value]
}

function closeDialogue() {
  activeCharacter.value = null
  activeDialogue.value = null
  dialogueIndex.value = 0
}

const keys = ref({
  up: false,
  down: false,
  left: false,
  right: false,
})

const characters = [
  {
    id: 'juan-carlos',
    name: 'Juan Carlos',
    role: 'IA',
    x: 15,
    y: 20,
  },
  {
    id: 'david',
    name: 'David',
    role: 'App Móvil',
    x: 15,
    y: 40,
  },
  {
    id: 'agustin',
    name: 'Agustín',
    role: 'SIGEV / CRM',
    x: 15,
    y: 65,
  },
  {
    id: 'daniel',
    name: 'Daniel',
    role: 'SIGEV / CRM',
    x: 15,
    y: 85,
  },
  {
    id: 'charly',
    name: 'Charly',
    role: 'Jefe',
    x: 78,
    y: 30,
  },
  {
    id: 'ruben',
    name: 'Rubén',
    role: 'Team Leader',
    x: 78,
    y: 75,
  },
]

let animationFrame

function handleKeyDown(event) {
  const key = event.key.toLowerCase()

  // Interacción
  if (key === 'e') {
    startDialogue()
    return
  }

  switch (key) {
    case 'w':
    case 'arrowup':
      keys.value.up = true
      break

    case 's':
    case 'arrowdown':
      keys.value.down = true
      break

    case 'a':
    case 'arrowleft':
      keys.value.left = true
      break

    case 'd':
    case 'arrowright':
      keys.value.right = true
      break
  }
}

function handleKeyUp(event) {

  switch (event.key.toLowerCase()) {
    case 'w':
    case 'arrowup':
      keys.value.up = false
      break

    case 's':
    case 'arrowdown':
      keys.value.down = false
      break

    case 'a':
    case 'arrowleft':
      keys.value.left = false
      break

    case 'd':
    case 'arrowright':
      keys.value.right = false
      break
  }
}

function movePlayer() {

  if (keys.value.up) {
    player.value.y -= speed
  }

  if (keys.value.down) {
    player.value.y += speed
  }

  if (keys.value.left) {
    player.value.x -= speed
  }

  if (keys.value.right) {
    player.value.x += speed
  }

  player.value.x = Math.max(
    3,
    Math.min(97, player.value.x)
  )

  player.value.y = Math.max(
    8,
    Math.min(92, player.value.y)
  )

  nearbyCharacter.value = null

  for (const character of characters) {
    const distance = calculateDistance(character)

    if (distance <= interactionDistance) {
      nearbyCharacter.value = character
      break
    }
  }

  animationFrame = requestAnimationFrame(movePlayer)
}onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  animationFrame = requestAnimationFrame(movePlayer)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)

  cancelAnimationFrame(animationFrame)
})

  nearbyCharacter.value = null

  for (const character of characters) {
    const distance = calculateDistance(character)

    if (distance <= interactionDistance) {
      nearbyCharacter.value = character
      break
    }
  }

  animationFrame = requestAnimationFrame(movePlayer)


onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  animationFrame = requestAnimationFrame(movePlayer)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)

  cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div class="game">

    <!-- Pared superior -->
    <div class="wall top-wall"></div>

    <!-- Título -->
    <div class="office-title">
      TECNOLOGÍA · GRUPO GEVHE
    </div>

    <!-- MESAS -->

    <div class="desk desk-1">
      <div class="computer">💻</div>
      <span>MESA DE TRABAJO</span>
    </div>

    <div class="desk desk-2">
      <div class="computer">💻</div>
      <span>MESA DE TRABAJO</span>
    </div>

    <div class="desk desk-3">
      <div class="computer">💻</div>
      <span>MESA DE TRABAJO</span>
    </div>

    <div class="desk desk-4">
      <div class="computer">💻</div>
      <span>MESA DE TRABAJO</span>
    </div>

    <!-- Oficina del jefe -->
    <div class="boss-office">
      <div class="office-sign">
        OFICINA
      </div>

      <div class="boss-desk">
        💻
      </div>
    </div>

    <!-- Zona remota -->
    <div class="remote-area">
      <div class="remote-screen">
        🌐
      </div>

      <span>TRABAJO REMOTO</span>
    </div>

    <!-- Personajes -->
    <div
      v-for="character in characters"
      :key="character.id"
      class="character"
      :style="{
        left: `${character.x}%`,
        top: `${character.y}%`
      }"
    >
      <div class="robot">
        🤖
      </div>

      <div class="character-name">
        {{ character.name }}
      </div>

      <div class="character-role">
        {{ character.role }}
      </div>
    </div>

    <!-- Jugador -->
    <div
      class="player"
      :style="{
        left: `${player.x}%`,
        top: `${player.y}%`
      }"
    >
      <div class="player-robot">
        🤖
      </div>

      <div class="player-label">
        TÚ
      </div>
    </div>
    <!-- Interacción -->

    <div
    v-if="nearbyCharacter"
    class="interaction"
    :style="{
        left: `${nearbyCharacter.x}%`,
        top: `${nearbyCharacter.y - 10}%`
    }"
    >
    <div>
        💬 Hablar con
        <strong>
        {{ nearbyCharacter.name }}
        </strong>
    </div>

    <small>
        Presiona E
    </small>
    </div>
    <!-- Controles -->
    <div class="controls">
      <strong>MOVER</strong>
      <span>W A S D</span>
      <span>↑ ↓ ← →</span>
    </div>

  </div>

<DialogueBox
  v-if="
    activeCharacter &&
    activeDialogue &&
    activeDialogue.type === 'dialogue'
  "
  :character="activeCharacter"
  :dialogue="activeDialogue"
  @continue="continueDialogue"
  @close="closeDialogue"
/>

<Presentation
  v-if="
    activeCharacter &&
    activeDialogue &&
    activeDialogue.type === 'slide'
  "
  :character="activeCharacter"
  :slide="activeDialogue"
  @continue="continueDialogue"
  @close="closeDialogue"
/>
</template>

<style scoped>
.game {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  background:
    linear-gradient(
      90deg,
      rgba(255,255,255,0.03) 1px,
      transparent 1px
    ),
    linear-gradient(
      rgba(255,255,255,0.03) 1px,
      transparent 1px
    ),
    #d9c7a3;

  background-size: 40px 40px;
}

/* Pared */

.wall {
  position: absolute;
  background: #27364a;
}

.top-wall {
  top: 0;
  left: 0;

  width: 100%;
  height: 55px;
}

/* Título */

.office-title {
  position: absolute;

  top: 16px;
  left: 50%;

  transform: translateX(-50%);

  color: white;

  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
}

/* Mesas */

.desk {
  position: absolute;

  width: 170px;
  height: 100px;

  background: #9b6b43;

  border: 5px solid #70472a;
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  color: white;
  font-size: 11px;
  font-weight: bold;

  box-shadow: 0 8px 0 rgba(0,0,0,0.15);
}

.desk-1 {
  left: 7%;
  top: 10%;
}

.desk-2 {
  left: 7%;
  top: 32%;
}

.desk-3 {
  left: 7%;
  top: 54%;
}

.desk-4 {
  left: 7%;
  top: 76%;
}

.computer {
  font-size: 35px;
  margin-bottom: 5px;
}

/* Oficina */

.boss-office {
  position: absolute;

  right: 5%;
  top: 10%;

  width: 260px;
  height: 260px;

  background: #b7d5e8;

  border: 7px solid #496b83;
  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 10px 0 rgba(0,0,0,0.15);
}

.office-sign {
  position: absolute;

  top: -18px;

  padding: 7px 20px;

  background: #496b83;
  color: white;

  border-radius: 8px;

  font-weight: bold;
}

.boss-desk {
  font-size: 45px;
}

/* Remoto */

.remote-area {
  position: absolute;

  right: 7%;
  bottom: 8%;

  width: 230px;
  height: 130px;

  background: #eef4f8;

  border: 5px solid #7d9bad;
  border-radius: 15px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  color: #385064;

  font-weight: bold;
}

.remote-screen {
  font-size: 40px;
}

/* Personajes */

.character {
  position: absolute;

  transform: translate(-50%, -50%);

  text-align: center;

  z-index: 5;
}

.robot {
  font-size: 42px;

  filter: drop-shadow(
    0 5px 2px rgba(0,0,0,0.25)
  );
}

.character-name {
  margin-top: -4px;

  background: #26384b;
  color: white;

  padding: 3px 8px;

  border-radius: 6px;

  font-size: 12px;
  font-weight: bold;
}

.character-role {
  color: #26384b;

  font-size: 10px;
  font-weight: bold;
}

/* Jugador */

.player {
  position: absolute;

  transform: translate(-50%, -50%);

  z-index: 10;

  text-align: center;
}

.player-robot {
  font-size: 48px;

  filter:
    drop-shadow(
      0 6px 3px rgba(0,0,0,0.3)
    );
}

.player-label {
  background: #2563eb;
  color: white;

  padding: 3px 10px;

  border-radius: 6px;

  font-size: 11px;
  font-weight: bold;
}

/* Controles */

.controls {
  position: absolute;

  right: 20px;
  bottom: 20px;

  display: flex;
  gap: 10px;

  padding: 12px 18px;

  background: rgba(20,30,40,0.9);
  color: white;

  border-radius: 10px;

  font-size: 12px;
}
</style>
