import { ref, computed } from "vue";
import type { Position, Tool } from "@/utils/canvasTools/types";
import { tools } from "@/utils/canvasTools/tools";
import { getTool } from "@/utils/canvasTools/utils";
import type { SavedShape } from "@/composables/useCanvas";

const selectedTool = ref<Tool | null>();

const useTools = () => {
  const activeTool = computed(() => selectedTool.value);
  const setActiveTool = (tool: Tool | null) => (selectedTool.value = tool);

  const toolDraw = (ctx: CanvasRenderingContext2D, positions: Position[]) => {
    if (!activeTool.value) return;
    activeTool.value.draw(ctx, positions);
  };

  const addCircleOnEdges = (
    ctx: CanvasRenderingContext2D,
    savedTool: SavedShape
  ) => {
    const tool = getTool(savedTool.toolId);
    if (!tool) return;
    tool.addCirclesOnEdges(ctx, savedTool.position);
  };

  return {
    tools,
    activeTool,
    setActiveTool,
    toolDraw,
    addCircleOnEdges,
  };
};

export default useTools;
