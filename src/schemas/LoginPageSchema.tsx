import * as Yup from "yup";

export const LoginPageSchema = Yup.object({
  username: Yup.string().required("Kullanıcı adı zorunlu"),
  password: Yup.string().required("Şifre zorunlu"),
});
