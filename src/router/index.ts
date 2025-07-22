import ItemDetailView from "@/views/ItemDetailView.vue";
import ManagementScreen from "@/views/ManagementScreen.vue";
import MySampleView from "@/views/MySampleView.vue";
import TablePatternSwitcher from "@/views/TableView.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    {
        path: "/data-selection",
        name: "data-selection",
        component: MySampleView,
    },
    {
        path: "/item-detail/:item",
        name: "item-detail",
        component: ItemDetailView,
    },
    {
        path: "/table-pattern-switcher",
        name: "table-pattern-switcher",
        component: TablePatternSwitcher,
    },
    {
        path: "/management",
        name: "management",
        component: ManagementScreen,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
