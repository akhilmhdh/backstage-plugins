# Report Portal Plugin

Welcome to the report-portal plugin!

>_This plugin was created through the Backstage CLI_

### Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/report-portal](http://localhost:3000/report-portal).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

### Prequisite

- [report-portal-backend](../report-portal/) plugin

### Screenshots:
- Dashboard for each entity in backstage:
  - A card for overall statistics panel / donut on overview tab
![image](https://github.com/janus-idp/backstage-plugins/assets/42431299/d8e8e315-c4b1-4d23-91fa-3ca70179ba18)
  - **[WIP]** An entity tab that will show more detailed statistics for a specific launch.

- A page to show details for each instance such as projects and launches
![file](https://github.com/janus-idp/backstage-plugins/assets/42431299/751bb226-238e-42c2-af19-0b5ff99339e0)

## Installation:

- Run the following command in your backstage project

  ```shell
  yarn workspace app add @appdev-platform/backstage-plugin-report-portal
  ```

- Now import the components

  - open `/packages/app/src/App.tsx` and add the following code

    ```js
    import { ReportPortalGlobalPage } from '@appdev-platform/backstage-plugin-report-portal';

    export const AppBase = () => {
      // In <FlatRoutes> add the following route
      <Route path="/report-portal" element={<ReportPortalGlobalPage />} />;
    };
    ```

  - open `/packages/app/src/components/Root/Root.tsx` and add the following code

    ```js
    import AssessmentIcon from '@material-ui/icons/Assessment';
    //...
    //...
    export const Root = ({ children }: PropsWithChildren<{}>) => (
      <SidebarPage>

        <!-- Add the link to route in your sidebar component -->
        <SidebarItem icon={AssessmentIcon} to="report-portal" text="Report Portal" />
      </SidebarPage>
    )
    ```

  - To add a card on overview tab of entity page, open `/packages/app/src/components/catalog/EntityPage.tsx` and add the following code:

    ```js
    import { ReportPortalOverviewCard } from '@appdev-platform/backstage-plugin-report-portal';

    const overviewContent = (
      <Grid>

        <!-- add your card on overview -->
        <Grid item lg={4} md={6} xs={12}>
          <ReportPortalOverviewCard variant="gridItem" />
        </Grid>
      </Grid>
    );
    ```

- Add the below configuration to your `app-config.yaml` file

  ```yaml
  reportPortal:
    # Contact email for support
    supportEmail: ${REPORT_PORTAL_SUPPORT_MAIL}

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
## Annotations:
Add the below annotations to `catalog-info.yaml`
```yaml
metadata:
  annotations:
    reportportal.io/project-name: <your-project-name>
    reportportal.io/launch-name: <your-launch-name>
```