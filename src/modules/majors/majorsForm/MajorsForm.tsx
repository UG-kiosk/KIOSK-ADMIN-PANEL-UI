import { Controller } from 'react-hook-form';
import FormField from '../../../components/FormField/FormField';
import { useMajorsForm } from './hooks/useMajorsForm';
import Button from '../../../components/Button/Button';
import { formStyles } from '../../../styles/formStyles';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useParams } from 'react-router-dom';

export const MajorsForm = () => {
  const { id } = useParams<{ id?: string }>();
  const { control, formFields, handleSubmit, onSubmit } = useMajorsForm(id || '');

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
                        placeholder: 'Major description content',
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
                      type: type,
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => field.onChange(event.target.value),
                      value: field.value as string, // Add this line to ensure the value is of type string
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
          <Button label="Submit" type="submit" />
        </fieldset>
      </form>
    </section>
  );
};
