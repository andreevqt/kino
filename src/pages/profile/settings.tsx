import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Profile from '../../layouts/profile';
import Text from '../../components/text/text';
import Input from '../../components/form/input'
import FileUpload from '../../components/form/file-upload';
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
      {
        user && (
          <Formik
            initialValues={{
              image: undefined,
              name: user.name,
              email: user.email,
              vk: user.vk,
              facebook: user.facebook,
              telegram: user.telegram
            }}
            validationSchema={validationSchema}
            onSubmit={(attrs, { setSubmitting }) => dispatch(update({ id: user.id, ...attrs }))
              .then(() => setSubmitting(false))
            }
          >
            {
              ({
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                values,
                isSubmitting
              }) => (
                <Form>
                  <Row>
                    <Col md={8}>
                      <Text variant="h5">Личные данные</Text>
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
                      <Text variant="h5">Соц. сети</Text>
                      <Input
                        className="mb-5"
                        name="vk"
                        placeholder="VK"
                        type="text"
                        value={values.vk}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.vk && errors.vk)}
                        errorText={errors?.vk}
                      />
                      <Input
                        className="mb-5"
                        name="facebook"
                        placeholder="Facebook"
                        type="text"
                        value={values.facebook}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.facebook && errors.facebook)}
                        errorText={errors?.facebook}
                      />
                      <Input
                        className="mb-5"
                        name="telegram"
                        placeholder="Telegram"
                        type="text"
                        value={values.telegram}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.telegram && errors.telegram)}
                        errorText={errors?.telegram}
                      />
                    </Col>
                    <Col md={4} className="pl-10">
                      <FileUpload
                        label="Изображение профиля"
                        src={user.image.url}
                        value={values.image}
                        onChange={(file) => setFieldValue('image', file)}
                      />
                    </Col>
                  </Row>
                  <Button type="submit" loading={isSubmitting}>Сохранить</Button>
                </Form>
              )
            }
          </Formik>
        )
      }
    </Profile >
  );
};

export default Settings;
