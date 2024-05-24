import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../../shared/types/FormField';
import { useForm } from 'react-hook-form';
import { useRegisterCall } from '../useRegisterCall';

const registerSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, 'Email cannot be empty')
    .max(50, 'Email is too long')
    .regex(/ug\.edu\.pl$/, 'Email must contain ug.edu.pl domain')
    .trim(),
  username: z.string().min(3, 'Username must be at least 3 characters long').max(50, 'Username is too long').trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(256, 'Password is too long')
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    )
    .trim(),
});

type registerSchema = z.infer<typeof registerSchema>;

type FieldName = keyof registerSchema;

const formFields: FormField<FieldName>[] = [
  {
    name: 'email',
    label: 'Email',
    isRequired: true,
    placeholder: 'Enter email',
    type: 'text',
  },
  {
    name: 'username',
    label: 'Username',
    isRequired: true,
    placeholder: 'Enter username',
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

const defaultRegisterValues: registerSchema = {
  email: '',
  username: '',
  password: '',
};

export type FormValues = {
  email: string;
  username: string;
  password: string;
};

export const useRegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: defaultRegisterValues,
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });
  const { registerMutation } = useRegisterCall();
  const onSubmit = (data: registerSchema) => {
    const { email, username, password } = data;
    registerMutation({ email, username, password });
  };

  return { control, formFields, handleSubmit, onSubmit, errors, getValues };
};
