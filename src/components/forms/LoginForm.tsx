import * as React from "react";
import { useFormik } from "formik";
import { loginSchema } from "./Schemas";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      axios
        .post("http://localhost:3000/users/login", values)
        .then((response) => {
          console.log(response);
          setLoading(false);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          toast.success(response.data.message);
          navigate("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        });
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-20 w-[40%] items-center bg-white"
    >
      <div className="flex flex-col gap-8 w-[60%]">
        <p className="text-5xl font-thin mb-20">TShop.</p>
        <div>
          <p className="text-3xl font-semibold">Welcome back</p>
          <p className="text-[#5A6E80] text-sm">
            Login to your account to continue using TShop admin panel.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <FormInput
            required
            placeHolder="Email"
            name="email"
            type="text"
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />
          <FormInput
            required
            placeHolder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />
        </div>
        {loading ? (
          <Button type="primary" className="cursor-not-allowed h-12" loading>
            Loading
          </Button>
        ) : (
          <Button type="primary" htmlType="submit" className="h-12">
            Login
          </Button>
        )}
      </div>
    </form>
  );
}
