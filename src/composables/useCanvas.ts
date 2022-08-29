import { ref } from "vue";
import useTools from "@/composables/useTools";
import { getTool } from "@/utils/canvasTools/utils";

type Position = {
  x: number;
  y: number;
};

export type SavedShape = {
  toolId: string;
  position: Position[];
  shapeId: string;
};

type CanvasSize = {
  width: number;
  height: number;
};

const savedShapes = ref<SavedShape[]>([]);
const edit = ref<SavedShape | false>(false);

const useCanvas = () => {
  const { activeTool, setActiveTool } = useTools();
  const drawing = ref(false);
  const positions = ref<Position[]>([]);

  const resetPosition = () => {
    positions.value.length = 0;
  };

  const setPositions = (ctx: CanvasRenderingContext2D, position: Position) => {
    if (!activeTool.value) return;
    if (!drawing.value) {
      ctx.save();
      positions.value.push(position);
      drawing.value = true;
    } else {
      if (activeTool.value.positionsRequired !== positions.value.length)
        positions.value.push(position);
      if (activeTool.value.positionsRequired === positions.value.length) {
        drawing.value = false;
        if (activeTool.value?.drawEnd) activeTool.value.drawEnd(ctx);
        saveShape(activeTool.value.id, [...positions.value]);
      }
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
    savedShapes.value.forEach((shape) => {
      const tool = getTool(shape.toolId);
      if (!tool) return;
      tool.draw(ctx, shape.position);
    });
  };

  const saveShape = (toolId: string, position: Position[]) => {
    const shapeId = savedShapes.value.length + "";
    savedShapes.value.push({ toolId, position, shapeId });
  };

  const findClosestShape = (
    ctx: CanvasRenderingContext2D,
    mousePosition: Position
  ) => {
    if (!savedShapes.value.length) return;
    const overShapes = savedShapes.value.filter((shape) => {
      const shapeTool = getTool(shape.toolId);
      if (!shapeTool) return false;
      return shapeTool.mouseOver(ctx, shape.position, mousePosition);
    });
    if (!overShapes.length) return false;
    const [shape] = overShapes;
    return shape;
  };

  const editShape = (shape: SavedShape) => {
    edit.value = shape;
  };

  const cancelEditShape = () => {
    edit.value = false;
  };

  const updateShapeCoords = (
    savedShape: SavedShape,
    mousePosition: Position
  ) => {
    const tool = getTool(savedShape.toolId);
    if (!tool) return;
    const savedShapeIndex = savedShapes.value.findIndex(
      ({ shapeId }) => shapeId === savedShape.shapeId
    );
    savedShapes.value[savedShapeIndex].position = tool.updatePosition(
      savedShape.position,
      mousePosition
    );
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
    cancelEditShape,
    updateShapeCoords,
  };
};

export default useCanvas;
