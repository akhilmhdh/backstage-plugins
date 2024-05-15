import React from 'react';

import {
  Breadcrumbs,
  Content,
  Header,
  Link,
  Page,
  useQueryParamState,
} from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';

import Launch from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';

import { projectsRouteRef, rootRouteRef } from '../../routes';
import { LaunchesPageContent } from './LaunchesPageContent/LaunchesPageContent';

const useStyles = makeStyles(theme => ({
  'prj-button': {
    color: '#fff',
    backdropFilter: 'blur(10px)',
    marginTop: theme.spacing(4),
    alignItems: 'initial',
    textTransform: 'none',
    fontSize: '1rem',
  },
}));

export const LaunchesPage = (props: { themeId?: string }) => {
  const rootPage = useRouteRef(rootRouteRef);
  const projectsPage = useRouteRef(projectsRouteRef);
  const hostName = useQueryParamState('host')[0] as string;
  const projectName = useQueryParamState('project')[0] as string;
  const classes = useStyles();

  return (
    <Page themeId={props.themeId ?? 'app'}>
      <Header
        pageTitleOverride="Launches"
        title={
          <>
            <Breadcrumbs style={{ color: '#fff', marginBottom: '8px' }}>
              <Link to={rootPage()}>Report Portal</Link>
              <Link to={projectsPage().concat(`?host=${hostName}`)}>
                {hostName}
              </Link>
              {projectName}
            </Breadcrumbs>
            <div>{projectName}</div>
          </>
        }
      >
        <Button
          endIcon={<Launch />}
          variant="text"
          href={`https://${hostName}/ui/#${projectName}`}
          target="_blank"
          className={classes['prj-button']}
        >
          Project Details
        </Button>
      </Header>
      <Content>
        <LaunchesPageContent host={hostName} project={projectName} />
      </Content>
    </Page>
  );
};
