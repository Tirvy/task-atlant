<template>
  <atlant-desktop class="desktop"></atlant-desktop>
</template>

<script>
import AtlantDesktop from '@/components/AtlantDesktop';
export default {
  name: 'Desktop',
  components: {AtlantDesktop},
};
</script>

<style scoped>
.desktop {
  width: 100%;
  height: 700px;
}
</style>
