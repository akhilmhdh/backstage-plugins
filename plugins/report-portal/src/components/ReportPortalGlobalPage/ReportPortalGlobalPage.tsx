import React from 'react';

import { Content, PageWithHeader } from '@backstage/core-components';

import { Grid } from '@material-ui/core';

import { GlobalPageContent } from './GlobalPageContent';

export type ReportPortalGlobalPageProps = {
  title?: string;
  subtitle?: string;
  theme?: string;
};

export const ReportPortalGlobalPage = (props: ReportPortalGlobalPageProps) => {
  return (
    <PageWithHeader
      themeId={props.theme ?? 'app'}
      subtitle={props.subtitle ?? 'View all report portals'}
      title={props.title ?? 'Report Portal'}
    >
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
