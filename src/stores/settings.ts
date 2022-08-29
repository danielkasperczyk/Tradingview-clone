import { defineStore } from "pinia";

interface Stote {
  isSettingsOpen: boolean;
}

export const useSettingsStore = defineStore("settings", {
  state: (): Stote => ({
    isSettingsOpen: true,
  }),

  actions: {
    toggleSettings() {
      console.log("work");
      this.isSettingsOpen = !this.isSettingsOpen;
    },
  },
});
