import Card from '../../components/Card/Card';
import { Typography } from '../../components/Typography/Typography';
import { createStyles } from '../../theme/utils';
import useEventDetails from './hooks/useEventDetails';
import DOMPurify from 'dompurify';
import moment from 'moment';
import Button from '../../components/Button/Button';
import { useEventCall } from './hooks/useEventCall';
import { useNavigate } from 'react-router-dom';

const EventDetails = ({ id }: { id: string }) => {
  const { eventDetailsData } = useEventDetails(id);
  const { deleteEventMutation } = useEventCall();
  const cleanContent = eventDetailsData?.content ? DOMPurify.sanitize(eventDetailsData.content) : '';
  const navigate = useNavigate();

  return (
    <div css={eventDetailsStyles.container}>
      <Typography size="lg" weight="bold">
        Event details
      </Typography>
      <Card displayUpdate={false} displayDelete={false}>
        <Typography size="lg" weight="bold">
          {eventDetailsData?.name}
        </Typography>
        <Typography size="xs">{` • ${moment(eventDetailsData?.date).format('DD-MM-YYYY')} •`}</Typography>
        <div dangerouslySetInnerHTML={{ __html: cleanContent }} css={eventDetailsStyles.content}></div>
        <div css={eventDetailsStyles.buttons}>
          <Button label="Update" variant="primary" onClick={() => navigate('/events/edit/' + eventDetailsData?._id)} />
          <Button
            label="Delete"
            variant="cancel"
            onClick={() => eventDetailsData && deleteEventMutation(eventDetailsData._id)}
          />
        </div>
      </Card>
    </div>
  );
};

export default EventDetails;

const eventDetailsStyles = createStyles({
  container: ({ colors }) => ({
    color: colors.dark,
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  }),
  content: {
    maxWidth: '750px',
    wordBreak: 'break-word',
  },
  buttons: {
    display: 'inline-flex',
    gap: '5px',
  },
});
