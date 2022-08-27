type Icons = "default-icon" | "line-icon" | "cursor";

type SavedToolPosition = {
  start: Position;
  end: Position;
};

export interface Tool {
  id: string;
  name: string;
  icon: Icons;
  draw: (ctx: CanvasRenderingContext2D, start: Position, end: Position) => void;
  drawEnd?: (ctx: CanvasRenderingContext2D) => void;
  mouseOver: (
    ctx: CanvasRenderingContext2D,
    toolPosition: SavedToolPosition,
    mousePosition: Position
  ) => boolean;
  addCirclesOnEdges: (
    ctx: CanvasRenderingContext2D,
    toolPosition: SavedToolPosition
  ) => void;
}

export interface Tools {
  id: string;
  tools: Tool[];
}

export interface Position {
  x: number;
  y: number;
}
