import { tools } from "./tools";

export const getTool = (toolName: string) => {
  const allTools = tools.flatMap((tool) => tool.tools);
  return allTools.find(({ name }) => name === toolName);
};
