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
  // not available for the moment
  // transitionDelay: {
  //   type: Number,
  //   default: 1,
  // },
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

const interContainerRand =
  "pumpkin-intersection-" + Math.floor(Math.random() * 100);

onMounted(() => {
  const rootElement = document.querySelector(`.${interContainerRand}`);
  let oldScroll = 0;
  let newScroll;
  document
    .querySelectorAll(`.${interContainerRand} .${props.target}`)
    .forEach((selector) =>
      selector.classList.toggle(animations[props.transitionName].start, true)
    );

  let options = {
    root: rootElement,
    rootMargin: "0px",
    threshold: props.threshold,
  };

  let callback = (entries, _observer) => {
    if (newScroll < oldScroll) {
      entries = entries.reverse();
    }
    for (const [index, entry] of entries.entries()) {
      console.log("entry", entry);
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(index + 1) * 0.5}s`;
      } else {
        entry.target.style.transitionDelay = "0s";
      }
      entry.target.classList.toggle(
        animations[props.transitionName].end,
        entry.isIntersecting
      );
    }
    oldScroll = newScroll;
  };

  let observer = new IntersectionObserver(callback, options);

  let targets = document.querySelectorAll(
    `.${interContainerRand} .${props.target}`
  );
  targets.forEach((target) => observer.observe(target));

  rootElement.addEventListener("scroll", (_event) => {
    newScroll = rootElement.scrollTop;
  });
});
</script>

<template>
  <div :class="interContainerRand">
    <slot></slot>
  </div>
</template>

<style lang="css">
div[class^="pumpkin-intersection-"],
div[class*="pumpkin-intersection-"] {
  overflow-y: scroll;
  height: 100%;
}

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
