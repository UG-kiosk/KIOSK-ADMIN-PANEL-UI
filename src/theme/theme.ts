import { Theme } from '@emotion/react';
import { colors } from './colors';
import { typography } from './typography';
import { opacity } from './opacity';
import { placement } from './placement';
import { sizes } from './sizes';

/**
 * Theme that's used within the application
 */
export const theme: Theme = {
  typography,
  colors,
  opacity,
  placement,
  sizes,
};
