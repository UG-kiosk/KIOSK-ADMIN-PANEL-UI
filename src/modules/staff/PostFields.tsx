/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, Controller } from 'react-hook-form';
import FacultyFields from './FacultyFields';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';

const PostFields = ({ control }: any) => {
  const {
    fields: postFields,
    append: appendPost,
    remove: removePost,
  } = useFieldArray({
    control,
    name: 'posts',
  });

  return (
    <>
      {postFields.map((post, postIndex) => (
        <div key={post.id} style={{ marginBottom: '20px' }}>
          <Controller
            control={control}
            name={`posts.${postIndex}.position`}
            render={({ field }) => (
              <FormField
                name={field.name}
                label="Position"
                inputProps={{
                  ...field,
                  placeholder: 'Position',
                  onChange: event => field.onChange(event.target.value),
                }}
                inputType="base"
              />
            )}
          />
          <div style={{ marginLeft: '20px' }}>
            <FacultyFields control={control} postIndex={postIndex} />
          </div>
          <Button label="Remove Post" type="button" onClick={() => removePost(postIndex)} />
        </div>
      ))}
      <Button
        label="Add Post with Faculty"
        type="button"
        onClick={() => appendPost({ position: '', faculty: [{ name: '' }] })}
      />
    </>
  );
};

export default PostFields;
