import Card from '../../components/Card/Card';
import { Typography } from '../../components/Typography/Typography';
import { createStyles } from '../../theme/utils';
import { useStaffCall } from './hooks/useStaffCall';
import useStaffMemberPage from './hooks/useStaffMemberPage';

const StaffDetails = ({ id }: { id: string }) => {
  const { staffMemberData } = useStaffMemberPage(id);
  const { deleteStaffMutation } = useStaffCall();
  return (
    <div css={staffDetailsStyles.container}>
      <Typography size="lg" weight="bold">
        Academic details
      </Typography>
      <Card
        navigateTo={'/staff/edit/' + id}
        displayUpdate={true}
        displayDelete={true}
        deleteAction={() => deleteStaffMutation(id)}
      >
        <Typography weight="bold">{staffMemberData?.name}</Typography>
        <Typography>{staffMemberData?.email}</Typography>
        <Typography>{staffMemberData?.content.tutorial}</Typography>
        {staffMemberData?.content.posts.map(({ position, faculty }, i: number) => {
          return (
            <div key={i}>
              <Typography>{position}</Typography>
              {faculty.map((unit: string, index: number) => (
                <Typography key={index}>• {unit}</Typography>
              ))}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default StaffDetails;

const staffDetailsStyles = createStyles({
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
