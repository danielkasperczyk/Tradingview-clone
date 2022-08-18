type Settings = {
  x: number;
  y: number;
  w: number;
  h: number;
};

const useCanvas = () => {
  const draw = (ctx: CanvasRenderingContext2D, settings: Settings) => {
    ctx.fillRect(settings.x, settings.y, settings.w, settings.h);
  };

  return { draw };
};

export default useCanvas;
