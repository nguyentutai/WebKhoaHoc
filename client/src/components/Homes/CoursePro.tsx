import { useEffect, useState } from "react";
import ICousrse from "../../interfaces/ICousrse";
import CourseProPage from "../../pages/HomePage/CourseProPage";

const CoursePro = () => {
    const [coursePro, setCoursePro] = useState<ICousrse[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/courses')
            .then(res => res.json())
            .then(data => {
                setCoursePro(data);
            })
    }, [])
    return (
        <>
            <CourseProPage listCourse={coursePro} />
        </>
    )
}

export default CoursePro;