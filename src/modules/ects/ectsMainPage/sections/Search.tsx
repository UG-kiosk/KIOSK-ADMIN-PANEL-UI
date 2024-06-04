import InputField from '../../../../components/Input/Input';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import Angledown from '../../../../assets/icons/Angledown';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import { Degree } from '../../../../shared/constants/degree';
import { Typography } from '../../../../components/Typography/Typography';
import { createStyles } from '../../../../theme/utils';
import useSearch from './useSearch';
import { useRef } from 'react';
import Button from '../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../router/paths';

const SEARCH_INPUT = 'search';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setFilter, setSortDirectionParam, setDegreeParam, sortParam, degreeParam } = useSearch();
  const navigate = useNavigate();

  return (
    <div css={searchStyles.container}>
      <Button
        label="Add Ects"
        onClick={() => {
          navigate(`${paths.addEcts}`);
        }}
        variant="accept"
        style={{ alignSelf: 'flex-end' }}
      />
      <Typography size="xl" weight="bold">
        Ects List
      </Typography>
      <div css={searchStyles.searchContent}>
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
        <InputField placeholder="Search" name={SEARCH_INPUT} ref={inputRef} styles={searchStyles.searchInput} />
        <button
          css={[searchStyles.sorticon, sortParam === 'Dsc' && searchStyles.sortIconDirection]}
          onClick={setSortDirectionParam}
        >
          <Angledown size={30} />
        </button>
        <button css={searchStyles.searchIconButton} type="submit" onClick={() => setFilter(inputRef)}>
          <SearchIcon size={20} styles={searchStyles.searchIcon} />
        </button>
      </div>
    </div>
  );
};

export default Search;

const searchStyles = createStyles({
  container: ({ colors }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: colors.dark,
  }),
  sortIconDirection: {
    '.angle-down-icon': {
      transform: 'translateY(-1px) rotate(180deg)',
    },
  },
  sorticon: { all: 'unset' },
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
  searchInput: {
    maxWidth: 300,
  },
  searchContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 600,
    flex: 1,
    gap: 20,
  },
});
