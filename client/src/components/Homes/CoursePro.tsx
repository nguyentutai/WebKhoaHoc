import { useEffect, useState } from "react";
import ICousrse from "../../interfaces/ICousrse";
import CourseProPage from "../../pages/Website/HomePage/CourseProPage";

const CoursePro = () => {
  const [coursePro, setCoursePro] = useState<ICousrse[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/category/66910452441748983341e9ff")
      .then((res) => res.json())
      .then((data) => {
        setCoursePro(data?.data?.coursesId);
      });
  }, []);
  return (
    <>
      <CourseProPage listCourse={coursePro} />
    </>
  );
};

export default CoursePro;
