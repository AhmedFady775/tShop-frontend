import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

export const storeManagerSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum."),
  storeId: Yup.string().required("Required"),
});

export const brandManagerSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum."),
  brandId: Yup.string().required("Required"),
});

export const brandSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  logo: Yup.string().required("Required"),
});

export const storeSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  logo: Yup.string().required("Required"),
});

export const categorySchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  parentCategoryId: Yup.string().required("Required"),
  categoryImage: Yup.string().required("Required"),
});

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  categoryId: Yup.string().required("Required"),
  productImage: Yup.string().required("Required"),
  options: Yup.array().of(Yup.object()),
});
