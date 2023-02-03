<script setup>
import { onMounted, ref, nextTick } from "vue";

const props = defineProps({
  // must be between 0.0 and 1.0 | can be an array
  threshold: {
    type: Number,
    default: 0.5,
  },
  // ONLY REQUIRED WHEN AUTOBUILD = FALSE
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
  // value between 0 to 5
  autoBuildLevel: {
    type: Number,
    default: 0,
  },
  // ONLY REQUIRED WHEN AUTOBUILD = TRUE
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

// VALIDATE LINKED PROPS START
if (props.autoBuild) {
  if (!props.autoBuildDOMId) {
    throw new TypeError("autoBuildDOMId props is required due to autoBuild = true")
  }
  if (props.headers) {
    throw new TypeError("headers props isn't required due to autoBuild = true")
  }
} else {
  if (!props.headers) {
    throw new TypeError("headers props is required due to autoBuild = false")
  }
}
// VALIDATE LINKED PROPS END

class SummaryObject {
  #observer;
  #scrollByClick;
  #summaryMap;
  #optionObserver;

  constructor(threshold) {
    this.#scrollByClick = false;
    this.#summaryMap = new Set();
    this.#optionObserver = {
      root: null,
      rootMargin: "0px",
      threshold: threshold,
    };
    this.#observer = new IntersectionObserver(this.#callbackObserver, this.#optionObserver);
  }

  get observer() {
    return this.#observer;
  }

  static #callbackObserver(entries, _observer) {
    // Only trigger action when new block intersecting
    if (entries[0].isIntersecting && this.scrollByClick) {
      summaryContext.transformToBold(entries[0].target);
    }
    this.scrollByClick = false;
  };

  get scrollByClick() {
    return this.#scrollByClick;
  }
  set scrollByClick(value) {
    this.#scrollByClick = value;
  }

  transformToBold(domElement) {
    for (const summaryElement of this.#summaryMap) {
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
  boldByclick(domElement) {
    this.transformToBold(domElement.currentTarget);
    this.setScrollByClick(true);
  }
}

class AutoBuildElement extends SummaryObject { 
  summaryBlockDOM;
  #elementToObserve;

  constructor(threshold) {
    super(threshold);
  }
  
  get elementToObserve() {
    return this.#elementToObserve;
  }

  set elementToObserve(value) {
    this.#elementToObserve = value;
  }

  setSummaryBlockDOM = (value) => {
    summaryBlockDOM = value
  }

  // return element added and needed to be observed
  addToSummaryMap = (summaryEntry, _index) => {
    const partialSummaryBlock = {
        title: [...summaryEntry.target.childNodes].find(
          (element) => element.nodeName === summaryEntry.tag.toUpperCase()
        )?.innerHTML,
        sectionDOM: summaryEntry.target,
      };
    this.summaryMap.add({
      titleDOM: [...this.summaryBlockDOM].find(
        (title) => title.innerText === partialSummaryBlock.title
      ),
      ...partialSummaryBlock,
    });
    return summaryEntry.target
  }

  // recursive selection
  autobuild = (autoBuildSummary, level, parentElement) => {
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
        this.autobuild(autoBuildSummary, level + 1, currentParent);
      }
    }
    return autoBuildSummary;
  }
}

class StandardBuildElement extends SummaryObject {
  #elementToObserve;


  constructor(threshold) {
    super(threshold);
  }
  
  get elementToObserve() {
    return this.#elementToObserve;
  }

  set elementToObserve(value) {
    this.#elementToObserve = value;
  }

  // return element added and needed to be observed
  addToSummaryMap = (summaryEntry, index) => {
    this.summaryMap.add({
      titleId: props.headers[index].title,
      titleDOM: summaryEntry,
      sectionDOM: sectionDomById,
    });
    return document.getElementById(`${props.headers[index].id}`);
  }
}

let summaryContext;

if (props.autoBuild) {
  summaryContext = new AutoBuildElement(props.threshold);
} else {
  summaryContext = new StandardBuildElement(props.threshold);
}

let summary = ref();

onMounted(async () => {
  const rootSummary = document.getElementById("summary-pumpkin");

  if (summaryContext.hasOwnProperty("autobuild")) {
    summary.value = summaryContext.autobuild(
      [],
      0,
      document.getElementById(`${props.autoBuildDOMId}`)
    );
  } else {
    summary.value = rootSummary.querySelectorAll(":scope a");
  }

  summaryContext.initObserver();

  await nextTick();
  summaryContext.setSummaryBlockDOM(rootSummary.querySelectorAll(":scope a"));

  for (const [index, summaryEntry] of summary.value.entries()) {
    summaryContext.elementToObserve = summaryContext.addToSummaryMap(summaryEntry, index);
    summaryContext.getObserver().observe(summaryContext.elementToObserve);
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
        @click="summaryContext.boldByclick"
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
        @click="summaryContext.boldByclick"
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
