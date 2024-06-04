import { useLessonsForm } from './hooks/useLessonsForm';
import { Controller, useFieldArray } from 'react-hook-form';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';
import { Typography } from '../../components/Typography/Typography';
import { formStyles } from '../../styles/formStyles';
import { DaysOfWeek, LessonType } from './types/lessons';
import { useParams } from 'react-router-dom';

const LessonsForm = () => {
  const { id } = useParams<{ id?: string }>();

  const { control, formFields, handleSubmit, onSubmit } = useLessonsForm(id);

  const {
    fields: groupsFields,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    control,
    name: 'groups',
  });

  const {
    fields: infoFields,
    append: appendInfo,
    remove: removeInfo,
  } = useFieldArray({
    control,
    name: 'info',
  });

  const {
    fields: teachersFields,
    append: appendTeacher,
    remove: removeTeacher,
  } = useFieldArray({
    control,
    name: 'teachers',
  });

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
                name === 'day' || name === 'type' ? (
                  <Dropdown
                    defaultValue={name === 'day' ? DaysOfWeek.Monday : LessonType.laboratorium}
                    onValueChange={event => field.onChange(event)}
                    value={field.value?.toString()}
                  >
                    <Dropdown.Trigger>
                      <Dropdown.Value />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      {Object.values(name === 'day' ? DaysOfWeek : LessonType).map(value => (
                        <Dropdown.Item value={value} key={value}>
                          <Typography>{value}</Typography>
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
                      type,
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
          {groupsFields.map((_, groupIndex) => (
            <div key={groupIndex} css={formStyles.nestedFormField}>
              <div>
                <Controller
                  control={control}
                  name={`groups.${groupIndex}.group`}
                  render={({ field }) => (
                    <FormField
                      name={field.name}
                      label="Group"
                      inputProps={{
                        ...field,
                        placeholder: 'Enter group',
                        onChange: event => field.onChange(event.target.value),
                      }}
                      inputType="base"
                    />
                  )}
                />
              </div>
              <Button
                label="remove group"
                type="button"
                variant="secondary"
                onClick={() => removeGroup(groupIndex)}
                css={formStyles.removeButton}
              />
            </div>
          ))}
          <Button label="Add group" type="button" variant="secondary" onClick={() => appendGroup({ group: '' })} />
          {teachersFields.map((_, teacherIndex) => (
            <div key={teacherIndex} css={formStyles.nestedFormField}>
              <div>
                <Controller
                  control={control}
                  name={`teachers.${teacherIndex}.teacher`}
                  render={({ field }) => (
                    <FormField
                      name={field.name}
                      label="Teacher"
                      inputProps={{
                        ...field,
                        placeholder: 'Enter teacher',
                        onChange: event => field.onChange(event.target.value),
                      }}
                      inputType="base"
                    />
                  )}
                />
              </div>
              <Button
                label="remove teacher"
                type="button"
                variant="secondary"
                onClick={() => removeTeacher(teacherIndex)}
                css={formStyles.removeButton}
              />
            </div>
          ))}
          <Button
            label="Add teacher"
            type="button"
            variant="secondary"
            onClick={() => appendTeacher({ teacher: '' })}
          />
          {infoFields.map((_, infoIndex) => (
            <div key={infoIndex} css={formStyles.nestedFormField}>
              <div>
                <Controller
                  control={control}
                  name={`info.${infoIndex}.info`}
                  render={({ field }) => (
                    <FormField
                      name={field.name}
                      label="Info"
                      inputProps={{
                        ...field,
                        placeholder: 'Enter info',
                        onChange: event => field.onChange(event.target.value),
                      }}
                      inputType="base"
                    />
                  )}
                />
              </div>
              <Button
                label="remove info"
                type="button"
                variant="secondary"
                onClick={() => removeInfo(infoIndex)}
                css={formStyles.removeButton}
              />
            </div>
          ))}
          <Button label="Add info" type="button" variant="secondary" onClick={() => appendInfo({ info: '' })} />
        </fieldset>

        <Button label="Submit" type="submit" onClick={() => handleSubmit(onSubmit)} />
      </form>
    </section>
  );
};

export default LessonsForm;
