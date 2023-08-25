export default [
  {
    path: "/",
    name: "mj",
    component: () => import("@/pages/midjourney/index.vue"), //.vue可以省略
  },
  {
    path: "/niji",
    name: "niji",
    component: () => import("@/pages/midjourney/niji.vue"), //.vue可以省略
  },
];
