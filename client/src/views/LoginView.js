import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    let { name, value } = event.target;
    switch(name) {
        case 'usernameInput':
            setUsername(value);
            break;
        case 'passwordInput':
            setPassword(value);
            break;
        default:
            break;
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.doLoginCb(username, password); 
    setUsername('');
    setPassword('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control 
            type="text" 
            placeholder="Enter username, not email" 
            name="usernameInput"
            value={username}
            required
            onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
            type="password" 
            placeholder="Enter password" 
            name="passwordInput"
            value={password}
            required
            onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
