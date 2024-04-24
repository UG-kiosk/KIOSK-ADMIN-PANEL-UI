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
      <Button label="lorem ipsum" variant="secondary" />
      <Button label="lorem ipsum" variant="accept" />
      <Button label="lorem ipsum" variant="cancel" />
      <Button label="lorem ipsum" />
      <br /> <br /> <br /> <br /> <br /> <br />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Dropdown value="lorem">
          <Dropdown.Trigger>
            <Dropdown.Value />
          </Dropdown.Trigger>
          <Dropdown.Content>
            {['lorem', 'ipsum', 'dolor', 'ehehehe', 'looooooooooorem'].map(degree => (
              <Dropdown.Item value={degree} key={degree}>
                <Typography>{degree}</Typography>
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </div>
      {/* <FormField
        name="example"
        inputType="base"
        label="Lorem ipsum"
        isError
        errorMessage="this is an error message"
        styles={{ input: { maxWidth: 200 } }}
      /> */}
    </>
  );
}
export default App;
