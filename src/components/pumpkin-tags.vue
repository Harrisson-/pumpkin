<script setup>
import { ref } from "vue";

// `<span style="color:deepskyblue;">${tmpTxt}</span> `
// element DOM
const textContainerDom = ref(null);

let swapText = [];
let currentCaretPosition;

const emit = defineEmits(["searchWord"]);

const props = defineProps({
  givenTags: {
    type: Array,
    required: true,
    default: () => [],
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

const selectTag = async (tag) => {
  let preText = textContainerDom.value.innerHTML.slice(0, currentCaretPosition);
  let hastagePosition = preText.lastIndexOf("#");
  let postText = textContainerDom.value.innerHTML.slice(currentCaretPosition);
  let preHastagText = preText.slice(0, hastagePosition);
  textContainerDom.value.innerHTML = preHastagText + `#${tag}` + postText;
  cleanTagList();

  resetCaretPosition((preHastagText + `#${tag}`).length);
};

const resetCaretPosition = (position) => {
  textContainerDom.value.focus();
  const range = document.createRange();
  const sel = window.getSelection();

  range.setStart(textContainerDom.value.firstChild, position);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
};

const getCaretPosition = () => {
  const range = window.getSelection().getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(textContainerDom.value);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  currentCaretPosition = preCaretRange.toString().length;
};

const cleanTagList = () => {
  // clean the givenTags prop
  emit("searchWord", null);
};

const message = (el) => {
  const wordArray = el.target.textContent.split(" ");
  const modifiedWord = wordArray.filter((word) => {
    return !swapText.includes(word.trim());
  })[0];
  if (modifiedWord && modifiedWord.includes("#")) {
    getCaretPosition();
    const searchText = modifiedWord.slice(
      modifiedWord.indexOf("#") + 1,
      modifiedWord.length
    );
    if (searchText.length > 0) {
      emit("searchWord", searchText);
    }
  }
  swapText = wordArray;
};
</script>

<template>
  <div class="input-container">
    <div
      type="text"
      ref="textContainerDom"
      id="text"
      contenteditable="true"
      @input="message"
    ></div>
    <div id="tag-list" v-show="props.givenTags && props.givenTags.length > 0">
      <div
        class="tag"
        v-on:click="selectTag(tag)"
        v-for="tag in props.givenTags"
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
  width: 100%;
  display: flex;
  align-items: flex-end;
}

#text {
  border: 1px solid gray;
  width: 100%;
  min-height: 200px;
  text-align: left;
  padding: 5px;
}

#tag-list {
  background-color: white;
  border: 1px solid black;
  width: 100%;
  position: absolute;
  transform: translate(0px, 100%);
}

.tag {
  font-weight: bold;
  cursor: pointer;
  padding: 2px 0px 2px;
}
</style>
