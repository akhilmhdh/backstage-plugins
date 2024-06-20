import React from 'react';

import { IconComponent } from '@backstage/core-plugin-api';
import { createDevApp } from '@backstage/dev-utils';
import {
  EntityAboutCard,
  EntityHasSubcomponentsCard,
  EntityLinksCard,
} from '@backstage/plugin-catalog';
import { EntityProvider } from '@backstage/plugin-catalog-react';

import Grid from '@mui/material/Grid';
import { getAllThemes } from '@redhat-developer/red-hat-developer-hub-theme';

import { ReportPortalIcon } from '../src';
import { mockEntity } from '../src/mocks';
import {
  ReportPortalGlobalPage,
  ReportPortalOverviewCard,
  reportPortalPlugin,
} from '../src/plugin';

const overviewContent = (
  <Grid container spacing={3} style={{ padding: '2rem' }} alignItems="stretch">
    <Grid item md={6}>
      <EntityAboutCard variant="gridItem" />
    </Grid>
    <Grid item lg={3} md={5} xs={12}>
      <ReportPortalOverviewCard variant="gridItem" />
    </Grid>
    <Grid item md={4} xs={12}>
      <EntityLinksCard />
    </Grid>
    <Grid item md={8} xs={12}>
      <EntityHasSubcomponentsCard variant="gridItem" />
    </Grid>
  </Grid>
);

createDevApp()
  .registerPlugin(reportPortalPlugin)
  .addThemes(getAllThemes())
  .addPage({
    icon: ReportPortalIcon as IconComponent,
    title: 'Global Page',
    path: '/report-portal',
    element: <ReportPortalGlobalPage />,
  })
  .addPage({
    element: (
      <EntityProvider entity={mockEntity}>{overviewContent}</EntityProvider>
    ),
    title: 'Entity Page',
    path: '/catalog/default/component/example-for-report-portal',
  })
  .render();
