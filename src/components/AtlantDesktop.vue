<template>
  <div class="atlant-desktop-container" @mousemove="handleMouseMove">
    <atlant-window
      v-for="(item, index) in windows"
      :key="item.id"
      v-bind="item"
      @close="closeWindow(index)"
      @startResize="resizeWindow(index)"
      @startMove="moveWindow(index)"
      @mousedown="setToForeground(index)"
    >
      Some content
    </atlant-window>
  </div>
</template>

<script>
import AtlantWindow from '@/components/AtlantWindow';

const cellWidth = 10;

export default {
  name: 'AtlantDesktop',
  components: {AtlantWindow},
  data() {
    return {
      windows: [],
      lastId: 0,
      isMoving: null,
      isResizing: null,
    };
  },
  mounted() {
    this.windows = this.getInitialWindowsData();
  },
  computed: {
    currentForegroundLevel() {
      let max = 0;
      this.windows.forEach(item => {
        if (item.level > max) {
          max = item.level;
        }
      });
      return max;
    },
  },
  methods: {
    handleMouseMove(event) {
      if (this.isMoving || this.isResizing) {
        console.log(event);
      }
    },
    setToForeground(index) {
      const window = this.windows[index];
      if (window.level < this.currentForegroundLevel) {
        this.windows[index] = {...window, level: this.currentForegroundLevel + 1};
      }
    },
    getWorkspaceData() {
      const element = this.$el;
      return {
        element,
        width: element.clientWidth,
        height: element.clientHeight,
      };
    },
    getInitialWindowsData() {
      const workspaceData = this.getWorkspaceData();
      const initialWidth = 300;
      const initialHeight = 100;
      const maxWindowsHorizontal = Math.floor((workspaceData.width - cellWidth) / (initialWidth + cellWidth));
      let ret = [];
      for (let i = 0; i < 5; i++) {
        ret.push({
          id: this.getNewWindowId(),
          name: `Window ${i + 1}`,
          level: i,
          width: initialWidth,
          height: initialHeight,
          x: (i % maxWindowsHorizontal) * (cellWidth + initialWidth) + cellWidth,
          y: Math.floor(i / maxWindowsHorizontal) * (cellWidth + initialWidth) + cellWidth,
        });
      }
      return ret;
    },
    getNewWindowId() {
      return this.lastId++;
    },
  },
};
</script>

<style scoped>
.atlant-desktop-container {
  position: relative;
}
</style>
