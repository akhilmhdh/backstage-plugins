import React from 'react';

import { createDevApp } from '@backstage/dev-utils';
import {
  EntityAboutCard,
  EntityHasSubcomponentsCard,
  EntityLinksCard,
} from '@backstage/plugin-catalog';
import { EntityProvider } from '@backstage/plugin-catalog-react';

import { Grid } from '@material-ui/core';

import { mockEntity } from '../src/mocks';
import { ReportPortalOverviewCard, reportPortalPlugin } from '../src/plugin';

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
  .addPage({
    element: (
      <EntityProvider entity={mockEntity}>{overviewContent}</EntityProvider>
    ),
    title: 'Entity Page',
    path: '/catalog/default/component/example-for-report-portal',
  })
  .render();
