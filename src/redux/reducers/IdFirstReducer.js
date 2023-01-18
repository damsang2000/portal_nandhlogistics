import Cookies from 'universal-cookie';
import { GET_ID_FIRST } from '../actions/getIDFirstAction';

const cookie = new Cookies();
const initialState = { 
    idfirst: '',
    tenVietTat: '',
    tenChuHang: '',
};

// eslint-disable-next-line consistent-return
const idFirstReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ID_FIRST:
            return {
                ...state,
                idfirst: action.payload.idfirst,
                tenVietTat: action.payload.tenVietTat,
                tenChuHang: action.payload.tenChuHang,
            };
        default:
            return state;
    }
};

export default idFirstReducer;
