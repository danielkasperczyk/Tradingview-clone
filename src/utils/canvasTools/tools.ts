import basicTools from "./basicTools";
// Type of tool:
//  is it actiavated on one click and completed on second
//  is it done by mousepressed and move like pencil

/* IDEA
 *  Tool should contains methods:
 *    start: create starting point
 *    end: complete drawing - end point
 *    update: update position of tool - could be ouseful when user
 *            move mouse when tools is not completed
 */

export const tools = [
  {
    id: "basic-tools",
    tools: basicTools,
  },
];
