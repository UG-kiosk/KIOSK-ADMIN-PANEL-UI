import { Interpolation, Theme } from '@emotion/react';

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
export function createStyles<T extends { [key: string]: Interpolation<Theme> }>(arg: T): T {
  return arg;
}
