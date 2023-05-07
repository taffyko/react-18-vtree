import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
  stories: ['../src/**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  webpackFinal: (config) => {
    const staticModules = config.plugins?.[0]['_staticModules'] as Record<
      string,
      string
    >;

    Object.entries(staticModules).forEach(([k, v]) => {
      if (/storybook-init-renderer-entry/.test(k)) {
        staticModules[k] = v.replace(/\\/g, '\\\\');
      }
    });

    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  features: {
    storyStoreV7: false,
  },
};
export default config;
