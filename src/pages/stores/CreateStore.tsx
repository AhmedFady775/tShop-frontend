import { Button, Select, Upload } from "antd";
import FormInput from "../../components/forms/FormInput";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { storeSchema } from "../../components/forms/Schemas";
import axios from "axios";
import { ArrowUpFromLine } from "lucide-react";

interface CreateStoreProps {
  setOpen: (open: boolean) => void;
}

export default function CreateStore({ setOpen }: CreateStoreProps) {
  const [loading, setLoading] = useState(false);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      initialValues: {
        logo: "",
        name: "",
        description: "",
        phone: "",
        address: "",
        type: "",
        email: "",
      },
      validationSchema: storeSchema,
      onSubmit: async (values) => {
        setLoading(true);
        axios
          .post("http://localhost:3000/stores", values, {
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

  const options = [
    {
      value: "brand",
      label: "Brand",
    },
    {
      value: "showroom",
      label: "Showroom",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormInput
        required
        placeHolder="Store Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        touched={touched.name}
      />
      <FormInput
        required
        placeHolder="Store Description"
        name="description"
        value={values.description}
        onChange={handleChange}
        error={errors.description}
        touched={touched.description}
      />
      <FormInput
        required
        placeHolder="Store Phone"
        name="phone"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
        touched={touched.phone}
      />
      <FormInput
        required
        placeHolder="Store Address"
        name="address"
        value={values.address}
        onChange={handleChange}
        error={errors.address}
        touched={touched.address}
      />
      <div className="flex flex-col gap-2">
        <label className="text-sm flex items-center text-gray-600">
          Store Type
          <p className="text-red-500">*</p>
        </label>
        <Select
          defaultValue="brand"
          style={{
            width: 200,
          }}
          onChange={(value) => setFieldValue("type", value)}
          options={options}
        />
      </div>
      <FormInput
        required
        placeHolder="Store Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        touched={touched.email}
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
