import { createDevApp } from '@backstage/dev-utils';
import { crmPlugin, CrmPage } from '../src/plugin';

createDevApp()
  .registerPlugin(crmPlugin)
  .addPage({
    element: <CrmPage />,
    title: 'Root Page',
    path: '/crm',
  })
  .render();
