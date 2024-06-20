import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../../../shared/types/FormField';
import { useEventCall } from './useEventCall';
import { EventRequest } from '../types/events';
import useEventDetails from './useEventDetails';
import { useEffect } from 'react';

const eventSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  content: z.string().min(1, 'Content cannot be empty'),
  date: z.string(),
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
  date: '',
  url: '',
};

export const useEventForm = (id?: string) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultEventValues,
    mode: 'onBlur',
  });

  const { addEventMutation, updateEventMutation } = useEventCall();
  const { eventDetailsData } = useEventDetails(id ?? '');

  useEffect(() => {
    if (id) {
      if (eventDetailsData) {
        const data = {
          name: eventDetailsData.name ?? '',
          content: eventDetailsData.content ?? '',
          date: eventDetailsData.date.toString(),
          url: eventDetailsData.url ?? '',
        };
        reset(data);
      }
    }
  }, [id, eventDetailsData, reset]);

  const onSubmit = (data: EventSchema) => {
    const { name, content, date, url } = data;
    const eventData: EventRequest = {
      eventDetails: {
        name,
        content,
      },
      date,
      url,
    };
    if (id) {
      updateEventMutation({ id, event: eventData });
    } else {
      addEventMutation(eventData);
    }
  };
  return { control, handleSubmit, errors, formFields, onSubmit };
};
