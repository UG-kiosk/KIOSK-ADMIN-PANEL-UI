import { useNewsForm } from './hooks/useNewsForm';
import { Controller, useFieldArray } from 'react-hook-form';
import FormField from '../../../components/FormField/FormField';
import Button from '../../../components/Button/Button';
import { createStyles } from '../../../theme/utils';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { NewsSource, NewsCategory } from './types/news';
import { Typography } from '../../../components/Typography/Typography';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const NewsForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useNewsForm();
  const {
    fields: photosFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'photos',
  });

  return (
    <section css={newsFormStyles.section}>
      <form css={newsFormStyles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <fieldset css={newsFormStyles.formFields}>
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
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      field.onChange(data);
                    }}
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
                    onReady={editor => {
                      editor.ui.view.editable.element!.style.minHeight = '250px';
                    }}
                  />
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
            <div key={photoIndex} css={newsFormStyles.photosForm}>
              <div css={newsFormStyles.photosForm.input}>
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
                css={newsFormStyles.photosForm.button}
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

const newsFormStyles = createStyles({
  photosForm: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    button: {
      height: 10,
      marginTop: 25,
    },
    input: {
      width: '90%',
    },
  },
  section: {
    width: '100%',
  },
  formContainer: {
    margin: 'auto',
    maxWidth: 700,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 40,
    marginBottom: 40,
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
