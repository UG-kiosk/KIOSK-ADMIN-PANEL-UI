import '../src/styles/index.css';
import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { theme } from '../src/theme/theme';
import { Global, ThemeProvider, css } from '@emotion/react';
import React from 'react';

const themeDecorator = withThemeFromJSXProvider({
  themes: {
    base: theme,
  },
  defaultTheme: 'base',
  Provider: ThemeProvider,
});

export const decorators = [themeDecorator];
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
