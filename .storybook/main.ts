import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: '@storybook/nextjs',
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
};

export default config;