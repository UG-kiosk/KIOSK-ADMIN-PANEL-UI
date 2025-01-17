import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Styles, createStyles } from '../../theme/utils';

export type InputFieldProps = {
  isError?: boolean;
  styles?: Styles;
  dataTestId?: string;
} & ComponentPropsWithoutRef<'input'>;

/**
 * InputField generic component, used to display input field.
 * If isError is true, input will change it's styles to match error state.
 * @param isError optional boolean, that indicates whether an error has ocurred or not.
 * @param styles optional Styles, used to customize input styles.
 * @param dataTestId optional string, used for testing purposes.
 */
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ disabled, isError, styles, dataTestId, ...props }, ref) => (
    <input
      ref={ref}
      disabled={disabled}
      css={[inputFieldStyles.input, isError && inputFieldStyles.inputError, styles]}
      data-testid={dataTestId}
      {...props}
    />
  ),
);

export const inputFieldStyles = createStyles({
  input: ({ colors }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `0.75px solid ${colors.lightGray}`,
    borderRadius: 25,
    lineHeight: 1.75,
    padding: '5px 15px',
    '&:hover, &:focus': {
      outline: 'none',
      borderColor: colors.primaryBlue,
    },
    width: '100%',
  }),
  inputError: {},
});

export default InputField;
