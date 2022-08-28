import type { Tool } from "@/utils/canvasTools/types";
import { getLinePoints } from "@/utils/maths/linearOperation";
import { isInToolCoords, isCloseTo } from "@/utils/canvasTools/utils";

const lineTool: Tool = {
  id: "1",
  name: "Line",
  icon: "line-icon",
  positionsRequired: 2,
  draw: (ctx, positions) => {
    ctx.beginPath();
    console.log(positions);
    if (positions.length === 2) {
      const [start, end] = positions;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
    } else {
      const [start] = positions;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(start.x, start.y);
    }
    ctx.stroke();
  },
  drawEnd(ctx) {
    ctx.closePath();
  },
  mouseOver(ctx, toolPosition, mousePosition) {
    const [start, end] = toolPosition;
    const coords = getLinePoints(start, end);
    const mouseOver = isInToolCoords(coords, mousePosition);
    return mouseOver;
  },
  addCirclesOnEdges(ctx, toolPosition) {
    toolPosition.forEach((position) => {
      ctx.beginPath();
      ctx.arc(position.x, position.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    });
  },
  updatePosition(savedToolPosition, mousePosition) {
    const savedPositions = [...savedToolPosition];
    const index = isCloseTo(savedToolPosition, mousePosition);
    savedPositions[index] = mousePosition;
    return savedPositions;
  },
};

export default lineTool;
