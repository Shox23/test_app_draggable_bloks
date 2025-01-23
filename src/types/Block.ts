import type { Coordinates } from "./Coordinates";

export interface BlockType extends Coordinates {
  id: number;
  nodes: Coordinates[];
}
