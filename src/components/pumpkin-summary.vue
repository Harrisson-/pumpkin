<script setup>
import { onMounted, ref, nextTick } from "vue";

const props = defineProps({
  // must be between 0.0 and 1.0 | can be an array
  threshold: {
    type: Number,
    default: 0.5,
  },
  // property required for headers :
  //  id: id of the targeted element
  //  level: level required for the element in the summary
  //  title: title visible inside the summary
  headers: {
    type: Array,
  },
  // build autoBuildSummary based on DOM Elements
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

const summaryMap = new Set();
let summary = ref();
let scrollByClick = false;

function transformToBold(domElement) {
  for (const summaryElement of summaryMap) {
    if (
      summaryElement.titleDOM === domElement ||
      summaryElement.sectionDOM === domElement
    ) {
      summaryElement.titleDOM.classList.add("bold-end");
    } else if (summaryElement.titleDOM.classList.contains("bold-end")) {
      summaryElement.titleDOM.classList.remove("bold-end");
    }
  }
}

function boldByclick(domElement) {
  transformToBold(domElement.currentTarget);
  scrollByClick = true;
}

// recursive selection
function autobuild(autoBuildSummary, level, parentElement) {
  if (level + 1 <= props.autoBuildLevel) {
    let blocs = parentElement.querySelectorAll(`h${level + 1}`);
    for (
      let selectorSize = 0;
      selectorSize <= blocs.length - 1;
      selectorSize++
    ) {
      let currentParent = blocs[selectorSize].parentElement;
      autoBuildSummary.push({
        tag: `h${level + 1}`,
        text: blocs[selectorSize].innerText,
        titleNode: blocs[selectorSize],
        target: currentParent,
      });
      autobuild(autoBuildSummary, level + 1, currentParent);
    }
  }
  return autoBuildSummary;
}

onMounted(async () => {
  const rootSummary = document.getElementById("summary-pumpkin");

  if (props.autoBuild) {
    summary.value = autobuild(
      [],
      0,
      document.getElementById(`${props.autoBuildDOMId}`)
    );
  } else {
    summary.value = rootSummary.querySelectorAll(":scope a");;
  }

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: props.threshold,
  };

  let callback = (entries, _observer) => {
    // Only trigger action when new block intersecting
    if (entries[0].isIntersecting && !scrollByClick) {
      transformToBold(entries[0].target);
    }
    scrollByClick = false;
  };

  let observer = new IntersectionObserver(callback, options);

  await nextTick();

  const summaryBlockDOM = rootSummary.querySelectorAll(":scope a");

  for (const [index, summaryEntry] of summary.value.entries()) {
    if (props.autoBuild) {
      const partialSummaryBlock = {
        title: [...summaryEntry.target.childNodes].find(
          (element) => element.nodeName === summaryEntry.tag.toUpperCase()
        )?.innerHTML,
        sectionDOM: summaryEntry.target,
      };
      summaryMap.add({
        titleDOM: [...summaryBlockDOM].find(
          (title) => title.innerText === partialSummaryBlock.title
        ),
        ...partialSummaryBlock,
      });
      observer.observe(summaryEntry.target);
    } else {
      const sectionDomById = document.getElementById(`${props.headers[index].id}`);
      summaryMap.add({
        titleId: props.headers[index].title,
        titleDOM: summaryEntry,
        sectionDOM: sectionDomById,
      });
      observer.observe(sectionDomById);
    }
  }
});
</script>

<template>
  <aside id="summary-pumpkin">
    <div v-if="props.autoBuild">
      <a
        v-for="(value, key) in summary"
        :key="key"
        :id="'summary-' + value.text"
        :class="[`pumpkin-${value.tag}`, 'anchor-style']"
        :href="'#' + value.text"
        @click="boldByclick"
      >
        {{ value.text }}
      </a>
    </div>
    <div v-else>
      <a
        v-for="header in props.headers"
        :key="header.id"
        v-bind:id="('summary-' + header.id)"
        :class="[`pumpkin-${header.level}`, 'anchor-style']"
        :href="('#' + header.id)"
        @click="boldByclick"
      >
        {{ header.title }}
      </a>
    </div>
  </aside>
</template>

<style lang="css" scoped>
#summary-pumpkin {
  position: sticky;
  min-width: 100px;
  height: auto;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1;

  background: white;
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

.pumpkin-h2 {
  padding-left: 10px;
}

.pumpkin-h2:before {
  margin-right: 6px;
}

.pumpkin-h3 {
  padding-left: 20px;
}

.pumpkin-h3:before {
  margin-right: 6px;
}

.pumpkin-h4 {
  padding-left: 30px;
}

.pumpkin-h4:before {
  margin-right: 6px;
}

.pumpkin-h5 {
  padding-left: 40px;
}

.pumpkin-h5:before {
  margin-right: 6px;
}

.pumpkin-h6 {
  padding-left: 50px;
}

.pumpkin-h6:before {
  margin-right: 6px;
}

.anchor-style {
  color: orange;
  background-color: white;
  padding-top: 5px;
}

.anchor-style:last-child {
  padding-bottom: 5px;
}

.anchor-style:hover {
  color: darkOrange;
  background-color: gray;
}
</style>
