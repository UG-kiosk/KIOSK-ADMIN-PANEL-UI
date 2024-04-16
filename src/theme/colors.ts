type Color =
  | 'primaryBlue'
  | 'white'
  | 'error'
  | 'secondaryBlue'
  | 'lightGray'
  | 'whiteSmoke'
  | 'primaryGreen'
  | 'primaryOrange';

export type Colors = Record<Color, string>;

export const colors: Colors = {
  primaryBlue: '#0044B0',
  secondaryBlue: '#05337E',
  lightGray: '#D2D1D1',
  white: '#ffffff',
  whiteSmoke: '#f5f5f5',
  error: '#ffffff',
  primaryGreen: '#6C936E',
  primaryOrange: '#F24E4E',
};
