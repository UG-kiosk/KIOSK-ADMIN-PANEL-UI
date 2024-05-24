export type AuthContextType = {
  user: {
    username: string | null;
    accessToken: string | null;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string | null;
      accessToken: string | null;
    }>
  >;
};
