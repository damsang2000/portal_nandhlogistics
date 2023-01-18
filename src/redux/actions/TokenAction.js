export const CHANGE_DATA_TOKEN = 'CHANGE_DATA_TOKEN';

export function changeDataToken({ token }) {
    return {
      type: CHANGE_DATA_TOKEN,
      payload: {
        token,
      },
    };
  }
