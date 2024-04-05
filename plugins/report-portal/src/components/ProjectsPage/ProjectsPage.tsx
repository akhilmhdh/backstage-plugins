import React from 'react';
import { Link } from 'react-router-dom';

import {
  Breadcrumbs,
  Content,
  ErrorPage,
  Header,
  HeaderIconLinkRow,
  Page,
  useQueryParamState,
} from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';

import Assessment from '@material-ui/icons/Assessment';

import { rootRouteRef } from '../../routes';
import { ProjectsPageContent } from './ProjectsPageContent/ProjectsPageContent';

export const ProjectsPage = () => {
  const rootPage = useRouteRef(rootRouteRef);
  const hostName = useQueryParamState('host')[0] as string;

  return (
    <Page themeId="app">
      <Header
        pageTitleOverride="Projects"
        title={
          <>
            <Breadcrumbs>
              <Link color="inherit" to={rootPage()}>
                report-portal
              </Link>
            </Breadcrumbs>
            <div>{hostName}</div>
          </>
        }
      >
        <HeaderIconLinkRow
          links={[
            {
              label: 'Report Portal',
              href: `https://${hostName}/`,
              title: 'Report Portal',
              icon: <Assessment />,
            },
          ]}
        />
      </Header>
      <Content>
        <ProjectsPageContent host={hostName} />
      </Content>
    </Page>
  );
};
