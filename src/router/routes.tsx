import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';
import { paths } from './paths';
import App from '../App';
import SideBar from '../components/Sidebar/Sidebar';
import { SearchParamsProvider } from '../providers/searchParamsProvider';
import { createStyles } from '../theme/utils';
import ProfileBar from '../components/ProfileBar/ProfileBar';
import Header from '../components/Header/Header';
import Timer from '../components/Timer/Timer';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <SearchParamsProvider>
            <ProtectedRoute>
              <main css={mainStyles.main}>
                <SideBar />
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
            const ects = await import('../modules/ects/EctsMainPage/ectsMainPage.tsx');
            return { Component: ects.default };
          }}
        ></Route>
        <Route
          path={paths.news}
          lazy={async () => {
            const news = await import('../modules/news/NewsList');
            return { Component: news.default };
          }}
        ></Route>
        <Route
          path={paths.newsCreate}
          lazy={async () => {
            const news = await import('../modules/news/NewsForm');
            return { Component: news.default };
          }}
        ></Route>
        <Route
          path={paths.newsEdit}
          lazy={async () => {
            const news = await import('../modules/news/NewsForm');
            return { Component: news.default };
          }}
        ></Route>
        <Route
          path={paths.newsDetails}
          lazy={async () => {
            const news = await import('../modules/news/NewsDetailsPage');
            return { Component: news.default };
          }}
        ></Route>
        <Route
          path={paths.staff}
          lazy={async () => {
            const staff = await import('../modules/staff/StaffPage/StaffPage');
            return { Component: staff.default };
          }}
        ></Route>
        <Route
          path={paths.staffDetails}
          lazy={async () => {
            const staff = await import('../modules/staff/StaffPage/StaffPage');
            return { Component: staff.default };
          }}
        ></Route>
        <Route
          path={paths.staffCreate}
          lazy={async () => {
            const staff = await import('../modules/staff/StaffFormPage/StaffFormPage');
            return { Component: staff.default };
          }}
        ></Route>
        <Route
          path={paths.staffEdit}
          lazy={async () => {
            const staff = await import('../modules/staff/StaffFormPage/StaffFormPage');
            return { Component: staff.default };
          }}
        ></Route>
        <Route
          path={paths.profile}
          lazy={async () => {
            const profile = await import('../modules/adminSettings/AdminSettingsPage');
            return { Component: profile.default };
          }}
        ></Route>
        <Route
          path={paths.lessons}
          lazy={async () => {
            const lesson = await import('../modules/lessons/lessonsForm/LessonsForm');
            return { Component: lesson.default };
          }}
        ></Route>
        <Route
          path={paths.addEcts}
          lazy={async () => {
            const ects = await import('../modules/ects/EctsForm/EctsForm.tsx');
            return { Component: ects.default };
          }}
        ></Route>
        <Route
          path={paths.staff}
          lazy={async () => {
            const staff = await import('../modules/staff/StaffFormPage/StaffFormPage');
            return { Component: staff.default };
          }}
        ></Route>
      </Route>
      <Route
        path={paths.login}
        lazy={async () => {
          const login = await import('../modules/login/LoginPage');
          return { Component: login.default };
        }}
      ></Route>
    </>,
  ),
);

export default router;
