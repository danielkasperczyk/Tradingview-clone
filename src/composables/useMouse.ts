import { reactive } from "vue";

export type MousePosition = {
  x: number;
  y: number;
};

const useMouse = () => {
  const mousePosition = reactive<MousePosition>({
    x: 0,
    y: 0,
  });

  const setMousePosition = (position: MousePosition) => {
    mousePosition.x = position.x;
    mousePosition.y = position.y;
  };

  return {
    mousePosition,
    setMousePosition,
  };
};

export default useMouse;
