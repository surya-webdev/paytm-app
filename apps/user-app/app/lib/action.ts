import { signIn } from "next-auth/react";

interface formData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export async function signinAuth(form: formData) {
  //
  try {
    const response = await signIn("credentials", {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      redirect: false,
    });

    return response;
  } catch (error) {
    console.error(error, "Error");
  }
}
