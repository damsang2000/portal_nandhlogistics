export const GET_ID_FIRST = 'GET_ID_FIRST';

export function getIDFirst({ idfirst, tenVietTat, tenChuHang }) {
    return {
      type: GET_ID_FIRST,
      payload: {
        idfirst,
        tenVietTat,
        tenChuHang,
      },
    };
}
  
