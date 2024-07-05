import { Button } from "antd";
import FormInput from "../../components/forms/FormInput";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { brandManagerSchema } from "../../components/forms/Schemas";
import axios from "axios";

export default function BrandManagerModal() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      brandId: "",
    },
    validationSchema: brandManagerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      axios
        .post("http://localhost:3000/users/store-manager", values)
        .then((response) => {
          setLoading(false);
          toast.success("Logged in successfully");
          navigate("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        });
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormInput
        required
        placeHolder="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        touched={touched.email}
      />
      <FormInput
        required
        placeHolder="Password"
        name="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        touched={touched.password}
        type="password"
      />
      <FormInput
        required
        placeHolder="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        touched={touched.name}
      />
      <FormInput
        required
        placeHolder="Phone"
        name="phone"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
        touched={touched.phone}
      />
      {loading ? (
        <Button type="primary" loading className="cursor-not-allowed">
          Loading
        </Button>
      ) : (
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      )}
    </form>
  );
}
