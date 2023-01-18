import Cookies from 'universal-cookie';
import { 
        CHANGE_DATA_NAME_CHUHANG,
    } from '../actions/tenChuHangAction';

const initialState = { 
    namechuhang: '',
};

// eslint-disable-next-line consistent-return
const ChuHangNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DATA_NAME_CHUHANG:
            return {
                ...state,
                namechuhang: action.payload.namechuhang,
            };
        default:
            return state;
    }
};

export default ChuHangNameReducer;
