import { Button, Upload } from "antd";
import FormInput from "../../components/forms/FormInput";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { categorySchema } from "../../components/forms/Schemas";
import axios from "axios";
import { ArrowUpFromLine } from "lucide-react";

export default function CreateCategory() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      initialValues: {
        categoryImage: "",
        name: "",
        parentCategoryId: "",
      },
      validationSchema: categorySchema,
      onSubmit: async (values) => {
        setLoading(true);
        axios
          .post("http://localhost:3000/products/categories", values, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            setLoading(false);
            toast.success(response.data.message);
            navigate("/dashboard");
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.response.data.message);
          });
      },
    });

  const props = {
    onRemove: () => {
      setFieldValue("categoryImage", null);
    },
    beforeUpload: (file) => {
      setFieldValue("categoryImage", file);
      return false;
    },
    logo: values.categoryImage,
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormInput
        required
        placeHolder="Brand Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        touched={touched.name}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm flex items-center text-gray-600">
          Image
          <p className="text-red-500">*</p>
        </label>
        <Upload listType="picture" maxCount={1} {...props}>
          <Button icon={<ArrowUpFromLine size={15} />}>Select File</Button>
        </Upload>
      </div>

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
