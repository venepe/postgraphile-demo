import Home from 'pages/Home';
import {
  BabelCreate,
  BabelDetail,
  SearchBabels,
  TaggedBabels,
  BabelUpdate,
} from 'pages/Babel';
import {
  PackCreate,
  PackUpdate,
} from 'pages/Pack';
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
        component: SearchBabels,
      },
      {
        path: '/tags/',
        component: TaggedBabels,
      },
      {
        path: '/babels/new',
        component: BabelCreate,
      },
      {
        path: '/babels/:babelId/packs/:packId/edit',
        component: PackUpdate,
      },
      {
        path: '/babels/:babelId/packs/new',
        component: PackCreate,
      },
      {
        path: '/babels/:babelId/edit',
        component: BabelUpdate,
      },
      {
        path: '/babels/:babelId',
        component: BabelDetail,
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];
