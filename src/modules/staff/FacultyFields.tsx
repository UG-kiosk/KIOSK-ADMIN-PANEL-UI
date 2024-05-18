import { useFieldArray, Control, FieldValues, Controller } from 'react-hook-form';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';

type FacultyFieldsProps = {
  control: Control<FieldValues>;
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
    <>
      {facultyFields.map((faculty, facultyIndex) => (
        <div key={faculty.id} style={{ marginBottom: '10px' }}>
          <Controller
            control={control}
            name={`posts.${postIndex}.faculty.${facultyIndex}.name`}
            render={({ field }) => (
              <FormField
                name={field.name}
                label="Faculty Name"
                inputProps={{
                  ...field,
                  placeholder: 'Faculty Name',
                  onChange: event => field.onChange(event.target.value),
                }}
                inputType="base"
              />
            )}
          />
          <Button label="remove faculty" type="button" onClick={() => removeFaculty(facultyIndex)} />
        </div>
      ))}
      <Button label="add faculty" type="button" onClick={() => appendFaculty({ name: '' })} />
    </>
  );
};

export default FacultyFields;
