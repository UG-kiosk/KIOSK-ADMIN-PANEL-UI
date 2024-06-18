import { Controller } from 'react-hook-form';
import FormField from '../../../components/FormField/FormField';
import { useEventForm } from './hooks/useEventForm'; // Zmieniamy import na funkcję obsługującą zdarzenia
import Button from '../../../components/Button/Button';
import { formStyles } from '../../../styles/formStyles';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

export const EventsForm = () => {
  const { control, formFields, handleSubmit, onSubmit } = useEventForm(); // Zmieniamy hook formularza na obsługujący zdarzenia

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
                        placeholder: 'Event description content',
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
                      value: field.value as string, // Dodajemy tę linię, aby upewnić się, że wartość jest typu string
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
