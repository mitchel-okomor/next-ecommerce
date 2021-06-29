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
    default:
      return state;
  }
};

export default reducers;