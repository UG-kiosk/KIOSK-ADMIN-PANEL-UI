import Card from '../../components/Card/Card';
import { Typography } from '../../components/Typography/Typography';
import { createStyles } from '../../theme/utils';
import useLessonsDetails from './hooks/useLessonsDetails';
import { useLessonsCall } from './hooks/useLessonsCall';

const LessonsDetails = ({ id }: { id: string }) => {
  const { lessonsDetailsData } = useLessonsDetails(id);
  const { deleteLessonsMutation } = useLessonsCall();

  return (
    <div css={lessonDetailsStyles.container}>
      <Typography size="lg" weight="bold">
        Lesson details
      </Typography>
      <Card
        displayUpdate={true}
        displayDelete={true}
        navigateTo={'/lessons/edit/' + id}
        deleteAction={() => deleteLessonsMutation(id)}
      >
        <Typography size="lg" weight="bold">
          {lessonsDetailsData?.name} - {lessonsDetailsData?.year} year
        </Typography>
        <Typography size="xs">{lessonsDetailsData?.subject}</Typography>
        <Typography size="xs">{lessonsDetailsData?.teachers}</Typography>
        <Typography size="xs">
          {lessonsDetailsData?.day} at {lessonsDetailsData?.start}, duration {lessonsDetailsData?.duration} hours
        </Typography>
        <Typography size="xs">Classroom {lessonsDetailsData?.class}</Typography>
        <Typography size="xs">Type {lessonsDetailsData?.type}</Typography>
        {lessonsDetailsData?.groups && lessonsDetailsData?.groups.length > 0 && (
          <Typography size="xs">Groups {lessonsDetailsData?.groups}</Typography>
        )}
        {lessonsDetailsData?.info && lessonsDetailsData?.info.length > 0 && (
          <Typography size="xs">Info {lessonsDetailsData?.info}</Typography>
        )}
      </Card>
    </div>
  );
};

export default LessonsDetails;

const lessonDetailsStyles = createStyles({
  container: ({ colors }) => ({
    color: colors.dark,
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  }),
  slider: {
    gap: '10px',
    display: 'flex',

    width: '700px',
    overflowX: 'auto',
    overflowScrolling: 'auto',
    WebkitOverflowScrolling: 'auto',
  },
  body: {
    maxWidth: '750px',
    wordBreak: 'break-word',
  },
});
