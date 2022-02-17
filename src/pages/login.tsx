import React from 'react';
import LoginLayout from '../layouts/login';
import bg from '../images/bg-min.jpg'
import styled from 'styled-components';
import Input from '../components/form/input';
import { Row, Col, Container } from '../components/grid'

const Form = styled.form`
  padding: 30px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background.base};
`;

const Login: React.FC = () => {
  return (
    <LoginLayout background={bg}>
      <Container>
        <Row center>
          <Col md={6}>
            <Form>
              <Input />
            </Form>
          </Col>
        </Row>
      </Container>
    </LoginLayout>
  );
};

export default Login;
