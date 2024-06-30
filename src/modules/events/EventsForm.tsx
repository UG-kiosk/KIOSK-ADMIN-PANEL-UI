import { useEventForm } from './hooks/useEventForm';
import { Controller } from 'react-hook-form';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { formStyles } from '../../styles/formStyles';
import { useParams } from 'react-router-dom';

const EventsForm = () => {
  const { id } = useParams<{ id?: string }>();
  const { control, formFields, handleSubmit, onSubmit } = useEventForm(id || '');

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
                name === 'content' ? (
                  <div style={{ maxWidth: 800 }}>
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        field.onChange(data);
                      }}
                      data={field.value}
                      config={{
                        placeholder: 'Event content',
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
          {/* {urlFields.map((_, urlIndex) => (
            <div key={urlIndex} css={formStyles.nestedFormField}>
              <div>
                <Controller
                  control={control}
                  name={`url.${urlIndex}`}
                  render={({ field }) => (
                    <FormField
                      name={field.name}
                      label="URL"
                      inputProps={{
                        ...field,
                        placeholder: 'Enter event URL',
                        onChange: event => field.onChange(event.target.value),
                      }}
                      inputType="base"
                    />
                  )}
                />
              </div>
              <Button
                label="Remove URL"
                type="button"
                variant="secondary"
                onClick={() => remove(urlIndex)}
                css={formStyles.removeButton}
              />
            </div>
          ))}
          <Button label="Add another URL" type="button" variant="secondary" onClick={() => append({ url: '' })} /> */}
          <Button label="Submit" type="submit" onClick={() => handleSubmit(onSubmit)} />
        </fieldset>
      </form>
    </section>
  );
};

export default EventsForm;
