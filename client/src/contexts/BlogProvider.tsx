import { ReactNode, createContext, useReducer } from "react";
import { IBlog } from "../interfaces/IBlog";

interface Props {
  children: ReactNode;
}

export const BlogContext = createContext(
  {} as {
    blogs: IBlog[];
    dispatchBlog: any;
  }
);

const reducerBlog = (state: any, action: any) => {
  switch (action.type) {
    case "SET_BLOG":
      return action.payload;
    case "ADD_BLOG":
      return [...state, action.payload];
    case "DELETE_BLOG":
      return state.filter((item: IBlog) => item._id != action.payload);
    case "UPDATE_BLOG":
      return state.map((item: IBlog) => {
        if (item._id == action.payload._id) return action.payload;
        return item;
      });
    default:
      return state;
  }
};

export const BlogProvider = (props: Props) => {
  const [blogs, dispatchBlog] = useReducer(reducerBlog, [] as IBlog[]);
  return (
    <BlogContext.Provider
      value={{
        blogs,
        dispatchBlog,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};
