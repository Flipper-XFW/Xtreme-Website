
const routes = [
  {
    path: '/webupdaterframe',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/webupdaterframe', component: () => import('pages/Device.vue') }
    ]
  },
  {
    path: '/assetpacksframe',
    component: () => import('layouts/PacksLayout.vue'),
    children: [
      { path: '/assetpacksframe', component: () => import('pages/Packs.vue') }
    ]
  }
]

export default routes
