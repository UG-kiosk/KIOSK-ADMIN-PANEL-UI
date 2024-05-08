/**
 * Type for all possible zIndex values
 */
export type ZIndex = 'base' | 'dropdown' | 'overlay' | 'modal' | 'toast';

/**
 * Unified zIndex value used across the project..
 */
const zIndex: Record<ZIndex, number> = {
  base: 0,
  dropdown: 10,
  overlay: 90,
  modal: 100,
  toast: 110,
};

/**
 * Type that represents placement object available in the theme type.
 */
export type Placement = {
  zIndex: typeof zIndex;
};

/**
 * Placement object that provides zIndex properties and is used within the theme object.
 */
export const placement: Placement = {
  zIndex,
};
