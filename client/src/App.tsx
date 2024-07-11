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
import BlogPage from "./pages/Website/BlogPage";
import LoginPage from "./pages/Website/LoginPage";
import HomePage from "./pages/Website/HomePage/HomePage";
import Dashboard from "./pages/Admin/Dashboards/Dashboard";
function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/router" element={<RouterPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/write-blog" element={<BlogWrite />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </LoginProvider>
  );
}

export default App;
