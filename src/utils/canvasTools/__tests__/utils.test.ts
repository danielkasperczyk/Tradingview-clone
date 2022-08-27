import { describe, it, expect } from "vitest";
import type { Position } from "../types";
import { getTool, isInToolCoords } from "../utils";

const coords: Position[] = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
  { x: 5, y: 5 },
];

describe("CanvasUtils", () => {
  describe("getTool", () => {
    it("Return tool", () => {
      const tool = getTool("1");
      expect(!!tool).toBe(true);
      expect(tool?.name).toBe("Line");
    });
    it("Return undefined if wrong tool is passed", () => {
      expect(getTool("asd")).toBe(undefined);
    });
  });
  describe("isInToolCords", () => {
    it("Should be in tool coords", () => {
      expect(isInToolCoords(coords, { x: 3, y: 3 })).toBe(true);
    });
    it("IS not in tool coords", () => {
      expect(isInToolCoords(coords, { x: 10, y: 10 })).toBe(false);
    });
  });
});
