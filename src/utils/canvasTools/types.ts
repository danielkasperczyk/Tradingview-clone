type Icons = "default-icon" | "line-icon" | "cursor";

export interface Tool {
  id: string;
  name: string;
  icon: Icons;
  draw: (ctx: CanvasRenderingContext2D, start: Position, end: Position) => void;
  drawEnd?: (ctx: CanvasRenderingContext2D) => void;
}

export interface Tools {
  id: string;
  tools: Tool[];
}

export interface Position {
  x: number;
  y: number;
}
