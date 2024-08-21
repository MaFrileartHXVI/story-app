import '../scss/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import Dashboard from './pages/dashboard';
import CreateStory from './pages/stories/create';
import Profile from './pages/profile';

import './components';

// import * as bootstrap from 'bootstrap';

const routes = {
  '/': Dashboard,
  '/stories/create': CreateStory,
  '/profile': Profile,
};

const detectRoute = () => routes[window.location.pathname];

window.addEventListener('DOMContentLoaded', async () => {
  const route = detectRoute();
  route.init();
});