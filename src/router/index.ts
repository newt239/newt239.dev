import {
  createRouter,
  createWebHistory,
  type RouterScrollBehavior,
} from "vue-router";
import gsap from "gsap";
import HomeView from "@/views/Home.vue";
import WorkView from "@/views/Work.vue";

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 };
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/works/:workId",
      component: WorkView,
    },
    {
      path: "/",
      component: HomeView,
    },
  ],
  scrollBehavior,
});

router.beforeEach((to, from, next) => {
  const tl = gsap.timeline();
  tl.to(".overlay", {
    display: "block",
  })
    .to(".overlay", {
      duration: 0.5,
      width: "100vw",
      ease: "power2.out",
    })
    .to(
      ".atom-spinner",
      {
        duration: 0.5,
        opacity: 1,
        onComplete: () => {
          next();
        },
      },
      ">"
    )
    .to(
      ".atom-spinner",
      {
        duration: 0.5,
        opacity: 0,
      },
      ">"
    )
    .to(".overlay", {
      duration: 0.5,
      width: 0,
      ease: "power2.in",
    });
});

export default router;
