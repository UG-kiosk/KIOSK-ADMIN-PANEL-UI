import usePagination from '../../../components/Pagination/hook/usePagination';

import useEctsPage from './useEctsPage';
import Tile from '../../../components/Tile/Tile';
import Search from './components/Search';
import { createStyles } from '../../../theme/utils';
import Pagination from '../../../components/Pagination/Pagination';

const EctsMainPage = () => {
  const { ectsSubject, itemsPerPage, totalPages } = useEctsPage();

  const {
    actions: { handleGoToPage },
    state: { page },
  } = usePagination({ pageSizes: [itemsPerPage], totalPages: totalPages });

  return (
    <section css={styles.section}>
      <Search />
      <div css={styles.tilesSection}>
        {ectsSubject?.map((ectsSubject, index) => (
          <Tile
            arrayOfKey={['subject', 'major', 'term', 'speciality']}
            object={ectsSubject}
            key={index}
            styles={{ width: 1100 }}
            ellipsAfter={18}
          />
        ))}
      </div>
      <Pagination setCurentPage={handleGoToPage} currentPage={page} totalPages={totalPages} />
    </section>
  );
};

export default EctsMainPage;

const styles = createStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: '20px 10px',
  },
  tilesSection: { display: 'flex', flexDirection: 'column', gap: 10 },
});
