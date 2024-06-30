import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { paths } from './paths';
import App from '../App';
import 'react-toastify/dist/ReactToastify.css';
import RootPage from '../RootPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootPage />}>
        <Route path={paths.root} element={<App />}></Route>
        <Route
          path={paths.majorsScraper}
          lazy={async () => {
            const pageModule = await import('../modules/majors/scraper/MajorsScraperPage');
            return { Component: pageModule.MajorsScraperPage };
          }}
        ></Route>
        <Route
          path={paths.majors}
          lazy={async () => {
            const pageModule = await import('../modules/majors/majorsPage/MajorsPage.tsx');
            return { Component: pageModule.MajorsPage };
          }}
        ></Route>
        <Route
          path={paths.majorDetails}
          lazy={async () => {
            const pageModule = await import('../modules/majors/majorsPage/MajorsPage.tsx');
            return { Component: pageModule.MajorsPage };
          }}
        ></Route>
        <Route
          path={paths.majorsEdit}
          lazy={async () => {
            const pageModule = await import('../modules/majors/majorsForm/MajorsForm');
            return { Component: pageModule.MajorsForm };
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
            const ects = await import('../modules/ects/ectsMainPage/EctsMainPage.tsx');
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
          path={paths.staffScraper}
          lazy={async () => {
            const staff = await import('../modules/staff/StaffScraper');
            return { Component: staff.default };
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
          path={paths.lessonsCreate}
          lazy={async () => {
            const lesson = await import('../modules/lessons/LessonsForm');
            return { Component: lesson.default };
          }}
        ></Route>
        <Route
          path={paths.lessons}
          lazy={async () => {
            const lesson = await import('../modules/lessons/LessonsList');
            return { Component: lesson.default };
          }}
        ></Route>
        <Route
          path={paths.lessonsDetails}
          lazy={async () => {
            const lesson = await import('../modules/lessons/LessonsDetailsPage');
            return { Component: lesson.default };
          }}
        ></Route>
        <Route
          path={paths.lessonsEdit}
          lazy={async () => {
            const lesson = await import('../modules/lessons/LessonsForm');
            return { Component: lesson.default };
          }}
        ></Route>
        <Route
          path={paths.addEcts}
          lazy={async () => {
            const ects = await import('../modules/ects/ectsForm/EctsForm.tsx');
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
        <Route
          path={paths.events}
          lazy={async () => {
            const events = await import('../modules/events/EventsList.tsx');
            return { Component: events.default };
          }}
        ></Route>
        <Route
          path={paths.eventsCreate}
          lazy={async () => {
            const events = await import('../modules/events/EventsForm.tsx');
            return { Component: events.default };
          }}
        ></Route>
        <Route
          path={paths.eventsDetails}
          lazy={async () => {
            const events = await import('../modules/events/EventsForm.tsx');
            return { Component: events.default };
          }}
        ></Route>
        <Route
          path={paths.eventsEdit}
          lazy={async () => {
            const events = await import('../modules/events/EventsForm.tsx');
            return { Component: events.default };
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
