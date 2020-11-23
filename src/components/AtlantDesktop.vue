<template>
  <div class="atlant-desktop-container">
    <atlant-window v-for="item in windows" :key="item.id" v-bind="item">
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
    };
  },
  mounted() {
    this.windows = this.getInitialWindowsData();
  },
  methods: {
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
