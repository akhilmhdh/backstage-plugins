/**
 * The report-portal backend plugin.
 *
 * @packageDocumentation
 */

export * from './dynamic/index';
export { createRouter } from './service/router';
export { reportPortalPlugin as default } from './plugin';
