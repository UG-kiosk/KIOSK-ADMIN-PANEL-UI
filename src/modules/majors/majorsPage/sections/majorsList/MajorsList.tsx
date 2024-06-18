import { useNavigate } from 'react-router-dom';
import { useMajorsPage } from '../../../hooks/useMajorsPage';
import Button from '../../../../../components/Button/Button';
import { Typography } from '../../../../../components/Typography/Typography';
import { Major } from '../../../types/major';
import Card from '../../../../../components/Card/Card';
import { createStyles } from '../../../../../theme/utils';
import SearchBar from './SearchBar';
import { useMajorsCall } from '../../../hooks/useMajorsCall';

export const MajorsList = () => {
  const { majorsList } = useMajorsPage();
  const navigate = useNavigate();
  const { deleteMajorMutation } = useMajorsCall();

  return (
    <div style={styles.section}>
      <div style={styles.tilesSection}>
        <Button
          label="Add Major"
          onClick={() => {
            navigate('/majors/create');
          }}
          variant="accept"
          style={{ alignSelf: 'flex-end' }}
        />
        <Typography size="xl" weight="bold">
          Majors List
        </Typography>
        <SearchBar />
        {majorsList?.map((major: Major) => (
          <Card
            key={major._id}
            navigateTo={'/majors/' + major._id}
            displayDetails={true}
            displayDelete={true}
            deleteAction={() => deleteMajorMutation(major._id)}
          >
            <Typography weight="bold">{major.name}</Typography>
            {major.url && (
              <a href={major.url}>
                <Typography size="xs">{major.url}</Typography>
              </a>
            )}
            <Typography size="sm">• {major.degree}</Typography>
          </Card>
        ))}
      </div>
    </div>
  );
};

const styles = createStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: '20px 10px',
  },
  tilesSection: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'center' },
});
