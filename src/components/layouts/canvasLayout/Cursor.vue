<template>
  <canvas
    class="cursor"
    ref="canvasCursor"
    :width="props.width"
    :height="props.height"
  ></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

type Props = {
  width: number;
  height: number;
  mousePosition: {
    x: number;
    y: number;
  };
};
const props = defineProps<Props>();

const canvasCursor = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>();

onMounted(() => {
  if (!canvasCursor.value) return;
  ctx.value = canvasCursor.value.getContext("2d") as CanvasRenderingContext2D;
});

const createCursor = (position: { x: number; y: number }) => {
  if (!ctx.value) return;
  ctx.value.clearRect(0, 0, props.width, props.height);
  ctx.value.strokeStyle = "#999999";
  // X AXIS
  ctx.value.beginPath();
  ctx.value.setLineDash([4, 4]);
  ctx.value.moveTo(0, position.y);
  ctx.value.lineTo(props.width, position.y);
  ctx.value.stroke();

  // Y AXIS
  ctx.value.beginPath();
  ctx.value.setLineDash([4, 4]);
  ctx.value.moveTo(position.x, 0);
  ctx.value.lineTo(position.x, props.height);
  ctx.value.stroke();
};

watch(
  () => props.mousePosition,
  (position) => {
    if (!ctx.value) return;
    requestAnimationFrame(() => {
      createCursor(position);
    });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.cursor {
  position: absolute;
  pointer-events: none;
}
</style>
