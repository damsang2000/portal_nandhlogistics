export const CHANGE_DATA_ARR_COST = 'CHANGE_DATA_ARR_COST';

export function changeDataArrCost({ arrCost }) {
  return {
    type: CHANGE_DATA_ARR_COST,
    payload: {
      arrCost,
    },
  };
}
