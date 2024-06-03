import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import usePagination from '../../components/Pagination/hook/usePagination';
import { Typography } from '../../components/Typography/Typography';
import useNewsPage from './hooks/useNewsPage';
import { createStyles } from '../../theme/utils';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { NewsResponseDTO } from './types/news';
import Image from '../../components/Image/Image';
import moment from 'moment';
import { useNewsCall } from './hooks/useNewsCall';
import Search from './Search';

const NewsList = () => {
  const { news, pagination } = useNewsPage();
  const { deleteNewsMutation } = useNewsCall();
  const {
    actions: { handleGoToPage },
  } = usePagination({ pageSizes: [pagination?.itemsPerPage ?? 30], totalPages: pagination?.totalPages ?? 1 });
  const navigate = useNavigate();
  return (
    <div css={newsListStyles.container}>
      <Button
        label="Add News"
        onClick={() => {
          navigate('/news/form');
        }}
        variant="accept"
        style={{ alignSelf: 'flex-end' }}
      />
      <Typography size="xl" weight="bold">
        News List
      </Typography>
      <Search />
      <div>
        {news?.map((newsItem: NewsResponseDTO) => {
          return (
            <Card
              key={newsItem._id}
              navigateTo={'/news/' + newsItem._id}
              displayDetails={true}
              displayDelete={true}
              deleteAction={() => deleteNewsMutation(newsItem._id)}
            >
              <Image src={newsItem.leadingPhoto}></Image>
              <Typography weight="bold">{newsItem.title}</Typography>
              <Typography size="xs">
                {` • ${moment(newsItem?.datetime).format('DD-MM-YYYY')} • ${newsItem?.source}`}
              </Typography>
              <Typography size="xs">{newsItem.shortBody}</Typography>
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

export default NewsList;

const newsListStyles = createStyles({
  container: ({ colors }) => ({
    color: colors.dark,
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  }),
});
