import InputField from '../../../../components/Input/Input';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import Angledown from '../../../../assets/icons/Angledown';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import { Degree } from '../../../../shared/constants/degree';
import { Typography } from '../../../../components/Typography/Typography';
import { createStyles } from '../../../../theme/utils';
import useSearch from './useSearch';
import { useRef } from 'react';

const SEARCH_INPUT = 'search';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setFilter, setSortDirectionParam, setDegreeParam, sortParam, degreeParam } = useSearch();

  return (
    <div css={searchStyles.container}>
      <InputField placeholder="Search" name={SEARCH_INPUT} ref={inputRef} />
      <button
        css={[searchStyles.sorticon, sortParam === 'Dsc' && searchStyles.sortIconDirection]}
        onClick={setSortDirectionParam}
      >
        <Angledown size={30} />
      </button>
      <button css={searchStyles.searchIconButton} onClick={() => setFilter(inputRef)}>
        <SearchIcon size={42} styles={searchStyles.searchIcon} />
      </button>
      <Dropdown defaultValue={degreeParam} onValueChange={e => setDegreeParam(e as Degree)}>
        <Dropdown.Trigger defaultValue={degreeParam}>
          <Dropdown.Value />
        </Dropdown.Trigger>
        <Dropdown.Content>
          {Object.values(Degree).map(degree => (
            <Dropdown.Item value={degree} key={degree}>
              <Typography>{degree}</Typography>
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
};

export default Search;

const searchStyles = createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  sortIconDirection: {
    '.angle-down-icon': {
      transform: 'translateY(-1px) rotate(180deg)',
    },
  },
  sorticon: { all: 'unset' },
  searchIconButton: {
    all: 'unset',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 3,
    borderRadius: 10,
  },
  searchIcon: ({ colors }) => ({
    fill: colors.primaryBlue,
  }),
});
