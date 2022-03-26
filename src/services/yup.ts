import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: '${path} требуемое поле'
  },
  string: {
    email: '${path} должен быть корректный E-mail'
  }
});

export default Yup;
