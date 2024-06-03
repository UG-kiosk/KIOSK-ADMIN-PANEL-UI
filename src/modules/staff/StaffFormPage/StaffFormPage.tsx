import { Controller } from 'react-hook-form';
import FormField from '../../../components/FormField/FormField';
import Button from '../../../components/Button/Button';
import { useStaffForm } from './useStaffForm';
import { formStyles } from '../../../styles/formStyles';
import { useParams } from 'react-router-dom';
import PostFields from './components/PostFields/PostFields';

const StaffFormPage = () => {
  const { id } = useParams<{ id?: string }>();
  const { control, formFields, handleSubmit, onSubmit } = useStaffForm(id);
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
                      value: field.value as string,
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

export default StaffFormPage;
