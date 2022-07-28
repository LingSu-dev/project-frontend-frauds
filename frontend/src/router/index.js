import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // jshint ignore:line
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add-flight",
      name: "Add Flight",
      component: () => import("../views/AddFlightView.vue"),
    },
    {
      path: "/bookings",
      name: "bookings",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/flight-events",
      name: "Flight Events",
      component: () => import("../views/FlightEventsView.vue"),
    },
    {
      path: "/credits",
      name: "Credits",
      component: () => import("../views/CreditsView.vue"),
    },
  ],
});

export default router;
