import { createRouter, createWebHashHistory } from "vue-router";
// import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";
import { hasRole } from "@/utils/index";

const routes = [
  // {
  //   meta: {
  //     title: "Select style",
  //   },
  //   path: "/",
  //   name: "style",
  //   component: Style,
  // },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const storedUser = JSON.parse(localStorage.getItem("userConnected"));

      if (
        hasRole(auth, "super_admin") ||
        (storedUser && hasRole({ userConnected: storedUser }, "super_admin"))
      ) {
        next();
      } else {
        // Si l'utilisateur n'est pas connecté ou n'a pas le rôle requis, redirigez vers la page de connexion
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "Utilisateurs",
    },
    path: "/users",
    name: "users",
    component: () => import("@/views/TablesView.vue"),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const storedUser = JSON.parse(localStorage.getItem("userConnected"));

      if (
        hasRole(auth, "super_admin") ||
        (storedUser && hasRole({ userConnected: storedUser }, "super_admin"))
      ) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "Roles",
    },
    path: "/roles",
    name: "roles",
    component: () => import("@/views/RoleView.vue"),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const storedUser = JSON.parse(localStorage.getItem("userConnected"));

      if (
        hasRole(auth, "super_admin") ||
        (storedUser && hasRole({ userConnected: storedUser }, "super_admin"))
      ) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const storedUser = JSON.parse(localStorage.getItem("userConnected"));

      if (
        hasRole(auth, "super_admin") ||
        (storedUser && hasRole({ userConnected: storedUser }, "super_admin"))
      ) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Création formation",
    },
    path: "/training",
    name: "training",
    component: () => import("@/views/TrainingView.vue"),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const storedUser = JSON.parse(localStorage.getItem("userConnected"));

      if (
        hasRole(auth, "super_admin") ||
        (storedUser && hasRole({ userConnected: storedUser }, "super_admin"))
      ) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "Listes des formations",
    },
    path: "/training-list",
    name: "training-list",
    component: () => import("@/views/TrainingListView.vue"),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const storedUser = JSON.parse(localStorage.getItem("userConnected"));

      if (
        hasRole(auth, "super_admin") ||
        (storedUser && hasRole({ userConnected: storedUser }, "super_admin"))
      ) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "cours",
    },
    path: "/course",
    name: "course",
    component: () => import("@/views/TrainingListView.vue"),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const storedUser = JSON.parse(localStorage.getItem("userConnected"));

      if (
        hasRole(auth, "apprenant") ||
        (storedUser && hasRole({ userConnected: storedUser }, "apprenant"))
      ) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "Listes des formations",
    },
    path: "/follow-training",
    name: "follow-training",
    component: () => import("@/views/FollowTraining.vue"),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const storedUser = JSON.parse(localStorage.getItem("userConnected"));

      if (
        hasRole(auth, "super_admin" || "apprenant") ||
        (storedUser && hasRole({ userConnected: storedUser }, "super_admin" || "apprenant"))
      ) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "Quiz",
    },
    path: "/try-quiz",
    name: "try-quiz",
    component: () => import("@/views/TryQuiz.vue"),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      const storedUser = JSON.parse(localStorage.getItem("userConnected"));

      if (
        hasRole(auth, "super_admin" || "apprenant") ||
        (storedUser && hasRole({ userConnected: storedUser }, "super_admin" || "apprenant"))
      ) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    meta: {
      title: "Login",
    },
    path: "/",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
