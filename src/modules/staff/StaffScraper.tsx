import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Typography } from '../../components/Typography/Typography';
import { createStyles } from '../../theme/utils';
import { useStaffCall } from './api/hooks/useStaffCall';

const StaffScraper = () => {
  const { scrapeStaffMutation } = useStaffCall();
  const navigate = useNavigate();
  return (
    <div css={staffScraperStyles.main}>
      <Typography size="xl" weight="bold">
        Staff Scraper
      </Typography>
      <div>
        <Typography size="lg">
          Do not repeat this action very often. It might take a while to scrape and add the whole collection.
        </Typography>
        <div css={staffScraperStyles.button}>
          <Button
            label="Scrape staff collection"
            onClick={() => {
              scrapeStaffMutation();
            }}
            style={{ alignSelf: 'flex-end' }}
          />
        </div>
        <Typography size="lg">
          If you want to add a single academic, click the button below and you will be redirected to the form.
        </Typography>
        <div css={staffScraperStyles.button}>
          <Button
            label="Add Academic"
            onClick={() => {
              navigate('/staff/form');
            }}
            variant="accept"
            style={{ alignSelf: 'flex-end' }}
          />
        </div>
      </div>
    </div>
  );
};

// style
const staffScraperStyles = createStyles({
  main: ({ colors }) => ({
    color: colors.dark,
    textAlign: 'center',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    maxWidth: 600,
  }),
  button: {
    margin: '30px 0',
  },
});

export default StaffScraper;
