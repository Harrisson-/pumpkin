<script setup>
import { ref, computed } from "vue";

const textContainerDom = ref(null);

let currentCaretPosition;
let shareIndex = 0;
let shareStackLinesLength = 0;

const reactiveTags = computed({
  get: () => {
    return props.givenTags;
  },
  set: (searchText) => {
    emit("searchWord", searchText);
  },
});

const emit = defineEmits(["searchWord"]);

const props = defineProps({
  givenTags: {
    type: Array,
    required: true,
    default: () => [],
  },
  // highlight: {
  //   type: Boolean,
  //   default: false,
  // },
  // highlightColor: {
  //   type: String,
  //   default: "#000",
  // },
  customTag: {
    type: String,
    default: "#",
  },
});

const selectTag = async (tag) => {
  let lineContent =
    textContainerDom.value.childNodes[shareIndex].data ||
    textContainerDom.value.childNodes[shareIndex].textContent;

  let preText = lineContent.slice(
    0,
    currentCaretPosition - shareStackLinesLength
  );
  let hastagePosition = preText.lastIndexOf(`${props.customTag}`);
  let postText = lineContent.slice(
    currentCaretPosition - shareStackLinesLength
  );
  let preHastagText = preText.slice(0, hastagePosition);

  textContainerDom.value.childNodes[shareIndex].textContent =
    preHastagText + `${props.customTag}${tag}` + postText;
  // clean tag
  reactiveTags.value = null;

  resetCaretPosition((preHastagText + `${props.customTag}${tag}`).length);
  shareStackLinesLength = 0;
  shareIndex = 0;
};

const resetCaretPosition = (position) => {
  textContainerDom.value.focus();
  const range = document.createRange();
  const sel = window.getSelection();
  const childNode =
    textContainerDom.value.childNodes[shareIndex].firstChild ||
    textContainerDom.value.childNodes[shareIndex];
  range.setStart(childNode, position);
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

const message = (el) => {
  let stackLineLength = 0;

  getCaretPosition();

  el.target.childNodes.forEach(async (element, index) => {
    const lineContent = element.data || element.textContent;

    if (stackLineLength + lineContent.length >= currentCaretPosition) {
      const words = lineContent
        .slice(0, currentCaretPosition - stackLineLength)
        .split(/[ ]/);
      const tagPosition = words[words.length - 1].search(props.customTag);
      if (tagPosition !== -1) {
        const targetText = words[words.length - 1].substring(
          tagPosition + 1,
          words[words.length - 1].length
        );
        if (targetText && targetText.length > 0) {
          shareIndex = index;
          shareStackLinesLength = stackLineLength;
          reactiveTags.value = targetText;
        } else {
          reactiveTags.value = null;
        }
      }
    } else {
      stackLineLength += lineContent.length;
    }
  });
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
    <div id="tag-list" v-if="reactiveTags && reactiveTags.length > 0">
      <div
        class="tag"
        @click="selectTag(tag)"
        v-for="tag in reactiveTags"
        :key="tag"
      >
        <span>{{ props.customTag }}{{ tag }}</span>
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
  width: 99%;
  position: absolute;
  transform: translate(0px, 100%);
}

.tag {
  font-weight: bold;
  cursor: pointer;
  padding: 2px 0px 2px;
}
</style>
