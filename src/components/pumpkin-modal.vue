<template>
  <Teleport to="body" :disabled="!props.teleport">
    <div
      v-show="props.showModal"
      :class="{ 'pumpkin-overlay': overlay && props.showModal }"
      @click.self="closeModal"
    >
      <Transition>
        <div class="pumpkin-modal">
          <header class="pumpkin-header">
            <slot name="header"></slot>
            <h1>{{ props.contentTitle }}</h1>
            <button class="pumpkin-close" @click="closeModal">&#10006;</button>
          </header>
          <main class="pumpkin-body">
            <slot name="body"></slot>
            <p>{{ props.contentBody }}</p>
          </main>
          <footer class="pumpkin-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(["closeModal"]);

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
    default: false,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  contentBody: {
    type: String,
  },
  contentTitle: {
    type: String,
  },
  teleport: {
    type: Boolean,
    default: false,
  },
  animationName: {
    validator(animation) {
      return ['opacity'].includes(animation)
    }
  },
  animationDelay: {
    type: Number,
    default: 0.2,
  }
});

const transitionObject = computed(() => {
  return {
    'transition-property': props.animationName,
    'transition-duration': props.animationDelay,
    // 'transition-timing-function': props.animationName, 
  }
})

function closeModal() {
  emit("closeModal", false);
}
</script>

<style lang="css" scoped>
.pumpkin-modal {
  padding: 5px;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  width: fit-content;
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  max-width: 500px;
  transform: translate(-50%, -50%);
}
.pumpkin-modal > .pumpkin-header {
  align-items: start;
  display: flex;
}

.pumpkin-modal > .pumpkin-header > .pumpkin-close {
  margin-left: auto;
  height: fit-content;
  border: none;
  background-color: transparent;
  font-size: large;
  cursor: pointer;
}

.pumpkin-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100em;
  height: 100em;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.v-enter-active,
.v-leave-active {
  transition: v-bind(transitionObject);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
