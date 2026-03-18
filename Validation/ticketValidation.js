import * as yup from "yup";

export const ticketSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
  status: yup
    .string()
    .oneOf(["open", "in-progress", "closed"])
    .default("open"),
});