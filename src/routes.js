import Home from 'pages/Home';
import {
  SearchVehicles,
  VehicleCreate,
  VehicleDetail,
  VehicleUpdate,
} from 'pages/Vehicle';
import NotFound from 'pages/NotFound';
import App from './app';


export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/search',
        component: SearchVehicles,
      },
      {
        path: '/vehicles/new',
        component: VehicleCreate,
      },
      {
        path: '/vehicles/:vehicleId/edit',
        component: VehicleUpdate,
      },
      {
        path: '/vehicles/:vehicleId',
        component: VehicleDetail,
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];
