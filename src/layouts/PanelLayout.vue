<template>
  <header class="header">
    <slot name="header" />
  </header>
  <main class="content">
    <aside class="content__left">
      <slot name="left-panel" />
    </aside>
    <div class="content__main">
      <slot name="main" />
    </div>
    <aside class="content__right">
      <slot name="right-panel" />
    </aside>
  </main>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
$header-height: 32px;
$panel-width: 160px;

.header {
  height: $header-height;
}
.content {
  display: flex;
  height: calc(100vh - $header-height);
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
