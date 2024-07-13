import Banner from "../../../components/Homes/Banner";
import CourseFree from "../../../components/Homes/CourseFree";
import CoursePro from "../../../components/Homes/CoursePro";

const HomePage = () => {
  // callApi KHóa học
  return (
    <div className="container3">
      <section className="home-banner">
        <Banner />
      </section>
      <section className="">
        <CoursePro />
        <CourseFree />
      </section>
    </div>
  );
};

export default HomePage;
