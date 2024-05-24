import Cookies from 'js-cookie';

export const getAuthHeader = () => {
  const token = Cookies.get('accessToken');
  return token ? `Bearer ${token}` : '';
};
