import {
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { AboutCardProps } from './components/AboutCard/AboutCard';

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

/**
 * An example About card to show at the top of entity pages.
 *
 * @public
 * @remarks
 *
 * This card collects some high level information about the entity, but is just
 * an example component. Many organizations will want to replace it with a
 * custom card that is more tailored to their specific needs. The card itself is
 * not extremely customizable; feel free to make a copy of it as a starting
 * point if you like.
 * 
 * Sourced from: https://github.com/backstage/backstage/blob/39591f4c27862afa45563989d800f9ebeae65adb/plugins/catalog/src/plugin.ts#L119-L139
 */
export const ContactAboutCard: (props: AboutCardProps) => JSX.Element =
  crmPlugin.provide(
    createComponentExtension({
      name: 'ContactAboutCard',
      component: {
        lazy: () => import('./components/AboutCard').then(m => m.AboutCard),
      },
    }),
  );