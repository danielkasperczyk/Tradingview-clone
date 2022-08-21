import { ref, computed } from "vue";
import type { Position, Tool } from "@/utils/canvasTools/types";
import { tools } from "@/utils/canvasTools/tools";
const selectedTool = ref<Tool>();

const useTools = () => {
  const activeTool = computed(() => selectedTool.value);
  const setActiveTool = (tool: Tool) => (selectedTool.value = tool);

  const toolDraw = (ctx: CanvasRenderingContext2D, positions: Position[]) => {
    if (!activeTool.value) return;
    activeTool.value.draw(ctx, positions);
  };

  return {
    tools,
    activeTool,
    setActiveTool,
    toolDraw,
  };
};

export default useTools;
