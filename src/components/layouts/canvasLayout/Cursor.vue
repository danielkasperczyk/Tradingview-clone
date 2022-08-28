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
import useCanvas from "@/composables/useCanvas";
import cursor from "@/utils/canvasTools/cursors/canvasCursor";

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
const { clearCanvas } = useCanvas();

onMounted(() => {
  if (!canvasCursor.value) return;
  ctx.value = canvasCursor.value.getContext("2d") as CanvasRenderingContext2D;
});

const createCursor = () => {
  if (!ctx.value) return;
  clearCanvas(ctx.value, { width: props.width, height: props.height });
  const positions = [props.mousePosition, { x: props.width, y: props.height }];
  if (cursor.draw) cursor.draw(ctx.value, positions);
};

watch(
  () => props.mousePosition,
  () => {
    if (!ctx.value) return;
    requestAnimationFrame(() => {
      createCursor();
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
