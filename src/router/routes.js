
const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@views/Main'),
    meta: {
      guarded: false
    },
    children: []
  },
  {
    path: '/roomDetail/:id',
    name: 'RoomDetail',
    component: () => import('@views/RoomDetail'),
    meta: {
      guarded: false
    },
    children: []
  },
  {
    path: '*',
    redirect: '/'
  },


];

export default routes;