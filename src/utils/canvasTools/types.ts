type Icons = "default-icon" | "line-icon";

export interface Tool {
  id: string;
  name: string;
  icon: Icons;
  positionsRequired: 1 | 2;
  beginPath: boolean;
  draw: (ctx: CanvasRenderingContext2D, positions: Position[]) => void;
}

export interface Tools {
  id: string;
  tools: Tool[];
}

export interface Position {
  x: number;
  y: number;
}
