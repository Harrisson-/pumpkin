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
  // if don't provide, it will use window viewport as parent
  parent: {
    type: String,
    default: null,
  },
  transitionName: {
    type: String,
    validator(value) {
      // The value must match one of these strings
      return ["slide-left", "display-left", "flip-left", "brighten"].includes(
        value
      );
    },
  },
});

const interContainerRand = "pumpkin-intersection-solo-" + props.uniqueKey;
let isView = ref(false);

let callback = (entries, _observer) => {
  for (const entry of entries) {
    setTimeout(function () {
      isView.value = entry.isIntersecting;
    }, props.animationDelay);
  }
};

onMounted(() => {
  let options = {
    root: document.querySelector(`.${props.parent}`),
    rootMargin: "0px",
    threshold: props.threshold,
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
div[class^="pumpkin-intersection-solo-"],
div[class*="pumpkin-intersection-solo-"] {
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
  opacity: 0.5s;
}

.brighten-enter-from,
.brighten-leave-to {
  opacity: 0;
}
</style>
