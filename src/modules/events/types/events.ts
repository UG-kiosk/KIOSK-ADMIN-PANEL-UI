import { IPagination } from '../../../shared/types/Pagination';

export interface Event {
  name: string;
  content: string;
  date: string;
  url: string;
}

export interface EventRequest {
  eventDetails: {
    name: string;
    content: string;
  };
  date: string;
  url: string;
}

export interface EventResponseDTO {
  _id: string;
  name: string;
  content: string;
  date: Date;
  url: string;
  language: string;
}

export interface EventResponse {
  content: EventResponseDTO[];
  pagination: IPagination;
}
