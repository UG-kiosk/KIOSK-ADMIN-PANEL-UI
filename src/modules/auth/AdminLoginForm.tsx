import { Controller } from 'react-hook-form';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import { formStyles } from '../../styles/formStyles';
import { useLoginForm } from './hooks/form/useLoginForm';
import { createStyles } from '../../theme/utils';
import { Typography } from '../../components/Typography/Typography';

const AdminLoginForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useLoginForm();

  return (
    <div css={adminFormPageStyles.main}>
      <Typography size="2xl" weight="bold">
        Log in
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

export default AdminLoginForm;

const adminFormPageStyles = createStyles({
  main: ({ colors }) => ({
    color: colors.dark,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }),
});
