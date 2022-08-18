<template>
  <div class="canvas-layout">
    <slot
      name="canvas"
      :width="canvasSize.width"
      :height="canvasSize.height"
    ></slot>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from "vue";

const canvasSize = reactive({
  width: 0,
  height: 0,
});

onMounted(() => {
  const canvas = document.querySelector(".canvas-layout");
  if (!canvas) return;
  canvasSize.height = canvas.clientHeight;
  canvasSize.width = canvas.clientWidth;
});
</script>
<style lang="scss" scoped>
.canvas-layout {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
