import Cookies from 'universal-cookie';
import { CHANGE_DATA_ARR_CHUHANG } from '../actions/arrChuHangAction';

const cookie = new Cookies();
const initialState = { 
    arrChuHang: [],
};

// eslint-disable-next-line consistent-return
const ChuHangArrReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DATA_ARR_CHUHANG:
            return {
                ...state,
                arrChuHang: action.payload.arrChuHang,
            };
        default:
            return state;
    }
};

export default ChuHangArrReducer;
