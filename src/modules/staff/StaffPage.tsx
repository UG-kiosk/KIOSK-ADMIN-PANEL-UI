import { useParams } from 'react-router-dom';
import StaffDetails from './StaffDetails';
import StaffList from './StaffList';

export const StaffPage = () => {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return <StaffDetails id={id} />;
  }
  return <StaffList />;
};

export default StaffPage;
