import Contact from '../pages/Contact';

export const routes = [
  {
    path: '/contact',
    component: Contact,
    exact: true,
    strict: true,
    isPublic: false,
    type: 'dashboard',

  },

];