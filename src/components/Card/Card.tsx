import { ReactNode } from 'react';
import { Styles, createStyles } from '../../theme/utils';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

type CardProps<T extends ReactNode> = {
  children: T;
  navigateTo?: string;
  displayDetails?: boolean;
  displayUpdate?: boolean;
  displayDelete?: boolean;
  deleteAction?: () => void;
  styles?: Styles;
};

const Card = <T extends ReactNode>({
  children,
  navigateTo,
  displayDetails,
  displayUpdate,
  displayDelete,
  deleteAction,
  styles,
}: CardProps<T>) => {
  const navigate = useNavigate();
  return (
    <div css={[cardStyles.card, styles]}>
      <section css={cardStyles.section}>{children}</section>
      <div css={cardStyles.buttons}>
        {displayDetails && <Button label="Details" onClick={() => navigate(navigateTo ?? '')} />}
        {displayUpdate && <Button label="Update" variant="primary" onClick={() => navigate(navigateTo ?? '')} />}
        {displayDelete && <Button label="Delete" variant="cancel" onClick={() => deleteAction && deleteAction()} />}
      </div>
    </div>
  );
};

const cardStyles = createStyles({
  card: ({ colors }) => ({
    backgroundColor: colors.white,
    boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
    display: 'flex',
    minHeight: '100px',
    width: '800px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '30px',
    margin: '10px 0',
    '@media (max-width: 986px)': {
      flexDirection: 'column',
      gap: '20px',
      width: '500px',
    },
  }),
  section: ({ colors }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    color: colors.dark,
  }),
  buttons: {
    display: 'flex',
    gap: 10,
  },
});

export default Card;
