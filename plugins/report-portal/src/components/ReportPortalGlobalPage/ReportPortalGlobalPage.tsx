import React from 'react';

import { Content, PageWithHeader } from '@backstage/core-components';

import { Grid } from '@material-ui/core';

import { GlobalPageContent } from './GlobalPageContent';

export const ReportPortalGlobalPage = () => {
  return (
    <PageWithHeader themeId="app" subtitle="asssd" title="Report Portal">
      <Content>
        <Grid container wrap="nowrap">
          <Grid xs={12} item>
            <GlobalPageContent />
          </Grid>
        </Grid>
      </Content>
    </PageWithHeader>
  );
};
