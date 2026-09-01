import '../scss/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Dashboard from './pages/dashboard';
import CreateStory from './pages/stories/create';
import Profile from './pages/profile';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

import { isAuthenticated } from './utils/authUtils';

import './components';

// import * as bootstrap from 'bootstrap';

const routes = {
  '/': Dashboard,
  '/stories/create.html': CreateStory,
  '/profile.html': Profile,
  '/auth/login.html': Login,
  '/auth/register.html': Register,
};

const detectRoute = () => routes[window.location.pathname];

window.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  const isAuthPage = path === '/auth/login.html' || path === '/auth/register.html';

  if (!isAuthenticated() && !isAuthPage) {
    window.location.href = '/auth/login.html';
    return;
  }

  if (isAuthenticated() && isAuthPage) {
    window.location.href = '/';
    return;
  }

  const route = detectRoute();
  if (route && route.init) {
    route.init();
  }
});
