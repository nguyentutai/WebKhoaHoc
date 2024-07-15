import { useEffect, useState } from "react";
import ICousrse from "../../interfaces/ICousrse";
import CourseFreePage from "../../pages/Website/HomePage/CourseFreePage";
import instans from "../../utils/Axios";

const CourseFree = () => {
  const [courseFree, setCourseFree] = useState<ICousrse[]>([]);
  useEffect(() => {
    // (async () => {
    //   const { data } = await instans.get("/category/66916d6a627071b7fe8aa6bd");
    //   setCourseFree(data?.coursesId);
    // })();
    fetch("http://localhost:3000/api/category/66916d6a627071b7fe8aa6bd")
      .then((res) => res.json())
      .then((data) => {
        setCourseFree(data?.data?.coursesId);
      });
  }, []);
  return (
    <>
      <CourseFreePage listCourse={courseFree} />
    </>
  );
};

export default CourseFree;
