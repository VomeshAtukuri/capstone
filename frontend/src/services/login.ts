import axios from "axios";
type FormData = {
  email: string;
  password: string;
};
export async function Login(formData: FormData) {
  const { email, password } = formData;
  try {
    const response = await axios.post("http://localhost:5273/api/auth/login", {
      email,
      password,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    throw error;
  }
}

