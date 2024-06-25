import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { z } from 'zod';
import { Degree } from '../../../../shared/constants/degree';
import { Language } from '../../../../shared/constants/language';
import { useMajorsCall } from '../../hooks/useMajorsCall';
import { CreateMajorRequestDto, MajorFormValues } from '../../types/major';
import { FormField } from '../../../../shared/types/FormField';
import { useMajorPage } from '../../hooks/useMajorPage';

const majorSchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters long'),
  content: z.string().trim().min(3, 'Content must be at least 3 characters long'),
  degree: z.enum([Degree.BACHELOR, Degree.MASTER]),
  language: z.enum([Language.PL, Language.EN]),
  url: z.string().optional(),
});

type majorSchema = z.infer<typeof majorSchema>;

type FieldName = keyof majorSchema;

const formFields: FormField<FieldName>[] = [
  {
    name: 'name',
    label: 'Name',
    isRequired: true,
    placeholder: 'Enter name',
    type: 'text',
  },
  {
    name: 'content',
    label: 'Content',
    isRequired: true,
    placeholder: 'Enter content',
    type: 'text',
  },
  {
    name: 'degree',
    label: 'Degree',
    isRequired: true,
    placeholder: 'Enter degree',
    type: 'text',
  },
  {
    name: 'language',
    label: 'Language',
    isRequired: true,
    placeholder: 'Enter language',
    type: 'text',
  },
  {
    name: 'url',
    label: 'Source url',
    isRequired: false,
    placeholder: 'Enter source url',
    type: 'text',
  },
];

const defaltMajorValues: majorSchema = {
  name: '',
  content: '',
  degree: Degree.BACHELOR,
  language: Language.PL,
  url: '',
};

export interface FormValues {
  name: string;
  content: string;
  degree: Degree;
  language: Language;
  url: string;
}

export const useMajorsForm = (id: string) => {
  const { updateMajorMutation, createMajorsMutation } = useMajorsCall();
  const { majorData } = useMajorPage(id ?? '');

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormValues>({
    defaultValues: defaltMajorValues,
    resolver: zodResolver(majorSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (id && majorData) {
      const data = {
        name: majorData.name ?? '',
        content: majorData.content ?? '',
        degree: majorData.degree ?? '',
        url: majorData.url ?? '',
      };
      reset(data);
    }
  }, [id, majorData, reset]);

  const onSubmit = useCallback(
    (data: MajorFormValues) => {
      const { degree, url, language, name, content } = data;

      const majorDto: CreateMajorRequestDto = {
        degree,
        sourceLanguage: language,
        url,
        majorDetails: {
          name,
          content,
        },
      };

      if (id) {
        updateMajorMutation({ id, major: majorDto });
        return;
      }

      createMajorsMutation([majorDto]);
    },
    [createMajorsMutation, id, updateMajorMutation],
  );

  return { control, formFields, handleSubmit, onSubmit, errors, getValues };
};
