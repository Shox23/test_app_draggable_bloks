import type { BlockType } from "../../types/Block";

export interface BlockProps {
  data: BlockType;
  idx: number;
}

export interface BlockEmits {
  (e: "moveBlock", data: { x: number; y: number; id: number }): void;
  (e: "selectNode", data: { nodeIdx: number; blockId: number }): void;
}
