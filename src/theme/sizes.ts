export type ComponentSize = '2xs' | 'xs' | 'small' | 'medium' | 'large';

export interface Sizes {
  button: ElementsSizes;
  select: Omit<ElementsSizes, '2xs'>;
}

export const sizes: Sizes = {
  button: {
    large: {
      minHeight: '40px',
      minWidth: '280px',
    },
    medium: {
      minHeight: '40px',
      minWidth: '170px',
    },
    small: {
      minHeight: '40px',
      minWidth: '120px',
    },
    xs: {
      minHeight: '40px',
      minWidth: '90px',
    },
    '2xs': {
      minHeight: '90px',
      minWidth: '70px',
    },
  },
  select: {
    large: {
      minHeight: '40px',
      minWidth: '280px',
    },
    medium: {
      minHeight: '40px',
      minWidth: '200px',
    },
    small: {
      minHeight: '40px',
      minWidth: '170px',
    },
    xs: {
      minHeight: '40px',
      minWidth: '130px',
    },
  },
};

export type ElementsSizes = Record<ComponentSize, Dimensions>;
type Dimensions = Record<DimensionKey, string>;

type DimensionKey = 'minHeight' | 'minWidth';
