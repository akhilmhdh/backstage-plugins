import { ApiRef, createApiRef } from '@backstage/core-plugin-api';

import { LaunchDetailsResp, ProjectDetails } from './types';

/** @public */
export const reportPortalApiRef: ApiRef<ReportPortalApi> = createApiRef({
  id: 'plugin.report-portal',
});

export type ReportPortalApi = {
  getLaunchResults: (
    projectId: string,
    filter: string,
    host: string,
  ) => Promise<LaunchDetailsResp>;
  getProjectDetails: (
    projectId: string,
    host: string,
  ) => Promise<ProjectDetails>;
};
