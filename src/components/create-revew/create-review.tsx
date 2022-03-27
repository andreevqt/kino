import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import Yup from '../../services/yup';
import { create } from '../../services/slices/edit-review';
import { useAppDispatch } from '../../services/store';
import Button from '../button/button';
import Input from '../form/input';
import Rating from '../form/rating';
import Text from '../text/text';

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type TFormValues = {
  title: string;
  content: string;
  rating: number;
};

const initialValues: TFormValues = {
  title: '',
  content: '',
  rating: 10
};

const validationSchema = Yup.object({
  title: Yup.string().label('Заголовок').required(),
  content: Yup.string().label('Текст').required(),
  rating: Yup.number().min(1).max(10)
});

const CreateReview: React.FC = () => {
  const history = useHistory();
  const { movieId } = useParams<{ movieId: string }>();

  const dispatch = useAppDispatch();

  return (
    <>
      <Text variant="h3" className="mt-10 mb-10">Новая рецензия</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => dispatch(create({
          movieId: +movieId,
          ...data
        })).then(() => {
          setSubmitting(false);
          history.goBack();
        })}
      >
        {
          ({
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            values,
            isSubmitting
          }) => (
            <Form>
              <Rating
                className="mb-10"
                label="Рейтинг"
                onChange={(value) => setFieldValue('rating', value)}
                value={values.rating}
              />
              <Input
                placeholder="Заголовок"
                className="mb-5"
                error={!!(touched.title && errors.title)}
                errorText={errors?.title}
                onChange={handleChange}
                onBlur={handleBlur}
                name="title"
                value={values.title}
              />
              <Input
                placeholder="Текст"
                className="mb-10"
                rows={10}
                error={!!(touched.content && errors.content)}
                errorText={errors?.content}
                onChange={handleChange}
                onBlur={handleBlur}
                name="content"
                value={values.content}
              />
              <Buttons>
                <Button type="submit" size="big" loading={isSubmitting}>
                  Опубликовать
                </Button>
              </Buttons>
            </Form>
          )
        }
      </Formik>
    </>
  );
};

export default CreateReview;
