import * as React from 'react';

// Semantic UI components
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

// Destructured variables for Modal && React
const { Content, Actions } = Modal;
const { useState } = React;

// Prop Types
interface Props {
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
}

const ErrorModal: React.FC<Props> = ({ setError, errorMessage }) => {
  const [open, setOpen] = useState(true)

  const closeAndRemoveError = () => {
    setOpen(false);
    setError(false);
  }

  return (
    <Modal
      basic
      onClose={closeAndRemoveError}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
    >
      <Header icon>
        <Icon name='x' />
        Error
      </Header>
      <Content>
        <p>
          {errorMessage}
        </p>
      </Content>
      <Actions>
        <Button
          basic
          color='red'
          inverted
          onClick={closeAndRemoveError}
          data-testid="close">
          <Icon name='remove' />
          Close
        </Button>
      </Actions>
    </Modal>
  )
}

export default ErrorModal;