import '@emotion/react';
import { UGTheme } from './theme/theme';

declare module '@emotion/react' {
  export interface Theme extends UGTheme {}
}
