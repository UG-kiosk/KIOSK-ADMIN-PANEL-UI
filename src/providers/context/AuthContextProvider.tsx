import { createContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType } from './types/AuthContextType';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<{ username: string | null; accessToken: string | null }>({
    username: null,
    accessToken: null,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      const { username }: { username: string } = jwtDecode(accessToken);
      setUser({ username: username, accessToken: accessToken });
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
