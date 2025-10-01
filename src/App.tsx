import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./main-layout";
import AddExperiencesPage from "./pages/AddExperiences/add-experiences-page";
import DetailPage from "./pages/Detail/detail-page";
import LoginPage from "./pages/Login/login-page";
import MainPage from "./pages/Main/main-page";
import MyProfilePage from "./pages/MyProfile/myprofile-page";
import NotFoundPage from "./pages/NotFound/notfound";
import SignupPage from "./pages/Signup/signup-page";
import UpdateExperiencesPage from "./pages/UpdateExperiences/update-experiences-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/**헤더가 없는 페이지*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/**헤더가 있는 페이지 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="detail/:id" element={<DetailPage />} />

          <Route path="myprofile">
            <Route index element={<MyProfilePage />} />
            <Route path="add" element={<AddExperiencesPage />} />
            <Route path="edit" element={<UpdateExperiencesPage />} />
          </Route>
        </Route>

        {/**not found 처리 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
