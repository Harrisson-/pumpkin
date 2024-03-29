<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  crumbs: {
    type: Array,
    default(rawProps) {
      return rawProps;
    },
  },
  shrink: {
    type: Boolean,
    default: false,
  },
  shrink_number: {
    type: Number,
    default: 2,
  },
  color: {
    type: String,
    default: "orange",
  },
});

let crop = ref(false);
let openDialog = ref(false);
let startCrumbs, lastCrumb, selectCrumbs;

if (props.shrink) {
  crop.value = true;
  lastCrumb = computed(() => props.crumbs.slice(-1)[0]);
  startCrumbs = computed(() => props.crumbs.slice(0, props.shrink_number));
  selectCrumbs = computed(() =>
    props.crumbs.slice(props.shrink_number + 1, -1)
  );
}

function showLinks() {
  openDialog.value = !openDialog.value;
}
</script>

<template>
  <div class="container-crumb" v-if="crop">
    <span v-for="startCrumb in startCrumbs" :key="startCrumb">
      <a :href="startCrumb.link"> &middot; {{ startCrumb.name }} </a>
    </span>
    <span class="shrink-links">
      <a v-on:click="showLinks"> &#60; &hellip; &#62; </a>
      <Teleport to="body">
        <div
          v-if="openDialog"
          :class="{ 'pumpkin-overlay': openDialog }"
          @click.self="openDialog = false"
        ></div>
      </Teleport>
      <div v-if="openDialog" class="tooltip-block">
        <span v-for="selectCrumb in selectCrumbs" :key="selectCrumb.name">
          <a
            class="tooltip-link"
            :href="selectCrumb.link"
            @click="openDialog = false"
            >{{ selectCrumb.name }}</a
          >
        </span>
      </div>
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

<style scoped>
.container-crumb {
  display: flex;
}

.shrink-links {
  cursor: pointer;
}

.tooltip-block {
  width: fit-content;
  display: flex;
  flex-direction: column;
  position: absolute;
  border: 1px solid black;
  z-index: 11;
}

.tooltip-block > span {
  padding: 5px 5px 0px 5px;
}

.tooltip-block > span:last-child {
  padding: 5px;
}

.tooltip-link {
  text-decoration: none;
}

.container-crumb > span > a {
  color: v-bind("props.color");
  text-decoration: none;
}

.container-crumb > span {
  margin-right: 10px;
}

.pumpkin-overlay {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 10;
  position: absolute;
}
</style>
