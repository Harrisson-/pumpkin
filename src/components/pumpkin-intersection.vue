<script setup>
import { onMounted } from "vue";

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
  transitionDelay: {
    type: Number,
    default: 1,
  },
  //  customTransition: {
  //    type: Boolean,
  //    default: false,
  //  },
  //  customTransitionName: {
  //    type: String,
  //    default: "",
  //  },
  //  time: {
  //
  //  }
  target: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  document
    .querySelectorAll(`.${props.target}`)
    .forEach(
      (selector) =>
        (selector.style.transition = `opacity ${props.transitionDelay}s`)
    );

  let options = {
    root: document.querySelector(`.intersection-${props.target}`),
    rootMargin: "0px",
    threshold: props.threshold,
  };

  let callback = (entries, observer) => {
    console.log("observer", observer);
    for (let entry of entries) {
      console.log("entry", entry);
      if (entry.intersectionRatio === 1) {
        entry.target.style.opacity = "1";
      } else {
        entry.target.style.opacity = "0";
      }
    }
  };

  let observer = new IntersectionObserver(callback, options);

  let targets = document.querySelectorAll(`.${props.target}`);
  targets.forEach((target) => observer.observe(target));
});
</script>

<template>
  <div :class="'intersection-' + props.target">
    <slot></slot>
  </div>
</template>

<style lang="css" scoped></style>
