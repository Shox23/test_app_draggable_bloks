<template>
  <div
    :class="`block ${isDragging ? 'active' : ''}`"
    :data-id="data.id"
    ref="blockEl"
    :style="{ top: `${data.y}px`, left: `${data.x}px` }"
    @mousedown="startDrag"
  >
    <div class="block__body">Block {{ idx + 1 }}</div>
    <div
      class="block__node"
      v-for="(node, index) in data.nodes"
      :style="{ top: `${node.y}px`, left: `${node.x}px` }"
      :key="index"
      @click.stop="selectNode(index)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { BlockProps, BlockEmits } from "./interfaces.ts";

const { data, idx } = defineProps<BlockProps>();
const emits = defineEmits<BlockEmits>();
const isDragging = ref<boolean>(false);
const offsetX = ref<number>(0);
const offsetY = ref<number>(0);
const blockEl = ref<HTMLDivElement | null>(null);

const onDrag = (event: MouseEvent) => {
  if (isDragging.value) {
    emits("moveBlock", {
      id: data.id,
      x: event.clientX - offsetX.value,
      y: event.clientY - offsetY.value,
    });
  }
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

const startDrag = (event: MouseEvent) => {
  if (blockEl.value) {
    isDragging.value = true;
    offsetX.value = event.clientX - blockEl.value.offsetLeft;
    offsetY.value = event.clientY - blockEl.value.offsetTop;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  }
};

const selectNode = (index: number) => {
  emits("selectNode", { blockId: data.id, nodeIdx: index });
};
</script>

<style scoped>
.block {
  position: absolute;
  width: 100px;
  height: 50px;
  background: lightblue;
  border: 1px solid blue;
  cursor: grab;
  transition: transform 300ms;
}

.block.active {
  cursor: grabbing;
  transform: scale(0.9);
}

.block__body {
  text-align: center;
  line-height: 50px;
  background: blue;
  color: white;
}
.block__node {
  transition: 300ms;
  position: absolute;
  width: 12px;
  height: 12px;
  background: red;
  border-radius: 50%;
  cursor: pointer;
}

.block__node:hover {
  transform: scale(1.2);
}
</style>
