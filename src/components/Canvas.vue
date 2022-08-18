<template>
  <canvas
    class="canvas"
    :width="props.width"
    :height="props.height"
    ref="canvas"
    @click.prevent="emitDraw($event)"
    @mousemove="onMouseMove"
  >
  </canvas>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import useMouse, { MousePosition } from "@/composables/useMouse";

type CanvasOffset = {
  offsetX: number;
  offsetY: number;
};

type Emits = {
  (eventName: "drawStart", position: MousePosition): void;
};
type Props = {
  width: number;
  height: number;
};

const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  width: 0,
  height: 0,
});

const canvas = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>();
const canvasOffset = reactive<CanvasOffset>({
  offsetX: 0,
  offsetY: 0,
});

const { mousePosition, setMousePosition } = useMouse();
const { draw } = useCanvas();

onMounted(() => {
  if (!canvas.value) return;
  ctx.value = canvas.value.getContext("2d") as CanvasRenderingContext2D;
  const { left, top, height, width } = canvas.value.getBoundingClientRect();
  console.log(canvas.value.getBoundingClientRect());
  setCanvasSize({ offsetX: left, offsetY: top, height, width });
});

const setCanvasSize = (size: CanvasOffset) => {
  canvasOffset.offsetX = size.offsetX;
  canvasOffset.offsetY = size.offsetY;
};

const onMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  setMousePosition({
    x: clientX - canvasOffset.offsetX,
    y: clientY - canvasOffset.offsetY,
  });
};

const emitDraw = (e: MouseEvent) => {
  if (!ctx.value) return;
  draw(ctx.value, { x: mousePosition.x, y: mousePosition.y, w: 5, h: 5 });
};
</script>
<script lang="ts">
import { defineComponent } from "vue";
import useCanvas from "@/composables/useCanvas";
export default defineComponent({});
</script>
<style lang="scss" scoped>
.canvas {
  position: relative;
}
</style>
