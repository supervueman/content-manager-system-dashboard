export default [{
  path: '/',
  name: 'main',
  component: 'Index'
}, {
  path: '/login',
  name: 'login',
  component: 'Login'
}, {
  path: '/profile',
  name: 'profile',
  component: 'Profile'
}, {
  path: '/resources/:id',
  name: 'resource',
  component: 'Resource'
}, {
  path: '/resource-create',
  name: 'resource-create',
  component: 'ResourceCreate'
}, {
  path: '/filesystem',
  name: 'filesystem',
  component: 'Filesystem'
}, {
  path: '/layouts/:id',
  name: 'layout',
  component: 'Layout'
}, {
  path: '/additional-fields/:id',
  name: 'additional-field',
  component: 'AdditionalField'
}]
