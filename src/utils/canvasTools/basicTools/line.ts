import type { Tool } from "@/utils/canvasTools/types";
import { getLinePoints } from "@/utils/maths/linearOperation";
import { isInToolCoords } from "@/utils/canvasTools/utils";

const lineTool: Tool = {
  id: "1",
  name: "Line",
  icon: "line-icon",
  draw: (ctx, start, end) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  },
  drawEnd(ctx) {
    ctx.closePath();
  },
  mouseOver(ctx, toolPosition, mousePosition) {
    const coords = getLinePoints(toolPosition.start, toolPosition.end);
    const mouseOver = isInToolCoords(coords, mousePosition);
    return mouseOver;
  },
  addCirclesOnEdges(ctx, toolPosition) {
    Object.values(toolPosition).forEach((position) => {
      ctx.beginPath();
      ctx.arc(position.x, position.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    });
  },
};

export default lineTool;
