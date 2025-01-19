import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import About from "./pages/about";
import Home from "./pages/home";
import Login from "./section/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
