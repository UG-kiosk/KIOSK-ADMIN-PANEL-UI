import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Styles } from '../theme/utils';

type ButtonVariant = 'primary' | 'secondary' | 'text';

type ButtonType = {
  label: string;
  variant?: ButtonVariant;
  styles?: Styles;
  dataTestId?: string;
} & ComponentPropsWithoutRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonType>(
  ({ label, type = 'button', variant = 'primary', disabled = false, styles, dataTestId, ...buttonProps }, ref) => {
    // For lint purposes
    console.log(variant);

    return (
      <button ref={ref} type={type} disabled={disabled} css={styles} data-testid={dataTestId} {...buttonProps}>
        {label}
      </button>
    );
  },
);

export default Button;
