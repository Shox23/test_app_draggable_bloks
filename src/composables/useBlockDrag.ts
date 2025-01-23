import { computed, reactive } from "vue";
import type { BlockType } from "../types/Block";
import type { Line } from "../types/Line";
import type { Coordinates } from "../types/Coordinates";

const useBlogDrag = () => {
  const blocks = reactive<BlockType[]>([]);
  const lines = reactive<Line[]>([]);
  const defaultPos = reactive<{ x: number; y: number }>({ x: 100, y: 100 });
  const nodePositions = reactive<Map<string, Coordinates>>(new Map());

  const addBlock = () => {
    blocks.push({
      id: Date.now(),
      x: defaultPos.x,
      y: defaultPos.y,
      nodes: [
        { x: -6, y: 21 },
        { x: 94, y: 21 },
        { x: 44, y: -6 },
        { x: 44, y: 44 },
      ],
    });
    defaultPos.x += 120;
  };

  const moveBlock = (data: { id: number; x: number; y: number }) => {
    const block = blocks.find((b) => b.id === data.id);
    if (block) {
      block.x = data.x;
      block.y = data.y;
      updateNodePositions();
    }
  };

  const resetBlocks = () => {
    blocks.splice(0, blocks.length);
    lines.splice(0, lines.length);
    defaultPos.x = 100;
    nodePositions.clear();
  };

  const updateNodePositions = () => {
    nodePositions.clear();
    blocks.forEach((block) => {
      [0, 1].forEach((nodeIndex) => {
        getNodePosition(block.id, nodeIndex);
      });
    });
  };

  const getNodePosition = (
    blockId: number,
    nodeIndex: number
  ): Coordinates | null => {
    const key = `${blockId}-${nodeIndex}`;
    if (nodePositions.has(key)) {
      return nodePositions.get(key)!;
    }

    const block = blocks.find((b) => b.id === blockId);
    if (block) {
      const nodeX = block.x + nodeIndex * 20;
      const nodeY = block.y + 20;

      const position = { x: nodeX, y: nodeY };
      nodePositions.set(key, position);
      return position;
    }
    return null;
  };

  const addLine = (
    startBlock: number,
    startNode: number,
    endBlock: number,
    endNode: number
  ) => {
    lines.push({
      id: Date.now(),
      startBlock,
      startNode,
      endBlock,
      endNode,
    });
  };

  const renderedLines = computed(() =>
    lines
      .map((line) => {
        const start = getNodePosition(line.startBlock, line.startNode);
        const end = getNodePosition(line.endBlock, line.endNode);

        return start && end
          ? { ...line, x1: start.x, y1: start.y, x2: end.x, y2: end.y }
          : null;
      })
      .filter(Boolean)
  );

  return {
    renderedLines,
    blocks,
    lines,
    addBlock,
    moveBlock,
    resetBlocks,
    addLine,
  };
};

export default useBlogDrag;
