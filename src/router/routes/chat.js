export default [
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/pages/chat/index.vue"), //.vue可以省略
  },
];
