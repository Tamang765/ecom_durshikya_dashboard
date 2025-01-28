import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthGuard from "./layout/AuthGuard";
import Layout from "./layout/Layout";
import About from "./pages/about";
import Home from "./pages/home";
import CategoryForm from "./section/category/CategoryForm";
import CategoryList from "./section/category/CategoryList";
import Login from "./section/Login";
import OrderList from "./section/order/Orderlist";
import ProductForm from "./section/product/ProductForm";
import ProductList from "./section/product/ProductList";
import Profile from "./section/Profile";
import UserList from "./section/user/userList";

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
        <Route path="/profile" element={<Profile />} />
          <Route path="" element={<Home />} />
          <Route path="/category/create" element={<CategoryForm />} />
          <Route path="/product/create" element={<ProductForm />} />
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/product/edit/:id" element={<ProductForm />} />

          <Route path="/category/edit/:id" element={<CategoryForm />} />

          <Route path="/category/list" element={<CategoryList />} />
          <Route path="/order/list" element={<OrderList />} />
          <Route path="/user/list" element={<UserList />} />



          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
