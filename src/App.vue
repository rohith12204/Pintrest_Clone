<template>
  <div class="app-layout">
    <SideNav />
    <div class="page-content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideNav from './components/SideNav.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
}

.page-content {
  margin-left: 32px; /* same as side-nav width */
  padding: 10px;
  width: calc(100% - 72px);
  box-sizing: border-box;
}
</style>
