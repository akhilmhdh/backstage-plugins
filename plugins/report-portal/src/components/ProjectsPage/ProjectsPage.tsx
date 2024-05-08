import React from 'react';
import { Link } from 'react-router-dom';

import {
  Breadcrumbs,
  Content,
  Header,
  Page,
  useQueryParamState,
} from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';

import { Button, makeStyles } from '@material-ui/core';
import Launch from '@material-ui/icons/Launch';

import { rootRouteRef } from '../../routes';
import { ProjectsPageContent } from './ProjectsPageContent/ProjectsPageContent';

const useStyles = makeStyles(theme => ({
  'rp-button': {
    color: '#fff',
    backdropFilter: 'blur(10px)',
    marginTop: theme.spacing(4),
    alignItems: 'initial',
    textTransform: 'none',
    fontSize: '1rem',
  },
}));

export const ProjectsPage = (props: { themeId?: string }) => {
  const rootPage = useRouteRef(rootRouteRef);
  const hostName = useQueryParamState('host')[0] as string;

  const classes = useStyles();

  return (
    <Page themeId={props.themeId ?? 'app'}>
      <Header
        pageTitleOverride="Projects"
        title={
          <>
            <Breadcrumbs style={{ color: '#fff', marginBottom: '8px' }}>
              <Link to={rootPage()}>Report Portal</Link>
              {hostName}
            </Breadcrumbs>
            <div>{hostName}</div>
          </>
        }
      >
        <Button
          endIcon={<Launch />}
          variant="text"
          href={`https://${hostName}`}
          target="_blank"
          className={classes['rp-button']}
        >
          Report Portal
        </Button>
      </Header>
      <Content>
        <ProjectsPageContent host={hostName} />
      </Content>
    </Page>
  );
};
