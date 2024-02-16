export type ProjectDetails = {
  projectId: number;
  projectName: string;
  configuration: {
    subTypes: {
      [key: string]: [
        {
          id: number;
          locator: string;
          typeRef: string;
          longName: string;
          shortName: string;
          color: string;
        },
      ];
    };
  };
  users: [
    {
      login: string;
      projectRole: string;
    },
  ];
  creationDate: number;
};

export type LaunchDetails = {
  owner: string;
  share: boolean;
  description: string;
  id: number;
  uuid: string;
  name: string;
  number: number;
  startTime: number;
  endTime: number;
  lastModified: number;
  status: string;
  statistics: {
    executions: {
      passed: number;
      failed: number;
      skipped: number;
      total: number;
    };
    defects: {
      [key: string]: {
        total: number;
        [key: string]: number;
      };
    };
    mode: string;
    analysing: [];
    approximateDuration: number;
    hasRetries: boolean;
    rerun: boolean;
  };
};

export type LaunchDetailsResp = {
  content: [LaunchDetails];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
};
