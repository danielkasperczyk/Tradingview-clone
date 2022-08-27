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
    @click="handleClick"
    @mousemove="handleMouseMove"
  >
  </canvas>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import useCanvas from "@/composables/useCanvas";
import type { SavedShape } from "@/composables/useCanvas";

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
  editShape,
  findClosestShape,
} = useCanvas();
const { activeTool, toolDraw } = useTools();

const overShape = ref<SavedShape | null>(null);

onMounted(() => {
  if (!canvas.value) return;
  ctx.value = canvas.value.getContext("2d") as CanvasRenderingContext2D;
});

const handleClick = () => {
  if (!ctx.value) return;
  if (activeTool.value) {
    setPositions(ctx.value, {
      x: props.mousePosition.x,
      y: props.mousePosition.y,
    });
  } else if (!activeTool.value && overShape.value) {
    // TODO: active selected tool and enable edit it
    editShape(ctx.value, overShape.value, props.mousePosition);
  }
};

const handleMouseMove = () => {
  requestAnimationFrame(() => {
    if (!ctx.value) return;
    if (!activeTool.value && !drawing.value) {
      const shape = findClosestShape(ctx.value, props.mousePosition);

      if (!shape) {
        if (overShape.value) overShape.value = null;
        return;
      }
      overShape.value = shape;
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

watch(
  () => overShape.value,
  (overShape) => {
    if (!ctx.value) return;
    if (!overShape) {
      clearCanvas(ctx.value, { height: props.height, width: props.width });
      redrawTools(ctx.value);
    }
    if (overShape) {
      editShape(ctx.value, overShape, props.mousePosition);
    }
  }
);
</script>
<script lang="ts">
import { defineComponent } from "vue";
import useTools from "@/composables/useTools";
import { getTool } from "@/utils/canvasTools/utils";
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
