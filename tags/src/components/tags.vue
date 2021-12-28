<template>
  <div class="input-container">
    <h1>{{title}}</h1>
    <div type="text" id="text" contenteditable="true" @input="message"></div>
    <div id="tag-list">
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
          wordArray: [],
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
        // this.getCaretPosition();
        const hastageLastPoition = text.lastIndexOf('#');
        text = text.slice(0, hastageLastPoition) + `<span style="color:deepskyblue;">#${tag}</span>&nbsp;`;
        this.$el.querySelector('#text').innerHTML = text;
        this.cleanTagList();
        this.resetCaretPosition();
      },
      getCaretPosition() {
        // const el = this.$el.querySelector('#text-zone')
        const range = document.createRange();
        const sel = window.getSelection();

        range.collapse(true);
        
        console.log('range', range);
        console.log('sel', sel);
      },
      // clearText() {
      //   let text = this.$el.querySelector('#text').innerHTML;
      //   text.replaceAll('<span style="color:deepskyblue;">&nbsp;');
      //   text.replaceAll('</span>', '');
      // },
      resetCaretPosition() {
        const el = this.$el.childNodes[1];
        const range = document.createRange();
        const sel = window.getSelection();

        range.setStartAfter(el, el.childNodes.length - 1); // el.innerHTML.length
        range.collapse(true);
        
        sel.removeAllRanges();
        sel.addRange(range);
        // left => offsetLeft top => offsetTop + offsetHeight
      },
      cleanTagList() {
          this.tagList = [];
      },
      message: function(el) {
        this.wordArray = el.target.innerHTML.split(' ');
        document.getSelection().anchorNode; // current node
        const reversedArray = this.wordArray.reverse();
        for (let i = 0; i < reversedArray.length; i++) {
          if (reversedArray[i].includes('#')){
            const text = reversedArray[i];
            reversedArray[i] = `<span style="color:deepskyblue;">${text}</span>` + ' ';
            const newTags = text.slice(1, text.length);
            if (newTags.length > 0) {
              this.tagList = this.givenList.filter((elem) => elem.includes(newTags));

              const currentTextZone = document.getSelection();
              const listBlock = this.$el.querySelector('#tag-list');
              listBlock.style.left = `${currentTextZone.anchorOffset}px`;
              listBlock.style.top = `${currentTextZone.anchorOffset}px`;
            }
            // el.target.innerHTML = reversedArray.reverse().join(' ');
            break;
          }
        }
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
  position: absolute;
  background-color: white;
  max-width: 100px;
  min-height: 100px;
  border: 1px solid;
}

.tag {
  font-weight: bold;
  cursor: pointer;
}

</style>
