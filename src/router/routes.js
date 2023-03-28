// 路径配置 .vue 可以省略
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/home/index.vue"), //.vue可以省略
  },
];
export default routes;
