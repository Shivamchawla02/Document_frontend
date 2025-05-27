import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from "./components/StudentLogin.jsx";
import UploadForm from "./components/UploadForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/upload-docs" element={<UploadForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
