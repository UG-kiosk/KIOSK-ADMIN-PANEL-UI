import { Control, Controller, useFieldArray } from 'react-hook-form';
import Button from '../../../../components/Button/Button';
import FormField from '../../../../components/FormField/FormField';
import { formStyles } from '../../../../styles/formStyles';
import { ectsSchema } from '../hooks/useEctsForm';

type RecruitmentYearFieldProps = {
  control: Control<ectsSchema>;
};

const RecruitmentYearsFields = ({ control }: RecruitmentYearFieldProps) => {
  const {
    fields: yearFields,
    append: appendYear,
    remove: removeYear,
  } = useFieldArray({
    control,
    name: 'recruitmentYear',
  });

  return (
    <fieldset>
      {yearFields.map((_, yearIndex) => (
        <div css={formStyles.nestedFormFieldDepth2} key={yearIndex}>
          <Controller
            control={control}
            name={`recruitmentYear.${yearIndex}.year`}
            render={({ field, fieldState: { error } }) => (
              <FormField
                name={field.name}
                label="Recruitment Year"
                inputProps={{
                  ...field,
                  placeholder: 'Year',
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
            label="remove Year"
            type="button"
            variant="secondary"
            disabled={yearFields.length <= 1}
            css={formStyles.removeButtonDepth2}
            onClick={() => removeYear(yearIndex)}
          />
        </div>
      ))}
      <Button
        label="add Year"
        type="button"
        variant="secondary"
        css={formStyles.addButton}
        onClick={() => appendYear({ year: 0 })}
      />
    </fieldset>
  );
};

export default RecruitmentYearsFields;
