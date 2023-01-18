import Cookies from 'universal-cookie';
import { CHANGE_DATA_TOKEN } from '../actions/TokenAction';

const initialState = { 
    token: '',
};

// eslint-disable-next-line consistent-return
const TokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DATA_TOKEN:
            return {
                ...state,
                token: action.payload.token,
            };
        default:
            return state;
    }
};

export default TokenReducer;
