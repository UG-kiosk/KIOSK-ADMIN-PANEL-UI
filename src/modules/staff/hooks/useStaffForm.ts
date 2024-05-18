import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../shared/types/FormField';
import { useForm } from 'react-hook-form';
// import { useStaffCall } from './useStaffCall';

const academicSchema = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty'),
  link: z
    .string()
    .url()
    .min(1, 'Link cannot be empty')
    .regex(/mfi\.ug\.edu\.pl/, 'Link must contain mfi.ug.edu.pl'),
  email: z
    .string()
    .email()
    .min(1, 'Email cannot be empty')
    .regex(/@ug\.edu\.pl$/, 'Email must contain @ug.edu.pl'),
  tutorial: z.string(),
  posts: z.array(
    z.object({
      position: z.string().min(1, 'Position cannot be empty'),
      faculty: z.array(
        z.object({
          name: z.string().min(1, 'Faculty cannot be empty'),
        }),
      ),
    }),
  ),
});

type academicSchema = z.infer<typeof academicSchema>;

type FieldName = keyof academicSchema;

const formFields: FormField<FieldName>[] = [
  {
    name: 'name',
    label: 'Name',
    isRequired: true,
    placeholder: 'Enter name',
    type: 'text',
  },
  {
    name: 'link',
    label: 'Link',
    isRequired: true,
    placeholder: 'Enter link',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    isRequired: true,
    placeholder: 'Enter email',
    type: 'text',
  },
  {
    name: 'tutorial',
    label: 'Tutorial',
    isRequired: false,
    placeholder: 'Enter tutorial',
    type: 'text',
  },
  {
    name: 'posts',
    label: 'Posts',
    isRequired: true,
    placeholder: 'Enter posts',
    type: 'array',
  },
];

const defaultAcademicValues: academicSchema = {
  name: '',
  link: '',
  email: '',
  tutorial: '',
  posts: [],
};

export const useStaffForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: defaultAcademicValues,
    resolver: zodResolver(academicSchema),
    mode: 'onBlur',
  });
  //   const { addStaffMutation } = useStaffCall();
  const onSubmit = (data: academicSchema) => {
    // addStaffMutation(data);
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return { control, formFields, handleSubmit, onSubmit, errors, getValues };
};
