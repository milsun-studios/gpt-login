export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"), //.vue可以省略
  },
];
