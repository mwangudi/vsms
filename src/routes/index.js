import Home from '@/components/HomePage';
import About from '@/components/AboutUs';
import Login from '@/modules/auth/components/LoginPage';
import Checkin from '@/modules/checkin/components/IndexPage';

export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/checkin',
    name: 'Checkin',
    component: Checkin,
    meta: {
      requiresAuth: true,
    },
  },

  // If path is unknown, redirect to home
  {
    path: '/*',
    redirect: '/',
  },
];
