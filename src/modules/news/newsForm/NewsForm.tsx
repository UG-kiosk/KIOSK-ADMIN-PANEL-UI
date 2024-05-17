import { useNewsForm } from './hooks/useNewsForm';
import { Controller } from 'react-hook-form';
import FormField from '../../../components/FormField/FormField';
import Button from '../../../components/Button/Button';
import { createStyles } from '../../../theme/utils';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { NewsSource, NewsCategory } from './types/news';
import { Typography } from '../../../components/Typography/Typography';

const NewsForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useNewsForm();
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
                name === 'source' ? (
                  <Dropdown defaultValue={NewsSource.INF} onValueChange={event => field.onChange(event)}>
                    <Dropdown.Trigger>
                      <Dropdown.Value />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      {Object.values(NewsSource).map(source => (
                        <Dropdown.Item value={source} key={source}>
                          <Typography>{source}</Typography>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Content>
                  </Dropdown>
                ) : name === 'category' ? (
                  <Dropdown defaultValue={NewsCategory.NEWS} onValueChange={event => field.onChange(event)}>
                    <Dropdown.Trigger>
                      <Dropdown.Value />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      {Object.values(NewsCategory).map(category => (
                        <Dropdown.Item value={category} key={category}>
                          <Typography>{category}</Typography>
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

export default NewsForm;

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
