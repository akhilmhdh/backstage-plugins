export interface Config {
  /**
   * Configuration values for Report Portal plugin
   */
  reportPortal: {
    integrations: Array<{
      /**
       * Host of report portal url
       */
      host: string;
      /**
       * Base api url for report portal instance
       */
      baseUrl: string;
      /**
       * The Api token that will be used to
       * @visibility secret
       */
      token: string;
    }>;
  };
}
