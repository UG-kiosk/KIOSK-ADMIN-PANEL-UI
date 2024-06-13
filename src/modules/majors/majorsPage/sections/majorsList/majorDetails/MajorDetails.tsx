import DOMPurify from 'dompurify';
import Card from '../../../../../../components/Card/Card';
import { Typography } from '../../../../../../components/Typography/Typography';
import { createStyles } from '../../../../../../theme/utils';
import { useMajorPage } from '../../../../hooks/useMajorPage';
import { useMajorsCall } from '../../../../hooks/useMajorsCall';

export const MajorDetails = ({ id }: { id: string }) => {
  const { majorData } = useMajorPage(id);
  const { deleteMajorMutation } = useMajorsCall();
  const cleanBody = majorData?.content ? DOMPurify.sanitize(majorData.content) : '';

  return (
    <div css={majorDetailsStyles.container}>
      <Typography size="lg" weight="bold">
        Major details
      </Typography>
      <Card
        navigateTo={'/majors/edit/' + id}
        displayUpdate={true}
        displayDelete={true}
        deleteAction={() => deleteMajorMutation(majorData!._id)}
      >
        <Typography weight="bold">{majorData?.name}</Typography>
        <Typography>{majorData?.url}</Typography>
        <Typography>ID: {majorData?._id}</Typography>
        <Typography>Degree: {majorData?.degree}</Typography>
        <div dangerouslySetInnerHTML={{ __html: cleanBody }}></div>
      </Card>
    </div>
  );
};

const majorDetailsStyles = createStyles({
  container: ({ colors }) => ({
    color: colors.dark,
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  }),
});
