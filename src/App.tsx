import Button from './components/Button/Button';
import Dropdown from './components/Dropdown/Dropdown';
import { Typography } from './components/Typography/Typography';

function App() {
  return (
    <>
      <Button label="lorem ipsum" variant="secondary" />
      <Button label="lorem ipsum" variant="accept" />
      <Button label="lorem ipsum" variant="cancel" />
      <Button label="lorem ipsum" />
      <br /> <br /> <br /> <br /> <br /> <br />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Dropdown>
          <Dropdown.Trigger>
            <Dropdown.Value placeholder="Select" />
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
    </>
  );
}
export default App;
