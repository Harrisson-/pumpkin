<script setup>
import { onMounted, computed, ref } from "vue";

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
  // number of level for autobuild, start from h1 to h6
  autoBuildLevel: {
    type: Number,
    default: 0,
  },
  // Parent Id for building summary
  autoBuildDOMId: {
    type: String,
  },
  // futur implementation
  customAnimation: {
    type: String,
    default: "bold",
  },
});

const summaryMap = new Map();
const domElements = {};
let summary = ref();

onMounted(() => {
  const rootSummary = document.getElementById("summary-pumpkin");

  if (props.autoBuild) {
    summary.value = autobuild([], 0, document.getElementById(`${props.autoBuildDOMId}`));
  } else {
    summary.value = rootSummary.querySelectorAll(":scope > a");
  }

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

    // Document.visibilityState => return the visibility state of an element
    // value are visible, hidden, prerender, et unloaded.
  };

  let observer = new IntersectionObserver(callback, options);
  for (const summaryEntry of summary.value) {
    if (props.autoBuild) {
      observer.observe
    } else {
      summaryMap.set(props.headers[summaryEntry[0]], summaryEntry[1]);
      domElements[props.headers[summaryEntry[0]]] = document.querySelector(
        `#${props.headers[summaryEntry[0]]}`
      );
      observer.observe(document.querySelector(`#${props.headers[summaryEntry[0]]}`));
    }
  }
});

// recursive selection
function autobuild(summary, size, parentElement) {
  if (size <= props.autoBuildLevel) {
    let blocs = parentElement.querySelectorAll(`h${size + 1}`);
    for (let selectorSize = 0; selectorSize <= blocs.length - 1; selectorSize++) {
      let currentParent = blocs[selectorSize].parentElement;
      // add parent block to facilitate observer build
      summary.push({ tag: `h${size + 1}`, text: blocs[selectorSize].innerText });
      autobuild(summary, size + 1, currentParent);
    }
  }
  return summary;
}
</script>

<template>
  <div id="summary-pumpkin">
    <div v-if="props.autoBuild">
      <a
        v-for="(value, key) in autoBuildResult"
        :key="key"
        v-bind:id="'summary-' + value.text"
        :href="'#' + value.text"
      >
        {{ value.text }}
      </a>
    </div>
    <div v-else>
      <a
        v-for="header in headers"
        :key="header"
        v-bind:id="'summary-' + header"
        :href="'#' + header"
      >
        {{ header }}
      </a>
    </div>
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

#summary-pumpkin > div > a {
  text-decoration: none;
}

#summary-pumpkin > div {
  display: contents;
}

.bold-end {
  font-weight: bold;
}

.bold-start {
  font-weight: normal;
}
</style>
