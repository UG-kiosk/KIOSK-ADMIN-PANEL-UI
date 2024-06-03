import { useParams } from 'react-router-dom';
import NewsDetails from './NewsDetails';

export const NewsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return <NewsDetails id={id} />;
  }
};

export default NewsDetailsPage;
