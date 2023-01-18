export const CHANGE_DATA_ARR_CHUHANG = 'CHANGE_DATA_ARR_CHUHANG';

export function changeDataArrChuHang({ arrChuHang }) {
    return {
      type: CHANGE_DATA_ARR_CHUHANG,
      payload: {
        arrChuHang,
      },
    };
  }
