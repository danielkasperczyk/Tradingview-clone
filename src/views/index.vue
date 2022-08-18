<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <CanvasLayout>
    <template #canvas="{ height, width }">
      <Canvas @drawStart="drawStart" :height="height" :width="width" />
    </template>
  </CanvasLayout>
</template>

<script setup lang="ts">
import CanvasLayout from "@/layouts/CanvasLayout.vue";
import Canvas, { Position } from "@/components/Canvas.vue";
import useCanvas from "@/composables/useCanvas";

// const { draw } = useCanvas(document.querySelector(".canvas"));

const drawStart = (position: Position) => console.log(position);
</script>

<style lang="scss" scoped></style>
