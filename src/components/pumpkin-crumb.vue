<script setup>
const props = defineProps({
  crumbs: {
    type: Array,
    default(rawProps) {
      return rawProps;
    },
  },
});
</script>

<template>
  <div class="container-crumb">
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
