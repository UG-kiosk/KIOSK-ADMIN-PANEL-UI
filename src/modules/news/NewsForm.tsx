import { useNewsForm } from './hooks/useNewsForm';
import { Controller, useFieldArray } from 'react-hook-form';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';
import { NewsSource, NewsCategory } from './types/news';
import { Typography } from '../../components/Typography/Typography';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { formStyles } from '../../styles/formStyles';
import { useParams } from 'react-router-dom';

const NewsForm = () => {
  const { id } = useParams<{ id?: string }>();
  const { control, formFields, handleSubmit, onSubmit } = useNewsForm(id);
  const {
    fields: photosFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'photos',
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
                name === 'source' || name === 'category' ? (
                  <Dropdown
                    defaultValue={name === 'source' ? NewsSource.INF : NewsCategory.NEWS}
                    onValueChange={event => field.onChange(event)}
                  >
                    <Dropdown.Trigger>
                      <Dropdown.Value />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      {Object.values(name === 'source' ? NewsSource : NewsCategory).map(value => (
                        <Dropdown.Item value={value} key={value}>
                          <Typography>{value}</Typography>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Content>
                  </Dropdown>
                ) : name === 'body' ? (
                  <div style={{ maxWidth: 800 }}>
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        field.onChange(data);
                      }}
                      data={field.value}
                      config={{
                        placeholder: 'News body',
                        toolbar: [
                          'heading',
                          'bold',
                          'italic',
                          'bulletedList',
                          'numberedList',
                          'blockQuote',
                          'insertTable',
                          'undo',
                          'redo',
                        ],
                      }}
                    />
                  </div>
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
          {photosFields.map((_, photoIndex) => (
            <div key={photoIndex} css={formStyles.nestedFormField}>
              <div>
                <Controller
                  control={control}
                  name={`photos.${photoIndex}.photo`}
                  render={({ field }) => (
                    <FormField
                      name={field.name}
                      label="Photos"
                      inputProps={{
                        ...field,
                        placeholder: 'Enter additional news photos url',
                        onChange: event => field.onChange(event.target.value),
                      }}
                      inputType="base"
                    />
                  )}
                />
              </div>
              <Button
                label="remove photo"
                type="button"
                variant="secondary"
                onClick={() => remove(photoIndex)}
                css={formStyles.removeButton}
              />
            </div>
          ))}
          <Button label="Add another photo" type="button" variant="secondary" onClick={() => append({ photo: '' })} />
        </fieldset>

        <Button label="Submit" type="submit" onClick={() => handleSubmit(onSubmit)} />
      </form>
    </section>
  );
};

export default NewsForm;
