import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import LoginLayout from '../layouts/login';
import bg from '../images/register.jpg'
import styled from 'styled-components';
import Input from '../components/form/input';
import PasswordInput from '../components/form/password';
import Button from '../components/button/button';
import Text from '../components/text/text';
import Mail from '../icons/mail';
import { useAppDispatch, useAppSelector } from '../services/store';
import { register as registerThunk } from '../services/slices/user';
import { EMAIL_PATTERN } from '../constants';

const Form = styled.form`
  flex: 0 1 500px;
  border-radius: 20px;
`;

type TFormValues = {
  email: string;
  name: string;
  password: string;
};

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<TFormValues>({
    mode: 'onTouched'
  });

  const { user, isLoading } = useAppSelector((store) => store.user);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <LoginLayout background={bg}>
      <Form onSubmit={handleSubmit((data) => dispatch(registerThunk(data)))}>
        <Text variant="h3" className="mb-10">Регистрация аккаунта</Text>
        <Input
          placeholder="E-mail"
          className="mb-5"
          type="email"
          icon={<Mail width="16" height="16" />}
          error={!!errors.email}
          errorText={errors?.email?.message}
          {...register('email', { required: 'Требуемое поле', pattern: { value: EMAIL_PATTERN, message: 'Должен быть корректный email' } })}
        />
        <PasswordInput
          placeholder="Пароль"
          className="mb-5"
          error={!!errors.password}
          errorText={errors?.password?.message}
          {...register('password', { required: 'Требуемое поле' })}
        />
        <Input
          placeholder="Имя"
          className="mb-5"
          type="text"
          error={!!errors.name}
          errorText={errors?.name?.message}
          {...register('name', { required: 'Требуемое поле' })}
        />
        <Text variant="paragraph" className="mb-10 d-flex">Уже есть аккаунт?&nbsp;
          <Link to="/login" className="link">Войти</Link>
        </Text>
        <Button type="submit" size="big" fullWidth loading={isLoading}>Отправить</Button>
      </Form>
    </LoginLayout>
  );
};

export default Register;
