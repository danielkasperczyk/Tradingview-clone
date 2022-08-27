import { reactive, ref } from "vue";
import useTools from "@/composables/useTools";
import { getTool } from "@/utils/canvasTools/utils";

type Position = {
  x: number;
  y: number;
};

type Positions = {
  start: Position;
  end: Position;
};

export type SavedShape = {
  toolId: string;
  position: Positions;
};

type CanvasSize = {
  width: number;
  height: number;
};

const savedShapes: SavedShape[] = [];

const useCanvas = () => {
  const { activeTool, setActiveTool } = useTools();
  const drawing = ref(false);
  const edit = ref(false);
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
      saveShape(activeTool.value.id, Object.assign({}, positions));
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
      const tool = getTool(shape.toolId);
      if (!tool) return;
      tool.draw(ctx, shape.position.start, shape.position.end);
    });
  };

  const saveShape = (toolId: string, position: Positions) => {
    savedShapes.push({ toolId, position });
  };

  const findClosestShape = (
    ctx: CanvasRenderingContext2D,
    mousePosition: Position
  ) => {
    if (!savedShapes.length) return;
    const overShapes = savedShapes.filter((shape) => {
      const shapeTool = getTool(shape.toolId);
      if (!shapeTool) return false;
      return shapeTool.mouseOver(ctx, shape.position, mousePosition);
    });
    if (!overShapes.length) return false;
    const [shape] = overShapes;
    return shape;
  };

  const editShape = (
    ctx: CanvasRenderingContext2D,
    shape: SavedShape,
    mousePosition: Position
  ) => {
    const tool = getTool(shape.toolId);
    if (!tool) return;
    tool.addCirclesOnEdges(ctx, shape.position);
  };

  return {
    positions,
    drawing,
    edit,
    setPositions,
    clearCanvas,
    redrawTools,
    findClosestShape,
    editShape,
  };
};

export default useCanvas;
