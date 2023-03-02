import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { changeDataChuHang } from '../../redux/actions/ChuHangAction';

const ligthTheme = {
  backgroundColor: 'white',
  color: '#646777',
};

const darkTheme = {
  backgroundColor: '#2e2c34',
  color: '#dddddd',
};

export const themes = {
  ligthTheme,
  darkTheme,
};
const cookies = new Cookies();

export const emailPatter =
  /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
export const urlPattern =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;

export const toPercent = (decimal, fixed = 0) => `${decimal.toFixed(fixed)}%`;

const getTooltipStyles = (themeName, type) => {
  switch (themeName) {
    case 'dark': {
      const { backgroundColor, color } = darkTheme;
      return {
        contentStyle: { backgroundColor },
        itemStyle: type === 'defaultItems' ? null : { color },
      };
    }
    case 'light': {
      return ligthTheme;
    }
    default:
      return ligthTheme;
  }
};

export const firstLetterToUpperCase = (str) => {
  if (!str) return '';

  const firstLetterUpperCase = str[0].toUpperCase();
  return `${firstLetterUpperCase}${str.slice(1)}`;
};
export const formatDateTime = (date) => date.split('/').reverse().join('-');
export const formarDateTimeddmmyyy = (date) =>
  date.split('-').reverse().join('/');
export const formatDateTimeddmmyyyy1 = (date) => date.split('-').join('/');
export const formatDateTimemmddyyyy = (date) => {
  const getddmm = date.split('/').slice(0, 2).reverse();
  const getyyyy = date.split('/').slice(2);
  const joinddmmyyyy = [...getddmm, ...getyyyy].join('/');
  return joinddmmyyyy;
};
export const formatDateTimemmddyyyy1 = (date) => {
  const getddmm = date.split('-').slice(1, 3);

  const getyyyy = date.split('-').slice(0, 1);

  const joinddmmyyyy = [...getddmm, ...getyyyy].join('/');
  return joinddmmyyyy;
};

export const mapDataRender = (data, dataNew) => {
  if (data && data.length !== 0) {
    const arrMap = data.map((item, index) => ({
      key: index,
      ...item,
    }));
  }
};

export default getTooltipStyles;
