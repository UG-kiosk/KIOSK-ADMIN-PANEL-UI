import styled from '@emotion/styled';
import { MouseEvent, PropsWithChildren } from 'react';
import { FontSize, FontWeight } from '../../theme/typography';
import { Styles } from '../../theme/utils';

type BodyTags = 'p' | 'span';
type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TypographyTags = HeadingTags | BodyTags;

/**
 * Wrapper used for accessing `as` prop, to allow for tag changing of Typography component.
 */
const TypographyWrapper = styled.p``;

export type TypographyProps = {
  size?: FontSize;
  styles?: Styles;
  tag?: TypographyTags;
  weight?: FontWeight;
  lineHeight?: number;
  onClick?: (event: MouseEvent) => void;
  dataTestId?: string;
} & PropsWithChildren;
/**
 * Typography generic component that is used to represent text in the application
 * @param children can be any valid React Node.
 * @param styles optional, used to apply custom styles if props are not enough.
 * @param tag optional, defaults to 'p' tag. Used change tag of component.
 * @param size optional, defaults to 'md'. Used to change font size of component.
 * @param weight optional, default to '400'. Used to change font weight of component.
 * @param lineHeight optional number, Used to change element line height.
 * @param dataTestId optional, only used for testing purposes.
 */
export const Typography = ({
  children,
  styles,
  dataTestId,
  lineHeight,
  onClick,
  tag = 'p',
  size = 'md',
  weight = 'normal',
}: TypographyProps) => {
  return (
    <TypographyWrapper
      as={tag}
      data-testid={dataTestId}
      css={({ typography }) => [
        {
          fontSize: typography.fontSize[size],
          fontWeight: typography.fontWeight[weight],
        },
        lineHeight && { lineHeight: `${lineHeight}px` },
        styles,
      ]}
      onClick={onClick}
    >
      {children}
    </TypographyWrapper>
  );
};
