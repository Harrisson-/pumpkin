<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  crumbs: {
    type: Array,
    default(rawProps) {
      return rawProps;
    },
  },
});

let crop = ref(false);
let openDialog = ref(false);
let startCrumbs, lastCrumb, selectCrumbs;
let linkDialog;

if (props.crumbs.length > 4) {
  crop.value = true;
  lastCrumb = computed(() => props.crumbs.slice(-1)[0]);
  startCrumbs = computed(() => props.crumbs.slice(0, 2));
  selectCrumbs = computed(() => props.crumbs.slice(3, -1));
}

function showLinks() {
  // AVOID DIALOG
  if (!openDialog.value){
    linkDialog.showModal();
  } else {
    linkDialog.close();
  }
  openDialog.value = !openDialog.value;
}

onMounted(() => {
  linkDialog = document.getElementById("linkDialog");
});
</script>

<template>
  <div class="container-crumb" v-if="crop">
    <span v-for="startCrumb in startCrumbs" :key="startCrumb">
      <a :href="startCrumb.link"> &middot; {{ startCrumb.name }} </a>
    </span>
    <span>
      <a v-on:click="showLinks"> &hellip; </a>
      <!-- AVOID DIALOG -->
      <dialog id="linkDialog">
        <span v-for="selectCrumb in selectCrumbs" :key="selectCrumb.name">
          <a :href="selectCrumb.link">{{ selectCrumb.name }}</a>
        </span>
      </dialog>
      <!-- AVOID DIALOG -->
    </span>
    <span>
      <a :href="lastCrumb.link"> &middot; {{ lastCrumb.name }} </a>
    </span>
  </div>
  <div class="container-crumb" v-else>
    <span v-for="crumb in props.crumbs" :key="crumb.name">
      <a :href="crumb.link"> &middot; {{ crumb.name }} </a>
    </span>
  </div>
</template>

<style lang="css" scoped>
.container-crumb > span > a {
  color: orange;
  text-decoration: none;
}

.container-crumb > span {
  margin-right: 10px;
}
</style>
