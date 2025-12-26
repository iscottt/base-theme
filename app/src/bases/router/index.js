import { createRouter, createWebHistory } from 'vue-router'
import useAppStore  from '@/bases/store/app'

export const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      isHome: true,
    },
    component: () => import('@/pages/home/index.vue'),
  },

  //posts
  {
    path: "/:post_slug",
    name: "post",
    component: () => import('@/pages/post/index.vue'),
    meta: { is_post: true },
  }, {
    path: "/:post_slug/comment-page-:comment_page(\\d+)",
    name: "post-comment-paged",
    component: () => import('@/pages/post/index.vue'),
    meta: { is_post: true },
  }, {
    path: "/:post_slug/page/:current_page(\\d+)",
    name: "post-paged",
    component: () => import('@/pages/post/index.vue'),
    meta: { is_post: true },
  }, {
    path: "/:post_slug/page/:current_page(\\d+)/comment-page-:comment_page(\\d+)",
    name: "post-paged-comment-paged",
    component: () => import('@/pages/post/index.vue'),
    meta: { is_post: true },
  },

  //全部文章
  {
    path: "/articles",
    name: "articles",
    component: () => import('@/pages/term/index.vue'),
    meta: { is_term: true },
  },
  {
    path: "/articles/:page(\\d+)",
    name: "articles-paged",
    component: () => import('@/pages/term/index.vue'),
    meta: { is_term: true },
  },

  //terms
  {
    path: "/:taxonomy/:term_slug",
    name: "term",
    component: () => import('@/pages/term/index.vue'),
    meta: { is_term: true },
  },
  {
    path: "/:taxonomy/:term_slug/:page(\\d+)",
    name: "term-paged",
    component: () => import('@/pages/term/index.vue'),
    meta: { is_term: true },
  },

  //404
  {
    path: "/nothing-is-here",
    name: "nothing-is-here",
    component: () => import('@/pages/404.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "four04",
    component: () => import('@/pages/404.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to, from) => {
  const appStore = useAppStore()
  if (to.fullPath !== from.fullPath || from.name === undefined) {
    // 地址栏改变，发生了真实的页面跳转
    appStore.handleRouterChange(to)
  }
})
export default router
