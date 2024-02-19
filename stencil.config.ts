import { Config } from '@stencil/core';

export const config: Config = {
  globalScript: 'src/global/app.ts',
  namespace: 'tj-jira-panel',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
};
