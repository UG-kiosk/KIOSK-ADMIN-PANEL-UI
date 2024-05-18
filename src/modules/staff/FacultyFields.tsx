import { useFieldArray, Control, Controller } from 'react-hook-form';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import { formStyles } from '../../styles/formStyles';
import { FormValues } from './hooks/useStaffForm';

type FacultyFieldsProps = {
  control: Control<FormValues>;
  postIndex: number;
};

const FacultyFields = ({ control, postIndex }: FacultyFieldsProps) => {
  const {
    fields: facultyFields,
    append: appendFaculty,
    remove: removeFaculty,
  } = useFieldArray({
    control,
    name: `posts.${postIndex}.faculty`,
  });

  return (
    <fieldset>
      {facultyFields.map((faculty, facultyIndex) => (
        <div css={formStyles.nestedFormFieldDepth2} key={faculty.id}>
          <Controller
            control={control}
            name={`posts.${postIndex}.faculty.${facultyIndex}.name`}
            render={({ field, fieldState: { error } }) => (
              <FormField
                name={field.name}
                label="Faculty Name"
                inputProps={{
                  ...field,
                  placeholder: 'Faculty Name',
                  onChange: event => field.onChange(event.target.value),
                }}
                isRequired={true}
                errorMessage={error?.message}
                ref={field.ref}
                inputType="base"
              />
            )}
          />
          <Button
            label="remove faculty"
            type="button"
            variant="secondary"
            disabled={facultyFields.length <= 1}
            css={formStyles.removeButtonDepth2}
            onClick={() => removeFaculty(facultyIndex)}
          />
        </div>
      ))}
      <Button
        label="add faculty"
        type="button"
        variant="secondary"
        css={formStyles.addButton}
        onClick={() => appendFaculty({ name: '' })}
      />
    </fieldset>
  );
};

export default FacultyFields;
