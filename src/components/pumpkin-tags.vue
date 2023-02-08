<script setup>
import { ref, computed } from "vue";
import { 
  retriveAllRawText,
  retrieveComplexText,
  calculateCaretPosition,
  isLineContainSpecialCharacters,
  firstSpecialCharacterMatchIndex
} from "../utils/contenteditableParser"

// the pattern design is just here to clean code and improve debug
function TagsObject() {
  let currentNode;
  let childNode;

  this.currentCaretPosition;
  this.shareIndex = 0;
  this.shareStackLinesLength = 0;
  this.getLineContent = () => {
    return textContainerDom.value.childNodes[this.shareIndex].data ||
      textContainerDom.value.childNodes[this.shareIndex].textContent;
  };
  this.setNodeContext = (value) => {
    currentNode = value;
    childNode = value.firstChild || value; 
  }
  this.setCurrentNodeTextContent = (value) => {
    currentNode.innerHTML = value;
  }
  this.getChildNode = () => {
    return childNode;
  }
  this.getCurrentNode = () => {
    return currentNode;
  }
}

TagsObject.prototype.selectTag = async function(tag) {
  this.setNodeContext(textContainerDom.value.childNodes[this.shareIndex]);
  const lineContent = this.getLineContent(); 
  let preText = lineContent.slice(
    0,
    this.currentCaretPosition - this.shareStackLinesLength
  );
  let hastagePosition = preText.lastIndexOf(`${props.customTag}`);
  let postText = lineContent.slice(
    this.currentCaretPosition - this.shareStackLinesLength
  );
  let preHastagText = preText.slice(0, hastagePosition);

  // REPLACE TEXT NODE BY ELEMENT NODE
  this.setCurrentNodeTextContent(preHastagText + `<div style="color:blue;">${props.customTag}${tag}</div>` + postText);
  // clean tag
  reactiveTags.value = null;

  // RESET CARRET POSITION START
  // textContainerDom.value.focus();
  // const range = document.createRange();
  // const sel = window.getSelection();
  // range.setStart(this.getChildNode(), (preHastagText + `${props.customTag}${tag}`).length);
  // range.collapse(true);

  // sel.removeAllRanges();
  // sel.addRange(range);
  // RESET CARRET POSITION END

  this.shareStackLinesLength = 0;
  this.shareIndex = 0;
};

const tags = new TagsObject();
const textContainerDom = ref(null);

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
  highlight: {
    type: Boolean,
    default: false,
  },
  highlightColor: {
    type: String,
    default: "#000",
  },
  customTag: {
    type: String,
    default: "#",
  },
});

const message = (el) => {

  function searchKeyword(caretPosition, node, customeTag) {
    const text = retriveAllRawText(node)
    let reduceLength = caretPosition;
    for (let line of text) {
      if (reduceLength - line.length <= 0) {
        let shrunkLine = line.substring(0, reduceLength);
        const tagPosition = shrunkLine.lastIndexOf(customeTag)
        if (tagPosition != -1 && tagPosition +1 < reduceLength) {
          const stringFromTagePosition = line.slice(tagPosition + 1)
          const keyWord = stringFromTagePosition.substring(0, firstSpecialCharacterMatchIndex(stringFromTagePosition))
          reactiveTags.value = keyWord;
          break;
        } else {
          reactiveTags.value = null;
        }
      }
      reduceLength -= line.length;
    }
  }
  const caretPosition = calculateCaretPosition(window, textContainerDom)
  searchKeyword(caretPosition, el.currentTarget, props.customTag);
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
        @click="tags.selectTag(tag)"
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
