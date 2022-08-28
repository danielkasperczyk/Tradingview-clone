type Icons = "default-icon" | "line-icon" | "cursor";

export interface Tool {
  id: string;
  name: string;
  icon: Icons;
  positionsRequired: number;
  draw: (ctx: CanvasRenderingContext2D, positions: Position[]) => void;
  drawEnd?: (ctx: CanvasRenderingContext2D) => void;
  mouseOver: (
    ctx: CanvasRenderingContext2D,
    toolPosition: Position[],
    mousePosition: Position
  ) => boolean;
  addCirclesOnEdges: (
    ctx: CanvasRenderingContext2D,
    toolPosition: Position[]
  ) => void;
  updatePosition: (
    savedToolPosition: Position[],
    mousePosition: Position
  ) => Position[];
}

export interface Tools {
  id: string;
  tools: Tool[];
}

export interface Position {
  x: number;
  y: number;
}
