import Card from '../../components/Card/Card';
import { Typography } from '../../components/Typography/Typography';
import { createStyles } from '../../theme/utils';
import useNewsDetailsPage from './hooks/useNewsDetails';
import DOMPurify from 'dompurify';
import moment from 'moment';
import Image from '../../components/Image/Image';

const NewsDetails = ({ id }: { id: string }) => {
  const { newsDetailsData } = useNewsDetailsPage(id);
  const cleanBody = newsDetailsData?.body ? DOMPurify.sanitize(newsDetailsData.body) : '';

  return (
    <div css={newsDetailsStyles.container}>
      <Typography size="lg" weight="bold">
        News details
      </Typography>
      <Card navigateTo={'/news/edit/' + id} displayUpdate={false} displayDelete={false}>
        <Typography size="lg" weight="bold">
          {newsDetailsData?.title}
        </Typography>
        <Typography size="xs">
          {` • ${moment(newsDetailsData?.datetime).format('DD-MM-YYYY')} • ${newsDetailsData?.source}`}
        </Typography>
        <div css={newsDetailsStyles.slider}>
          <Image src={newsDetailsData?.leadingPhoto}></Image>
          {newsDetailsData?.photos.map((photo: string, i: number) => {
            return (
              <div key={i}>
                <Image src={photo}></Image>
              </div>
            );
          })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: cleanBody }} css={newsDetailsStyles.body}></div>
      </Card>
    </div>
  );
};

export default NewsDetails;

const newsDetailsStyles = createStyles({
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
