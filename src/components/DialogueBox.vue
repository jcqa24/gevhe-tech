<script setup>
defineProps({
  character: {
    type: Object,
    required: true
  },

  dialogue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['continue', 'close'])
</script>

<template>
  <div class="dialogue-overlay">

    <div class="dialogue-box">

      <!-- PERSONAJE -->
      <div class="dialogue-character">

        <div class="character-avatar">
          🤖
        </div>

        <div class="character-info">
          <strong>
            {{ character.name }}
          </strong>

          <span>
            {{ character.role }}
          </span>
        </div>

      </div>


      <!-- TEXTO -->
      <div class="dialogue-content">

        <p>
          {{ dialogue.text }}
        </p>

      </div>


      <!-- BOTONES -->
      <div class="dialogue-actions">

        <button @click="emit('close')">
          Salir
        </button>

        <button
          class="continue-button"
          @click="emit('continue')"
        >
          Continuar →
        </button>

      </div>

    </div>

  </div>
</template>


<style scoped>

.dialogue-overlay {
  position: fixed;
  inset: 0;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  padding: 30px;

  background: rgba(0, 0, 0, 0.15);

  z-index: 100;
}


.dialogue-box {
  width: min(900px, 95%);

  background: white;

  border: 4px solid #26384b;

  border-radius: 18px;

  box-shadow:
    0 10px 0 rgba(0, 0, 0, 0.25);

  padding: 22px;

  color: #26384b;
}


/* PERSONAJE */

.dialogue-character {
  display: flex;
  align-items: center;
  gap: 15px;

  margin-bottom: 15px;
}


.character-avatar {
  width: 65px;
  height: 65px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #dbeafe;

  border: 3px solid #26384b;

  border-radius: 12px;

  font-size: 36px;
}


.character-info {
  display: flex;
  flex-direction: column;
}


.character-info strong {
  font-size: 22px;
}


.character-info span {
  color: #64748b;

  margin-top: 3px;
}


/* TEXTO */

.dialogue-content {
  min-height: 120px;

  padding: 10px 5px;
}


.dialogue-content p {
  margin: 0;

  font-size: 20px;

  line-height: 1.6;

  white-space: pre-line;
}


/* BOTONES */

.dialogue-actions {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 10px;
}


.dialogue-actions button {
  padding: 10px 18px;

  border: 2px solid #26384b;

  border-radius: 8px;

  background: white;

  color: #26384b;

  font-weight: bold;

  cursor: pointer;
}


.dialogue-actions button:hover {
  transform: translateY(-2px);
}


.continue-button {
  background: #2563eb !important;

  color: white !important;
}

</style>