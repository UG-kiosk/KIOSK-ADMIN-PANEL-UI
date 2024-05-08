import { HTMLInputTypeAttribute } from 'react';

export type FormField<T> = {
  name: T;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};
