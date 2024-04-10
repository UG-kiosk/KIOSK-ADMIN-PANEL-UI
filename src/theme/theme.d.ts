import { createStyles, Styles } from './utils';

type UGTheme = {
  // MAYBE ADD SOMETHING LIKE BREAKPOINTS
  colors: Colors;
  typography: Typography;
};
declare const BASE_THEME: UGTheme;
type UGThemeProviderProps = PropsWithChildren<{
  theme?: UGTheme;
}>;
declare const UGThemeProvider: ({
  children,
  theme,
}: UGThemeProviderProps) => import('@emotion/react/jsx-runtime').JSX.Element;
export { BASE_THEME, UGThemeProvider, useTheme, createStyles };
export type { UGTheme, UGThemeProviderProps, Styles };
