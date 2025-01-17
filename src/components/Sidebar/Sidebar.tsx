import { createStyles } from '../../theme/utils';
import * as Accordion from '@radix-ui/react-accordion';
import Angledown from '../../assets/icons/Angledown';
import ModuleIcon from '../../assets/icons/ModuleIcon';
import EctsIcon from '../../assets/icons/EctsIcon';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../router/paths';
import UgLogo from '../../assets/icons/UgLogo';
import { Typography } from '../Typography/Typography';
import NewsIcon from '../../assets/icons/NewsIcon';
import StaffIcon from '../../assets/icons/StaffIcon';
import MajorIcon from '../../assets/icons/MajorIcon';
import LessonsIcon from '../../assets/icons/LessonsIcon';
import EventsIcon from '../../assets/icons/EventsIcon';
import ScraperIcon from '../../assets/icons/ScraperIcon';

const modules = [
  {
    text: 'Ects',
    icon: <EctsIcon size={35} styles={({ colors }) => ({ color: colors.textGray })} />,
    path: paths.ects,
  },
  {
    text: 'News',
    icon: <NewsIcon size={35} styles={({ colors }) => ({ color: colors.textGray })} />,
    path: paths.news,
  },
  {
    text: 'Staff',
    icon: <StaffIcon size={35} styles={({ colors }) => ({ color: colors.textGray })} />,
    path: paths.staff,
  },
  {
    text: 'Majors',
    icon: <MajorIcon size={35} styles={({ colors }) => ({ color: colors.textGray, fill: colors.textGray })} />,
    path: paths.majors,
  },
  {
    text: 'Lessons',
    icon: <LessonsIcon size={35} styles={({ colors }) => ({ color: colors.textGray })} />,
    path: paths.lessons,
  },
  {
    text: 'Events',
    icon: <EventsIcon size={35} styles={({ colors }) => ({ color: colors.textGray })} />,
    path: paths.events,
  },
];

const scrapers = [
  {
    text: 'Staff',
    icon: <StaffIcon size={35} styles={({ colors }) => ({ color: colors.textGray })} />,
    path: paths.staffScraper,
  },
  {
    text: 'Majors',
    icon: <MajorIcon size={35} styles={({ colors }) => ({ color: colors.textGray, fill: colors.textGray })} />,
    path: paths.majorsScraper,
  },
];

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <aside css={sideBarStyles.sideBar}>
      <header>
        <UgLogo size={90} />
      </header>
      <section>
        <Accordion.Root type="single" defaultValue="item-1" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger css={[sideBarStyles.onHover, sideBarStyles.accordionTrigger]}>
              <Typography styles={sideBarStyles.accordionTypography} weight="bold">
                <ModuleIcon size={35} />
                modules
              </Typography>
              <Angledown size={30} />
            </Accordion.Trigger>
            <Accordion.Content>
              {modules.map(({ icon, text, path }) => (
                <Typography
                  key={text}
                  styles={[sideBarStyles.accordionTypography, sideBarStyles.onHover]}
                  weight="bold"
                  onClick={() => navigate(path)}
                >
                  {icon}
                  {text}
                </Typography>
              ))}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <Accordion.Root type="single" defaultValue="item-2" collapsible>
          <Accordion.Item value="item-2">
            <Accordion.Trigger css={[sideBarStyles.onHover, sideBarStyles.accordionTrigger]}>
              <Typography styles={sideBarStyles.accordionTypography} weight="bold">
                <ScraperIcon size={35} />
                scrapers
              </Typography>
              <Angledown size={30} />
            </Accordion.Trigger>
            <Accordion.Content>
              {scrapers.map(({ icon, text, path }) => (
                <Typography
                  key={text}
                  styles={[sideBarStyles.accordionTypography, sideBarStyles.onHover]}
                  weight="bold"
                  onClick={() => navigate(path)}
                >
                  {icon}
                  {text}
                </Typography>
              ))}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </section>
    </aside>
  );
};

export default SideBar;

const sideBarStyles = createStyles({
  sideBar: ({ colors }) => ({
    minWidth: 320,
    minHeight: '100vh',
    backgroundColor: colors.white,
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 35,
  }),
  accordionTrigger: () => ({
    all: 'unset',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&[data-state=open] .angle-down-icon': {
      transform: 'translateY(-1px) rotate(180deg)',
    },
  }),
  accordionTypography: ({ colors }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 15,
    color: colors.textGray,
    padding: '5px',
  }),
  onHover: ({ colors }) => ({
    '&:hover': {
      backgroundColor: colors.paper,
      borderRadius: '10px',
    },
  }),
});
