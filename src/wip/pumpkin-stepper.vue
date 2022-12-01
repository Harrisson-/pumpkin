<script setup>
// eslint-disable-next-line
const _props = defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
  steps: {
    type: Number,
  },
});
</script>

<template>
  <div></div>
  <template v-for="step = 1 in steps" :key="step">
    <slot :name="step"> </slot>
  </template>
  <div></div>
</template>

<style lang="css" scoped></style>
