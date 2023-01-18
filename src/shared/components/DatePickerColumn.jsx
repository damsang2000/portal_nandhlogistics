import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import useFormatDate from '../../hook/useFormatDate';
import { formatDateTime } from '../helpers';
import dayjs from 'dayjs';

const DatePickerColumn = ({ fHandle, title, children, setpage }) => {
  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);
  return (
    <>
      {title}
      {children}
      <DatePicker
        size="small"
        className="createDateRangePicker"
        popupClassName="createDateRangePicker"
        defaultValue={dayjs(date, dateFormat)}
        // defaultValue={
        //   localStorage.getItem('dateimportexporttoday')
        //     ? dayjs(
        //         formarDateTimeddmmyyy(
        //           localStorage.getItem('dateimportexporttoday')
        //         ),
        //         dateFormat
        //       )
        //     : dayjs(date, dateFormat)
        // }
        format={dateFormat}
        onChange={(value, dateString) => {
          fHandle(formatDateTime(dateString));
          console.log(dateString);
        }}
      />
    </>
  );
};

export default DatePickerColumn;
