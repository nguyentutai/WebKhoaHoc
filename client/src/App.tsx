import RouterPage from "./pages/Website/RouterPage";
import { Route, Routes } from "react-router-dom";
import "../css/main.css";
import "../css/auth.css";
import "../css/admin.css";
import { LoginProvider } from "./contexts/LoginProvider";
import BlogWrite from "./components/Pages/BlogWrite";
import LayoutWebsite from "./layouts/LayoutWebsite";
import LayoutAdmin from "./layouts/LayoutAdmin";
import RegisterPage from "./pages/Website/Authentications/RegisterPage";
import BlogPage from "./pages/Website/Blog/BlogPage";
import LoginPage from "./pages/Website/LoginPage";
import HomePage from "./pages/Website/HomePage/HomePage";
import Dashboard from "./pages/Admin/Dashboards/Dashboard";
import ListCategory from "./pages/Admin/Category/ListCategory";
import FormCategory from "./pages/Admin/Category/FormCategory";
import { CategoryProvider } from "./contexts/CategoryProvider";
import { CoursesProvider } from "./contexts/CourseProvider";
import ListCourse from "./pages/Admin/Courses/ListCourse";
import FormCourse from "./pages/Admin/Courses/FormCourse";
import DetailBlog from "./pages/Website/Blog/DetailBlog";
function App() {
  return (
    <LoginProvider>
      <CategoryProvider>
        <CoursesProvider>
          <Routes>
            <Route path="/" element={<LayoutWebsite />}>
              <Route index element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<DetailBlog />} />
              <Route path="/router" element={<RouterPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/write-blog" element={<BlogWrite />} />
            </Route>
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<Dashboard />} />
              {/* Category */}
              <Route path="category" element={<ListCategory />} />
              <Route path="category/form-category" element={<FormCategory />} />
              <Route
                path="category/:id/form-category"
                element={<FormCategory />}
              />
              <Route path="course" element={<ListCourse />} />
              <Route path="course/form-course" element={<FormCourse />} />
              <Route path="course/:id/form-course" element={<FormCourse />} />
            </Route>
          </Routes>
        </CoursesProvider>
      </CategoryProvider>
    </LoginProvider>
  );
}

export default App;
