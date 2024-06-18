import usePagination from '../../../components/Pagination/hook/usePagination';

import Tile from '../../../components/Tile/Tile';
import Search from './sections/Search';
import { createStyles } from '../../../theme/utils';
import Pagination from '../../../components/Pagination/Pagination';
import Modal from '../../../components/Modal/Modal';
import { useState } from 'react';
import { paths } from '../../../router/paths';
import { createSearchParams, useNavigate } from 'react-router-dom';
import useGetAllEctsCall from '../api/hooks/useGetAllEctsCall';
import useDeleteEcts from '../api/hooks/useDeleteEcts';

const EctsMainPage = () => {
  const navigate = useNavigate();
  const { ectsSubject, itemsPerPage, totalPages } = useGetAllEctsCall();
  const { deleteEctsSubjectMutation } = useDeleteEcts();
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');

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
            arrayOfKey={ectsSubject.speciality ? ['subject', 'term', 'speciality'] : ['subject', 'term', 'major']}
            object={ectsSubject}
            key={index}
            styles={{ width: 850 }}
            ellipsAfter={14}
            onDelete={() => {
              setIsOpen(!isOpen);
              setId(ectsSubject._id as string);
            }}
            onUpdate={() => {
              navigate({
                pathname: paths.addEcts,
                search: createSearchParams({
                  id: ectsSubject._id as string,
                }).toString(),
              });
            }}
          />
        ))}
      </div>
      <Modal isOpen={isOpen} handleOpen={() => setIsOpen(!isOpen)} onClick={() => deleteEctsSubjectMutation(id)} />
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
  tilesSection: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', justifyContent: 'center' },
});
