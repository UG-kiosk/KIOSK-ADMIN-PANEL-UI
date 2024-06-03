import { Controller } from 'react-hook-form';
import Button from '../../../../components/Button/Button';
import FormField from '../../../../components/FormField/FormField';
import { Typography } from '../../../../components/Typography/Typography';
import { formStyles } from '../../../../styles/formStyles';
import { createStyles } from '../../../../theme/utils';
import { useChangePasswordForm } from './useChangePasswordForm';

const AdminChangePasswordForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useChangePasswordForm();

  return (
    <div css={adminFormPageStyles.main}>
      <Typography size="lg" weight="bold">
        Change password
      </Typography>
      <section css={formStyles.section}>
        <form css={formStyles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <fieldset css={formStyles.formFields}>
            {formFields.map(({ name, label, isRequired, placeholder, type }) => (
              <Controller
                key={name}
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    isError={!!error}
                    inputProps={{
                      ...field,
                      placeholder,
                      type: type,
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => field.onChange(event.target.value),
                      value: field.value as string,
                    }}
                    isRequired={isRequired}
                    errorMessage={error?.message}
                    label={label}
                    name={field.name}
                    ref={field.ref}
                    inputType="base"
                  />
                )}
              />
            ))}
          </fieldset>
          <Button label="Submit" type="submit" />
        </form>
      </section>
    </div>
  );
};

export default AdminChangePasswordForm;

const adminFormPageStyles = createStyles({
  main: ({ colors }) => ({
    color: colors.dark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 0px',
    gap: '20px',
  }),
});
