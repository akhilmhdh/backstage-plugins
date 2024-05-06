export interface Config {
  /**
   * Configuration values for Report Portal plugin
   */
  reportPortal: {
    /**
     * Email to connect for adding more instances
     * @visibility frontend
     */
    supportEmail: string;
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
