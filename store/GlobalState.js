import { createContext, useReducer, useEffect } from "react";
import { getData } from "../utils/fetchData";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    modal: {},
    orders: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accesstoken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");

        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }
  }, []);
  useEffect(() => {
    const next_cart = JSON.parse(localStorage.getItem("next_cart"));
    if (next_cart) dispatch({ type: "ADD_CART", payload: next_cart });
  }, []);
  useEffect(() => {
    localStorage.setItem("next_cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
