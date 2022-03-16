import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const formatDate = (date: string) => moment(date)
  .format('D MMMM YYYY в HH:mm');

export default formatDate;
