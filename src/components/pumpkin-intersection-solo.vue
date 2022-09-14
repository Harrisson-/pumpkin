<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  debug: {
    type: Boolean,
    default: false,
  },
  // must be between 0.0 and 1.0 | can be an array
  threshold: {
    type: Number,
    default: 1.0,
  },
  // in millisecond
  animationDelay: {
    type: Number,
    default: 0,
  },
  uniqueKey: {
    type: Number,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  transitionName: {
    type: String,
    validator(value) {
      // The value must match one of these strings
      return ["slideLeft", "displayLeft", "flipLeft", "brighten"].includes(
        value
      );
    },
  },
  target: {
    type: String,
    required: true,
  },
});

const interContainerRand = "pumpkin-solo" + props.uniqueKey;
let isView = ref(false);

onMounted(() => {
  const rootElement = document.querySelector(`.${props.parent}`);

  let options = {
    root: rootElement,
    rootMargin: "0px",
    threshold: props.threshold,
  };

  let callback = (entries, _observer) => {
    for (const entry of entries) {
      setTimeout(function () {
        isView.value = entry.isIntersecting;
      }, props.animationDelay);
    }
  };

  let observer = new IntersectionObserver(callback, options);

  let target = document.querySelector(`.${interContainerRand}`);
  observer.observe(target);
});
</script>

<template>
  <div :class="interContainerRand">
    <keep-alive>
      <transition :name="props.transitionName">
        <div v-if="isView">
          <slot></slot>
        </div>
      </transition>
    </keep-alive>
  </div>
</template>

<style lang="css" scoped>
div[class^="pumpkin-solo"],
div[class*="pumpkin-solo"] {
  min-height: 20px;
}

/** BUG */
.display-left-enter-active,
.display-left-leave-active {
  overflow: hidden;
  width: 0px;
}
.display-left-enter-from,
.display-left-leave-to {
  width: 100%;
}

.slide-left-enter-active,
.slide-left-leave-active {
  margin-left: -99%;
  width: 100%;
}
.slide-left-enter-from,
.slide-left-leave-to {
  margin-left: 0%;
}

.flip-left-enter-active,
.flip-left-leave-active {
  overflow: hidden;
  width: 100%;
  transform: matrix(0.2, 0, 0, 1, 0, 0);
}
.flip-left-enter-from,
.flip-left-leave-to {
  transform: matrix(1, 0, 0, 1, 0, 0);
}

.brighten-enter-active,
.brighten-leave-active {
  transition: opacity 0.5s ease;
}

.brighten-enter-from,
.brighten-leave-to {
  opacity: 0;
}
</style>
