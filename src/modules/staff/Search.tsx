import { useRef } from 'react';
import useSearch from './hooks/useSearch';
import InputField from '../../components/Input/Input';
import SearchIcon from '../../assets/icons/SearchIcon';
import { createStyles } from '../../theme/utils';

const SEARCH_INPUT = 'search';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setFilter } = useSearch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFilter(inputRef);
  };

  return (
    <form css={searchStyles.container} onSubmit={handleSubmit}>
      <InputField placeholder="Search" name={SEARCH_INPUT} ref={inputRef} />
      <button css={searchStyles.searchIconButton} type="submit">
        <SearchIcon size={20} styles={searchStyles.searchIcon} />
      </button>
    </form>
  );
};

export default Search;

const searchStyles = createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    minWidth: '500px',
  },
  searchIconButton: ({ colors }) => ({
    all: 'unset',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '5px 8px',
    borderRadius: 10,
    border: `1px solid ${colors.lightGray}`,

    '&:hover': {
      border: `1px solid ${colors.primaryBlue}`,
    },
    '&:active': {
      boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 8px',
    },
  }),
  searchIcon: ({ colors }) => ({
    fill: colors.primaryBlue,
  }),
});
