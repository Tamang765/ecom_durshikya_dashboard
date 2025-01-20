import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthGuard from "./layout/AuthGuard";
import Layout from "./layout/Layout";
import About from "./pages/about";
import Home from "./pages/home";
import Login from "./section/Login";
import CategoryForm from "./section/category/CategoryForm";
import CategoryList from "./section/category/CategoryList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthGuard>
              <Login />
            </AuthGuard>
          }
        />

        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/category/create" element={<CategoryForm />} />
          <Route path="/category/edit/:id" element={<CategoryForm />} />

          <Route path="/category/list" element={<CategoryList />} />

          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
