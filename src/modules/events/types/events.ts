export interface Event {
  name: string;
  content: string;
  date: Date;
  url: string;
}

export interface EventRequest {
  eventsDetails: {
    name: string;
    content: string;
  };
  date: Date;
  url: string;
}
