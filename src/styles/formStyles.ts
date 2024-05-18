import { createStyles } from '../theme/utils';

export const formStyles = createStyles({
  section: {
    width: '100%',
  },
  formContainer: {
    margin: 'auto',
    maxWidth: 400,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  nestedFormField: {
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
  },
  nestedFormFieldDepth2: {
    display: 'flex',
    flexDirection: 'column',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
  },
  submitButton: ({ typography }) => ({
    width: 'auto',
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
  }),
  legend: ({ colors }) => ({
    fontStyle: 'italic',
    color: colors.lightGray,
  }),
  removeButton: {
    marginTop: '5px',
    width: 'min-content',
    alignSelf: 'flex-end',
  },
  removeButtonDepth2: {
    marginTop: '5px',
    width: 'min-content',
    alignSelf: 'flex-end',
  },
  addButton: {
    width: 'min-content',
  },
});
