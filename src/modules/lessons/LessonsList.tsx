import Pagination from '../../components/Pagination/Pagination';
import usePagination from '../../components/Pagination/hook/usePagination';
import { Typography } from '../../components/Typography/Typography';
import useLessonsPage from './hooks/useLessonsPage';
import { createStyles } from '../../theme/utils';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Search from './Search';
import { useLessonsCall } from './hooks/useLessonsCall';

const LessonsList = () => {
  const { lessons, pagination } = useLessonsPage();
  const { deleteLessonsMutation } = useLessonsCall();
  const {
    actions: { handleGoToPage },
  } = usePagination({ pageSizes: [pagination?.itemsPerPage ?? 30], totalPages: pagination?.totalPages ?? 1 });
  const navigate = useNavigate();
  return (
    <div css={lessonsListStyles.container}>
      <Button
        label="Add Lesson"
        onClick={() => {
          navigate('/lessons/form');
        }}
        variant="accept"
        style={{ alignSelf: 'flex-end' }}
      />
      <Typography size="xl" weight="bold">
        Lessons List
      </Typography>
      <Search />
      <div>
        {lessons?.map(lesson => {
          return (
            <Card
              key={lesson._id}
              navigateTo={'/news/' + lesson._id}
              displayDetails={true}
              displayDelete={true}
              deleteAction={() => deleteLessonsMutation(lesson._id)}
            >
              <Typography weight="bold">
                {lesson.name} - {lesson.year} year
              </Typography>{' '}
              <Typography size="xs">{lesson.teachers}</Typography>
              <Typography size="xs">
                {lesson.day} at {lesson.start}
              </Typography>
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

export default LessonsList;

const lessonsListStyles = createStyles({
  container: ({ colors }) => ({
    color: colors.dark,
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  }),
});
