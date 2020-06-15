import sidebar from '@/views/sidebar.vue'

export const routes = [
  {
    path: '/',
    name: 'sidebar',
    component: sidebar
  },
  {
    path: '/moment',
    name: 'moment',
    component: () => import('@/views/moment.vue')
  },
  {
    path: "/group-code",
    name: "group-code",
    component: () => import("@/views/group-code.vue")
  },
  {
    path: "/red-packet/send",
    name: "red-packet-send",
    component: () => import("@/views/red-packet/send.vue")
  },
  {
    path: "/red-packet/index",
    name: "red-packet-index",
    component: () => import("@/views/red-packet/index.vue")
  },
  {
    path: "/red-packet/detail",
    name: "red-packet-detail",
    component: () => import("@/views/red-packet/detail.vue")
  },
  {
    path: "/red-packet/list",
    name: "red-packet-list",
    component: () => import("@/views/red-packet/list.vue")
  }
]
