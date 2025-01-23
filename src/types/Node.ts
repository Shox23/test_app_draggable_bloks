import type { Coordinates } from "./Coordinates";

export interface NodeType extends Coordinates {
  blockId: number;
  nodeIdx: number;
}
