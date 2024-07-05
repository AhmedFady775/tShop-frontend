import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { useUserStore } from "./store/user.store";
import ReactLoading from "react-loading";
import axios from "axios";
import Users from "./pages/users/Users";
import Orders from "./pages/Orders";
import Brands from "./pages/brands/Brands";
import Categories from "./pages/categories/Categories";
import Stores from "./pages/stores/Stores";
import Products from "./pages/products/Products";

function App() {
  const [loading, setLoading] = useState(true);

  const setUser = useUserStore((state) => state.setUser);

  const getUser = async () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/users/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((user) => {
        setUser(user.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#7963EC" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/brands"
          element={
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stores"
          element={
            <ProtectedRoute>
              <Stores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div className="h-screen w-full flex flex-col justify-center items-center ">
                <p className="text-7xl font-bold"> 404</p>
                <div className="text-gray-500 flex flex-col items-center gap-5">
                  Sorry, the page was not found!
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
    </>
  );
}

export default App;
