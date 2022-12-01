<script setup>
</script>

// BESOIN DE REFLECTION
<template>
  <Teleport to="body" :disabled="!props.teleport">
    <div
      v-if="props.showModal"
      :class="{ 'pumpkin-overlay': overlay && props.showModal }"
      @click.self="closeModal"
    >
      <div class="pumpkin-modal">
        <header class="pumpkin-header">
          <slot name="header"></slot>
          <h1>{{ props.contentTitle }}</h1>
          <button class="pumpkin-close" @click="closeModal">&#10006;</button>
        </header>
        <main class="pumpkin-body">
          <slot name="body"></slot>
          <p>{{ props.contentBody }}</p>
        </main>
        <footer class="pumpkin-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style lang="css" scoped></style>
