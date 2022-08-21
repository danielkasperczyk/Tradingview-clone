import type { Tool, Position } from "@/utils/canvasTools/types";

const lineTool: Tool = {
  id: "1",
  name: "Line",
  icon: "line-icon",
  positionsRequired: 2,
  beginPath: true,
  draw: (ctx: CanvasRenderingContext2D, positions: Position[]) => {
    if (positions.length === 1) {
      ctx.beginPath();
      ctx.moveTo(positions[0].x, positions[0].y);
      return;
    }
    ctx.lineTo(positions[1].x, positions[1].y);
    ctx.stroke();
  },
};

export default lineTool;
