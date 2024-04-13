export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export const fontSizes: Record<FontSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
};

export type FontWeight = 'normal' | 'medium' | 'bold';

export const baseFontWeight: Record<FontWeight, number> = {
  normal: 400,
  medium: 500,
  bold: 600,
};

export type Typography = {
  fontSize: Record<FontSize, string>;
  fontWeight: Record<FontWeight, number>;
};
