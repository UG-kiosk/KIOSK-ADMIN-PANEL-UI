import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../shared/types/FormField';
import { useForm } from 'react-hook-form';
import { useStaffCall } from '../api/hooks/useStaffCall';
import { useEffect } from 'react';
import useStaffMemberPage from '../api/hooks/useStaffMemberPage';

const academicSchema = z.object({
  name: z.string().trim().min(6, 'Name must be at least 6 characters long').max(50, 'Name is too long'),
  link: z
    .string()
    .url()
    .min(1, 'Link cannot be empty')
    .max(100, 'Link is too long')
    .regex(/mfi\.ug\.edu\.pl/, 'Link must contain mfi.ug.edu.pl'),
  email: z
    .string()
    // .email()
    .min(1, 'Email cannot be empty')
    .max(50, 'Email is too long')
    .regex(/@(.+\.)?ug\.edu\.pl$/, 'Email must contain domain ug.edu.pl'),
  tutorial: z.string(),
  posts: z.array(
    z.object({
      position: z
        .string()
        .trim()
        .min(3, 'Position  must be at least 5 characters long')
        .max(50, 'Position name is too long'),
      faculty: z.array(
        z.object({
          name: z
            .string()
            .trim()
            .min(5, 'Faculty must be at least 5 characters long')
            .max(50, 'Faculty name is too long'),
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
  posts: [{ position: '', faculty: [{ name: '' }] }],
};

export type FormValues = {
  link: string;
  name: string;
  email: string;
  tutorial: string;
  posts: { position: string; faculty: { name: string }[] }[];
};

export const useStaffForm = (id?: string) => {
  const { addStaffMutation, updateStaffMemberMutation } = useStaffCall();
  const { staffMemberData } = useStaffMemberPage(id ?? '');

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormValues>({
    defaultValues: defaultAcademicValues,
    resolver: zodResolver(academicSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (id) {
      if (staffMemberData) {
        const data = {
          name: staffMemberData.name ?? '',
          email: staffMemberData.email ?? '',
          link: staffMemberData.link ?? '',
          tutorial: staffMemberData.content!.tutorial ?? '',
          posts: staffMemberData.content!.posts.map(post => ({
            position: post.position,
            faculty: post.faculty.map(facultyName => ({ name: facultyName })),
          })),
        };
        reset(data);
      }
    }
  }, [id, staffMemberData, reset]);

  const onSubmit = (data: academicSchema) => {
    const { name, email, link, tutorial, posts } = data;

    const mappedPosts = posts.map(({ position, faculty }) => ({
      position,
      faculty: faculty.map(({ name }) => name),
    }));

    const dto = {
      name,
      email,
      link,
      content: {
        tutorial,
        posts: mappedPosts,
      },
    };

    if (id) {
      updateStaffMemberMutation({ id, academic: dto });
      return;
    }
    addStaffMutation(dto);
  };

  return { control, formFields, handleSubmit, onSubmit, errors, getValues };
};
