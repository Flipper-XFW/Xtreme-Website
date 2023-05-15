
const routes = [
  {
    path: '/webupdaterframe',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Device.vue') }
    ]
  }
]

export default routes
