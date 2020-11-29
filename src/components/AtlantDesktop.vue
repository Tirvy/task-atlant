<template>
  <div class="atlant-desktop-container" @mousemove="handleMouseMove($event)" @mouseup="handleMouseUp($event)">
    <atlant-window
      v-for="(item, index) in windows"
      :key="item.id"
      v-bind="item"
      @close="closeWindow(index)"
      @startResize="startResizeWindow(index, $event)"
      @startMove="startMoveWindow(index, $event)"
      @mousedown.native="setToForeground(index)"
    >
      Some content
    </atlant-window>
  </div>
</template>

<script>
import AtlantWindow from '@/components/AtlantWindow';

const cellWidth = 10;
const minSize = {
  width: 200,
  height: 70,
};

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
      return Math.max(...this.windows.map(item => item.level)) || 0;
    },
  },
  methods: {
    getMousePosition(event) {
      return {
        x: event.pageX,
        y: event.pageY,
      };
    },
    toCellSize(number) {
      return Math.round(number / cellWidth) * cellWidth;
    },
    handleMouseUp() {
      this.isResizing = null;
      this.isMoving = null;
    },
    handleResize(difference) {
      const windowData = this.windows[this.isResizing.windowIndex];
      const directionData = this.isResizing.direction;
      let newSize = {
        width: this.toCellSize(this.isResizing.windowInitialSize.width + difference.x * directionData.h),
        height: this.toCellSize(this.isResizing.windowInitialSize.height + difference.y * directionData.v),
      };

      newSize.width = Math.max(newSize.width, minSize.width);
      newSize.height = Math.max(newSize.height, minSize.height);

      let offset = {
        x: 0,
        y: 0,
      };
      if (directionData.h < 0) {
        offset.x = windowData.width - newSize.width;
      }
      if (directionData.v < 0) {
        offset.y = windowData.height - newSize.height;
      }

      this.$set(this.windows, this.isResizing.windowIndex, {
        ...windowData,
        x: windowData.x + offset.x,
        y: windowData.y + offset.y,
        width: newSize.width,
        height: newSize.height,
      });
    },
    handleMove(difference) {
      const windowData = this.windows[this.isMoving.windowIndex];
      this.$set(this.windows, this.isMoving.windowIndex, {
        ...windowData,
        x: this.toCellSize(this.isMoving.windowInitialPosition.x + difference.x),
        y: this.toCellSize(this.isMoving.windowInitialPosition.y + difference.y),
      });
    },
    handleMouseMove(event) {
      if (this.isMoving || this.isResizing) {
        const mousePosition = this.getMousePosition(event);
        const mouseInitialPosition = (this.isMoving || this.isResizing).mouseInitialPosition;
        const difference = {
          x: mousePosition.x - mouseInitialPosition.x,
          y: mousePosition.y - mouseInitialPosition.y,
        };
        if (this.isResizing) {
          this.handleResize(difference);
        }
        if (this.isMoving) {
          this.handleMove(difference);
        }
      }
    },
    closeWindow() {},
    startResizeWindow(index, {direction, event}) {
      const windowItem = this.windows[index];
      this.isResizing = {
        windowIndex: index,
        windowInitialSize: {
          width: windowItem.width,
          height: windowItem.height,
        },
        mouseInitialPosition: {
          x: event.pageX,
          y: event.pageY,
        },
        direction,
      };
    },
    startMoveWindow(index, {event}) {
      const windowItem = this.windows[index];
      this.isMoving = {
        windowIndex: index,
        windowInitialPosition: {
          x: windowItem.x,
          y: windowItem.y,
        },
        mouseInitialPosition: {
          x: event.pageX,
          y: event.pageY,
        },
      };
    },
    setToForeground(index) {
      const window = this.windows[index];
      if (window.level < this.currentForegroundLevel) {
        this.$set(this.windows, index, {...window, level: this.currentForegroundLevel + 1});
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
