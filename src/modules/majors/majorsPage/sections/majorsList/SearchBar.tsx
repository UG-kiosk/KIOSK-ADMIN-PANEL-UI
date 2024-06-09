import useSearch from '../../../hooks/useSearch';
import { createStyles } from '../../../../../theme/utils';
import { useRef } from 'react';
import InputField from '../../../../../components/Input/Input';
import SearchIcon from '../../../../../assets/icons/SearchIcon';

const SEARCH_INPUT = 'search';

const SearchBar = () => {
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const { setFilter } = useSearch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFilter(searchFieldRef.current?.value);
  };

  return (
    <form css={searchStyles.container} onSubmit={handleSubmit}>
      <InputField placeholder="Search" name={SEARCH_INPUT} ref={searchFieldRef} />
      <button css={searchStyles.searchIconButton} type="submit">
        <SearchIcon size={20} styles={searchStyles.searchIcon} />
      </button>
    </form>
  );
};

export default SearchBar;

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
