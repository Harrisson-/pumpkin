<script setup>
const emit = defineEmits(["closeModal"]);

const props = defineProps({
  showBanner: {
    type: Boolean,
    required: true,
    default: false,
  },
  content: {
    type: String,
  },
});

function closeBanner() {
  emit("closeBanner", false);
}
</script>

<template>
  <div v-if="props.showBanner" class="pumpkin-banner">
    <slot name="content"></slot>
    <h1>{{ props.content }}</h1>
    <button class="pumpkin-close" @click="closeBanner">&#10006;</button>
  </div>
</template>

<style lang="css" scoped>
.pumpkin-banner {
  position: fixed;
  z-index: 999;
  top: 0%;
  left: 0%;
  right: 0%;
  width: 100%;
  border: 1px solid black;
  background-color: white;
  display: flex;
}

.pumpkin-banner > .pumpkin-close {
  border: none;
  margin-left: auto;
  font-size: xxx-large;
  background-color: transparent;
}
</style>
