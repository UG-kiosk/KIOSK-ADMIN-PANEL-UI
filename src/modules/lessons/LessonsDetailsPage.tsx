import { useParams } from 'react-router-dom';
import LessonDetails from './LessonsDetails';

export const LessonsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return <LessonDetails id={id} />;
  }
};

export default LessonsDetailsPage;
