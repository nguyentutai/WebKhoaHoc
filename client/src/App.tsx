import HeaderPage from "./pages/HeaderPage";
import AsidePage from "./pages/AsidePage";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./pages/FooterPage";
import RouterPage from "./pages/RouterPage";
import { Route, Routes } from "react-router-dom";
import "../css/main.css";
import "../css/auth.css"
import RegisterPage from "./pages/Authentications/RegisterPage";
import LoginPage from "./pages/Authentications/LoginPage";
import { LoginProvider } from "./contexts/LoginProvider";
import BlogWrite from "./components/Pages/BlogWrite";
import BlogPage from "./pages/BlogPage";
function App() {
  return (
    <LoginProvider>
      <HeaderPage />
      <div className="container container1">
        <AsidePage />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/router" element={<RouterPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/write-blog' element={<BlogWrite />} />
        </Routes>
      </div>
      <Footer />
    </LoginProvider>
  )
}

export default App
