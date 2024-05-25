import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../../shared/types/FormField';
import { useForm } from 'react-hook-form';
import { useLoginCall } from '../useLoginCall';

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, 'Email cannot be empty')
    .max(50, 'Email is too long')
    .regex(/ug\.edu\.pl$/, 'Email must contain ug.edu.pl domain'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(256, 'Password is too long')
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    ),
});

type loginSchema = z.infer<typeof loginSchema>;

type FieldName = keyof loginSchema;

const formFields: FormField<FieldName>[] = [
  {
    name: 'email',
    label: 'Email',
    isRequired: true,
    placeholder: 'Enter name',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Password',
    isRequired: true,
    placeholder: 'Enter password',
    type: 'password',
  },
];

const defaultLoginValues: loginSchema = {
  email: '',
  password: '',
};

export type FormValues = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: defaultLoginValues,
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });
  const { loginMutation } = useLoginCall();
  const onSubmit = (data: loginSchema) => {
    const { email, password } = data;
    loginMutation({ email, password });
  };

  return { control, formFields, handleSubmit, onSubmit, errors, getValues };
};
