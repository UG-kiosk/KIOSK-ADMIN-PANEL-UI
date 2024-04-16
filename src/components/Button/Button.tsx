import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Styles, createStyles } from '../../theme/utils';
import { ComponentSize, sizes } from '../../theme/sizes';

type ButtonVariant = 'primary' | 'secondary' | 'accept' | 'cancel';

type ButtonType = {
  label: string;
  variant?: ButtonVariant;
  overideStyles?: Styles;
  size?: ComponentSize;
  dataTestId?: string;
} & ComponentPropsWithoutRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonType>(
  (
    {
      label,
      type = 'button',
      variant = 'primary',
      disabled = false,
      size = 'small',
      overideStyles,
      dataTestId,
      ...buttonProps
    },
    ref,
  ) => {
    const variantStyle = selectVariant(variant);
    const style = [buttonStyles.baseButton, variantStyle, overideStyles, sizes.button[size]];
    return (
      <button ref={ref} type={type} disabled={disabled} css={style} data-testid={dataTestId} {...buttonProps}>
        {label}
      </button>
    );
  },
);

const buttonStyles = createStyles({
  baseButton: {
    borderRadius: 25,
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    outline: 'none',
    transition: 'background-color 250ms ease-in-out, color 250ms ease-in-out, backdrop-filter 250ms ease-in-out',
    '&:disabled': {
      cursor: 'not-allowed',
    },
    boxShadow: '0px 4px 4px 0px #00000040',
  },
});

const selectVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return buttonVariants.primary;
    case 'secondary':
      return buttonVariants.secondary;
    case 'accept':
      return buttonVariants.accept;
    case 'cancel':
      return buttonVariants.cancel;
  }
};

const buttonVariants = createStyles({
  primary: ({ colors }) => ({
    color: colors.white,
    backgroundColor: colors.primaryBlue,

    // TO JUSTYNA
    // '&:enabled:hover, &:enabled:focus-visible': {
    //   backgroundColor: colors.primaryBlue,
    // MY PROPOSITION IS TO GIVE JUST DARKER BACKGROUND IT WOULD BE A FUNCTION WHICH MAKES COLOR DARKER
    // },
    '&:enabled:active': {
      color: colors.secondaryBlue,
    },
  }),
  secondary: ({ colors }) => ({
    color: colors.primaryBlue,
    backgroundColor: colors.white,
    // active and hover
  }),
  accept: ({ colors }) => ({
    color: colors.white,
    backgroundColor: colors.primaryGreen,
  }),
  cancel: ({ colors }) => ({
    color: colors.white,
    backgroundColor: colors.primaryOrange,
  }),
});

export default Button;
