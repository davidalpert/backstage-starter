import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const crmPlugin = createPlugin({
  id: 'crm',
  routes: {
    root: rootRouteRef,
  },
});

export const CrmPage = crmPlugin.provide(
  createRoutableExtension({
    name: 'CrmPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
