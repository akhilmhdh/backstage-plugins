import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
} from '@backstage/core-plugin-api';

import { reportPortalApiRef, ReportPortalClient } from './api';
import { entityRootRouteRef, rootRouteRef } from './routes';

export const reportPortalPlugin = createPlugin({
  id: 'report-portal',
  routes: {
    root: rootRouteRef,
    entityRoot: entityRootRouteRef,
  },
  apis: [
    createApiFactory({
      api: reportPortalApiRef,
      deps: {
        discovery: discoveryApiRef,
      },
      factory: ({ discovery }) => new ReportPortalClient(discovery),
    }),
  ],
});

export const ReportPortalOverviewCard = reportPortalPlugin.provide(
  createComponentExtension({
    name: 'ReportPortalOverviewCard',
    component: {
      lazy: () =>
        import('./components/ReportPortalOverviewCard').then(
          m => m.ReportPortalOverviewCard,
        ),
    },
  }),
);

export const ReportPortalGlobalPage = reportPortalPlugin.provide(
  createRoutableExtension({
    name: 'ReportPortalGlobalPage',
    mountPoint: rootRouteRef,
    component: () => import('./components/Router').then(m => m.Router),
  }),
);
