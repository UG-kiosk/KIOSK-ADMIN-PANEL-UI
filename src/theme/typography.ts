export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export const fontSizes: Record<FontSize, string> = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
};

export type FontWeight = 'thin' | 'normal' | 'medium' | 'bold';

export const fontWeights: Record<FontWeight, number> = {
  thin: 300,
  normal: 400,
  medium: 500,
  bold: 600,
};

export type Typography = {
  fontSize: typeof fontSizes;
  fontWeight: typeof fontWeights;
};

export const typography: Typography = {
  fontSize: fontSizes,
  fontWeight: fontWeights,
};
