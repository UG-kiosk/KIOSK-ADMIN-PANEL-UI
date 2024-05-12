import { useEctsForm } from './hooks/useEctsForm';
import { Controller } from 'react-hook-form';
import FormField from '../../../components/FormField/FormField';
import Button from '../../../components/Button/Button';
import { createStyles } from '../../../theme/utils';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { Degree } from '../../../shared/constants/degree';
import { Typography } from '../../../components/Typography/Typography';

const EctsForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useEctsForm();

  return (
    <section css={userInformationFormStyles.section}>
      <form css={userInformationFormStyles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <fieldset css={userInformationFormStyles.formFields}>
          {formFields.map(({ name, label, isRequired, placeholder, type }) => (
            <Controller
              key={name}
              control={control}
              name={name}
              render={({ field, fieldState: { error } }) =>
                name === 'degree' ? (
                  <Dropdown defaultValue={Degree.BACHELOR} onValueChange={event => field.onChange(event)}>
                    <Dropdown.Trigger>
                      <Dropdown.Value />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      {Object.values(Degree).map(degree => (
                        <Dropdown.Item value={degree} key={degree}>
                          <Typography>{degree}</Typography>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Content>
                  </Dropdown>
                ) : (
                  <FormField
                    isError={!!error}
                    inputProps={{
                      ...field,
                      placeholder,
                      type: type,
                      onChange: event => field.onChange(event.target.value),
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
        <Button label="Submit" type="submit" onClick={() => handleSubmit(onSubmit)} />
      </form>
    </section>
  );
};

export default EctsForm;

const userInformationFormStyles = createStyles({
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
});
