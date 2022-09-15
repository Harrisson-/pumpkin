<script setup>
import { onMounted } from "vue";

const props = defineProps({
  // must be between 0.0 and 1.0 | can be an array
  threshold: {
    type: Number,
    default: 1.0,
  },
  headers: {
    type: Array,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  customAnimation: {
    type: String,
    default: "bold",
  },
});

onMounted(() => {
  const selectors = document.querySelectorAll(`.${props.headers}`);

  let options = {
    root: document.querySelector(`.${props.parent}`),
    rootMargin: "0px",
    threshold: props.threshold,
  };

  let callback = (entries, _observer) => {
    for (const entry of entries) {
      const headerElement = selectors.find((element) => {
        return element === entry.target;
      });
      if (headerElement) {
        headerElement.classList.toggle(
          props.customAnimation,
          entry.isIntersecting
        );
      }
    }
  };

  let observer = new IntersectionObserver(callback, options);

  let target = document.querySelector(`.${props.headers}`);
  observer.observe(target);
});
</script>

<template>
  <div :class="interContainerRand">
    <transition :name="props.customAnimation">
      <slot></slot>
    </transition>
  </div>
</template>

<style lang="css" scoped>
.bold-enter-active,
.bold-leave-active {
  font-weight: bold;
}

.bold-enter-from,
.bold-leave-to {
  font-weight: normal;
}
</style>
