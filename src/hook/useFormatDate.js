import moment from 'moment';
import { formatDateTime } from '../shared/helpers';

const useFormatDate = (numberDate) => {
  //! state datetime 7 date
  const d = new Date();
  const today = moment(d).subtract(numberDate, 'day');
  const todayformat = today.format('DD/MM/YYYY');
  const todayformat7day = formatDateTime(todayformat);
  const dateFormat1 = moment().format('YYYY-MM-DD');
  const date = moment().format('DD/MM/YYYY');
  const dateFormat = 'DD/MM/YYYY';
  return [todayformat, todayformat7day, dateFormat1, date, dateFormat];
};

export default useFormatDate;
