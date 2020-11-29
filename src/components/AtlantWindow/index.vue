<template>
  <div class="atlant-window-container" :style="windowStyle">
    <div class="resizing-border">
      <template v-if="resizeable">
        <div
          class="resizing-border__edge"
          v-for="(edge, index) in edges"
          :key="index"
          :style="edge.style"
          @mousedown="startResize(edge.direction, $event)"
        ></div>
      </template>
    </div>
    <div class="not-resizing-border">
      <div class="header-bar" @mousedown.self="startMove($event)">
        <div class="header-bar__name" @mousedown.self="startMove($event)">
          {{ name }}
        </div>
        <div class="control-buttons">
          <div class="close" @click="closeWindow">
            x
          </div>
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {edgeDirections} from './constants.js';

export default {
  name: 'atlant-window',
  props: {
    name: String,
    level: Number,
    width: Number,
    height: Number,
    x: Number,
    y: Number,
    resizeable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    windowStyle() {
      return {
        'z-index': this.level,
        width: this.width + 'px',
        height: this.height + 'px',
        top: this.y + 'px',
        left: this.x + 'px',
      };
    },
    edges() {
      return edgeDirections.map(edge => {
        return {
          direction: edge.direction,
          style: {
            ...edge,
          },
        };
      });
    },
  },
  methods: {
    closeWindow() {
      this.$emit('close');
    },
    startResize(direction, event) {
      this.$emit('startResize', {direction, event});
    },
    startMove(event) {
      this.$emit('startMove', {event});
    },
  },
};
</script>

<style scoped lang="scss">
// size of visual resize border
$resize-border-size: 4px;

.atlant-window-container {
  position: absolute;
}

.resizing-border {
  width: 100%;
  height: 100%;
  background-color: #56f;
  position: relative;
  user-select: none;

  &__edge {
    position: absolute;
  }
}

.not-resizing-border {
  position: absolute;
  top: #{$resize-border-size};
  left: #{$resize-border-size};
  width: calc(100% - #{$resize-border-size * 2});
  height: calc(100% - #{$resize-border-size * 2});
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}

.header-bar {
  height: 16px;
  display: flex;
  justify-content: space-between;
  background-color: #6bf;
  cursor: all-scroll;
  user-select: none;

  &__name {
    color: #2c3e50;
  }
}

.control-buttons {
  display: flex;
  flex: 0 0;

  & .close {
    height: 14px;
    width: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
  }
}

.content {
  flex: 1 0;
  overflow: auto;
  background: #fff;
}
</style>
