import { tools } from "@/utils/canvasTools/tools";
import type { Position } from "@/utils/canvasTools/types";

export const getTool = (toolId: string) => {
  const allTools = tools.flatMap((tool) => tool.tools);
  return allTools.find(({ id }) => id === toolId);
};

export const isInToolCoords = (coords: Position[], mousePosition: Position) => {
  const { x: mouseX, y: mouseY } = mousePosition;
  // return !!coords.find(({ x, y }) => x === mouseX && y === mouseY);
  return !!coords.find(({ x, y }) => {
    const xPos = x - 2 <= mouseX && x + 2 >= mouseX;
    const yPos = y - 2 <= mouseY && y + 2 >= mouseY;
    return xPos && yPos;
  });
};
