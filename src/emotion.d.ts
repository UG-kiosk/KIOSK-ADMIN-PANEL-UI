import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    opacity: Opacity;
    placement: Placement;
    sizes: Sizes;
    typography: Typography;
  }
}
