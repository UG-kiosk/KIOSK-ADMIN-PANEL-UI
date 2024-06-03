import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../../shared/types/FormField';
import { useForm } from 'react-hook-form';
import { useChangePasswordCall } from '../../api/hooks/useChangePasswordCall';

const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, 'Password must be at least 8 characters long').max(256, 'Password is too long'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(256, 'Password is too long')
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    ),
});

type changePasswordSchema = z.infer<typeof changePasswordSchema>;

type FieldName = keyof changePasswordSchema;

const formFields: FormField<FieldName>[] = [
  {
    name: 'oldPassword',
    label: 'Old password',
    isRequired: true,
    placeholder: 'Enter old password',
    type: 'password',
  },
  {
    name: 'newPassword',
    label: 'New password',
    isRequired: true,
    placeholder: 'Enter new password',
    type: 'password',
  },
];

const defaultChangePasswordValues: changePasswordSchema = {
  oldPassword: '',
  newPassword: '',
};

export type FormValues = {
  oldPassword: string;
  newPassword: string;
};

export const useChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: defaultChangePasswordValues,
    resolver: zodResolver(changePasswordSchema),
    mode: 'onBlur',
  });
  const { changePasswordMutation } = useChangePasswordCall();
  const onSubmit = (data: changePasswordSchema) => {
    const { oldPassword, newPassword } = data;
    changePasswordMutation({ oldPassword, newPassword });
  };

  return { control, formFields, handleSubmit, onSubmit, errors, getValues };
};
