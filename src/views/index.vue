<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <CanvasLayout>
    <template #canvas="{ height, width, mousePosition }">
      <Canvas :height="height" :width="width" :mouse-position="mousePosition" />
      <Cursor :height="height" :width="width" :mouse-position="mousePosition" />
    </template>
  </CanvasLayout>
</template>

<script setup lang="ts">
import CanvasLayout from "@/layouts/CanvasLayout.vue";
import Canvas from "@/components/layouts/canvasLayout/Canvas.vue";
import Cursor from "@/components/layouts/canvasLayout/Cursor.vue";
</script>

<style lang="scss" scoped></style>
