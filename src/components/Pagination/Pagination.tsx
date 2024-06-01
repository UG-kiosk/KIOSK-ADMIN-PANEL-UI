import { Pagination as PaginationLib } from 'react-headless-pagination';
import { css } from '@emotion/css';
import AngleLeft from '../../assets/icons/AngleLeft';
import AngleRight from '../../assets/icons/AngleRight';
import { createStyles } from '../../theme/utils';

type PaginationProps = {
  currentPage: number;
  setCurentPage: (page: number) => void;
  totalPages: number;
};

const Pagination = ({ currentPage, setCurentPage, totalPages }: PaginationProps) => (
  <PaginationLib
    currentPage={currentPage - 1}
    setCurrentPage={page => {
      setCurentPage(page + 1);
    }}
    className=""
    truncableText="..."
    truncableClassName=""
    edgePageCount={2}
    middlePagesSiblingCount={1}
    totalPages={totalPages}
    css={styles.pagination}
  >
    <PaginationLib.PrevButton css={styles.paginationIcon}>
      <AngleLeft size={20} />
    </PaginationLib.PrevButton>

    <nav>
      <ul css={{ display: 'flex', gap: 20 }}>
        <PaginationLib.PageButton activeClassName={Active} inactiveClassName="" />
      </ul>
    </nav>

    <PaginationLib.NextButton css={styles.paginationIcon}>
      <AngleRight size={20} />
    </PaginationLib.NextButton>
  </PaginationLib>
);

export default Pagination;

const styles = createStyles({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: 50,
    width: '100%',
    fontSize: 14,
    userSelect: 'none',
  },
  paginationIcon: ({ colors }) => ({
    width: 1000,
    all: 'unset',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 8,
    color: colors.lightGray,
    fill: colors.lightGray,
    '&:hover': {
      color: colors.textGray,
      fill: colors.textGray,
    },
  }),
});

const Active = css({
  padding: 5,
  borderRadius: 10,
  color: '#0044B0',
  backgroundColor: '#f5f5f5',
});
