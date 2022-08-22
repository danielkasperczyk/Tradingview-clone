<template>
  <canvas
    class="canvas"
    :width="props.width"
    :height="props.height"
    ref="canvas"
    @click="handleDraw"
    @mousemove="addMockTool(ctx, mousePosition)"
  >
  </canvas>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import useCanvas from "@/composables/useCanvas";
/* CANVAS
 *  - clear everything in canvas
 *  - remember positions of tools
 *  - use tool to draw
 *    - complete drawing
 *    - show sample of drawing if it is not completed but started
 */

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

const { setPositions, addMockTool } = useCanvas();

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
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style lang="scss" scoped>
.canvas {
  position: absolute;
}
</style>
