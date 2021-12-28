<template>
  <div class="input-container">
    <h1>{{title}}</h1>
    <div type="text" id="text" contenteditable="true" @input="message"></div>
    <div id="tag-list" v-show="tagList.length > 0">
      <div class="tag" v-on:click="selectTag(tag)" v-for="tag in tagList" :key="tag">
          <span>#{{tag}}</span>
      </div>
    </div>
  </div>
</template>

<script>

// import {topNearestWords} from '../services/searchService';

// eslint-disable-next-line
const specialCharactersList = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);

export default {
  name: 'Tags',
  data() {
      return {
          title: 'Tags test',
          tagList: [],
          swapText: [],
          givenList: [
            'liver',
            'pain',
            'pain',
            'right',
            'left',
            'pancreas',
            'kidney',
            'brain',
            'severe_pain',
            'tumour',
            'cancer',
            'MRI',
            'CT',
            'male',
            'female',
            'bone',
            'shoulder',
            'hip',
            'XRAY',
            'knee',
            'spine',
            'head',
            'abdomen',
            'contrast',
            'fragment',
            'detached',
            'injury',
            'torn',
            'rotator',
            'cuff',
            'abdominal',
            'dilatation',
          ],
      };
  },
  methods: {
      selectTag(tag) {
        let text = this.$el.querySelector('#text').innerHTML;
        const hastageLastPoition = text.lastIndexOf('#');
        text = text.slice(0, hastageLastPoition) + `<span style="color:deepskyblue;">#${tag}</span> `;
        // parse text and replace by tag
        this.$el.querySelector('#text').innerHTML = text;
        this.cleanTagList();
        this.putCaretAtEnd();
      },
      putCaretAtEnd() {
        // go to next node child
        const el = this.$el.childNodes[1];
        const range = document.createRange();
        const sel = window.getSelection();

        range.setStartAfter(el.lastChild);
        range.collapse(true);
        
        sel.removeAllRanges();
        sel.addRange(range);
      },
      resetCaretPosition() {
        // go to next node child
        const el = this.$el.childNodes[1];
        const range = document.createRange();
        const sel = window.getSelection();

        range.setStartAfter(el.lastChild, el.lastChild.length);
        range.collapse(true);
        
        sel.removeAllRanges();
        sel.addRange(range);
      },
      cleanTagList() {
          this.tagList = [];
      },
      cleanText(text){
        const newText = text.replaceAll('<span style="color:deepskyblue;">', '');
        return newText.replaceAll('</span> ', '');
      },
      message: function(el) {
        const currentText = this.cleanText(el.target.innerHTML);
        const wordArray = currentText.split(' ');
        const modifiedWord = wordArray.filter((word) => {
          return !this.swapText.includes(word);
        })[0];
        if (modifiedWord.includes('#')) {
          const searchText = modifiedWord.slice(modifiedWord.indexOf('#') + 1, modifiedWord.length);
          if (searchText.length > 0) {
            this.tagList = this.givenList.filter((elem) => elem.includes(searchText));
          }
          const renderingText = wordArray.map(word => {
            const tmpHashtagPosition = word.indexOf('#');
            if (tmpHashtagPosition === -1) {
              return word;
            }
            if (tmpHashtagPosition !== 0) {
              const tmpTxt = word.slice(tmpHashtagPosition, -1);
              return word.split(tmpTxt) + `<span style="color:deepskyblue;">${tmpTxt}</span> `;
            }
            return `<span style="color:deepskyblue;">${word}</span> `;
          });
          el.target.innerHTML = renderingText.join(' ');
        }
        this.swapText = wordArray;
        this.resetCaretPosition();
      },
  },
}
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
