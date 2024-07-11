import { ReactNode, createContext, useReducer } from "react";
import { ICategory } from "../interfaces/ICategory";

interface Props {
  children: ReactNode;
}

export const CategoryContext = createContext(
  {} as {
    categorys: ICategory[];
    dispatchCategoty: any;
  }
);

const reducerPro = (state: any, action: any) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return action.payload;
    case "ADD_CATEGORY":
      return [...state, action.payload];
    case "DELETE_CATEGORY":
      return state.filter((item: ICategory) => item._id != action.payload);
    case "UPDATE_CATEGORY":
      return state.map((item: ICategory) => {
        if (item._id == action.payload._id) return action.payload;
        return item;
      });
    default:
      return state;
  }
};

export const CategoryProvider = (props: Props) => {
  const [categorys, dispatchCategoty] = useReducer(
    reducerPro,
    [] as ICategory[]
  );
  return (
    <CategoryContext.Provider
      value={{
        categorys,
        dispatchCategoty,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
