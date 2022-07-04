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

<script>
// eslint-disable-next-line
// const specialCharactersList = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);

// change to composition api

export default {
  name: "pumpkin-tags",
  emits: ["searchWord"],
  data() {
    return {
      title: "Tags test",
      swapText: [],
      tagList: [],
    };
  },
  props: {
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
  },
  watch: {
    givenTags(newValue) {
      this.tagList = newValue;
    },
  },
  created() {
    this.tagList = JSON.parse(JSON.stringify(this.givenTags));
  },
  methods: {
    async selectTag(tag) {
      let text = this.$el.querySelector("#text").innerHTML;
      const hastageLastPoition = text.lastIndexOf("#");
      if (this.highlight) {
        text =
          text.slice(0, hastageLastPoition) +
          `<span style="color:${this.highlightColor};">#${tag}</span>`;
      } else {
        text = text.slice(0, hastageLastPoition) + `#${tag}`;
      }
      this.$el.querySelector("#text").innerHTML = text;
      this.cleanTagList();

      this.resetCaretPosition();
    },
    resetCaretPosition() {
      let diffWord = 0;
      let selectedNode;
      this.$el.querySelector("#text").focus();
      const range = document.createRange();
      const sel = window.getSelection();

      for (let node of this.$refs.test.childNodes.values()) {
        if (diffWord + node.textContent.length >= this.currentCaretPosition) {
          diffWord = this.currentCaretPosition - diffWord;
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
    },
    getCaretPosition() {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(this.$refs.test);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      this.currentCaretPosition = preCaretRange.toString().length;
    },
    cleanTagList() {
      this.tagList = [];
    },
    cleanText(text) {
      const newText = text.replaceAll('<span style="color:deepskyblue;">', "");
      return newText.replaceAll("</span> ", "");
    },
    message: function (el) {
      const currentText = this.cleanText(el.target.innerHTML);
      const wordArray = currentText.split(" ");
      const modifiedWord = wordArray.filter((word) => {
        return !this.swapText.includes(word);
      })[0];
      if (modifiedWord.includes("#")) {
        this.getCaretPosition();
        const searchText = modifiedWord.slice(
          modifiedWord.indexOf("#") + 1,
          modifiedWord.length
        );
        if (searchText.length > 0) {
          this.$emit("searchWord", searchText);
        }
        const renderingText = wordArray.map((word) => {
          const tmpHashtagPosition = word.indexOf("#");
          if (tmpHashtagPosition === -1) {
            return word;
          }
          if (tmpHashtagPosition !== 0) {
            const tmpTxt = word.slice(tmpHashtagPosition, -1);
            if (this.highlight) {
              return (
                word.split(tmpTxt) +
                `<span style="color:deepskyblue;">${tmpTxt}</span> `
              );
            } else {
              return word.split(tmpTxt) + `${tmpTxt}`;
            }
          }
          if (this.highlight) {
            return `<span style="color:deepskyblue;">${word}</span>`;
          } else {
            return `${word}`;
          }
        });
        el.target.innerHTML = renderingText.join(" ");
        this.resetCaretPosition();
      }
      this.swapText = wordArray;
    },
  },
};
</script>

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
