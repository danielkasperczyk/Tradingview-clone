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

export const isCloseTo = (coords: Position[], mousePosition: Position) => {
  const tempCoords = [...coords];
  const sortedCoords = tempCoords.sort((a, b) => {
    const { x: aX, y: aY } = {
      x: Math.abs(a.x - mousePosition.x),
      y: Math.abs(a.y - mousePosition.y),
    };
    const { x: bX, y: bY } = {
      x: Math.abs(b.x - mousePosition.x),
      y: Math.abs(b.y - mousePosition.y),
    };

    return aX < bX && aY < bY ? -1 : 1;
  });
  const [closestCoord] = sortedCoords;
  return coords.findIndex(
    ({ x, y }) => x === closestCoord.x && y === closestCoord.y
  );
};
