import React from 'react';
import { useEctsForm } from './hooks/useEctsForm';
import { Controller } from 'react-hook-form';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button/Button';
import { createStyles } from '../../../theme/utils';
import Dropdown from '../../../components/Dropdown';
import { Typography } from '@mui/material';
import { Degree } from '../../../shared/constants/degree';

const EctsForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useEctsForm();

  return (
    <form css={userInformationFormStyles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <fieldset css={userInformationFormStyles.formFields}>
        {formFields.map(({ name, label, isRequired, placeholder, type }) => (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) =>
              name === 'degree' ? (
                <Dropdown value={Degree.BACHELOR} onValueChange={event => field.onChange(event)}>
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
                  styles={{ container: { height: 42 } }}
                />
              )
            }
          />
        ))}
      </fieldset>
      <Button label="Submit" type="submit" onClick={() => handleSubmit(onSubmit)} />
    </form>
  );
};

export default EctsForm;

const userInformationFormStyles = createStyles({
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    height: 100,
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
    fontWeight: typography.fontWeight['600'],
  }),
  legend: ({ colors }) => ({
    fontStyle: 'italic',
    color: colors.grayGranite,
  }),
});
