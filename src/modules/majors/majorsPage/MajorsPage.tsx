import { useParams } from 'react-router-dom';
import { MajorsList } from './sections/majorsList/MajorsList';
import { MajorDetails } from './sections/majorsList/majorDetails/MajorDetails';

export const MajorsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return <MajorDetails id={id} />;
  }

  return <MajorsList />;
};
