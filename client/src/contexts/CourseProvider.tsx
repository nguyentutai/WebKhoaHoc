import { ReactNode, createContext, useReducer } from "react";
import ICousrse from "../interfaces/ICousrse";

interface Props {
  children: ReactNode;
}

export const CourseContext = createContext(
  {} as {
    courses: ICousrse[];
    dispatchCourses: any;
  }
);

const reducerPro = (state: any, action: any) => {
  switch (action.type) {
    case "SET_COURSE":
      return action.payload;
    case "ADD_COURSE":
      return [...state, action.payload];
    case "DELETE_COURSE":
      return state.filter((item: ICousrse) => item._id != action.payload._id);
    case "UPDATE_COURSE":
      return state.map((item: ICousrse) => {
        if (item._id == action.payload._id) return action.payload;
        return item;
      });
    default:
      return state;
  }
};

export const CoursesProvider = (props: Props) => {
  const [courses, dispatchCourses] = useReducer(reducerPro, [] as ICousrse[]);
  return (
    <CourseContext.Provider
      value={{
        courses,
        dispatchCourses,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};
