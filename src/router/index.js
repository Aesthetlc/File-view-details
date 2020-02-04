import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from '../views/editor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'editor',
    component: Editor
  },
  {
    path: '/comparison',
    name: 'comparison',
    component: () => import('../views/comparison.vue')
  },
  {
    path: '/graph',
    name: 'graph',
    component: () => import('../views/graph.vue')
  },
  {
    path: '/simplify',
    name: 'simplify',
    component: () => import('../views/simplify.vue')
  },
  {
    path: '/simulation',
    name: 'simulation',
    component: () => import('../views/simulation.vue')
  },
  {
    path: '/tree',
    name: 'tree',
    component: () => import('../views/tree.vue')
  },
  {
    path: '/bianliduixiang',
    name: 'bianliduixiang',
    component: () => import('../views/bianliduixiang.vue')
  },
  {
    path: '/jisuanshuxing',
    name: 'jisuanshuxing',
    component: () => import('../views/jisuanshuxing.vue')
  },
  {
    path: '/watch',
    name: 'watch',
    component: () => import('../views/watch.vue')
  },
  {
    path: '/bianlikey',
    name: 'bianlikey',
    component: () => import('../views/bianlikey.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
