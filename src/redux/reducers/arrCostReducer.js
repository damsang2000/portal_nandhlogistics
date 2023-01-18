import { CHANGE_DATA_ARR_COST } from '../actions/arrCostActions';

const initialState = {
  arrCost: [],
};

// eslint-disable-next-line consistent-return
const arrCostReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATA_ARR_COST:
      return {
        ...state,
        arrCost: action.payload.arrCost,
      };
    default:
      return state;
  }
};

export default arrCostReducer;
