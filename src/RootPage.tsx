import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProfileBar from './components/ProfileBar/ProfileBar';
import SideBar from './components/Sidebar/Sidebar';
import Timer from './components/Timer/Timer';
import { createStyles } from './theme/utils';
import { SearchParamsProvider } from './providers/searchParamsProvider';
import Header from './components/Header/Header';
import { useIsFetching } from '@tanstack/react-query';
import Loader from './components/Loader/Loader';
import ProtectedRoute from './router/ProtectedRoute';

const RootPage = () => {
  const isGloballyFetching = Boolean(useIsFetching());
  return (
    <SearchParamsProvider>
      <ProtectedRoute>
        <main css={mainStyles.main}>
          <SideBar />
          {isGloballyFetching && <Loader />}
          <section css={sectionStyles.section}>
            <Header>
              <Timer />
              <ProfileBar />
            </Header>
            <Outlet />
          </section>
        </main>
        <ToastContainer />
      </ProtectedRoute>
    </SearchParamsProvider>
  );
};

export default RootPage;

const mainStyles = createStyles({
  main: ({ colors }) => ({ display: 'flex', height: '100%', backgroundColor: colors.whiteSmoke }),
});

const sectionStyles = createStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // padding: '40px 50px',
    margin: '40px 50px',
  },
});
