import * as React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ErrorComponent = ({ setError, errorMessage }) => {
  const [open, setOpen] = React.useState(true)

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
      <Modal.Content>
        <p>
          {errorMessage}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ErrorComponent;