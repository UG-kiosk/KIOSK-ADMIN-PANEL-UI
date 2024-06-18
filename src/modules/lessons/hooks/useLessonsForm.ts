import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../shared/types/FormField';
import { DaysOfWeek, LessonPlanRequest, LessonType } from '../types/lessons';
import { useLessonsCall } from './useLessonsCall';
import { useEffect } from 'react';
import useLessonsDetailsPage from './useLessonsDetails';

const lessonsSchema = z.object({
  name: z.string().min(1, 'Title cannot be empty'),
  year: z.coerce.number().min(1).max(3, 'Year should be between 1 and 3'),
  day: z.enum([DaysOfWeek.Monday, DaysOfWeek.Tuesday, DaysOfWeek.Wednesday, DaysOfWeek.Thursday, DaysOfWeek.Friday]),
  start: z.coerce.number().nonnegative(),
  duration: z.coerce.number().nonnegative(),
  groups: z.array(
    z.object({
      group: z.string().min(1, 'Groups cannot be empty'),
    }),
  ),
  teachers: z.array(
    z.object({
      teacher: z.string().min(1, 'Teachers cannot be empty'),
    }),
  ),
  class: z.string().min(1, 'Class cannot be empty'),
  subject: z.string().min(1, 'Subject cannot be empty'),
  type: z.enum([LessonType.wykład, LessonType.laboratorium, LessonType.seminarium, LessonType.ćwiczenia]),
  info: z.array(
    z.object({
      info: z.string(),
    }),
  ),
});

type lessonsSchema = z.infer<typeof lessonsSchema>;

type FieldName = keyof lessonsSchema;
type ExcludedFields = Exclude<FieldName, 'groups' | 'info' | 'teachers'>;

const formFields: FormField<ExcludedFields>[] = [
  {
    name: 'name',
    label: 'Name',
    isRequired: true,
    placeholder: 'Enter lesson name',
    type: 'text',
  },
  {
    name: 'year',
    label: 'Year',
    isRequired: true,
    placeholder: 'Enter lesson year',
    type: 'number',
  },
  {
    name: 'day',
    label: 'Day',
    isRequired: true,
    placeholder: 'Enter lesson day',
    type: 'text',
  },
  {
    name: 'start',
    label: 'Start',
    isRequired: true,
    placeholder: 'Enter lesson start hour',
    type: 'number',
  },
  {
    name: 'duration',
    label: 'Duration',
    isRequired: true,
    placeholder: 'Enter lesson duration',
    type: 'number',
  },
  {
    name: 'class',
    label: 'Class',
    isRequired: true,
    placeholder: 'Enter lesson class',
    type: 'text',
  },
  {
    name: 'subject',
    label: 'Subject',
    isRequired: true,
    placeholder: 'Enter lesson subject',
    type: 'text',
  },
  {
    name: 'type',
    label: 'Type',
    isRequired: true,
    placeholder: 'Enter lesson type',
    type: 'text',
  },
];

const defaultLessonsValues: lessonsSchema = {
  name: '',
  year: 0,
  day: DaysOfWeek.Monday,
  start: 0,
  duration: 0,
  groups: [],
  teachers: [],
  class: '',
  subject: '',
  type: LessonType.laboratorium,
  info: [],
};

export const useLessonsForm = (id?: string) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultLessonsValues,
    resolver: zodResolver(lessonsSchema),
    mode: 'onBlur',
  });
  const { addLessonsMutation, updateLessonsMutation } = useLessonsCall();
  const { lessonsDetailsData } = useLessonsDetailsPage(id ?? '');

  useEffect(() => {
    if (id) {
      if (lessonsDetailsData) {
        const data = {
          name: lessonsDetailsData.name ?? '',
          year: lessonsDetailsData.year ?? 0,
          day: lessonsDetailsData.day ?? DaysOfWeek.Monday,
          start: lessonsDetailsData.start ?? 0,
          duration: lessonsDetailsData.duration ?? 0,
          groups: lessonsDetailsData.groups.map(group => ({
            group: group,
          })),
          teachers: lessonsDetailsData.teachers.map(teacher => ({
            teacher: teacher,
          })),
          class: lessonsDetailsData.class ?? '',
          subject: lessonsDetailsData.subject ?? '',
          type: lessonsDetailsData.type ?? LessonType.laboratorium,
          info: lessonsDetailsData.info.map(info => ({
            info: info,
          })),
        };
        reset(data);
      }
    }
  }, [id, lessonsDetailsData, reset]);

  const onSubmit = (data: lessonsSchema) => {
    const { name, year, day, start, duration, groups, teachers, class: className, subject, type, info } = data;
    const groupArray = groups.map(group => group.group);
    const teachersArray = teachers.map(teacher => teacher.teacher);
    const infosArray = info.map(i => i.info);
    const lessonData: LessonPlanRequest = {
      name,
      year,
      day,
      start,
      duration,
      groups: groupArray,
      teachers: teachersArray,
      class: className,
      details: {
        subject,
        type,
        info: infosArray,
      },
      sourceLanguage: 'Pl',
    };
    if (id) {
      updateLessonsMutation({ id, lessons: lessonData });
      return;
    }
    addLessonsMutation(lessonData);
  };
  return { control, formFields, handleSubmit, onSubmit, errors };
};
