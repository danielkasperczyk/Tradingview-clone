import type { Tool } from "@/utils/canvasTools/types";

const canvasCursor: Omit<Tool, "mouseOver"> = {
  id: "100",
  name: "Cursor",
  icon: "cursor",
  draw(ctx, start, end) {
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
