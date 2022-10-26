<script setup>
import { onMounted } from "vue";

const props = defineProps({
  // must be between 0.0 and 1.0 | can be an array
  threshold: {
    type: Number,
    default: 0.5,
  },
  headers: {
    type: Array,
    required: true,
  },
  // build summary based on DOM Elements
  autoBuild: {
    type: Boolean,
    default: false,
  },
  // number of level for autobuild, start from h1
  level: {
    type: Number,
    default: 1,
  },
  // futur implementation
  customAnimation: {
    type: String,
    default: "bold",
  },
});

const summaryMap = new Map();
const domElements = {};

onMounted(() => {
  const rootSummary = document.getElementById("summary-pumpkin");
  const summary = rootSummary.querySelectorAll(":scope > a");

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: props.threshold,
  };

  let callback = (entries, _observer) => {
    // Only trigger action when new block intersecting
    if (entries[0].isIntersecting) {
      const active = summaryMap.get(entries[0].target.innerText);
      active.classList.add("bold-end");
      for (const [key, value] of Object.entries(domElements)) {
        let summaryElement = summaryMap.get(key);
        // contains() because classList is a DOMTokenList
        if (key !== active.innerHTML && summaryElement.classList.contains("bold-end")) {
          summaryElement.classList.remove("bold-end");
        }
      }
    }
    // when block leave intersection put in bold next or prev block based on visibility
    // compare el.getBoundingClientRect(); to viewport to define most visible element
  };

  let observer = new IntersectionObserver(callback, options);
  for (const summaryEntry of summary.entries()) {
    summaryMap.set(props.headers[summaryEntry[0]], summaryEntry[1]);
    domElements[props.headers[summaryEntry[0]]] = document.querySelector(`#${props.headers[summaryEntry[0]]}`);
    observer.observe(document.querySelector(`#${props.headers[summaryEntry[0]]}`));
  }
});
</script>

<template>
  <div id="summary-pumpkin">
    <a
      v-for="header in headers"
      :key="header"
      v-bind:id="'summary-' + header"
      :href="'#' + header"
    >
      {{ header }}
    </a>
  </div>
</template>

<style lang="css" scoped>
#summary-pumpkin {
  position: fixed;
  width: 100px;
  height: 100px;
  background: white;
  top: 10px;
  left: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

#summary-pumpkin > a {
  text-decoration: none;
}

.bold-end {
  font-weight: bold;
}

.bold-start {
  font-weight: normal;
}
</style>
