import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  // {
  //   path: '/', title: 'Home', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, params:{}, submenu: []
  // },
  {
    path: '/home/show', title: 'Home', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], params: {}
  },
  {
    path: '', title: 'admins', icon: 'fa fa-screwdriver', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [
      { path: '/admins/show', title: 'show', icon: 'far fa-eye', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
      { path: '/admins/active', title: 'activeDisplay', icon: 'fa fa-charging-station', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
      { path: '/admins/not_active', title: 'not_activeDisplay', icon: 'fa fa-skull-crossbones', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
      { path: '/admins/pending', title: 'pendingDisplay', icon: 'fa fa-skull-crossbones', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
      { path: '/admins/create', title: 'create', icon: 'fa fa-plus-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
    ]
  },
  {
    path: '', title: 'users', icon: 'fa fa-male', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [
      { path: '/users/show', title: 'show All', icon: 'far fa-eye', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
      { path: '/users/active', title: 'activeDisplay', icon: 'fa fa-charging-station', class: '', badge: '', badgeClass: '', isExternalLink: false, params: { status: 'active' }, submenu: [] },
      { path: '/users/not_active', title: 'not_activeDisplay', icon: 'fa fa-skull-crossbones', class: '', badge: '', badgeClass: '', isExternalLink: false, params: { status: 'not_active,pending' }, submenu: [] },
      { path: '/users/pending', title: 'pendingDisplay', icon: 'fa fa-skull-crossbones', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
      { path: '/users/create', title: 'create', icon: 'fa fa-plus-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
    ]
  },
  {
    path: '', title: 'Trans', icon: 'fa fa-align-center', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [
      { path: '/trans/show', title: 'show', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
      { path: '/trans/create', title: 'create', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },

    ]
  },
  {
    path: '', title: 'Promo', icon: 'fa fa-align-center', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [
      { path: '/promo/show', title: 'show', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
      { path: '/promo/create', title: 'create', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },

    ]
  },
  {
    path: '', title: 'category', icon: 'fa fa-align-center', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [
      { path: '/category/show', title: 'show', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },
      { path: '/category/create', title: 'create', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, params: {}, submenu: [] },

    ]
  },
 
 
];
