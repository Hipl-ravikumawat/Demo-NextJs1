import * as Yup from "yup";

export const profileSchema = Yup.object({
    username: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});