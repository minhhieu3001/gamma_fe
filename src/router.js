import { LogIn } from './component/auth/log-in.component';
import { Register } from './component/auth/register.component';
import Chat from './component/Chat-Page';
import Edit from './component/edit-page/edit.component';
import Home from './component/home-page/Home';
import Introduction from './component/introduction-page';
import SimulationHistoryPage from './component/simulation-history-page';
import Simulation from './component/simulation-page/simulation.component';

export const router = [
  {
    name: 'introduction',
    path: '/',
    component: Introduction,
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
  },
  {
    name: 'login',
    path: '/login',
    component: LogIn,
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
  },
  {
    name: 'edit',
    path: '/edit',
    component: Edit,
  },
  {
    name: 'simulation',
    path: '/simulation/:id',
    component: Simulation,
  },
  {
    name: 'simulation',
    path: '/simulation/:id/history',
    component: SimulationHistoryPage,
  },
  {
    name: 'chat',
    path: '/chat',
    component: Chat,
  },
];
