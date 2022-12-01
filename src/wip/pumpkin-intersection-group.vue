<script setup>
import { onMounted } from "vue";

// const animations = {
//   slideLeft: {
//     start: "slide-left",
//     end: "slide-left-end",
//   },
//   displayLeft: {
//     start: "display-left",
//     end: "display-left-end",
//   },
//   flipLeft: {
//     start: "flip-left",
//     end: "flip-left-end",
//   },
//   brighten: {
//     start: "brighten",
//     end: "brighten-end",
//   },
// };

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
  // not available for the moment
  transitionDelay: {
    type: Number,
    default: 1,
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
  target: {
    type: String,
    required: true,
  },
});

const interContainerRand =
  "pumpkin-intersection-group-" + Math.floor(Math.random() * 100);

let callback = (entries, _observer) => {
  entries.map((entry) => {
    entry.target.isView = entry.isIntersecting;
    console.log("entry", entry);
  });
};

onMounted(() => {
  let options = {
    root: document.querySelector(`.${interContainerRand}`),
    rootMargin: "0px",
    threshold: props.threshold,
  };

  let observer = new IntersectionObserver(callback, options);

  let targets = document.querySelectorAll(
    `.${interContainerRand} .${props.target}`
  );

  targets.forEach((target) => {
    observer.observe(target);
  });
});
</script>

<template>
  <div :class="interContainerRand">
    {{ props.transitionName }}
    <TransitionGroup :name="props.transitionName">
      <slot></slot>
    </TransitionGroup>
  </div>
</template>

<style lang="css" scoped>
div[class^="pumpkin-intersection-group-"],
div[class*="pumpkin-intersection-group-"] {
  overflow-y: scroll;
  height: 100%;
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
