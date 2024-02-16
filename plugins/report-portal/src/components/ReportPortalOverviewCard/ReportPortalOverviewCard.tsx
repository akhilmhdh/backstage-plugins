import React, { useEffect, useState } from 'react';
import MultiProgress from 'react-multi-progress';

import { InfoCard, InfoCardVariants } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';

import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useLaunchDetails, useProjectDetails } from '../../hooks';
import { isReportPortalAvailable } from '../../utils/isReportPortalAvailable';

const HeaderComponent = (props: { total: number }) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>Test Statistics</Grid>
      {props.total === -1 ? (
        <Grid item xs={2}>
          <Skeleton />
        </Grid>
      ) : (
        <Grid item>Total: {props.total}</Grid>
      )}
    </Grid>
  );
};

type Defect = { id: number; name: string; total: number; color: string };

const useStylesForDefect = makeStyles((theme: Theme) => ({
  status: {
    '&::before': {
      width: '0.7em',
      height: '0.7em',
      display: 'inline-block',
      marginRight: theme.spacing(1),
      borderRadius: '50%',
      content: '""',
      backgroundColor: (props: { backgroundColor: string }) =>
        props.backgroundColor,
    },
  },
}));

const DefectStatus = (props: { color: string; children: string }) => {
  const classes = useStylesForDefect({ backgroundColor: props.color });
  return (
    <Typography
      className={classes.status}
      component="span"
      aria-label="Status"
      aria-hidden="true"
    >
      {props.children}
    </Typography>
  );
};

const useStyles = makeStyles({
  results: {
    fontWeight: 'bold',
  },
});

export const ReportPortalOverviewCard = (props: {
  variant: InfoCardVariants;
}) => {
  const classes = useStyles();
  const config = useApi(configApiRef);
  const hostsConfig = config.getConfigArray('reportPortal.integrations');

  const { entity } = useEntity();
  const projectId =
    entity.metadata.annotations?.['reportportal.io/project-name'] ?? '';
  const launchName =
    entity.metadata.annotations?.['reportportal.io/launch-name'] ?? '';
  const hostName =
    entity.metadata.annotations?.['reportportal.io/host'] ??
    hostsConfig[0].getString('host');

  const [defects, setDefects] = useState<Defect[]>([]);
  const [filters, _] = useState<{ [key: string]: string | number } | undefined>(
    {
      'filter.eq.name': launchName,
    },
  );

  const { loading, launchDetails } = useLaunchDetails(
    projectId,
    hostName,
    filters,
  );
  const { loading: projectLoading, projectDetails } = useProjectDetails(
    projectId,
    hostName,
  );

  useEffect(() => {
    if (!loading && launchDetails && projectDetails) {
      const tempArr: Defect[] = [];
      Object.keys(launchDetails.statistics.defects).forEach(defect => {
        tempArr.push({
          name: projectDetails.configuration.subTypes?.[defect.toUpperCase()][0]
            .longName,
          total: launchDetails.statistics.defects?.[defect].total,
          color:
            projectDetails.configuration.subTypes?.[defect.toUpperCase()][0]
              .color,
          id: projectDetails.configuration.subTypes?.[defect.toUpperCase()][0]
            .id,
        });
      });
      setDefects(tempArr);
    }
  }, [loading, launchDetails, projectDetails]);

  if (!isReportPortalAvailable(entity)) return null;

  return (
    <InfoCard
      title={
        <HeaderComponent
          total={launchDetails?.statistics.executions.total ?? -1}
        />
      }
      variant={props.variant}
      divider
      deepLink={{
        link: `https://${hostName}/ui/#${projectId}/launches/latest/${launchDetails?.id}`,
        title: 'View on Report Portal',
      }}
    >
      <Grid container spacing={3}>
        {loading ? (
          <>
            <Grid item xs={12}>
              <Skeleton animation="wave" />
            </Grid>
            <Grid item xs={4}>
              <Skeleton animation="wave" />
            </Grid>
            <Grid item xs={4}>
              <Skeleton animation="wave" />
            </Grid>
            <Grid item xs={4}>
              <Skeleton animation="wave" />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <MultiProgress
                transitionTime={3}
                elements={[
                  {
                    color: '#28b463',
                    value:
                      (launchDetails!.statistics.executions.passed /
                        launchDetails!.statistics.executions.total) *
                      100,
                  },
                  {
                    color: '#e74c3c',
                    value:
                      (launchDetails!.statistics.executions.failed /
                        launchDetails!.statistics.executions.total) *
                      100,
                  },
                  {
                    color: '#777777',
                    value:
                      (launchDetails!.statistics.executions.skipped /
                        launchDetails!.statistics.executions.total) *
                      100,
                  },
                ]}
                height="15"
                roundLastElement={false}
                round={false}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.results}>
                Passed: {launchDetails!.statistics.executions.passed ?? 0}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.results}>
                Failed: {launchDetails!.statistics.executions.failed ?? 0}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.results}>
                Skipped: {launchDetails!.statistics.executions.skipped ?? 0}
              </Typography>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12}>
          {!projectLoading ? (
            <List disablePadding>
              {defects.length > 0 ? (
                defects.map(defect => (
                  <ListItem key={defect.id}>
                    <ListItemText
                      primary={
                        <DefectStatus color={defect.color}>
                          {defect.name}
                        </DefectStatus>
                      }
                    />
                    <ListItemSecondaryAction>
                      {defect.total}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <Typography variant="h6" align="center">
                  No defects found
                </Typography>
              )}
            </List>
          ) : (
            <Skeleton height="8rem" animation="wave" />
          )}
        </Grid>
      </Grid>
    </InfoCard>
  );
};
