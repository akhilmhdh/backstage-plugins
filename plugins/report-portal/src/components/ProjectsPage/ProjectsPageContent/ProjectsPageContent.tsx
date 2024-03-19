import React, { useEffect, useState } from 'react';

import { Link, Table, TableColumn } from '@backstage/core-components';
import { configApiRef, useApi, useRouteRef } from '@backstage/core-plugin-api';

import { IconButton } from '@material-ui/core';
import Launch from '@material-ui/icons/Launch';
import { Skeleton } from '@material-ui/lab';

import {
  ProjectDetails,
  ProjectListResponse,
  reportPortalApiRef,
} from '../../../api';
import { launchRouteRef } from '../../../routes';

const UniqueLaunches = (props: { host: string; projectId: string }) => {
  const { host, projectId } = props;
  const [loading, setLoading] = useState(true);
  const [noOfLaunches, setNoOfLaunches] = useState(0);

  const api = useApi(reportPortalApiRef);
  useEffect(() => {
    api.getLaunchResults(projectId, host, {}).then(res => {
      setNoOfLaunches(res.content.length);
      setLoading(false);
    });
  }, [api, projectId, host]);

  return loading ? (
    <Skeleton width="2rem" height="3rem" />
  ) : (
    <b>{noOfLaunches}</b>
  );
};

export const ProjectsPageContent = (props: { host: string }) => {
  const { host } = props;
  const launchPageRoute = useRouteRef(launchRouteRef);

  const config = useApi(configApiRef).getConfigArray(
    'reportPortal.integrations',
  );
  const filterType =
    config
      .find(value => value.getString('host') === host)
      ?.getString('filterType') ?? 'INTERNAL';

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<ProjectListResponse>({
    content: [],
    page: {
      number: 1,
      size: 10,
      totalElements: 0,
      totalPages: 1,
    },
  });
  const reportPortalApi = useApi(reportPortalApiRef);

  useEffect(() => {
    if (loading) {
      reportPortalApi
        .getInstanceDetails(host, {
          'filter.eq.type': filterType,
          'page.size': tableData.page.size,
          'page.page': tableData.page.number,
        })
        .then(res => {
          setTableData({ ...res });
          setLoading(false);
        });
    }
  });

  const columns: TableColumn<ProjectDetails>[] = [
    {
      title: 'Project',
      field: 'name',
      render: row => (
        <Link
          to={`${launchPageRoute()}?host=${host}&project=${row.projectName}`}
        >
          {row.projectName}
        </Link>
      ),
      width: '60%',
    },
    {
      title: 'Launches',
      width: '30%',
      render: row => <UniqueLaunches host={host} projectId={row.projectName} />,
    },
    {
      title: 'Actions',
      align: 'center',
      render: row => (
        <IconButton
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${host}/ui/#${row.projectName}/`}
        >
          <Launch />
        </IconButton>
      ),
    },
  ];

  function handlePageChange(page: number, pageSize: number) {
    setLoading(true);
    reportPortalApi
      .getInstanceDetails(host, {
        'filter.eq.type': filterType,
        'page.size': pageSize,
        'page.page': page + 1,
      })
      .then(res => {
        setTableData({ ...res });
        setLoading(false);
      });
  }

  return (
    <Table
      isLoading={loading}
      options={{
        padding: 'dense',
        pageSize: tableData.page.size,
        paginationPosition: 'both',
      }}
      title="Projects"
      columns={columns}
      data={tableData.content}
      totalCount={tableData.page.totalElements}
      onPageChange={handlePageChange}
      page={tableData.page.number - 1}
    />
  );
};
