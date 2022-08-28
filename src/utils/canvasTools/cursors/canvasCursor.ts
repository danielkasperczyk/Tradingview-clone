import type { Tool } from "@/utils/canvasTools/types";

const canvasCursor: Partial<Tool> = {
  id: "100",
  name: "Cursor",
  icon: "cursor",
  positionsRequired: 1,
  draw(ctx, positions) {
    const [start, end] = positions;
    ctx.strokeStyle = "#999999";
    // X AXIS
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(0, start.y);
    ctx.lineTo(end.x, start.y);
    ctx.stroke();

    // Y AXIS
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(start.x, 0);
    ctx.lineTo(start.x, end.y);
    ctx.stroke();
  },
};

export default canvasCursor;
