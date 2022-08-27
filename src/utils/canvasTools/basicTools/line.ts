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
    return isInToolCoords(coords, mousePosition);
  },
};

export default lineTool;
