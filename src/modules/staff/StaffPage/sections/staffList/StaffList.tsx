import Card from '../../../../../components/Card/Card';
import Pagination from '../../../../../components/Pagination/Pagination';
import usePagination from '../../../../../components/Pagination/hook/usePagination';
import { Typography } from '../../../../../components/Typography/Typography';
import useStaffPage from '../../../api/hooks/useStaffPage';
import { createStyles } from '../../../../../theme/utils';
import Button from '../../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useStaffCall } from '../../../api/hooks/useStaffCall';
import Search from '../search/Search';

interface AcademicList {
  _id: string;
  name: string;
  link: string;
  units: string[];
}

const StaffList = () => {
  const { staff, pagination } = useStaffPage();
  const {
    actions: { handleGoToPage },
  } = usePagination({ pageSizes: [pagination?.itemsPerPage ?? 30], totalPages: pagination?.totalPages ?? 1 });
  const navigate = useNavigate();
  const { deleteStaffMutation } = useStaffCall();
  return (
    <div css={staffListStyles.container}>
      <Button
        label="Add Academic"
        onClick={() => {
          navigate('/staff/form');
        }}
        variant="accept"
        style={{ alignSelf: 'flex-end' }}
      />
      <Typography size="xl" weight="bold">
        Staff List
      </Typography>
      <Search />
      <div>
        {staff?.map((academic: AcademicList) => {
          return (
            <Card
              key={academic._id}
              navigateTo={'/staff/' + academic._id}
              displayDetails={true}
              displayDelete={true}
              deleteAction={() => deleteStaffMutation(academic._id)}
            >
              <Typography weight="bold">{academic.name}</Typography>
              <a href={academic.link}>
                <Typography size="xs">{academic.link}</Typography>
              </a>
              {academic.units.map((unit: string, i: number) => (
                <Typography size="sm" key={i}>
                  • {unit}
                </Typography>
              ))}
            </Card>
          );
        })}
      </div>
      <Pagination
        setCurentPage={handleGoToPage}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
      />
    </div>
  );
};

export default StaffList;

const staffListStyles = createStyles({
  container: ({ colors }) => ({
    color: colors.dark,
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  }),
});
