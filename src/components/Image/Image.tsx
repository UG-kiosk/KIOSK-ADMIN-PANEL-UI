import { Styles, createStyles } from '../../theme/utils';

type ImageProps = {
  src?: string;
  alt?: string;
  styles?: Styles;
};

const Image = ({ src, alt, styles }: ImageProps) => {
  return (
    <div css={[imageStyles.container, styles]}>
      <img css={imageStyles.image} src={src || ''} alt={alt || 'Image'} />
    </div>
  );
};

const imageStyles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    height: '250px',
    width: '350px',
  },
  image: {
    maxWidth: 'auto',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 15,
  },
});

export default Image;
