<template>
  <div>
    <button @click="addBlock">Add Block</button>
    <button @click="resetBlocks">Reset Blocks</button>
    <svg v-if="renderedLines" class="lines">
      <line
        v-for="line in renderedLines"
        :key="line.id"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke="black"
        stroke-width="2"
      />
    </svg>
    <Block
      v-for="(block, idx) in blocks"
      :data="block"
      :key="block.id"
      :idx="idx"
      @move-block="moveBlock"
      @select-node="handleNodeClick"
    />
  </div>
</template>

<script setup lang="ts">
import Block from "./components/Block/Block.vue";
import useBlogDrag from "./composables/useBlockDrag";

const { addLine, blocks, addBlock, moveBlock, resetBlocks, renderedLines } =
  useBlogDrag();

let selectedNode: { blockId: number; nodeIdx: number } | null = null;

const handleNodeClick = (data: { nodeIdx: number; blockId: number }) => {
  if (selectedNode) {
    addLine(
      selectedNode.blockId,
      selectedNode.nodeIdx,
      data.blockId,
      data.nodeIdx
    );
    selectedNode = null;
  } else {
    selectedNode = { blockId: data.blockId, nodeIdx: data.nodeIdx };
  }
};
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f0f0f0;
}
.lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  pointer-events: none;
}
</style>
