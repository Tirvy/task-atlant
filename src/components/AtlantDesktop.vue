<template>
  <div class="atlant-desktop-container" @mousemove="handleMouseMove($event)" @mouseup="handleMouseUp($event)">
    <div class="windows-controls">
      <div>
        Restore windows:
      </div>
      <div v-for="window in absentWindows" :key="window.id" class="restore-button" @click="restoreWindow(window.id)">
        {{ window.name }}
      </div>
    </div>
    <div class="windows-container">
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
  </div>
</template>

<script>
import AtlantWindow from '@/components/AtlantWindow';

const cellWidth = 10;
const minSize = {
  width: 200,
  height: 70,
};
const numberOfWindows = 5;
const initialWidth = 300;
const initialHeight = 100;

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
    this.loadWindowsData();
    if (!this.windows.length) {
      this.windows = this.getInitialWindowsData();
    }
  },
  computed: {
    currentForegroundLevel() {
      return Math.max(...this.windows.map(item => item.level)) || 0;
    },
    absentWindows() {
      const haveIds = this.windows.reduce((ret, {id}) => {
        ret[id] = true;
        return ret;
      }, {});

      let listOfIds = [];
      for (let i = 0; i < numberOfWindows; ++i) listOfIds.push(i);

      return listOfIds
        .filter(id => !haveIds[id])
        .map(id => {
          return {id, name: `Window ${id + 1}`};
        });
    },
  },
  methods: {
    cacheWindowsData() {
      localStorage.setItem('windows', JSON.stringify(this.windows));
    },
    loadWindowsData() {
      const storageData = localStorage.getItem('windows');
      if (storageData && storageData !== 'undefined') {
        const windowsParsed = JSON.parse(storageData);
        if (windowsParsed) {
          this.windows = windowsParsed;
        }
      }
    },
    restoreWindow(id) {
      const workspaceData = this.getWorkspaceData();

      this.windows.push({
        id,
        name: `Window ${id + 1}`,
        level: this.currentForegroundLevel + 1,
        width: initialWidth,
        height: initialHeight,
        x: this.toCellSize(workspaceData.width / 2 - initialWidth / 2),
        y: this.toCellSize(workspaceData.height / 2 - initialHeight / 2),
      });
    },
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
      if (this.isResizing || this.isMoving) {
        this.cacheWindowsData();
        this.isResizing = null;
        this.isMoving = null;
      }
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
    closeWindow(index) {
      this.windows.splice(index, 1);
      this.cacheWindowsData();
    },
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
      this.cacheWindowsData();
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
      const maxWindowsHorizontal = Math.floor((workspaceData.width - cellWidth) / (initialWidth + cellWidth));
      let ret = [];
      for (let i = 0; i < numberOfWindows; i++) {
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

<style scoped lang="scss">
.atlant-desktop-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.windows-container {
  position: relative;
}

.windows-controls {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
}

$dark-color: #2c3e50;
$light-color: #5566ff;

.restore-button {
  border: 1px solid $light-color;
  border-radius: 4px;
  color: $dark-color;
  background-color: #fff;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    border-color: $dark-color;
  }

  &:active {
    background-color: $dark-color;
    color: #fff;
  }
}
</style>
