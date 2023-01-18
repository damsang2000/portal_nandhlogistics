export const CHANGE_DATA_ID_CHUHANG = 'CHANGE_DATA_CHUHANG';

export function changeDataChuHang({ idchuhang }) {
    return {
      type: CHANGE_DATA_ID_CHUHANG,
      payload: {
        idchuhang,
      },
    };
  }
  
