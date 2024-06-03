import { useRefreshTokenCall } from '../modules/auth/useRefreshTokenCall';
import { ReactNode, useEffect } from 'react';

type ProtectedRouteType = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteType) => {
  const { ensureValidAccessToken } = useRefreshTokenCall();
  const checkIfExpired = async () => await ensureValidAccessToken();

  useEffect(() => {
    checkIfExpired();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default ProtectedRoute;
