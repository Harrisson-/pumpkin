<script setup>
import { onMounted } from "vue";

const animations = {
  // slideLeft: {
  //   start: "slide-left",
  //   end: "slide-left-end",
  // },
  // displayLeft: {
  //   start: "display-left",
  //   end: "display-left-end",
  // },
  flipLeft: {
    start: "flip-left",
    end: "flip-left-end",
  },
  brighten: {
    start: "brighten",
    end: "brighten-end",
  },
};

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

onMounted(() => {
  const rootElement = document.querySelector(`.${props.parent}`);
  const selector = document.querySelector(`.${interContainerRand}`);
  selector.classList.toggle(animations[props.transitionName].start, true);

  let options = {
    root: rootElement,
    rootMargin: "0px",
    threshold: props.threshold,
  };

  let callback = (entries, _observer) => {
    console.log("trigger");

    for (const entry of entries) {
      setTimeout(function () {
        entry.target.classList.toggle(
          animations[props.transitionName].end,
          entry.isIntersecting
        );
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
      <slot></slot>
    </keep-alive>
  </div>
</template>

<style lang="css" scoped>
/** BUG */
.display-left {
  overflow: hidden;
  width: 0px;
  transition: width 1s;
}
.display-left-end {
  width: 100%;
}

/** BUG */
.slide-left {
  margin-left: -99%;
  width: 100%;
  transition: margin-left 1.5s;
}
.slide-left-end {
  margin-left: 0%;
}

.flip-left {
  overflow: hidden;
  width: 100%;
  transform: matrix(0.2, 0, 0, 1, 0, 0);
  transition: transform 1s;
}
.flip-left-end {
  transform: matrix(1, 0, 0, 1, 0, 0);
}

.brighten {
  overflow: hidden;
  width: 100%;
  opacity: 0;
  transition: opacity 1s;
}
.brighten-end {
  opacity: 1;
}
</style>
