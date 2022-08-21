import { reactive } from "vue";
import useTools from "@/composables/useTools";
type Settings = {
  x: number;
  y: number;
};

type Position = {
  x: number;
  y: number;
};

const useCanvas = () => {
  const { activeTool, toolDraw } = useTools();
  const positions = reactive<Position[]>([]);
  const draw = (ctx: CanvasRenderingContext2D, settings: Settings) => {
    if (!activeTool.value) return;
    positions.push({ x: settings.x, y: settings.y });
    toolDraw(ctx, positions);
    if (positions.length === activeTool.value.positionsRequired) {
      positions.splice(0, activeTool.value.positionsRequired);
    }
  };

  return { positions, draw };
};

export default useCanvas;
