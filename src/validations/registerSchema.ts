import * as Yup from "yup";

export const registerSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});