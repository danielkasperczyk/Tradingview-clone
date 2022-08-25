<template>
  <canvas
    class="canvas"
    :width="props.width"
    :height="props.height"
    ref="canvas"
    @click="handleDraw"
    @mousemove="handleMouseMove"
  >
  </canvas>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import useCanvas from "@/composables/useCanvas";

type Props = {
  width: number;
  height: number;
  mousePosition: {
    x: number;
    y: number;
  };
};

const props = withDefaults(defineProps<Props>(), {
  width: 0,
  height: 0,
});

const canvas = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>();

const { positions, drawing, setPositions, clearCanvas, redrawTools } =
  useCanvas();
const { activeTool, toolDraw } = useTools();
onMounted(() => {
  if (!canvas.value) return;
  ctx.value = canvas.value.getContext("2d") as CanvasRenderingContext2D;
});

const handleDraw = () => {
  if (!ctx.value) return;
  setPositions(ctx.value, {
    x: props.mousePosition.x,
    y: props.mousePosition.y,
  });
};
const handleMouseMove = () => {
  requestAnimationFrame(() => {
    if (!ctx.value) return;
    if (!activeTool.value) return;
    if (!drawing.value) return;
    clearCanvas(ctx.value, { width: props.width, height: props.height });
    redrawTools(ctx.value);
    toolDraw(ctx.value, positions.start, props.mousePosition);
  });
};
</script>
<script lang="ts">
import { defineComponent } from "vue";
import useTools from "@/composables/useTools";
export default defineComponent({});
</script>
<style lang="scss" scoped>
.canvas {
  position: absolute;
}
</style>
