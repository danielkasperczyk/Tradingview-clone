<template>
  <canvas
    :class="[
      'canvas',
      {
        'canvas--cursor-pointer': overShape,
      },
    ]"
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
const {
  positions,
  drawing,
  setPositions,
  clearCanvas,
  redrawTools,
  findClosestShape,
} = useCanvas();
const { activeTool, toolDraw } = useTools();

const overShape = ref(false);

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
    if (!activeTool.value && !drawing.value) {
      const shapes = findClosestShape(ctx.value, props.mousePosition);
      if (!shapes) {
        if (overShape.value) overShape.value = false;
        return;
      }
      overShape.value = true;
    }
    if (activeTool.value && drawing.value) {
      animateIncompletedTool(ctx.value);
      return;
    }
  });
};

const animateIncompletedTool = (ctx: CanvasRenderingContext2D) => {
  clearCanvas(ctx, { width: props.width, height: props.height });
  redrawTools(ctx);
  toolDraw(ctx, positions.start, props.mousePosition);
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

.canvas--cursor-pointer {
  cursor: pointer;
}
</style>
