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
      const tool = getTool(shape.tool);
      if (!tool) return;
      tool.draw(ctx, shape.position.start, shape.position.end);
    });
  };

  const saveShape = (tool: string, position: Positions) => {
    savedShapes.push({ tool, position });
  };

  const findClosestShape = ({ x, y }: Position, dist = 1) => {
    if (!savedShapes.length) return;
    /* TODO:
     * 1. Get tool with its method
     * 2. Tool should has method to calculate if user hover on it
     *    based on passed location and available distance far
     *      - it would be nice to check if user hover SOMEWHERE on tool
     *        not just on start or end
     * 3. If user hover on it return it;
     */
    savedShapes.filter((shape) => {
      console.log(getTool(shape.tool));
    });
    // const closestTool = savedShapes.find((tool) => {
    //   return !!Object.values(tool.position)
    //     .map((pos) => {
    //       const savedX = pos.x - x >= -dist && pos.x - x <= dist;
    //       const savedY = pos.y - y >= -dist && pos.y - y <= dist;
    //       // console.log(pos.x - x, pos.y - y);
    //       return savedX && savedY;
    //     })
    //     .filter(Boolean).length;
    // });
    // console.log(closestTool);
  };

  return {
    positions,
    drawing,
    setPositions,
    clearCanvas,
    redrawTools,
    findClosestShape,
  };
};

export default useCanvas;
