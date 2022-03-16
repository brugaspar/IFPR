import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Sidebar } from "./components/Sidebar";

import { Exams } from "./pages/Exams";
import { Tags } from "./pages/Tags";
import { Questions } from "./pages/Questions";

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Exams />} />
        <Route path="tags" element={<Tags />} />
        <Route path="questions" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );
}
