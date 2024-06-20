import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { EventRequest, EventResponse, EventResponseDTO } from '../types/events';

export const addEventCall = async (body: EventRequest): Promise<EventRequest> => {
  const addEventUrl = new URL('http://localhost:5202/events');

  const response = await fetch(addEventUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[addEventUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const getEventCall = async (language: string, page: string): Promise<EventResponse> => {
  const params = new URLSearchParams({
    language,
    page,
  });
  const getEventsUrl = new URL(`http://localhost:5202/kiosk-api/events?${params.toString()}`);

  const response = await fetch(getEventsUrl, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[getEventsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const getEventDetailsCall = async (id: string): Promise<EventResponseDTO> => {
  const language = 'PL';
  const getEventDetailsUrl = new URL('http://localhost:5202/kiosk-api/events/' + id + '?language=' + language);

  const response = await fetch(getEventDetailsUrl, {
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[getEventDetailsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const updateEventCall = async (id: string, body: EventRequest): Promise<EventResponseDTO> => {
  const updateEventUrl = new URL('http://localhost:5202/events/' + id);

  const response = await fetch(updateEventUrl, {
    method: HTTP_METHOD.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[updateEventUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};

export const deleteEventCall = async (id: string): Promise<void> => {
  const deleteEventUrl = new URL('http://localhost:5202/events/' + id);

  const response = await fetch(deleteEventUrl, {
    method: HTTP_METHOD.DELETE,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`[deleteEventUrl]: ${response.status}. ${response.statusText}.`);
  }
};
