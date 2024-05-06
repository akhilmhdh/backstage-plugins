import React from 'react';

import { Content, PageWithHeader } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

import { Button, Grid } from '@material-ui/core';

import { GlobalPageContent } from './GlobalPageContent';

export type ReportPortalGlobalPageProps = {
  title?: string;
  subtitle?: string;
  theme?: string;
};

export const ReportPortalGlobalPage = (props: ReportPortalGlobalPageProps) => {
  const config = useApi(configApiRef);
  const sendAddress = config.getString('reportPortal.supportEmail');
  const subject = 'Request to add a report portal instance';
  const body = `Requesting to add a new Report Portal instance to Red Hat Experience Platform.

Hostname:
Instance Project Manager:
Instance Admin email:`;
  return (
    <PageWithHeader
      themeId={props.theme ?? 'app'}
      subtitle={props.subtitle ?? 'View all report portals'}
      title={props.title ?? 'Report Portal'}
    >
      <Content>
        <Grid container>
          <Grid
            xs={12}
            item
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'right',
            }}
          >
            Don't see your instance here? &nbsp;
            <Button
              style={{ textTransform: 'none', padding: '5px 10px' }}
              color="primary"
              variant="outlined"
              target="_blank"
              href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(
                sendAddress,
              )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                body,
              )}`}
            >
              Request to add
            </Button>
          </Grid>
          <Grid xs={12} item>
            <GlobalPageContent />
          </Grid>
        </Grid>
      </Content>
    </PageWithHeader>
  );
};
