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
  "section1",
  "title1",
  "section2",
  "title2",
  "block1"
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
      <!-- AUTOBUILD
      <pumpkinSummary
        :autoBuild="true"
        :autoBuildLevel="2"
        autoBuildDOMId="summary-parent-auto"
      ></pumpkinSummary> -->
      STANDARD
      <pumpkinSummary :headersId="sections"></pumpkinSummary>
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
      <banner @close-banner="closeBannerSlot" :show-banner="bannerSlotState.open">
        <template #content>
          <p>try to use slot for banner</p>
        </template>
      </banner>
      AUTO BUILD
      <div class="summary-parent" id="summary-parent-auto">
        <div
          v-for="section in sections"
          :key="section"
          class="summary-section"
          v-bind:id="section"
        >
          <h1>{{ section.section }}</h1>
          <div v-bind:id="section.title">
            <p>
              Donec et lectus sapien. Etiam varius aliquam interdum. Duis quam nisl,
              sodales sed nunc eu, vestibulum laoreet ex.
            </p>
            <h2>{{ section.title }}</h2>
            <div v-bind:id="section.block">
              <p> 
                Nam ac pulvinar augue. Donec
                tincidunt commodo dolor sed imperdiet. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos. Integer quis
                maximus risus, sit amet luctus neque. Aenean porta dolor eget ultricies
                tristique.
              </p>
              <h3>{{ section.block }}</h3>
              <p>
                Integer quis
                maximus risus, sit amet luctus neque. Aenean porta dolor eget ultricies
                tristique.
              </p>
            </div>
          </div>
        </div>
      </div>
      STANDARD
      <div class="summary-parent" id="summary-parent-standard">
        <div class="summary-section" id="section1">
          <h1>section d'assaut</h1>
          <div id="title1">
            <h2>casquette</h2>
            <p>
              Loworem ipsuwum dolowor sit awoomet, cowonsectetur awoodipiscing elit, sed
              dowo eiusmowod tempowor incididunt ut lawoobowore et dolowore mawoogna
              aliquawoo. Ut enim awood minim uvueniawoom, quwuis nowostrud exercitawootion
              ullamcowo lawooboworis nisi ut awooliquip ex ea commowodo consequawoot.
            </p>
          </div>
        </div>
        <div class="summary-section" id="section2">
          <h1>big section 1</h1>
          <div id="title2">
            <h2>beautiful</h2>
            <p>
              Loworem ipsuwum dolowor sit awoomet, cowonsectetur awoodipiscing elit, sed
              dowo eiusmowod tempowor incididunt ut lawoobowore et dolowore mawoogna
              aliquawoo. Ut enim awood minim uvueniawoom, quwuis nowostrud exercitawootion
              ullamcowo lawooboworis nisi ut awooliquip ex ea commowodo consequawoot.
            </p>
            <div id="block1">
              <h3>hello world</h3>
              <p>
                Loworem ipsuwum dolowor sit awoomet, cowonsectetur awoodipiscing elit, sed
                dowo eiusmowod tempowor incididunt ut lawoobowore et dolowore mawoogna
                aliquawoo. Ut enim awood minim uvueniawoom, quwuis nowostrud
                exercitawootion ullamcowo lawooboworis nisi ut awooliquip ex ea commowodo
                consequawoot.
              </p>
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
  height: auto;
  width: 80%;
  border: 1px solid black;
}
</style>
