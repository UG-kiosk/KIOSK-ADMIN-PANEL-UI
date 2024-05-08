import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../../shared/types/FormField';
import { useEctsCall } from '../api/useEctsCall';

const ectsSchema = z.object({
  subject: z.string().trim().min(1, 'Subject cannot be empty'),
  major: z.string().min(1, 'Major cannot be empty'),
  lectureHours: z.coerce.number().nonnegative(),
  recitationHours: z.coerce.number().nonnegative(),
  labsHours: z.coerce.number().nonnegative(),
  // add regex
  pass: z.string(),
  ects: z.coerce.number().nonnegative(),
  degree: z.string(),
  term: z.coerce.number().min(1).max(6, 'Term should be between 1 and 6'),
  year: z.coerce.string(),
  recruitmentYear: z.number(),
});

type ectsSchema = z.infer<typeof ectsSchema>;

type FieldName = keyof ectsSchema;

const formFields: FormField<FieldName>[] = [
  {
    name: 'subject',
    label: 'Subject',
    isRequired: true,
    placeholder: 'Enter Subject name',
    type: 'text',
  },
  {
    name: 'major',
    label: 'Major',
    isRequired: true,
    placeholder: 'Enter Major Name',
    type: 'text',
  },
  {
    name: 'lectureHours',
    label: 'Lecture hours',
    isRequired: true,
    placeholder: 'Enter Lecture hours',
    type: 'number',
  },
  {
    name: 'labsHours',
    label: 'Labs hours',
    isRequired: true,
    placeholder: 'Enter Labs hours',
    type: 'number',
  },
  {
    name: 'recitationHours',
    label: 'Recication hours',
    isRequired: true,
    placeholder: 'Enter Recication hours',
    type: 'number',
  },
  {
    name: 'pass',
    label: 'Examination form',
    isRequired: true,
    placeholder: 'Enter the form of examination',
    type: 'text',
  },
  {
    name: 'ects',
    label: 'Ects',
    isRequired: true,
    placeholder: 'Enter Ects value',
    type: 'number',
  },
  {
    name: 'degree',
    label: 'Degree',
    isRequired: true,
    placeholder: 'Enter degree',
    type: 'text',
  },
  {
    name: 'term',
    label: 'Term',
    isRequired: true,
    placeholder: 'Enter Term',
    type: 'number',
  },
  {
    name: 'year',
    label: 'Year',
    isRequired: true,
    placeholder: 'Enter Year',
    type: 'string',
  },
  {
    name: 'recruitmentYear',
    label: 'Recruitment Year',
    isRequired: true,
    placeholder: 'Enter recruitment year',
    type: 'text',
  },
];

const defaultEctsValues: ectsSchema = {
  subject: '',
  lectureHours: 0,
  recitationHours: 0,
  labsHours: 0,
  pass: '',
  ects: 0,
  major: '',
  degree: 'Bachelor',
  year: 'I',
  recruitmentYear: 2024,
  term: 1,
};

export const useEctsForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultEctsValues,
    resolver: zodResolver(ectsSchema),
    mode: 'onBlur',
  });
  const { addEctsSubjectMutation } = useEctsCall();
  const onSubmit = (data: ectsSchema) => {
    // After talk with Justyna we gonna change this pattern

    const ectsSubject = { ...data, recruitmentYear: [data.recruitmentYear] };
    addEctsSubjectMutation(ectsSubject);
  };

  return { control, formFields, handleSubmit, onSubmit, errors };
};
