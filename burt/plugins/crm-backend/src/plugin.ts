import {
  coreServices,
  createBackendModule,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { todoListServiceRef } from './services/TodoListService';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node/alpha';
import { ContactEntitiesProcessor } from './processor/ContactEntitiesProcessor';

/**
 * crmPlugin backend plugin
 *
 * @public
 */
export const crmPlugin = createBackendPlugin({
  pluginId: 'crm',
  register(env) {
    env.registerInit({
      deps: {
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        todoList: todoListServiceRef,
        logger: coreServices.logger,
      },
      async init({ httpAuth, httpRouter, todoList, logger }) {
        logger.info('initializing the crm plugin');

        logger.debug('register todoList router');
        httpRouter.use(
          await createRouter({
            httpAuth,
            todoList,
          }),
        );
      },
    });
  },
});

export const crmCatalogModule = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'crm-processor',
  register(env) {
    env.registerInit({
      deps: {
        catalog: catalogProcessingExtensionPoint,
        logger: coreServices.logger,
      },
      async init({ catalog, logger }) {
        logger.info('initializing the crm module');

        logger.info('register crm catalog processor');
        catalog.addProcessor(new ContactEntitiesProcessor());
      },
    });
  },
});