import axios from "axios";
import { toast } from "sonner";
type FormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export async function Register(formData: FormData) {
  const { email, password, fullname } = formData;
  console.log(email, password, fullname);
  const response = await axios.post("http://localhost:5273/api/auth/register", {
    email,
    password,
    fullname,
  });
  toast.success("Registration successful!");
  console.log(response.data);
  return response.data;
}
