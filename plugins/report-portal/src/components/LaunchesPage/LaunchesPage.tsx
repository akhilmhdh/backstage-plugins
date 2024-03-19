import React from 'react';

import {
  Breadcrumbs,
  Content,
  Header,
  HeaderIconLinkRow,
  Link,
  Page,
  useQueryParamState,
} from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';

import AssessmentIcon from '@material-ui/icons/Assessment';

import { projectsRouteRef, rootRouteRef } from '../../routes';
import { LaunchesPageContent } from './LaunchesPageContent/LaunchesPageContent';

export const LaunchesPage = () => {
  const rootPage = useRouteRef(rootRouteRef);
  const projectsPage = useRouteRef(projectsRouteRef);
  const hostName = useQueryParamState('host')[0] as string;
  const projectName = useQueryParamState('project')[0] as string;

  return (
    <Page themeId="app">
      <Header
        pageTitleOverride="Launches"
        title={
          <>
            <Breadcrumbs>
              <Link color="inherit" to={rootPage()}>
                report-portal
              </Link>
              <Link
                color="inherit"
                to={projectsPage().concat(`?host=${hostName}`)}
              >
                {hostName}
              </Link>
              {projectName}
            </Breadcrumbs>
            <div>{projectName}</div>
          </>
        }
      >
        <HeaderIconLinkRow
          links={[
            {
              label: 'Project Detials',
              href: `https://${hostName}/ui/#${projectName}`,
              title: 'Project Detials',
              icon: <AssessmentIcon />,
            },
          ]}
        />
      </Header>
      <Content>
        <LaunchesPageContent host={hostName} project={projectName} />
      </Content>
    </Page>
  );
};
