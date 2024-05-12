import { truncateWithEllipsis } from '../../shared/utils/truncateWithEllipsis';
import { Styles, createStyles } from '../../theme/utils';
import Button from '../Button/Button';
import { Typography } from '../Typography/Typography';

type TileProps<T> = {
  object: T;
  arrayOfKey: (keyof T)[];
  styles?: Styles;
};

const Tile = <T,>({ object, arrayOfKey, styles }: TileProps<T>) => {
  return (
    <div css={[tileStyles.tile, styles]}>
      <section css={tileStyles.section}>
        {arrayOfKey.map(key => (
          <Typography
            key={key.toString()}
            weight="bold"
          >{`${key.toString()}: ${truncateWithEllipsis(`${object[key]}`, 40)}`}</Typography>
        ))}
      </section>
      <div css={tileStyles.buttons}>
        <Button label="Update" variant="accept" />
        <Button label="Delete" variant="cancel" />
      </div>
    </div>
  );
};

const tileStyles = createStyles({
  tile: ({ colors }) => ({
    backgroundColor: colors.primaryBlue,
    display: 'flex',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 30px',
    borderRadius: 25,
    width: 900,
  }),
  section: ({ colors }) => ({
    display: 'flex',
    gap: 10,
    color: colors.white,
  }),
  buttons: {
    display: 'flex',
    gap: 10,
  },
});

export default Tile;
