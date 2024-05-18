import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';
import { paths } from './paths';
import App from '../App';
import SideBar from '../components/Sidebar/Sidebar';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <main css={{ display: 'flex', height: '100%' }}>
          <SideBar />
          <Outlet />
        </main>
      }
    >
      <Route path={paths.root} element={<App />}></Route>
      <Route
        path={paths.majors}
        lazy={async () => {
          const ects = await import('../modules/majors/scraper/MajorsScraperPage');
          return { Component: ects.MajorsScraperPage };
        }}
      ></Route>
      <Route
        path={paths.ects}
        lazy={async () => {
          const ects = await import('../modules/ects/ectsForm/EctsForm');
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
