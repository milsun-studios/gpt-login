// 路径配置 .vue 可以省略
const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/pages/login/index.vue"), //.vue可以省略
  },
];
export default routes;
