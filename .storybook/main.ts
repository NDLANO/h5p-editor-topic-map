import { StorybookConfig } from '@storybook/react-webpack5';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';

const storybookConfig: StorybookConfig = {
  stories: [
    '../src/App.stories.tsx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-themes',
    '@storybook/addon-webpack5-compiler-babel'
  ],

  webpackFinal: async (config) => {
    addScssSupport(config);
    return config;
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  }
};

function addScssSupport(config: Configuration) {
  config.plugins ??= [];
  config.plugins.push(new MiniCssExtractPlugin());

  config.module ??= {};
  config.module.rules ??= [];
  config.module.rules.push({
    test: /\.module.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }
      },
      'sass-loader'
    ]
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    exclude: /\.module\.scss$/
  });
}

export default storybookConfig;
