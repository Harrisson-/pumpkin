<script setup>
import { ref, computed } from "vue";
import {
  ALLSPECIALCHARACTERS,
  retriveAllRawText,
  retrieveComplexText,
  calculateCaretPosition,
  isLineContainSpecialCharacters,
  firstSpecialCharacterMatchIndex,
  cleanAllTextNode,
  adaptNode,
  createNewSpan,
  createNewTagSpan,
} from "../utils/contenteditableParser"

const textContainerDom = ref(null);
let tagPosition;
let lineIndex;
let caretPositionInLine;
let keyWord;
let rawText = [];

const reactiveTags = computed({
  get: () => {
    return props.givenTags;
  },
  set: (searchText) => {
    emit("searchWord", searchText);
  },
});

const customSpecialCharactersRegex = computed(() => {
  const tagPosition = ALLSPECIALCHARACTERS.indexOf(props.customTag);
  return new RegExp( 
    ALLSPECIALCHARACTERS.slice(0, tagPosition) +
    ALLSPECIALCHARACTERS.slice(tagPosition + 1));
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
    default: "#1E90FF",
  },
  customTag: {
    type: String,
    default: "#",
  },
});

const message = (el) => {
  
  function searchKeyword(caretPosition, node, customeTag) {
    rawText = retriveAllRawText(node)
    let reduceLength = caretPosition;
    for (let [index, line] of rawText.entries()) {
      if (reduceLength - line.length <= 0) {
        let shrunkLine = line.substring(0, reduceLength);
        tagPosition = shrunkLine.lastIndexOf(customeTag)
        // (tagPosition +1 < reduceLength) false if customTag is first character
        if (tagPosition != -1 && tagPosition +1 < reduceLength && !shrunkLine.substring(tagPosition + 1).includes(" ")) {
          // share node
          const stringFromTagePosition = line.slice(tagPosition + 1);
          keyWord = stringFromTagePosition.substring(0, firstSpecialCharacterMatchIndex(stringFromTagePosition));
          lineIndex = index;
          caretPositionInLine = reduceLength;
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

async function selectTag(tag) {

  const lineContent = rawText[lineIndex];
  const newLine = lineContent.substring(0, tagPosition + 1) + tag + lineContent.substring((tagPosition + 1) + keyWord.length);

  if (props.highlight) {
    const caretPosition = calculateCaretPosition(window, textContainerDom);
    console.log('caretPosition', caretPosition);
    const lineNode = textContainerDom.value.childNodes[lineIndex];
    rewriteDomLine(lineNode, newLine);
    cleanAllTextNode(textContainerDom.value.childNodes);
  } else {
    resetCaretPosition(textContainerDom, newSpan, (lineContent.substring(0, tagPosition + 1) + tag).length);
  }
  
  // clean tag
  reactiveTags.value = null;
};

function resetCaretPosition(containerDOM, node, addedLength) {
  containerDOM.value.focus();
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(node, addedLength);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
}

/**
 * 
 * @param { Element } node
 */
 function rewriteDomLine(node, newLineText) {
    node = adaptNode(node, newLineText);
    node.innerHTML = '';
    let indexStep = 0;
    const wordsTmp = newLineText.split(' ');
    for (const word of wordsTmp) {
        if (!word.includes(props.customTag)) {
          if (!node.childNodes[indexStep]) {
            createNewSpan(node, word);
          } else {
            node.childNodes[indexStep].textContent += ` ${word}`;
          }
        } else {
          createNewTagSpan(node, ` ${word} `, {highlightColor: props.highlightColor});
          indexStep += 2;
        }
    }
    if (node.lastChild.attributes.length > 0) {
      createNewSpan(node, '\u00A0');
    }
}
</script>

<template>
  <div class="input-container">
    <div
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
