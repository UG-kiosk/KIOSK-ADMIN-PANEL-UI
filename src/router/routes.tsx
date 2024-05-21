import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';
import { paths } from './paths';
import App from '../App';
import SideBar from '../components/Sidebar/Sidebar';
import { SearchParamsProvider } from '../providers/searchParamsProvider';
import { createStyles } from '../theme/utils';

const mainStyles = createStyles({
  main: ({ colors }) => ({ display: 'flex', height: '100%', backgroundColor: colors.whiteSmoke }),
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <SearchParamsProvider>
          <main css={mainStyles.main}>
            <SideBar />
            <Outlet />
          </main>
        </SearchParamsProvider>
      }
    >
      <Route path={paths.root} element={<App />}></Route>
      <Route
        path={paths.majorsScraper}
        lazy={async () => {
          const pageModule = await import('../modules/majors/scraper/MajorsScraperPage');
          return { Component: pageModule.MajorsScraperPage };
        }}
      ></Route>
      <Route
        path={paths.createMajor}
        lazy={async () => {
          const pageModule = await import('../modules/majors/majorsForm/MajorsForm');
          return { Component: pageModule.MajorsForm };
        }}
      ></Route>
      <Route
        path={paths.ects}
        lazy={async () => {
          const ects = await import('../modules/ects/ectsMainPage/EctsMainPage');
          return { Component: ects.default };
        }}
      ></Route>
      <Route
        path={paths.staff}
        lazy={async () => {
          const staff = await import('../modules/staff/StaffForm');
          return { Component: staff.default };
        }}
      ></Route>
    </Route>,
  ),
);

export default router;
