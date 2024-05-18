import { Controller } from 'react-hook-form';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import PostFields from './PostFields';
import { useStaffForm } from './hooks/useStaffForm';

const StaffForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useStaffForm();
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
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

// const userInformationFormStyles = createStyles({
//   section: {
//     width: '100%',
//   },
//   formContainer: {
//     margin: 'auto',
//     maxWidth: 400,
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 20,
//   },
//   formFields: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 20,
//   },
//   actionContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 25,
//   },
//   submitButton: ({ typography }) => ({
//     width: 'auto',
//     fontSize: typography.fontSize.lg,
//     fontWeight: typography.fontWeight.medium,
//   }),
//   legend: ({ colors }) => ({
//     fontStyle: 'italic',
//     color: colors.lightGray,
//   }),
// });
