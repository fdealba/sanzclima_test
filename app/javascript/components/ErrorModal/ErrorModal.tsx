import * as React from 'react';

// Semantic UI components
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

// Destructured variables for Modal && React
const { Content, Actions } = Modal;
const { useState } = React;

// Prop Types
interface Props {
  setError: (fn: Function | boolean) => void;
  errorMessage: string;
}

const ErrorModal: React.FC<Props> = ({ setError, errorMessage }) => {
  const [open, setOpen] = useState(true)

  return (
    <Modal
      basic
      onClose={() => {
        setOpen(false);
        setError(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
    >
      <Header icon>
        <Icon name='x icon' />
        Error
      </Header>
      <Content>
        <p>
          {errorMessage}
        </p>
      </Content>
      <Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' />
          Close
        </Button>
      </Actions>
    </Modal>
  )
}

export default ErrorModal;