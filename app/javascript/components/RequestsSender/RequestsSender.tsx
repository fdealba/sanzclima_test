import * as React from 'react';
import classes from './RequestsSender.module.scss';
import axios from 'axios';
import { Button, Input } from 'semantic-ui-react';


const { useState, useEffect } = React;

const constructObject = (keys, values) => {
  let obj = {}
  keys.forEach((key, idx) => {
    obj[key.value] = Number(values[idx].value) >= 0 ? Number(values[idx].value) : values[idx].value;
  })
  return obj;
}

export const RequestsSender = () => {
  const [fields, setFields] = useState(1);
  const [lastOutput, setLastOutput] = useState(0);

  const keyValuePairs = [...Array(fields)].map((field, idx) => (
      <div key={idx} className={classes.Inputs}>
        <Input placeholder="key" name="key"/>
        <Input placeholder="value" style={{ marginLeft: '1em' }} name="value"/>
      </div>
  ))

  useEffect(( ) => {
    setLastOutput(Number(localStorage.getItem("last_output") ? localStorage.getItem("last_output") : 0));
  }, [])

  const AddNewField = (event) => {
    setFields(fields + 1);
  }

  const makePostRequest = (args) => {
    axios.post('api/v1/requests/new', {
      ...args
    }).then(response => {
      console.log(response);
      localStorage.setItem('last_output', response.data.output);
      setLastOutput(response.data.output);
    })
  }

  const newRequest = (event) => {
    const keys = document.querySelectorAll('input[name="key"]');
    const values = document.querySelectorAll('input[name="value"]');
    const args = constructObject(Array.from(keys), Array.from(values));
    makePostRequest(args);
  }
  
  return (
  <div className={classes.RequestsSender}>
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginRight: '1em'}}>
      {keyValuePairs}
      <Button.Group>
        <Button onClick={AddNewField}>New Field</Button>
        <Button.Or />
        <Button positive onClick={newRequest}>Send Request</Button>
      </Button.Group>
      <h5 style={{ margin: '1em 0 0 0' }}>Last Output = {lastOutput}</h5>
    </div>
  </div>);
}
