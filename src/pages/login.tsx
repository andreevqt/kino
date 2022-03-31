import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Yup from '../services/yup';
import LoginLayout from '../layouts/login';
import bg from '../images/bg-min.jpg'
import styled from 'styled-components';
import Input from '../components/form/input';
import PasswordInput from '../components/form/password';
import Button from '../components/button/button';
import Text from '../components/text/text';
import Mail from '../icons/mail';
import { useAppDispatch, useAppSelector } from '../services/store';
import { login } from '../services/slices/user';
import { TLocationState } from '../types/common';

const validationSchema = Yup.object({
  email: Yup.string().label('E-mail').email().required(),
  password: Yup.string().label('Пароль').required()
});

const StyledForm = styled(Form)`
  flex: 0 1 500px;
`;

type TFormValues = {
  email: string;
  password: string;
};

const initialValues: TFormValues = {
  email: '',
  password: ''
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationState>();
  const { user } = useAppSelector((store) => store.user);

  return (
    <LoginLayout background={bg}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => dispatch(login(data))
          .then(() => setSubmitting(false))
        }
      >
        {
          ({
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
            isSubmitting
          }) => (
            <>
              {
                user && !isSubmitting && (
                  <Redirect
                    to={{
                      pathname: location.state?.from?.pathname || '/',
                      ...(location.state && { state: location.state.from?.state })
                    }}
                  />
                )
              }
              <StyledForm>
                <Text variant="h3" className="mb-10">Добро пожаловать!</Text>
                <Input
                  name="email"
                  placeholder="E-mail"
                  className="mb-5"
                  type="email"
                  icon={<Mail width="16" height="16" />}
                  error={!!(touched.email && errors.email)}
                  errorText={errors?.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <PasswordInput
                  name="password"
                  placeholder="Пароль"
                  className="mb-5"
                  error={!!(touched.password && errors.password)}
                  errorText={errors?.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Text variant="paragraph" className="mb-10 d-flex">Нет аккаунта?&nbsp;
                  <Link to="/register" className="link">Регистрация</Link>
                  <Link to="/forgot-password" className="link ml-auto">Забыли пароль?</Link>
                </Text>
                <Button type="submit" size="big" fullWidth loading={isSubmitting}>Войти</Button>
              </StyledForm>
            </>
          )
        }
      </Formik>
    </LoginLayout>
  );
};

export default Login;
