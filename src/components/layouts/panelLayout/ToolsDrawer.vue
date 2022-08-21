<template>
  <aside class="tools-drawer">
    <ToolsDrawerItems
      v-for="toolsList in tools"
      :key="toolsList.id"
      :tools="toolsList.tools"
    />
  </aside>
</template>
<script lang="ts" setup>
import ToolsDrawerItems from "./ToolsDrawerItems.vue";
import useTools from "@/composables/useTools";

const { tools } = useTools();
</script>
<style lang="scss" scoped>
$panel-width: 48px;
.tools-drawer {
  width: 100%;
  max-width: $panel-width;
  border-right: 1px solid black;
}
</style>
