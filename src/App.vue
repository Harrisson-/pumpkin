<script setup>
import { reactive, ref } from "vue";
import Tags from "./components/pumpkin-tags.vue";
import Breadcrumb from "./components/pumpkin-crumb.vue";
// import intersectionGroup from "./components/pumpkin-intersection-group.vue";
import intersectionSolo from "./components/pumpkin-intersection-solo.vue";
import modal from "./components/pumpkin-modal.vue";
import banner from "./components/pumpkin-banner.vue";
import pumpkinSummary from "./components/pumpkin-summary.vue";

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
var filteredTags = reactive([]);
function searchHashtag(searchText) {
  if (searchText === null) {
    filteredTags.value = [];
  } else {
    filteredTags.value = taglist.filter((elem) => elem.includes(searchText));
  }
}

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

const longCrumbs = [
  {
    name: "home",
    link: "#",
  },
  {
    name: "actualité",
    link: "#",
  },
  {
    name: "tata",
    link: "#",
  },
  {
    name: "toto",
    link: "#",
  },
  {
    name: "titi",
    link: "#",
  },
  {
    name: "fouilles",
    link: "#",
  },
];

const list = [
  { name: "liver" },
  { name: "pain" },
  { name: "pain" },
  { name: "right" },
  { name: "left" },
  { name: "pancreas" },
  { name: "kidney" },
  { name: "brain" },
  { name: "severe_pain" },
  { name: "tumour" },
  { name: "cancer" },
  { name: "MRI" },
  { name: "CT" },
  { name: "male" },
  { name: "female" },
  { name: "bone" },
  { name: "shoulder" },
  { name: "hip" },
  { name: "XRAY" },
  { name: "knee" },
  { name: "spine" },
  { name: "head" },
  { name: "abdomen" },
  { name: "contrast" },
  { name: "fragment" },
  { name: "detached" },
  { name: "injury" },
  { name: "torn" },
  { name: "rotator" },
  { name: "cuff" },
  { name: "abdominal" },
  { name: "dilatation" },
];

const intersectionAnimations = ref([
  "slide-left",
  "display-left",
  "flip-left",
  "brighten",
]);

const sections = [
  {
    section: "section1",
    title: "title1",
    block: "block1",
  }, 
  {
    section: "section2",
    title: "title2",
    block: "block2",
  }, 
  {
    section: "section3",
    title: "title3",
    block: "block3",
  }, 
  {
    section: "section4",
    title: "title4",
    block: "block4",
  }
];

const modalState = reactive({ open: false });
modalState.content =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada viverra velit auctor porttitor. Mauris ac dictum lectus. Nam blandit consequat venenatis. Proin tempus quam pretium ullamcorper euismod. Donec a ante eu augue ullamcorper pretium. Mauris id nunc posuere, lobortis tellus semper, tincidunt nisi. Nunc in commodo mauris, eget tincidunt turpis. Etiam vitae eros a dolor pretium convallis id et ligula. Aenean et ipsum feugiat dui venenatis finibus sit amet et odio. Vivamus id nunc vitae felis porta mattis. Etiam venenatis, erat vitae venenatis sagittis, erat nunc gravida nunc, facilisis placerat nunc leo laoreet dui. Donec mollis leo non feugiat tempor. Suspendisse vel nulla viverra, facilisis nunc non, sollicitudin ligula.";
modalState.title = "A good modal title";
function openModal() {
  modalState.open = !modalState.open;
}

function closeModal(modalOpen) {
  modalState.open = modalOpen;
}

const bannerState = reactive({ open: false });
function openBanner() {
  bannerState.open = !bannerState.open;
}

function closeBanner(modalOpen) {
  bannerState.open = modalOpen;
}

const bannerSlotState = reactive({ open: false });
function openBannerSlot() {
  bannerSlotState.open = !bannerSlotState.open;
}

function closeBannerSlot(modalOpen) {
  bannerSlotState.open = modalOpen;
}
</script>

<template>
  <header></header>

  <main>
    <div class="left-block">
      <pumpkinSummary :headers="sections" :autoBuild="true" :autoBuildLevel="2" autoBuildDOMId="summary-parent-auto"></pumpkinSummary>
    </div>
    <div class="right-block">
      <Tags :given-tags="filteredTags.value" @search-word="searchHashtag" />
      <h1>BreadCrumbs</h1>
      <Breadcrumb :crumbs="crumbs" />
      <Breadcrumb :crumbs="longCrumbs" :shrink="true" />
      <!-- NEED REWORK -->
      <!-- <div
      class="intersection-wrapper"
      v-for="intersectionAnimation in intersectionAnimations"
      :key="intersectionAnimation"
    >
      <span>{{ intersectionAnimation }}</span>
      <intersectionGroup
        debug="true"
        target="item"
        :transitionName="intersectionAnimation"
      >
        <ul id="wrap-list">
          <li class="item" v-for="item in list" :key="item.name">
            {{ item.name }}
          </li>
        </ul>
      </intersectionGroup>
    </div> -->
      <div class="solo-wrapper">
        <intersectionSolo
          target="item-solo"
          transitionName="brighten"
          v-for="(item, index) in list"
          :key="item.name"
          :unique-key="index"
          :animationDelay="200"
          :parent="'solo-wrapper'"
        >
          <div class="item-solo">
            {{ item.name }}
          </div>
        </intersectionSolo>
      </div>
      <button @click="openModal">pumpkin modal</button>
      <modal
        :teleport="true"
        :show-modal="modalState.open"
        @close-modal="closeModal"
        :overlay="true"
        :content-title="modalState.title"
        :content-body="modalState.content"
      ></modal>
      <button @click="openBanner">pumpkin banner</button>
      <banner
        :content="'toto'"
        @close-banner="closeBanner"
        :show-banner="bannerState.open"
      ></banner>
      <button @click="openBannerSlot">pumpkin banner with slot</button>
      <banner
        @close-banner="closeBannerSlot"
        :show-banner="bannerSlotState.open"
      >
        <template #content>
          <p>try to use slot for banner</p>
        </template>
      </banner>
      <div class="summary-parent" id="summary-parent-auto">
        <div
          v-for="section in sections"
          :key="section.section"
          class="summary-section"
          v-bind:id="section.section"
        >
          <h1>{{section.section }}</h1>
          <div v-bind:id="section.title">
            <h2>{{section.title}}</h2>
              <div v-bind:id="section.block">
                <h3>{{section.block}}</h3>
              </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

main {
  display: flex;
  flex-align: row;
}

.left-block {
  width: 100px;
}

.right-block {
  width: 100%;
}

.intersection-wrapper {
  height: 200px;
  display: flex;
  flex-direction: column;
}

.item {
  margin-top: 10px;
}

.item-solo {
  margin-top: 10px;
}

.solo-wrapper {
  overflow-y: scroll;
  height: 200px;
}

.summary-section {
  height: 500px;
  width: 80%;
  border: 1px solid black;
}
</style>
