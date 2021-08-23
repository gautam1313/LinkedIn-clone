import { SET_LOADER } from "../action/actionType";
const initState = {
  loading: false,
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default articleReducer;
