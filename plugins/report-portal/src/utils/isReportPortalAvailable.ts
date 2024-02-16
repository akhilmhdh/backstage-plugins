import { Entity } from '@backstage/catalog-model';

export const isReportPortalAvailable = (entity: Entity): boolean => {
  return Boolean(
    entity.metadata.annotations?.['reportportal.io/project-name'] &&
      entity.metadata.annotations?.['reportportal.io/launch-name'],
  );
};
