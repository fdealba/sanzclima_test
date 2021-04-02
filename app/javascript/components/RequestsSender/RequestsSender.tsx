import * as React from 'react';
import classes from './RequestsSender.module.scss';
import { Button, Input } from 'semantic-ui-react';


const { useRef } = React;

export const RequestsSender = ({ lastOutput, setQuery, query, newRequest }) => {
  const keyInput = useRef();
  const valueInput = useRef();

  const addField = (event) => {
    setQuery((query) => {
      const newQuery = { ...query };
      if (keyInput.current && valueInput.current) {
        let key = keyInput.current.inputRef.current.value;
        let value = valueInput.current.inputRef.current.value;
        value = Number(value) >= 0 ? Number(value) : value;
        // Set new query key value pair
        newQuery[key] = value;
        // Clean Inputs
        keyInput.current.inputRef.current.value = "";
        valueInput.current.inputRef.current.value = "";
      }
      return newQuery
    });
  }

  return (
  <div className={classes.RequestsSender}>
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginRight: '1em'}}>
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
      <Button.Group>
        <Button onClick={addField}>Add Field</Button>
        <Button.Or />
        <Button positive onClick={() => newRequest()} disabled={!Object.keys(query).length}>Send Request</Button>
      </Button.Group>
      <h5 style={{ margin: '1em 0 0 0' }}> Last Output = {lastOutput}</h5>
    </div>
  </div>);
}
