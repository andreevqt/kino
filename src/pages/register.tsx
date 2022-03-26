import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Yup from '../services/yup';
import LoginLayout from '../layouts/login';
import bg from '../images/register.jpg'
import styled from 'styled-components';
import Input from '../components/form/input';
import PasswordInput from '../components/form/password';
import Button from '../components/button/button';
import Text from '../components/text/text';
import Mail from '../icons/mail';
import { useAppDispatch, useAppSelector } from '../services/store';
import { register } from '../services/slices/user';

const validationSchema = Yup.object({
  email: Yup.string().label('E-mail').email().required(),
  password: Yup.string().label('Пароль').required()
});

const StyledForm = styled(Form)`
  flex: 0 1 500px;
`;

type TFormValues = {
  email: string;
  name: string;
  password: string;
};

const initialValues: TFormValues = {
  email: '',
  name: '',
  password: ''
};

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <LoginLayout background={bg}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => dispatch(register(data))
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
            <StyledForm>
              <Text variant="h3" className="mb-10">Регистрация аккаунта</Text>
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
              <Input
                name="name"
                placeholder="Имя"
                className="mb-5"
                type="text"
                error={!!(touched.name && errors.name)}
                errorText={errors?.name}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Text
                variant="paragraph"
                className="mb-10 d-flex"
              >
                Уже есть аккаунт?&nbsp;
                <Link to="/login" className="link">Войти</Link>
              </Text>
              <Button
                type="submit"
                size="big"
                fullWidth
                loading={isSubmitting}
              >
                Зарегистрироваться
              </Button>
            </StyledForm>
          )
        }
      </Formik>
    </LoginLayout>
  );
};

export default Register;
