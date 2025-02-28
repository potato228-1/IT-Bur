import * as VueRouter from "vue-router";

import store from "@/store";

import MainPage from "./pages/MainPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import ContactsPage from "./pages/ContactsPage.vue";
import ProjectPage from "./pages/ProjectPage.vue";
import ProjectsListPage from "./pages/ProjectsListPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import MyLayout from "./pages/MyLayout.vue";
import AdminCabinet from "./pages/admin/AdminCabinet.vue";
import AdminMarks from "./pages/admin/AdminMarks.vue";
import EditProfile from "./pages/admin/EditProfile.vue";
import AuctionPage from "./pages/auction/AuctionPage.vue";
import AuctionPromo from "./pages/auction/AuctionPromo.vue";

export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: "/",
      name: "myLayout",
      component: MyLayout,
      children: [
        {
          path: "",
          name: "mainPage",
          component: MainPage,
        },
        {
          path: "/about",
          name: "aboutPage",
          component: AboutPage,
        },
        {
          path: "/project/:id",
          name: "projectPage",
          component: ProjectPage,
        },
        {
          path: "/contacts",
          name: "contactsPage",
          component: ContactsPage,
        },
        {
          path: "/projectsList",
          name: "projectsListPage",
          component: ProjectsListPage,
        },
        {
          path: "/auction",
          name: "auctionPage",
          component: AuctionPage,
          beforeEnter: (to, from, next) => {
            if (!store.getters.getLogged) {
              next({ path: "/auction/promo" });
            } else {
              next();
            }
          },
        },
        {
          path: "/auction/promo",
          name: "auctionPromo",
          component: AuctionPromo,
        },
      ],
    },
    {
      path: "/login",
      name: "loginPage",
      component: LoginPage,
    },
    {
      path: "/admin",
      name: "adminLayout",
      component: MyLayout,
      beforeEnter: (to, from, next) => {
        if (!store.getters.getLogged) {
          next({ name: "loginPage" });
        } else {
          next();
        }
      },
      children: [
        {
          path: "",
          name: "cabinet",
          component: AdminCabinet,
        },
        {
          path: "editProfile",
          name: "editProfile",
          component: EditProfile,
        },
        {
          path: "adminMarks",
          name: "adminMarks",
          component: AdminMarks,
        },
      ],
    },
  ],
});