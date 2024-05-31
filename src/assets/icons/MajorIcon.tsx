import { IconType } from '../../shared/types/icons';

const MajorIcon = ({ size = 10, styles }: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size} css={styles} color="#8C919E">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
    </svg>
  );
};

export default MajorIcon;
