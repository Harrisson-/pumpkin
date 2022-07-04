<script setup>
import Tags from "./components/pumpkin-tags.vue";
import Breadcrumb from "./components/pumpkin-crumb.vue";
import HelloWorld from "./components/HelloWorld.vue";

const taglist = [
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
];
let filteredTags = [];
const searchHashtag = (searchText) => {
  filteredTags = taglist.filter((elem) => elem.includes(searchText));
};

const crumbs = [
  {
    name: "home",
    link: "https://www.inrap.fr/",
  },
  {
    name: "actualité",
    link: "https://www.inrap.fr/actualites/recherche",
  },
  {
    name: "fouilles",
    link: "https://www.inrap.fr/chroniques-de-site/recherche",
  },
];
</script>

<template>
  <header></header>

  <main>
    <HelloWorld msg="hello" />
    <Tags :given-tags="filteredTags" @search-word="searchHashtag" />
    <Breadcrumb :crumbs="crumbs" />
  </main>
</template>

<style>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}
</style>
