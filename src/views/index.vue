<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PanelLayout>
    <template #header> header </template>
    <template #left-panel> left panel </template>
    <template #main>
      <div class="test">test</div>
    </template>
    <template #right-panel> left panel </template>
  </PanelLayout>
</template>

<script setup lang="ts">
import PanelLayout from "@/layouts/PanelLayout.vue";
</script>

<style lang="scss" scoped></style>
