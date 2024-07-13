import { ReactNode, createContext, useReducer } from "react";
import { IOrder } from "../interfaces/IOrder";

interface Props {
  children: ReactNode;
}

export const OrderContext = createContext(
  {} as {
    orders: IOrder[];
    dispatchOrder: any;
  }
);

const reducerPro = (state: any, action: any) => {
  switch (action.type) {
    case "SET_ORDER":
      return action.payload;
    case "ADD_ORDER":
      return [...state, action.payload];
    case "DELETE_ORDER":
      return state.filter((item: IOrder) => item._id != action.payload._id);
    case "UPDATE_ORDER":
      return state.map((item: IOrder) => {
        if (item._id == action.payload._id) return action.payload;
        return item;
      });
    default:
      return state;
  }
};

export const OrderProvider = (props: Props) => {
  const [orders, dispatchOrder] = useReducer(reducerPro, [] as IOrder[]);
  return (
    <OrderContext.Provider
      value={{
        orders,
        dispatchOrder,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};
