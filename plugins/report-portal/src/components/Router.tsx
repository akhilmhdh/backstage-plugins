import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { launchRouteRef, projectsRouteRef } from '../routes';
import { LaunchesPage } from './LaunchesPage';
import { ProjectsPage } from './ProjectsPage';
import { ReportPortalGlobalPage } from './ReportPortalGlobalPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<ReportPortalGlobalPage />} />
      <Route path={projectsRouteRef.path} element={<ProjectsPage />} />
      <Route path={launchRouteRef.path} element={<LaunchesPage />} />
    </Routes>
  );
};
