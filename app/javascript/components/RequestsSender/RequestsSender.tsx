import * as React from 'react';
// Styles
import classes from './RequestsSender.module.scss';

// Semantic UI
import { Button, Input } from 'semantic-ui-react';

// Destructured variables for Button & React.
const { Group, Or } = Button;
const { useRef } = React;

// Prop types
interface Props {
  lastOutput: number;
  submitDisabled: boolean;
  setQuery: React.Dispatch<React.SetStateAction<{}>>;
  newRequest: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const RequestsSender: React.FC<Props> = ({ lastOutput, setQuery, newRequest, submitDisabled }) => {
  const keyInput = useRef(null);
  const valueInput = useRef(null);

  const addField = () => {
    let key = keyInput.current.inputRef.current.value;
    let value = valueInput.current.inputRef.current.value;
    // If value is a number, store it as a number
    value = Number(value) >= 0 ? Number(value) : value;
    setQuery((query: object) => {
      const newQuery = { ...query };
      // Set new query key value pair
      newQuery[key] = value;
      return newQuery
    });
    // Clean Inputs
    keyInput.current.inputRef.current.value = "";
    valueInput.current.inputRef.current.value = "";
  }

  return (
    <div className={classes.RequestsSender}>
      <div className={classes.Container}>
        <div className={classes.Inputs}>
          <Input
            placeholder="key"
            name="key"
            label={{ icon: 'asterisk' }}
            labelPosition='right corner'
            ref={keyInput}/>
          <Input
            placeholder="value"
            style={{ marginLeft: '1em' }}
            label={{ icon: 'asterisk' }}
            labelPosition='right corner'
            name="value"
            ref={valueInput}/>
        </div>
        <Group>
          <Button onClick={addField}>Add Field</Button>
          <Or/>
          <Button positive onClick={newRequest} disabled={submitDisabled}>Send Request</Button>
        </Group>
        <h5 style={{ margin: '1em 0 0 0' }}> Last Output = {lastOutput}</h5>
      </div>
    </div>
  );
}
