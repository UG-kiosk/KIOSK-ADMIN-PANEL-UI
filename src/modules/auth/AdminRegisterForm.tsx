import { Controller } from 'react-hook-form';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import { formStyles } from '../../styles/formStyles';
import { createStyles } from '../../theme/utils';
import { Typography } from '../../components/Typography/Typography';
import { useRegisterForm } from './hooks/form/useRegisterForm';

const AdminRegisterForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useRegisterForm();

  return (
    <div css={adminFormPageStyles.main}>
      <Typography size="lg" weight="bold">
        Register new admin
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

export default AdminRegisterForm;

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
