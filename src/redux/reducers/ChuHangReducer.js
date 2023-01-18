import Cookies from 'universal-cookie';
import { 
        CHANGE_DATA_ID_CHUHANG,
    } from '../actions/ChuHangAction';

const cookie = new Cookies();
const initialState = { 
    idchuhang: cookie.get('idfirst'),
};

// eslint-disable-next-line consistent-return
const ChuHangReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DATA_ID_CHUHANG:
            return {
                ...state,
                idchuhang: action.payload.idchuhang,
            };
        default:
            return state;
    }
};

export default ChuHangReducer;
