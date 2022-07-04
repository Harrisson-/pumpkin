<script setup>
// eslint-disable-next-line
// const specialCharactersList = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
import { ref, watch } from "vue";

// element DOM
const root = ref(null);
const test = ref(null);

const title = "pumpkin tags";
let swapText = [];
let tagList = [];
let currentCaretPosition;

const emit = defineEmits(["searchWord"]);

const props = defineProps({
  givenTags: {
    type: Array,
    required: true,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  highlightColor: {
    type: String,
    default: "#000",
  },
});

tagList = JSON.parse(JSON.stringify(props.givenTags));

watch(props.givenTags, (newValue) => {
  tagList = newValue;
});

const selectTag = async (tag) => {
  let text = root.value.querySelector("#text").innerHTML;
  const hastageLastPoition = text.lastIndexOf("#");
  if (props.highlight) {
    text =
      text.slice(0, hastageLastPoition) +
      `<span style="color:${props.highlightColor};">#${tag}</span>`;
  } else {
    text = text.slice(0, hastageLastPoition) + `#${tag}`;
  }
  root.value.querySelector("#text").innerHTML = text;
  cleanTagList();

  resetCaretPosition();
};

const resetCaretPosition = () => {
  let diffWord = 0;
  let selectedNode;
  root.value.querySelector("#text").focus();
  const range = document.createRange();
  const sel = window.getSelection();

  for (let node of test.value.childNodes.values()) {
    if (diffWord + node.textContent.length >= currentCaretPosition) {
      diffWord = currentCaretPosition - diffWord;
      selectedNode = node;
      break;
    }
    diffWord += node.textContent.length;
    console.log("ieie", diffWord);
  }
  range.setStart(selectedNode, diffWord);
  range.setEnd(selectedNode, diffWord);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
};
const getCaretPosition = () => {
  const range = window.getSelection().getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(test.value);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  currentCaretPosition = preCaretRange.toString().length;
};
const cleanTagList = () => {
  tagList = [];
};
const cleanText = (text) => {
  const newText = text.replaceAll('<span style="color:deepskyblue;">', "");
  return newText.replaceAll("</span> ", "");
};

const message = (el) => {
  const currentText = cleanText(el.target.innerHTML);
  const wordArray = currentText.split(" ");
  const modifiedWord = wordArray.filter((word) => {
    return !swapText.includes(word);
  })[0];
  if (modifiedWord.includes("#")) {
    getCaretPosition();
    const searchText = modifiedWord.slice(
      modifiedWord.indexOf("#") + 1,
      modifiedWord.length
    );
    if (searchText.length > 0) {
      emit("searchWord", searchText);
    }
    const renderingText = wordArray.map((word) => {
      const tmpHashtagPosition = word.indexOf("#");
      if (tmpHashtagPosition === -1) {
        return word;
      }
      if (tmpHashtagPosition !== 0) {
        const tmpTxt = word.slice(tmpHashtagPosition, -1);
        if (props.highlight) {
          return (
            word.split(tmpTxt) +
            `<span style="color:deepskyblue;">${tmpTxt}</span> `
          );
        } else {
          return word.split(tmpTxt) + `${tmpTxt}`;
        }
      }
      if (props.highlight) {
        return `<span style="color:deepskyblue;">${word}</span>`;
      } else {
        return `${word}`;
      }
    });
    el.target.innerHTML = renderingText.join(" ");
    resetCaretPosition();
  }
  swapText = wordArray;
};
</script>

<template>
  <div class="input-container">
    <h1>{{ title }}</h1>
    <div
      type="text"
      ref="test"
      id="text"
      contenteditable="true"
      @input="message"
    ></div>
    <div id="tag-list" v-show="tagList.length > 0">
      <div
        class="tag"
        v-on:click="selectTag(tag)"
        v-for="tag in tagList"
        :key="tag"
      >
        <span>#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.input-container {
  position: relative;
  max-width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#text {
  border: 1px solid gray;
  min-height: 200px;
  text-align: left;
  padding: 5px;
}

#tag-list {
  background-color: white;
  border: 1px solid black;
  max-width: 100px;
  min-height: 100px;
}

.tag {
  font-weight: bold;
  cursor: pointer;
}
</style>
