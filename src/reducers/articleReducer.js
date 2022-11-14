import { SET_LOADING_STATUS } from "../actions/actionType";
export const initialState = {
    loading: false,
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.loading,
            };
        default:
            return state;
    }
}

export default articleReducer;