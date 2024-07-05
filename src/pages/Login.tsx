import { useEffect } from "react";
import LoginForm from "../components/forms/LoginForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <div className="w-[60%] flex flex-col items-center gap-8 bg-primary-400 justify-center">
        <div className="flex flex-col w-[50%] gap-20">
          <div className="text-white flex flex-col gap-4 text-7xl font-semibold">
            <p>Hello</p>
            <p>TShop!</p>
          </div>
          <p className="text-white text-lg ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
            consequat sem, nec sodales dolor. Nullam sed ultrices sem, non
            placerat est. Nulla facilisi.
          </p>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
