import React from 'react';
import { Link } from 'react-router-dom';
import LoginLayout from '../layouts/login';
import bg from '../images/bg-min.jpg'
import styled from 'styled-components';
import Input from '../components/form/input';
import { Row, Col, Container } from '../components/grid'
import Button from '../components/button/button';
import Text from '../components/text/text';
import Mail from '../icons/mail';

const FormContainer = styled(Col)`
  background-color: ${({ theme }) => theme.colors.background.base};
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  flex: 0 1 500px;
  border-radius: 20px;
`;

const Login: React.FC = () => {
  return (
    <LoginLayout background={bg}>
      <Container fullWidth gutter={false}>
        <Row end gutter={false}>
          <FormContainer md={6}>
            <Form>
              <Text variant="h3" className="mb-10">Добро пожаловать!</Text>
              <Input name="email" placeholder="E-mail" className="mb-5" icon={<Mail width="16" height="16" />} />
              <Input name="password" placeholder="Пароль" className="mb-5" />
              <Text variant="paragraph" className="mb-10 d-flex">Нет аккаунта?&nbsp;
                <Link to="/register" className="link">Регистрация</Link>
                <Link to="/forgot-password" className="link ml-auto">Забыли пароль?</Link>
              </Text>
              <Button size="big" fullWidth>Войти</Button>
            </Form>
          </FormContainer>
        </Row>
      </Container>
    </LoginLayout>
  );
};

export default Login;
