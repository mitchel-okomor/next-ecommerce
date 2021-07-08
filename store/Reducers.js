import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: payload,
      };

    case ACTIONS.AUTH:
      return {
        ...state,
        auth: payload,
      };
    case ACTIONS.ADD_CART:
      return {
        ...state,
        cart: payload,
      };
    case ACTIONS.ADD_MODAL:
      return {
        ...state,
        modal: payload,
      };
    case ACTIONS.ADD_ORDERS:
      return {
        ...state,
        orders: payload,
      };
    case ACTIONS.ADD_USERS:
      return {
        ...state,
        users: payload,
      };
    case ACTIONS.ADD_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};

export default reducers;
