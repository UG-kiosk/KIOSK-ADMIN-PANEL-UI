/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, Control, Controller } from 'react-hook-form';
import FacultyFields from './FacultyFields';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import { formStyles } from '../../styles/formStyles';
import { FormValues } from './hooks/useStaffForm';

type PostFieldsProps = {
  control: Control<FormValues>;
};

const PostFields = ({ control }: PostFieldsProps) => {
  const {
    fields: postFields,
    append: appendPost,
    remove: removePost,
  } = useFieldArray({
    control,
    name: 'posts',
  });

  return (
    <fieldset>
      {postFields.map((post, postIndex) => (
        <div css={formStyles.nestedFormField} key={post.id}>
          <Controller
            control={control}
            name={`posts.${postIndex}.position`}
            render={({ field, fieldState: { error } }) => (
              <FormField
                name={field.name}
                label="Position"
                inputProps={{
                  ...field,
                  placeholder: 'Position',
                  onChange: event => field.onChange(event.target.value),
                }}
                isRequired={true}
                errorMessage={error?.message}
                ref={field.ref}
                inputType="base"
              />
            )}
          />

          <div>
            <FacultyFields control={control} postIndex={postIndex} />
          </div>
          <Button
            label="remove post"
            type="button"
            variant="secondary"
            disabled={postFields.length <= 1}
            css={formStyles.removeButton}
            onClick={() => removePost(postIndex)}
          />
        </div>
      ))}
      <Button
        label="add post"
        type="button"
        variant="secondary"
        css={formStyles.addButton}
        onClick={() => appendPost({ position: '', faculty: [{ name: '' }] })}
      />
    </fieldset>
  );
};

export default PostFields;
