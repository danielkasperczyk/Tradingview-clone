<template>
  <div class="tools-container">
    <button class="tools-container__tool">X</button>
    <div class="tools-container__more" @click="toggleList">
      <img
        :class="[
          'tools-container__more-icon',
          { 'tools-container__more-icon--active': showList },
        ]"
        src="@/assets/icons/chevron-right.svg"
        alt="more"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const showList = ref(false);

const toggleList = () => (showList.value = !showList.value);
</script>
<style lang="scss" scoped>
$tools-container-height: 48px;
$border-radius: 4px;
.tools-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: $tools-container-height;
}
.tools-container:hover .tools-container__more {
  visibility: visible;
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
  height: 100%;
  width: 100%;
  border-radius: 4px;
}
.tools-container__more {
  transition: visibility 250ms ease-in-out;
  height: 100%;
  cursor: pointer;
  border-radius: $border-radius 0 0 $border-radius;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  img {
    width: 75%;
  }
  &-icon {
    transition: transform 250ms ease-in-out;
    transform: rotateZ(0);
    &--active {
      transform: rotateZ(180deg);
    }
  }
}
</style>
