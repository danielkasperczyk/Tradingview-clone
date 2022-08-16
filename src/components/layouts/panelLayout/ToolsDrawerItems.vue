<template>
  <div class="tools-container">
    <button class="tools-container__tool">X</button>
    <div class="tools-container__more">
      <img src="@/assets/icons/chevron-right.svg" alt="more" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
$tools-container-height: 48px;
.tools-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: $tools-container-height;
}
.tools-container:hover .tools-container__more {
  opacity: 1;
}
.tools-container__tool,
.tools-container__more {
  transition: background-color 250ms ease;
  &:hover {
    background-color: var(--primary-light3);
  }
}
.tools-container__tool {
  padding: 0.5rem;
  border-radius: 4px;
}

.tools-container__more {
  cursor: pointer;
  opacity: 0;
  transition: opacity 250ms ease;
  padding: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 7px;
  bottom: 7px;
  right: 0;
  border-radius: 5px 0px 0px 5px;
  img {
    width: 75%;
    height: auto;
  }
}
</style>
