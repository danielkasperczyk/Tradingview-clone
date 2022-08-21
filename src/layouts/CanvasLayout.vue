<template>
  <div class="canvas-layout" @mousemove="onMouseMove">
    <slot
      name="canvas"
      :width="canvasSize.width"
      :height="canvasSize.height"
      :mouse-position="mousePosition"
    />
    <slot
      name="cursor"
      :mouse-position="mousePosition"
      :width="canvasSize.width"
      :height="canvasSize.height"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, onUnmounted } from "vue";
import useMouse from "@/composables/useMouse";

const { mousePosition, setMousePosition } = useMouse();
const canvasSize = reactive({
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
});

const setCanvasSize = () => {
  const canvas = document.querySelector(".canvas-layout");
  if (!canvas) return;
  const { left, top, height, width } = canvas.getBoundingClientRect();
  canvasSize.height = height;
  canvasSize.width = width;
  canvasSize.offsetX = left;
  canvasSize.offsetY = top;
};

const onMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  setMousePosition({
    x: clientX - canvasSize.offsetX,
    y: clientY - canvasSize.offsetY,
  });
};

onMounted(() => {
  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);
});
onUnmounted(() => {
  window.removeEventListener("resize", setCanvasSize);
});
</script>
<style lang="scss" scoped>
.canvas-layout {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
