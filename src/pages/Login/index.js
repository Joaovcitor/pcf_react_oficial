import React from "react";
import { Container } from "../../styles/GlobalStyle";
import { Form } from './styled';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e => {
    e.preventDefault();
    console.log(email, password)
  })

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" />
        <button type="submit">Acessar</button>
      </Form>
    </Container>

  );
}
