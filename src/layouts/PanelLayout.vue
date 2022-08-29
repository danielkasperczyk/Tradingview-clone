<template>
  <Header class="header" />
  <main class="content">
    <ToolsDrawer />
    <div class="content__main">
      <RouterView />
    </div>
    <aside class="content__right"></aside>
  </main>
  <ModalSettings v-if="settingsStore.isSettingsOpen" />
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import Header from "@/components/layouts/panelLayout/Header.vue";
import ToolsDrawer from "@/components/layouts/panelLayout/ToolsDrawer.vue";
import ModalSettings from "@/components/layouts/panelLayout/modals/settings/ModalSettings.vue";
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();
</script>

<style lang="scss" scoped>
$header-height: 32px;
$panel-width: 160px;

.header {
  height: $header-height;
}
.content {
  display: flex;
  height: calc(100vh - $header-height);
  position: relative;

  &__left,
  &__right {
    width: 100%;
    max-width: $panel-width;
  }
  &__main {
    width: 100%;
  }
}
</style>
