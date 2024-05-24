import { ReactNode } from 'react';
import { createStyles } from '../../theme/utils';

const Header = ({ children }: { children: ReactNode }) => {
  return <header css={headerStyles.header}>{children}</header>;
};

export default Header;

const headerStyles = createStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 50px 50px 50px',

    '@media (max-width: 986px)': {
      padding: '16px 25px 25px 25px',
      flexDirection: 'column',
      gap: '25px',
    },
  },
});
