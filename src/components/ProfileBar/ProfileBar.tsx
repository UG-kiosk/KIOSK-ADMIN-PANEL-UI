import { useContext } from 'react';
import { AuthContext } from '../../providers/context/AuthContextProvider';
import { createStyles } from '../../theme/utils';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import { Typography } from '../Typography/Typography';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import { useLogoutCall } from '../../modules/login/api/hooks/useLogoutCall';
import { useNavigate } from 'react-router-dom';

const ProfileBar = () => {
  const { logoutMutation } = useLogoutCall();
  const authContext = useContext(AuthContext);
  const { user } = authContext!;
  const navigate = useNavigate();
  return (
    <div>
      <div css={tileStyle.main}>
        <div css={tileStyle.text}>
          <Typography>{user.username}</Typography>
        </div>
        <div css={tileStyle.icons}>
          <div css={tileStyle.icon} onClick={() => navigate('/admin/profile')}>
            <ProfileIcon size={30} />
          </div>
          <div css={tileStyle.icon} onClick={() => logoutMutation()}>
            <LogoutIcon size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;

const tileStyle = createStyles({
  main: ({ colors }) => ({
    backgroundColor: colors.light,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: '10px 25px',
    minWidth: '300px',
    height: '50px',
    borderRadius: '25px',
    border: 'none',
  }),
  text: ({ colors }) => ({
    color: colors.dark,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    minWidth: '100px',
    flexGrow: 2,
  }),
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
  },
  icon: ({ colors }) => ({
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: colors.paper,
      borderRadius: '50%',
    },
    '&:active': {
      opacity: 0.9,
    },
  }),
});
