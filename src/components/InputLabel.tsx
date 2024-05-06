import { Styles, createStyles } from '../theme/utils';
import { Typography, TypographyProps } from './Typography';

export type InputLabelProps = {
  label: string;
  isRequired?: boolean;
  styles?: Styles;
  dataTestId?: string;
} & Pick<TypographyProps, 'size' | 'weight' | 'lineHeight'>;
/**
 * InputLabel generic component, used to display label for the input field.
 * When `isRequired = true`, then additional asterisk will appear indicating that a following field is required.
 * @param label string, a label to display.
 * @param isRequired optional boolean, indicates whether a following input field is required or not.
 * @param styles optional Styles, used to customize input styles.
 * @param dataTestId optional string, used for testing purposes.
 * @param size optional FontSize, used to determine font size of typography component
 * @param weight optional FontWeight, used to determine font weight of typography component.
 */
const InputLabel = ({ label, styles, dataTestId, lineHeight = 0, size = 'md', weight = 'bold' }: InputLabelProps) => (
  <Typography
    size={size}
    weight={weight}
    lineHeight={lineHeight}
    styles={[inputLabelStyles.label, styles]}
    dataTestId={dataTestId}
  >
    {label}
  </Typography>
);

const inputLabelStyles = createStyles({
  label: ({ typography, colors }) => ({
    padding: '5px 0',
    lineHeight: 1,
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.sm,
    color: colors.dark,
  }),
  asterisk: ({ colors }) => ({
    color: colors.error,
  }),
});

export default InputLabel;
