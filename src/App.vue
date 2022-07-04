<template>
  <Tags :givenTags="filteredTags" @search-word="searchHashtag"></Tags>
</template>

<script lang="js">
import { Options, Vue } from "vue-class-component";
import Tags from "./components/tags.vue";

Options({
  components: {
    Tags,
  },
  data() {
    return {
      taglist: [
        "liver",
        "pain",
        "pain",
        "right",
        "left",
        "pancreas",
        "kidney",
        "brain",
        "severe_pain",
        "tumour",
        "cancer",
        "MRI",
        "CT",
        "male",
        "female",
        "bone",
        "shoulder",
        "hip",
        "XRAY",
        "knee",
        "spine",
        "head",
        "abdomen",
        "contrast",
        "fragment",
        "detached",
        "injury",
        "torn",
        "rotator",
        "cuff",
        "abdominal",
        "dilatation",
      ],
      filteredTags: [],
    };
  },
  methods: {
    searchHashtag(searchText) {
      this.filteredTags = this.taglist.filter((elem) =>
        elem.includes(searchText)
      );
    },
  },
});
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
