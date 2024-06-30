import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import usePagination from '../../components/Pagination/hook/usePagination';
import { Typography } from '../../components/Typography/Typography';
import useEventPage from './hooks/useEventPage';
import { createStyles } from '../../theme/utils';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { EventResponseDTO } from './types/events';
import moment from 'moment';
import { useEventCall } from './hooks/useEventCall';
// import Search from './Search';

const EventsList = () => {
  const { events, pagination } = useEventPage();
  const { deleteEventMutation } = useEventCall();
  const {
    actions: { handleGoToPage },
  } = usePagination({ pageSizes: [pagination?.itemsPerPage ?? 30], totalPages: pagination?.totalPages ?? 1 });
  const navigate = useNavigate();
  return (
    <div css={eventsListStyles.container}>
      <Button
        label="Add Event"
        onClick={() => {
          navigate('/events/form');
        }}
        variant="accept"
        style={{ alignSelf: 'flex-end' }}
      />
      <Typography size="xl" weight="bold">
        Events List
      </Typography>
      {/* <Search /> */}
      <div>
        {events?.map((eventItem: EventResponseDTO) => {
          return (
            <Card
              key={eventItem._id}
              navigateTo={'/events/' + eventItem._id}
              displayDetails={true}
              displayDelete={true}
              deleteAction={() => deleteEventMutation(eventItem._id)}
            >
              <Typography weight="bold">{eventItem.name}</Typography>
              <Typography size="xs">{` • ${moment(eventItem?.date).format('DD-MM-YYYY')}`}</Typography>
              <Typography size="xs">{eventItem.content}</Typography>
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

export default EventsList;

const eventsListStyles = createStyles({
  container: ({ colors }) => ({
    color: colors.dark,
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  }),
});
