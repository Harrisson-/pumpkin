<script setup>
const emit = defineEmits(["closeBanner"]);

const props = defineProps({
  showBanner: {
    type: Boolean,
    required: true,
    default: false,
  },
  content: {
    type: String,
  },
  teleport: {
    type: Boolean,
    default: false,
  },
  animation: {
    type: String,
    validator(value) {
      return [
        "slide-bottom",
        "slide-top",
        "slide-left",
        "slide-right",
      ].includes(value);
    },
    default: "slide-top",
  },
  position: {
    type: String,
    validator(value) {
      return ["bottom", "top"].includes(value);
    },
    default: "top",
    required: true,
  },
});

function closeBanner() {
  emit("closeBanner", false);
}
</script>

<template>
  <Teleport to="body" :disabled="!props.teleport">
    <Transition :name="`${props.animation}`">
      <div
        v-if="props.showBanner"
        :class="[`${props.position}`, 'pumpkin-banner', `${props.animation}`]"
      >
        <slot name="content"></slot>
        <h1>{{ props.content }}</h1>
        <button class="pumpkin-close" @click="closeBanner">&#10006;</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="css" scoped>
.pumpkin-banner {
  position: fixed;
  z-index: 999;
  width: 100%;
  border: 1px solid black;
  background-color: white;
  display: flex;
}

.pumpkin-banner > .pumpkin-close {
  border: none;
  margin-left: auto;
  font-size: xxx-large;
  background-color: transparent;
}

.top {
  top: 0%;
  left: 0%;
  right: 0%;
}

.bottom {
  bottom: 0%;
  left: 0%;
  right: 0%;
}

/* TOP */
.slide-top-enter-active {
  animation: slide-top-keyframes 2s;
}
.slide-top-leave-active {
  animation: slide-top-keyframes 2s reverse;
}

@keyframes slide-top-keyframes {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

/* BOTTOM */
.slide-bottom-enter-active {
  animation: slide-bottom-keyframes 2s;
}
.slide-bottom-leave-active {
  animation: slide-bottom-keyframes 2s reverse;
}

@keyframes slide-bottom-keyframes {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

/* RIGHT */
.slide-right-enter-active {
  animation: slide-right-keyframes 2s;
}
.slide-right-leave-active {
  animation: slide-right-keyframes 2s reverse;
}

@keyframes slide-right-keyframes {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

/* LEFT */
.slide-left-enter-active {
  animation: slide-left-anim 2s;
}
.slide-left-leave-active {
  animation: slide-left-anim 2s reverse;
}

@keyframes slide-left-anim {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
</style>
