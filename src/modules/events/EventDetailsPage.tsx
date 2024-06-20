import { useParams } from 'react-router-dom';
import EventDetails from './EventDetails';

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return <EventDetails id={id} />;
  }
};

export default EventDetailsPage;
