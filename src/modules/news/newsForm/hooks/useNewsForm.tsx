import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../../shared/types/FormField';

const newsSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty'),
  shortBody: z.string().min(1, 'Short body cannot be empty'),
  body: z.string().min(1, 'Body cannot be empty'),
  leadingPhoto: z.string().min(1, 'Leading photo cannot be empty'),
  photos: z.array(
    z.object({
      photo: z.string().url(),
    }),
  ),
  link: z.string().url().or(z.literal('')),
  source: z.string(),
  category: z.string(),
});

type newsSchema = z.infer<typeof newsSchema>;

type FieldName = keyof newsSchema;
type ExcludedPhotos = Exclude<FieldName, 'photos'>;

const formFields: FormField<ExcludedPhotos>[] = [
  {
    name: 'title',
    label: 'Title',
    isRequired: true,
    placeholder: 'Enter news title',
    type: 'text',
  },
  {
    name: 'shortBody',
    label: 'Short body',
    isRequired: true,
    placeholder: 'Enter news shortBody',
    type: 'text',
  },
  {
    name: 'body',
    label: 'Body',
    isRequired: true,
    placeholder: 'Enter news body',
    type: 'text',
  },
  {
    name: 'link',
    label: 'Link',
    isRequired: false,
    placeholder: 'Enter news link',
    type: 'text',
  },
  {
    name: 'source',
    label: 'Source',
    isRequired: true,
    placeholder: 'Enter news source',
    type: 'text',
  },
  {
    name: 'category',
    label: 'Category',
    isRequired: true,
    placeholder: 'Enter news category',
    type: 'text',
  },
  {
    name: 'leadingPhoto',
    label: 'Leading photo',
    isRequired: true,
    placeholder: 'Enter news leading photo url',
    type: 'text',
  },
];

const defaultNewsValues: newsSchema = {
  title: '',
  shortBody: '',
  body: '',
  leadingPhoto: '',
  photos: [],
  link: '',
  source: 'MFI',
  category: 'NEWS',
};

export const useNewsForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultNewsValues,
    resolver: zodResolver(newsSchema),
    mode: 'onBlur',
  });
  const onSubmit = (data: newsSchema) => {
    //zrob cos
    console.log(data);
  };
  return { control, formFields, handleSubmit, onSubmit, errors };
};
