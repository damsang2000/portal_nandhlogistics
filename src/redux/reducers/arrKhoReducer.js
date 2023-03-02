import Cookies from 'universal-cookie';
import { CHANGE_DATA_ARR_KHO } from '../actions/arrKhoAction';

const initialState = {
  idKho: '',
};

// eslint-disable-next-line consistent-return
const KhoArrReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATA_ARR_KHO:
      return {
        ...state,
        idKho: action.payload.idKho,
      };
    default:
      return state;
  }
};

export default KhoArrReducer;
