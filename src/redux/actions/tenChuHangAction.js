export const CHANGE_DATA_NAME_CHUHANG = 'CHANGE_DATA_NAME_CHUHANG';

export function changeDataNameChuHang({ namechuhang }) {
    return {
      type: CHANGE_DATA_NAME_CHUHANG,
      payload: {
        namechuhang,
      },
    };
  }
  
