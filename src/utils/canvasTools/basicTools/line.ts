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
  mouseOver(ctx, toolPosition, mousePosition) {
    const lerp = function (a: number, b: number, x: number) {
      return a + x * (b - a);
    };
    // console.log(ctx.getImageData(0, 0, 900, 900));
    // line.moveTo(toolPosition.start.x, toolPosition.start.y);
    // line.lineTo(toolPosition.end.x, toolPosition.end.y);
    const dx = toolPosition.end.x - toolPosition.start.x;
    const dy = toolPosition.end.y - toolPosition.end.y;
    const t =
      ((mousePosition.x - toolPosition.start.x) * dx +
        (mousePosition.y - toolPosition.start.y) * dy) /
      (dx * dx + dy * dy);
    const lineX = lerp(toolPosition.start.x, toolPosition.end.x, t);
    const lineY = lerp(toolPosition.start.y, toolPosition.end.y, t);

    const tdx = mousePosition.x - lineX;
    const tdy = mousePosition.y - lineY;
    const distance = Math.abs(Math.sqrt(tdx * tdx + tdy * tdy));

    return distance <= 2.5;
  },
};

export default lineTool;
