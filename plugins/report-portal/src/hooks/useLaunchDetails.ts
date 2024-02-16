import { useEffect, useState } from 'react';

import { useApi } from '@backstage/core-plugin-api';

import { LaunchDetails, reportPortalApiRef } from '../api';

export function useLaunchDetails(
  projectId: string,
  launchName: string,
  hostName: string,
) {
  const reportPortalApi = useApi(reportPortalApiRef);
  const [loading, setLoading] = useState(true);
  const [launchDetails, setLaunchDetails] = useState<LaunchDetails>();

  useEffect(() => {
    setLoading(true);
    reportPortalApi
      .getLaunchResults(projectId, launchName, hostName)
      .then(res => {
        setLaunchDetails(res.content[0]);
        setLoading(false);
      });
  }, [projectId, launchName, hostName, reportPortalApi]);

  return { loading, launchDetails };
}
