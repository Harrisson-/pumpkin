<template>
  <div class="input-container">
    <h1>{{title}}</h1>
    <input type="text" v-model="customText">
    <div v-for="tag in tagList" :key="tag">
        <span>{{tag}}</span>
    </div>
  </div>
</template>

<script>

import {topNearestWords} from '../services/searchService';

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
  watch: {
    async customText(newText) {
        //slice le dernier hastag => fin du text
        // si y a pas de caractère spécial launch request et afiche dropdown
        const hastageLastPoition = newText.lastIndexOf('#');
        
        if (hastageLastPoition !== - 1) {
            console.log('here');
            const newTags = newText.slice(hastageLastPoition + 1, newText.length);
            console.log('here',newTags );

            if (newTags.length > 0 && specialCharactersList.test(newTags)) {
                console.log('here');

                try {
                  this.tagList = await topNearestWords(newTags);
                    console.log('tt', this.tagList);
            
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
