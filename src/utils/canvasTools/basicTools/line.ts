import type { Tool } from "@/utils/canvasTools/types";

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
};

export default lineTool;
