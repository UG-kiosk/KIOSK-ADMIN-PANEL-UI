import { Interpolation } from '@emotion/react';
import { UGTheme as Theme } from './theme';

/**
 * Helper type that allows for styling with access to Theme.
 *
 * Example: `const styles: Styles = (theme) => ({...})`
 */
export type Styles = Interpolation<Theme>;
/**
 * Helper function that allows to create single style object with any given name, thats
 * later used in the same way as `Styles` type.
 *
 * Example:
 * `const styles = createStyles({
 *    base: (theme) => ({...}),
 *    other: (theme) => ({...})
 * })`
 */
export declare function createStyles<
  T extends {
    [key: string]: Interpolation<Theme>;
  },
>(arg: T): T;
