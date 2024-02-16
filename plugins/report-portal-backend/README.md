# report-portal

Welcome to the report-portal backend plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn
start` in the root directory, and then navigating to [/report-portal](http://localhost:3000/report-portal).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](/dev) directory.

## Installation

- Install the plugin
  ```shell
  yarn workspace backend add @appdev-platform/backstage-plugin-report-portal-backend
  ```
- Update the following files

  - Create `/packages/backend/src/plugins/report-portal.ts` and add following code:

    ```ts
    import { createRouter } from '@appdev-platform/backstage-plugin-report-portal-backend';
    import { Router } from 'express';

    import { PluginEnvironment } from '../types';

    export default async function createPlugin(
      env: PluginEnvironment,
    ): Promise<Router> {
      return await createRouter({ logger: env.logger, config: env.config });
    }
    ```

  - Add following lines to `/packages/backend/src/index.ts`:

    ```ts
    import reportPortal from './plugins/report-portal';

    async function main() {
      // add the files to create backend router
      const reportPortalEnv = useHotMemoize(module, () =>
        createEnv('report-portal'),
      );
      apiRouter.use('/report-portal', await reportPortal(reportPortalEnv));
    }
    ```

- Add below configuration to `app-config.yaml`:

  ```yaml
  reportPortal:
    # under integrations you can configure-
    # multiple instances of report portal
    integrations:
      # host address of your instance
      # for e.g: report-portal.mycorp.com
      - host: ${REPORT_PORTAL_HOST}

        # Baser API url of your instance
        # for e.g: https://report-portal.mycorp.com/api/
        baseUrl: ${REPORT_PORTAL_BASE_URL}

        # Get the API key from profile page of your instance
        # for e.g: Bearer fae22be1-0000-0000-8392-de1635eed9f4
        token: ${REPORT_PORTAL_TOKEN}

        # (optional) Filter the projects by type
        # Default: "INTERNAL"
        filterType: 'INTERNAL'
  ```
