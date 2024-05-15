import { errorHandler } from '@backstage/backend-common';
import { LoggerService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';

import express from 'express';
import Router from 'express-promise-router';
import { createProxyMiddleware } from 'http-proxy-middleware';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { config, logger } = options;

  logger.info('Report portal backend plugin initialized');
  const hostsConfig = config.getConfigArray('reportPortal.integrations');

  const router = Router();
  router.use(express.json());

  router.get('/*', (req, res, next) => {
    const hostName = req.query.host;
    if (!hostName) {
      res.status(500).json({ message: 'Oops, I think you forgot something?' });
      return;
    }
    const reqConfig = hostsConfig
      .find(instance => instance.getString('host') === hostName)
      ?.get() as PluginConfig;

    const proxy = createProxyMiddleware({
      target: reqConfig.baseUrl,
      changeOrigin: true,
      secure: false,
      headers: {
        Authorization: reqConfig.token,
      },
      pathRewrite: {
        ['/api/report-portal']: '',
      },
    });

    proxy(req, res, next);
  });

  router.use(errorHandler());
  return router;
}

type PluginConfig = {
  host: string;
  baseUrl: string;
  token: string;
};
