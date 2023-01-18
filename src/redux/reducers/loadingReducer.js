import { CHANGE_LOADING } from '../actions/loadingAction';

const initialState = {
    loading: false,
};
const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOADING:
            return {
                ...state,
                loading: action.payload.loading,
            };
    
        default:
            return state;
    }
};

export default loadingReducer;
