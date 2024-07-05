import { Button, Upload } from "antd";
import FormInput from "../../components/forms/FormInput";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { brandSchema } from "../../components/forms/Schemas";
import axios from "axios";
import { ArrowUpFromLine } from "lucide-react";

interface CreateBrandProps {
  setOpen: (open: boolean) => void;
}

export default function CreateBrand({ setOpen }: CreateBrandProps) {
  const [loading, setLoading] = useState(false);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      initialValues: {
        logo: "",
        name: "",
        description: "",
      },
      validationSchema: brandSchema,
      onSubmit: async (values) => {
        setLoading(true);
        axios
          .post("http://localhost:3000/stores/brands", values, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            setLoading(false);
            toast.success(response.data.message);
            setOpen(false);
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.response.data.message);
          });
      },
    });

  const props = {
    onRemove: () => {
      setFieldValue("logo", null);
    },
    beforeUpload: (file) => {
      setFieldValue("logo", file);
      return false;
    },
    logo: values.logo,
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
      <FormInput
        required
        placeHolder="Brand Description"
        name="description"
        value={values.description}
        onChange={handleChange}
        error={errors.description}
        touched={touched.description}
      />
      <div className="flex flex-col gap-2">
        <label className="text-sm flex items-center text-gray-600">
          Logo
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
