import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'betsson-task',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [{ src: '_redirects' }],
    },
  ],
  globalStyle: 'src/global/app.css',
  testing: {
    browserHeadless: 'new',
  },
};
