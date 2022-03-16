import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { create } from '../../services/slices/review';
import { useAppDispatch, useAppSelector } from '../../services/store';
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

const CreateReview: React.FC = () => {
  const history = useHistory();
  const { movieId } = useParams<{ movieId: string }>();

  const { isLoading } = useAppSelector((store) => store.review.create);
  const dispatch = useAppDispatch();

  const { register, control, handleSubmit, formState: {
    errors
  } } = useForm<TFormValues>({
    mode: 'onTouched',
    defaultValues: {
      title: '',
      content: '',
      rating: 10
    }
  });

  const onSubmit = (data: TFormValues) => {
    dispatch(create({ movieId: +movieId, ...data }))
      .then(() => history.goBack());
  };

  return (
    <>
      <Text variant="h3" className="mt-10 mb-10">Новая рецензия</Text>
      <form onSubmit={handleSubmit(onSubmit)} >
        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Rating
              className="mb-10"
              label="Рейтинг"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Input
          placeholder="Заголовок"
          className="mb-5"
          error={!!errors.title}
          errorText={errors?.title?.message}
          {...register('title', { required: 'Требуемое поле' })}
        />
        <Input
          placeholder="Текст"
          className="mb-10"
          rows={10}
          error={!!errors.content}
          errorText={errors?.content?.message}
          {...register('content', { required: 'Требуемое поле' })}
        />
        <Buttons>
          <Button type="submit" size="big" loading={isLoading}>
            Опубликовать
          </Button>
        </Buttons>
      </form>
    </>
  );
};

export default CreateReview;
