x<script setup>
defineProps({
  character: {
    type: Object,
    required: true
  },

  slide: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'continue',
  'close'
])
</script>

<template>
  <div class="presentation-overlay">

    <div class="presentation">

      <!-- ENCABEZADO -->
      <header class="presentation-header">

        <div>
          <span class="presentation-role">
            {{ character.role }}
          </span>

          <h1>
            {{ slide.title }}
          </h1>

          <p
            v-if="slide.subtitle"
            class="subtitle"
          >
            {{ slide.subtitle }}
          </p>
        </div>

      </header>


      <!-- CONTENIDO -->
      <main class="presentation-content">

        <!-- IMAGEN -->
        <div
          v-if="slide.image"
          class="presentation-image"
        >
          <div class="image-placeholder">
            🖼️

            <span>
              {{ slide.image }}
            </span>
          </div>
        </div>


        <!-- TEXTO -->
        <div
          v-if="slide.content"
          class="presentation-text"
        >
          {{ slide.content }}
        </div>


        <!-- ITEMS -->
        <div
          v-if="slide.items.length"
          class="presentation-items"
        >

          <div
            v-for="(item, index) in slide.items"
            :key="index"
            class="presentation-item"
          >
            <span class="item-number">
              {{ index + 1 }}
            </span>

            <span>
              {{ item }}
            </span>
          </div>

        </div>

      </main>


      <!-- FOOTER -->
      <footer class="presentation-footer">

        <button
          class="exit-button"
          @click="emit('close')"
        >
          Salir
        </button>

        <button
          class="next-button"
          @click="emit('continue')"
        >
          Continuar →
        </button>

      </footer>

    </div>

  </div>
</template>


<style scoped>

.presentation-overlay {
  position: fixed;

  inset: 0;

  z-index: 200;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 30px;

  background: rgba(10, 20, 35, 0.75);

  backdrop-filter: blur(5px);
}


.presentation {
  width: min(1100px, 95vw);

  max-height: 90vh;

  display: flex;

  flex-direction: column;

  overflow: hidden;

  background: #f8fafc;

  border: 4px solid #26384b;

  border-radius: 20px;

  color: #26384b;

  box-shadow:
    0 15px 0 rgba(0, 0, 0, 0.25);

  animation: presentation-in 0.25s ease-out;
}


/* HEADER */

.presentation-header {
  padding: 28px 35px;

  background: white;

  border-bottom: 3px solid #dbe3ec;
}

.presentation-role {
  display: inline-block;

  margin-bottom: 8px;

  padding: 5px 10px;

  background: #dbeafe;

  border-radius: 6px;

  color: #2563eb;

  font-size: 13px;

  font-weight: bold;

  text-transform: uppercase;
}

.presentation-header h1 {
  margin: 0;

  font-size: 38px;
}

.subtitle {
  margin: 8px 0 0;

  color: #64748b;

  font-size: 20px;
}


/* CONTENT */

.presentation-content {
  padding: 30px 35px;

  overflow-y: auto;

  min-height: 300px;
}

.presentation-image {
  display: flex;

  justify-content: center;

  margin-bottom: 25px;
}

.image-placeholder {
  width: 280px;
  height: 150px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 8px;

  background: #e2e8f0;

  border: 3px dashed #94a3b8;

  border-radius: 12px;

  font-size: 35px;
}

.image-placeholder span {
  font-size: 13px;

  color: #64748b;
}


/* TEXT */

.presentation-text {
  max-width: 850px;

  margin: 0 auto;

  font-size: 20px;

  line-height: 1.7;

  white-space: pre-line;

  text-align: center;
}


/* ITEMS */

.presentation-items {
  max-width: 750px;

  margin: 0 auto;

  display: flex;

  flex-direction: column;

  gap: 12px;
}

.presentation-item {
  display: flex;

  align-items: center;

  gap: 15px;

  padding: 15px 18px;

  background: white;

  border: 2px solid #dbe3ec;

  border-radius: 10px;

  font-size: 18px;

  font-weight: 500;
}

.item-number {
  width: 32px;
  height: 32px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #2563eb;

  border-radius: 50%;

  color: white;

  font-weight: bold;
}


/* FOOTER */

.presentation-footer {
  display: flex;

  justify-content: space-between;

  padding: 18px 25px;

  background: white;

  border-top: 3px solid #dbe3ec;
}

.presentation-footer button {
  padding: 11px 22px;

  border: 2px solid #26384b;

  border-radius: 8px;

  font-size: 16px;

  font-weight: bold;

  cursor: pointer;
}

.exit-button {
  background: white;

  color: #26384b;
}

.next-button {
  background: #2563eb;

  color: white;
}

.presentation-footer button:hover {
  transform: translateY(-2px);
}


/* ANIMATION */

@keyframes presentation-in {

  from {
    opacity: 0;

    transform: scale(0.95);
  }

  to {
    opacity: 1;

    transform: scale(1);
  }

}

</style>