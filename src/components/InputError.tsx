import { Styles } from '../theme/utils';
import { Typography, TypographyProps } from './Typography';

export type InputErrorProps = {
  errorMessage: string;
  styles?: Styles;
  dataTestId?: string;
} & Pick<TypographyProps, 'size' | 'weight'>;
/**
 * Input error generic component, used to display an error message for the input field.
 * @param errorMessage string, an error message to display.
 * @param styles optional Styles, used to customize input styles.
 * @param dataTestId optional string, used for testing purposes.
 * @param size optional FontSize, used to determine font size of typography component
 * @param weight optional FontWeight, used to determine font weight of typography component.
 */
const InputError = ({ errorMessage, styles, dataTestId, size = 'sm', weight = 'bold' }: InputErrorProps) => (
  <Typography size={size} weight={weight} styles={[inputErrorStyles, styles]} dataTestId={dataTestId}>
    {errorMessage}
  </Typography>
);

const inputErrorStyles: Styles = ({ typography }) => ({
  color: 'black',
  lineHeight: typography.fontSize.sm,
});

export default InputError;
