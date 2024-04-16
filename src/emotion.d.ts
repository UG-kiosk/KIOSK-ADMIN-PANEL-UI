import '@emotion/react';
import { Colors } from './theme/colors';
import { Opacity } from './theme/opacity';
import { Placement } from './theme/placement';
import { Sizes } from './theme/sizes';
import { Typography } from './theme/typography';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    opacity: Opacity;
    placement: Placement;
    sizes: Sizes;
    typography: Typography;
  }
}
