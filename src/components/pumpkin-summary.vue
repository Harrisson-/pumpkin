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
  customAnimation: {
    type: String,
    default: "bold",
  },
});

onMounted(() => {
  const rootSummary = document.getElementById("summary-pumpkin");
  const summary = rootSummary.querySelectorAll(":scope > a");

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: props.threshold,
  };

  let callback = (entries, _observer) => {
    for (const entry of entries) {
      summary.forEach((element) => {
        if (
          element.innerHTML === entry.target.innerText &&
          entry.isIntersecting
        ) {
          element.classList.add("bold-end");
        } else {
          element.classList.remove("bold-end");
        }
      });
    }
  };

  let observer = new IntersectionObserver(callback, options);

  props.headers.forEach((header) => {
    observer.observe(document.querySelector(`#${header}`));
  });
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
