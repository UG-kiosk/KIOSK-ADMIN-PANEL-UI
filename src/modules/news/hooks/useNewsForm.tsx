import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../shared/types/FormField';
import { useNewsCall } from './useNewsCall';
import { NewsCategory, NewsRequest, NewsSource } from '../types/news';

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
  link: z
    .string()
    .url()
    .refine(
      value => {
        return value.includes('mfi.ug.edu.pl') || value.includes('inf.ug.edu.pl');
      },
      {
        message: 'Link must contain either "mfi.ug.edu.pl" or "inf.ug.edu.pl"',
      },
    )
    .or(z.literal('')),
  source: z.enum([NewsSource.INF, NewsSource.MFI]),
  category: z.enum([NewsCategory.ARCHIVE, NewsCategory.NEWS, NewsCategory.STUDENTS]),
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
    type: 'string',
  },
  {
    name: 'category',
    label: 'Category',
    isRequired: true,
    placeholder: 'Enter news category',
    type: 'string',
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
  source: NewsSource.INF,
  category: NewsCategory.NEWS,
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
  const { addNewsMutation } = useNewsCall();
  const onSubmit = (data: newsSchema) => {
    const { title, shortBody, body, leadingPhoto, photos, link, source, category } = data;
    const photosArray = photos.map(photo => photo.photo);
    const shortBodyEllipsis = shortBody + '...';
    const datetime = new Date();
    const newsData: NewsRequest = {
      leadingPhoto,
      photos: photosArray,
      link,
      newsDetails: {
        title,
        shortBody: shortBodyEllipsis,
        body,
      },
      source,
      category,
      datetime,
      sourceLanguage: 'Pl',
    };
    addNewsMutation(newsData);
  };
  return { control, formFields, handleSubmit, onSubmit, errors };
};
