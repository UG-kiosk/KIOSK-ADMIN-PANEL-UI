import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../../shared/types/FormField';
import { useEventCall } from './useEventCall';
import { Event, EventRequest } from '../../types/events';

const eventSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  content: z.string().min(1, 'Content cannot be empty'),
  date: z.date(),
  url: z.string().url(),
});

type EventSchema = z.infer<typeof eventSchema>;

type FieldName = keyof EventSchema;

const formFields: FormField<FieldName>[] = [
  {
    name: 'name',
    label: 'Name',
    isRequired: true,
    placeholder: 'Enter event name',
    type: 'text',
  },
  {
    name: 'content',
    label: 'Content',
    isRequired: true,
    placeholder: 'Enter event content',
    type: 'text',
  },
  {
    name: 'date',
    label: 'Date',
    isRequired: true,
    placeholder: 'Enter event date',
    type: 'date',
  },
  {
    name: 'url',
    label: 'URL',
    isRequired: true,
    placeholder: 'Enter event URL',
    type: 'text',
  },
];

const defaultEventValues: EventSchema = {
  name: '',
  content: '',
  date: new Date(),
  url: '',
};

export const useEventForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultEventValues,
    resolver: zodResolver(eventSchema),
    mode: 'onBlur',
  });
  const { addEventMutation } = useEventCall();
  const onSubmit = (data: EventSchema) => {
    const { name, content, date, url } = data;
    const event: EventRequest = {
      eventsDetails: {
        name,
        content,
      },
      date,
      url,
    };
    addEventMutation(event);
  };
  return { control, formFields, handleSubmit, onSubmit, errors };
};
