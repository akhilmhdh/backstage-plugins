export interface Config {
  /**
   * Configuration values for Report Portal plugin
   */
  reportPortal: {
    integrations: Array<{
      /**
       * Host of report portal url
       * @visibility frontend
       */
      host: string;
      /**
       * Type of projects to list
       * @visibility frontend
       */
      filterType: string;
    }>;
  };
}
