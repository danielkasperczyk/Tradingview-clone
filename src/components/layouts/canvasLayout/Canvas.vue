<template>
  <canvas
    class="canvas"
    :width="props.width"
    :height="props.height"
    ref="canvas"
    @mousedown="drawStart($event)"
  >
  </canvas>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
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

const { draw } = useCanvas();

onMounted(() => {
  if (!canvas.value) return;
  ctx.value = canvas.value.getContext("2d") as CanvasRenderingContext2D;
});

const drawStart = (e: MouseEvent) => {
  if (!ctx.value) return;
  draw(ctx.value, { x: props.mousePosition.x, y: props.mousePosition.y });
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
