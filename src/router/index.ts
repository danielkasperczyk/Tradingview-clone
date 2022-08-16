import { createRouter, createWebHistory } from "vue-router";
import { RouterNames } from "./RouterNames";
import PanelLayout from "@/layouts/PanelLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: PanelLayout,
      redirect: RouterNames.Charts,
      children: [
        {
          path: "charts",
          name: RouterNames.Charts,
          component: () => import("@/views/index.vue"),
        },
      ],
    },
  ],
});

export default router;
