import { forwardRef, ReactNode } from 'react';

import InputField, { InputFieldProps } from './Input';
import InputError, { InputErrorProps } from './InputError';
import InputLabel, { InputLabelProps } from './InputLabel';
import { createStyles, Styles } from '../theme/utils';
import { Prettify } from '../shared/types/Prettify';

type StyleKeys = 'container' | 'label' | 'input' | 'error';
type ErrorProps = Pick<InputErrorProps, 'weight' | 'size' | 'dataTestId'>;
type InputProps = Omit<InputFieldProps, 'isError' | 'styles'>;
type LabelProps = Pick<InputLabelProps, 'weight' | 'size' | 'dataTestId'>;

type BaseTextFieldProps = {
  name: string;
  label: string;
  isError?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  labelProps?: LabelProps;
  errorProps?: ErrorProps;
  dataTestId?: string;
};

type DefaultTextFieldProps = BaseTextFieldProps & {
  inputType: 'base';
  inputProps?: InputProps;
  styles?: Prettify<Partial<Record<StyleKeys, Styles>>>;
};

type TextFieldWithCustomInput = BaseTextFieldProps & {
  inputType: 'custom';
  children: ReactNode;
  inputProps?: never;
  styles?: Prettify<Partial<Record<Exclude<StyleKeys, 'input'>, Styles>>>;
};

type TextFieldProps = DefaultTextFieldProps | TextFieldWithCustomInput;

/**
 * TextField generic component, that combines InputLabel, InputField and InputError components.
 * @param ref HTMLInputElement, ref is forwarded to the Input component.
 * @param label string, label used in the InputLabel component.
 * @param isError optional boolean, indicates whether form field has an error.
 * @param errorMessage optional string, message that will be displayed when error occurs.
 * @param isRequired optional boolean, indicates whether form field is required or not.
 * @param labelProps optional LabelProps, used to customize Label component
 * @param inputProps optional InputProps, used to customize and control Input component.
 * @param errorProps optional ErrorProps, used to customize Error component.
 * @param styles optional Record<FormFieldStyleKeys, Styles>, custom record of styles that is passed to form field container, input label, input field and input error.
 * @param dataTestId optional string, used for testing purposes.
 */
const FormField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { name, label, isRequired, isError, errorMessage, labelProps, errorProps, inputType, styles, dataTestId } =
    props;

  return (
    <div css={[textFieldStyles.container, styles?.container]} data-testid={dataTestId}>
      <InputLabel isRequired={isRequired} label={label} styles={styles?.label} {...labelProps} />
      {inputType === 'base' ? (
        <InputField id={name} isError={isError} ref={ref} styles={styles?.input} {...props.inputProps} />
      ) : (
        props.children
      )}
      {errorMessage && <InputError errorMessage={errorMessage} styles={styles?.error} {...errorProps} />}
    </div>
  );
});

const textFieldStyles = createStyles({
  container: {
    minWidth: '0px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    height: 40,
  },
});

export default FormField;
