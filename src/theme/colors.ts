type Color =
  | 'white'
  | 'black'
  | 'light'
  | 'dark'
  | 'background'
  | 'paper'
  | 'error'
  | 'primary'
  | 'secondary'
  | 'primaryBlue'
  | 'darkBlue'
  | 'lightGray'
  | 'whiteSmoke'
  | 'softGreen'
  | 'darkenedGreen'
  | 'softRed'
  | 'darkenedRed';

export type Colors = Record<Color, string>;

export const colors: Colors = {
  white: '#ffffff',
  black: '#000000',
  light: '#FBFBFB',
  dark: '#4A4A4A',
  background: '#f5f5f5',
  paper: '#e0e0e080',
  error: '#ff0000',
  primary: '#0044B0',
  secondary: '#D9D9D9',
  primaryBlue: '#0044B0',
  darkBlue: '#05337E',
  lightGray: '#D2D1D1',
  whiteSmoke: '#f5f5f5',
  softGreen: '#6C936E',
  darkenedGreen: '#5a7c5b',
  softRed: '#F24E4E',
  darkenedRed: '#d44646',
};
