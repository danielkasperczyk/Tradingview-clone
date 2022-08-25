import { ref, computed } from "vue";
import type { Position, Tool } from "@/utils/canvasTools/types";
import { tools } from "@/utils/canvasTools/tools";

const selectedTool = ref<Tool | null>();

const useTools = () => {
  const activeTool = computed(() => selectedTool.value);
  const setActiveTool = (tool: Tool | null) => (selectedTool.value = tool);

  const toolDraw = (
    ctx: CanvasRenderingContext2D,
    start: Position,
    end: Position
  ) => {
    if (!activeTool.value) return;
    activeTool.value.draw(ctx, start, end);
  };

  return {
    tools,
    activeTool,
    setActiveTool,
    toolDraw,
  };
};

export default useTools;
