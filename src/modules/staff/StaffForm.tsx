import { Controller } from 'react-hook-form';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import PostFields from './PostFields';
import { useStaffForm } from './hooks/useStaffForm';
import { formStyles } from '../../styles/formStyles';

const StaffForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useStaffForm();
  return (
    <section css={formStyles.section}>
      <form css={formStyles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <fieldset css={formStyles.formFields}>
          {formFields.map(({ name, label, isRequired, placeholder, type }) => (
            <Controller
              key={name}
              control={control}
              name={name}
              render={({ field, fieldState: { error } }) =>
                name === 'posts' ? (
                  <PostFields control={control} />
                ) : (
                  <FormField
                    isError={!!error}
                    inputProps={{
                      ...field,
                      placeholder,
                      type: type,
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => field.onChange(event.target.value),
                      value: field.value as string, // Add this line to ensure the value is of type string
                    }}
                    isRequired={isRequired}
                    errorMessage={error?.message}
                    label={label}
                    name={field.name}
                    ref={field.ref}
                    inputType="base"
                  />
                )
              }
            />
          ))}
        </fieldset>
        <Button label="Submit" type="submit" />
      </form>
    </section>
  );
};

export default StaffForm;
