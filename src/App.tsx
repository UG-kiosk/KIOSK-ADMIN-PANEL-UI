import Tile from './components/Tile/Tile';
import { EctsSubject } from './modules/ects/types/ectsSubject';
import { useNavigate } from 'react-router';
const exampleEctsSubject: EctsSubject = {
  subject: 'Mathematics',
  lectureHours: 30,
  recitationHours: 10,
  labsHours: 20,
  pass: 'Passing grade',
  ects: 5,
  major: 'Computer Science',
  degree: 'Bachelor',
  term: 1,
  year: '2022',
  recruitmentYear: [2021, 2022],
  speciality: 'Advanced Calculus',
};

const verylongName: EctsSubject = {
  subject:
    'MathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematicsMathematics',
  lectureHours: 30,
  recitationHours: 10,
  labsHours: 20,
  pass: 'Passing grade',
  ects: 5,
  major: 'Computer Science',
  degree: 'Bachelor',
  term: 1,
  year: '2022',
  recruitmentYear: [2021, 2022],
  speciality: 'Advanced Calculus',
};

function App() {
  const navigate = useNavigate();

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Tile object={exampleEctsSubject} arrayOfKey={['subject', 'term']} />
      <Tile object={verylongName} arrayOfKey={['subject', 'term']} />
      <button onClick={() => navigate(-1)}></button>
    </div>
  );
}
export default App;
