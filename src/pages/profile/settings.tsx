import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Profile from '../../layouts/profile';
import Text from '../../components/text/text';
import Input from '../../components/form/input'
import { Row, Col } from '../../components/grid';
import Button from '../../components/button/button';
import { update } from '../../services/slices/user';
import { useAppDispatch, useAppSelector } from '../../services/store';

const validationSchema = Yup.object({
  email: Yup.string().email(),
  name: Yup.string(),
  password: Yup.string()
});

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);
  return (
    <Profile>
      <Formik
        initialValues={{
          name: user?.name,
          email: user?.email
        }}
        validationSchema={validationSchema}
        onSubmit={
          ({ name, email }, { setSubmitting }) =>
            user && dispatch(update({
              id: user.id,
              name,
              email
            })).then(() => setSubmitting(false))
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
            <Form>
              <Text variant="h3">Личные данные</Text>
              <Row>
                <Col md={6}>
                  <Input
                    className="mb-5"
                    name="name"
                    placeholder="Имя"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(touched.name && errors.name)}
                    errorText={errors?.name}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    className="mb-5"
                    name="email"
                    placeholder="E-mail"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(touched.email && errors.email)}
                    errorText={errors?.email}
                  />
                </Col>
              </Row>
              <Button type="submit" loading={isSubmitting}>Сохранить</Button>
            </Form>
          )
        }
      </Formik>
    </Profile>
  );
};

export default Settings;
