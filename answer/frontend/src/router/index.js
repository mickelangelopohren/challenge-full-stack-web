import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    alias: "/list",
    name: "students-list",
    component: () => import("@/components/StudentsList")
  },
  {
    path: "/update/:id",
    name: "student-edit",
    component: () => import("@/components/StudentEdit")
  },
  {
    path: "/create",
    name: "student-create",
    component: () => import("@/components/StudentCreate")
  }
]

const router = new VueRouter({
  routes
})

export default router
