import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"

Vue.use(VueRouter);

const routes = [
    { path: "/", component: Home },
    { path: "/todolist", component: () => import('../views/Todolist.vue') },
    { path: "/register", component: () => import('../views/Register.vue') },
    { path: "/login", component: () => import('../views/Login.vue') },
    { path: "/detail", component: () => import('../views/Detail.vue') },
    { path: "/people", component: () => import('../views/People.vue') },
    { path: "/stock", component: () => import('../views/Stock.vue') },
    { path: "/product", component: () => import('../views/Product.vue') },
    { path: "/account", component: () => import('../views/Account.vue') },
    { path: "/resetpassword", component: () => import('../views/ResetPass.vue') },

]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;