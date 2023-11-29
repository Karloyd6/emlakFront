import {createRouter, createWebHashHistory} from "vue-router";
import adminRoutes from "./admin.js";
import store from "@/store";
import { computed } from "vue"
// import { useStore } from "vuex";
// const store = useStore()

const routes=[
    {
        name : "HomePage",
        path: "/",
        component : ()=> import("@/views/HomePage.vue")
    },
    {
      name : "ShowAdvert",
      path : "/showAdvert",
      component : ()=> import("@/views/showAdvert.vue")
    }
]

const router = createRouter({
    routes : [
        ...adminRoutes,
        ...routes
    ],
    history: createWebHashHistory()
})

router.beforeEach((to, _, next) => {
    const authRequiredRoutes = ["AddImages","AdvertList","AdvertDetails","EditAdvert","EditProfile"];
    const authNotRequiredRoutes = ["LoginPage"];
    const _isAuthenticated = store.getters._isAuthenticate
  
    if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);
  
    if (authRequiredRoutes.indexOf(to.name) > -1) {
      if (_isAuthenticated) next();
      else next({ name: "LoginPage" });
    } else {
      next();
    }
  });

export default router;