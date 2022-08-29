<template>
  <div class="modal">
    <div class="modal-container">
      <div class="modal-container-title">
        <h2>Chart settings</h2>
      </div>
      <div class="modal-container-content">
        <div>
          <ListItem
            v-for="option in options"
            :key="option.id"
            :label="option.title"
          />
        </div>
        <div>2</div>
      </div>
      <div class="modal-container-bottom">
        <button @click="toggleSettings">ok</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ListItem from "@/components/ListItem.vue";
import { useSettingsStore } from "@/stores/settings";

const options = [
  {
    title: "Appearance",
    id: 0,
  },
];

const activeOption = ref(0);

const { toggleSettings } = useSettingsStore();
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style lang="scss" scoped>
.modal {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  max-width: 500px;
  width: 100%;
  height: 100%;
  border-radius: $border-radius;
  background: #ffffff;
  @include sm-breakpoint {
    height: auto;
    box-shadow: $box-shadow-light;
  }
}
.modal-container-title {
  padding: 0.5rem 0.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}
.modal-container-content {
  @include sm-breakpoint {
    display: grid;
    grid-template-columns: 2fr 3fr;
  }
}
.modal-container-bottom {
  display: flex;
  justify-content: flex-end;
}
</style>
