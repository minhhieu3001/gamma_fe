import { LogIn } from './component/auth/log-in.component';
import { Register } from './component/auth/register.component';
import Edit from './component/edit-page/edit.component';
import Simulation from './component/simulation-page/simulation.component';

export const router = [
  {
    name: 'login',
    path: '/',
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
];
