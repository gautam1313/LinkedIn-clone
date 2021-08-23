import { SET_LOADER, GET_ARTICLES } from "../action/actionType";
const initState = {
  loading: false,
  articles: [],
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loading: action.loading,
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    default:
      return state;
  }
};

export default articleReducer;
