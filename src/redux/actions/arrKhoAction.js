export const CHANGE_DATA_ARR_KHO = 'CHANGE_DATA_ARR_KHO';

export function changeDataArrKho({ idKho }) {
  return {
    type: CHANGE_DATA_ARR_KHO,
    payload: {
      idKho,
    },
  };
}
