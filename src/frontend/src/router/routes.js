
const routes = [
  {
    path: '/update-frame',
    component: () => import('layouts/UpdateLayout.vue'),
    children: [
      { path: '/update-frame', component: () => import('pages/Update.vue') }
    ]
  },
  {
    path: '/asset-packs-frame',
    component: () => import('layouts/PacksLayout.vue'),
    children: [
      { path: '/asset-packs-frame', component: () => import('pages/Packs.vue') }
    ]
  }
]

export default routes
