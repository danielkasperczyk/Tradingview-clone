import { reactive, ref } from "vue";
import useTools from "@/composables/useTools";

type Position = {
  x: number;
  y: number;
};

type Positions = {
  start: Position;
  end: Position;
};

type SavedShapes = {
  tool: string;
  position: Positions;
};

type CanvasSize = {
  width: number;
  height: number;
};

const savedShapes: SavedShapes[] = [];

const useCanvas = () => {
  const { activeTool, setActiveTool } = useTools();
  const drawing = ref(false);
  const positions = reactive<Positions>({
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
  });

  const resetPosition = () => {
    positions.start = { x: 0, y: 0 };
    positions.end = { x: 0, y: 0 };
  };

  const setPositions = (ctx: CanvasRenderingContext2D, position: Position) => {
    if (!activeTool.value) return;
    if (!drawing.value) {
      ctx.save();
      positions.start = position;
      drawing.value = true;
    } else {
      positions.end = position;
      drawing.value = false;
      if (activeTool.value?.drawEnd) activeTool.value.drawEnd(ctx);
      saveShape(activeTool.value.name, Object.assign({}, positions));
      ctx.save();
      resetPosition();
      setActiveTool(null);
    }
  };

  const clearCanvas = (
    ctx: CanvasRenderingContext2D,
    canvasSize: CanvasSize
  ) => {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  };

  const redrawTools = (ctx: CanvasRenderingContext2D) => {
    savedShapes.forEach((shape) => {
      activeTool.value?.draw(ctx, shape.position.start, shape.position.end);
    });
  };

  const saveShape = (tool = "line", position: Positions) => {
    savedShapes.push({ tool, position });
  };

  return {
    positions,
    drawing,
    setPositions,
    clearCanvas,
    redrawTools,
  };
};

export default useCanvas;
