import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'tj-jira-panel',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'new',
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  },
};
