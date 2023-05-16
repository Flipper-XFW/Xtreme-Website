
const routes = [
  {
    path: '/webupdaterframe',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/webupdaterframe', component: () => import('pages/Device.vue') }
    ]
  }
]

export default routes
