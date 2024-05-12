import Tile from './components/Tile/Tile';
import { EctsSubject } from './modules/ects/ectsForm/types/ectsSubject';
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
  return (
    <div>
      <Tile object={exampleEctsSubject} arrayOfKey={['subject', 'term']} />
      <Tile object={verylongName} arrayOfKey={['subject', 'term']} />
    </div>
  );
}
export default App;
