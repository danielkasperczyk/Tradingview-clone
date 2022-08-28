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
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
  </canvas>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import useCanvas from "@/composables/useCanvas";
import useTools from "@/composables/useTools";
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
  edit,
  setPositions,
  clearCanvas,
  redrawTools,
  editShape,
  cancelEditShape,
  findClosestShape,
  updateShapeCoords,
} = useCanvas();
const { activeTool, toolDraw, addCircleOnEdges } = useTools();

const overShape = ref<SavedShape | null>(null);
const mousePressed = ref(false);

onMounted(() => {
  if (!canvas.value) return;
  ctx.value = canvas.value.getContext("2d") as CanvasRenderingContext2D;
});

const shouldCancelEdit = computed(() => !activeTool.value && !overShape.value);

const handleClick = () => {
  if (!ctx.value) return;
  if (activeTool.value) {
    setPositions(ctx.value, {
      x: props.mousePosition.x,
      y: props.mousePosition.y,
    });
  }
  if (overShape.value) {
    clearAndRedrawTools();
    editShape(overShape.value);
    addCircleOnEdges(ctx.value, overShape.value);
  }
  if (shouldCancelEdit.value) {
    cancelEditShape();
  }
};

const handleMouseDown = () => {
  mousePressed.value = true;
};

const handleMouseUp = () => {
  mousePressed.value = false;
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
    if (edit.value) {
      addCircleOnEdges(ctx.value, edit.value);
    }
  });
};

const animateIncompletedTool = (ctx: CanvasRenderingContext2D) => {
  clearAndRedrawTools();
  toolDraw(ctx, [...positions.value, props.mousePosition]);
};

const clearAndRedrawTools = () => {
  if (!ctx.value) return;
  clearCanvas(ctx.value, { width: props.width, height: props.height });
  redrawTools(ctx.value);
};

watch(
  () => overShape.value,
  (overShape) => {
    if (!ctx.value) return;
    if (!overShape) {
      clearAndRedrawTools();
      if (edit.value) addCircleOnEdges(ctx.value, edit.value);
    }
    if (overShape) {
      addCircleOnEdges(ctx.value, overShape);
    }
  }
);

watch(
  () => edit.value,
  (isEditMode) => {
    if (!isEditMode) {
      clearAndRedrawTools();
    }
  }
);
</script>
<script lang="ts">
import { defineComponent } from "vue";
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
