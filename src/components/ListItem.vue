<template>
  <div class="list-item" @click="emits('onClick')">{{ props.label }}</div>
</template>
<script lang="ts" setup>
type Props = {
  width?: number;
  label: string;
};

type Emits = {
  (e: "onClick"): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style lang="scss" scoped>
.list-item {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  transition: background-color ease 250ms;

  &:hover {
    background-color: var(--primary-light4);
    cursor: pointer;
  }
}
</style>
