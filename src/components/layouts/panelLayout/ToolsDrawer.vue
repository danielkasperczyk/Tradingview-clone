<template>
  <aside class="tools-drawer">
    <ToolsDrawerItems />
    <ToolsDrawerItems />
  </aside>
</template>
<script lang="ts" setup>
import ToolsDrawerItems from "./ToolsDrawerItems.vue";
</script>
<style lang="scss" scoped>
$panel-width: 48px;
.tools-drawer {
  width: 100%;
  max-width: $panel-width;
  border-right: 1px solid black;
}
</style>
