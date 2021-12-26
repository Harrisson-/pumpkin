<template>
  <div class="input-container">
    <h1>{{title}}</h1>
    <input type="text" v-model="customText">
    <div v-for="tag in tagList" :key="tag">
        <span v-on:click="selectTag(tag)">{{tag}}</span>
    </div>
  </div>
</template>

<script>

import {topNearestWords} from '../services/searchService';

// eslint-disable-next-line
const specialCharactersList = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);

export default {
  name: 'Tags',
  data() {
      return {
          title: 'Tags test',
          tagList: [],
          customText: '',
      };
  },
  methods: {
      selectTag(tag) {
        const hastageLastPoition = this.customText.lastIndexOf('#');
        this.customText = this.customText.slice(0, hastageLastPoition + 1);
        this.customText += `${tag} `;
        this.cleanTagList();
      },
      cleanTagList() {
          this.tagList = [];
      }
  },
  watch: {
    async customText(newText) {
        //slice le dernier hastag => fin du text
        // si y a pas de caractère spécial launch request et afiche dropdown
        const hastageLastPoition = newText.lastIndexOf('#');
        this.cleanTagList();
        if (hastageLastPoition !== - 1) {
            const newTags = newText.slice(hastageLastPoition + 1, newText.length);
            if (newTags.length > 0 && !specialCharactersList.test(newTags)) {
                try {
                    this.tagList = await topNearestWords(newTags);            
                } catch(error) {
                    console.log(error);
                }
            }
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
