import { TextField } from '@mui/material';
import Button from './components/Button/Button';
import Dropdown from './components/Dropdown';
import InputError from './components/InputError';
import InputLabel from './components/InputLabel';
import { Typography } from './components/Typography';
import { Degree } from './shared/constants/degree';
import FormField from './components/FormField';

function App() {
  return (
    <>
      <Button label="Dupar" variant="secondary" />
      <Button label="Dupar" variant="accept" />
      <Button label="Dupar" variant="cancel" />
      <Button label="Dupar" />
      <InputLabel label="Justyna" />
      <InputError errorMessage="HEJ MEGA NIEDOBRZE" />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Dropdown value={Degree.BACHELOR}>
          <Dropdown.Trigger>
            <Dropdown.Value />
          </Dropdown.Trigger>
          <Dropdown.Content>
            {Object.values(Degree).map(degree => (
              <Dropdown.Item value={degree} key={degree}>
                <Typography>{degree}</Typography>
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </div>
      <FormField
        name="example"
        inputType="base"
        label="TU JEST LABELKA TEGO TEXT FIELDU"
        isError
        errorMessage="TU ERROR TEGO ZIOMEK"
        styles={{ input: { maxWidth: 200 } }}
      />
    </>
  );
}
export default App;
