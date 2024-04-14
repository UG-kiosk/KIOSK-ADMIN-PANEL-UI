import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { paths } from './paths';
import App from '../App';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
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
    </Route>,
  ),
);

export default router;
