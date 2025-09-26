import { useFormik } from "formik";

import "../css/LoginPage.css";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import AccountCircle from "@mui/icons-material/AccountCircle";
import LockPersonIcon from "@mui/icons-material/LockPerson";

import { Link, useNavigate } from "react-router-dom";
import LoginPageService from "../services/LoginPageService";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/AppSlice";
import type { UserType } from "../types/Types";
import { toast } from "react-toastify";
import { LoginPageSchema } from "../schemas/LoginPageSchema";

interface CheckUserType {
  result: boolean;
  currentUser: UserType | null;
}

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUser = (
    userList: UserType[],
    username: string,
    password: string
  ): CheckUserType => {
    const foundUser = userList.find(
      (user: any) =>
        user.newUser.username.trim() === username.trim() &&
        user.newUser.password === password
    );

    return {
      result: !!foundUser,
      currentUser: foundUser || null,
    };
  };

  const submit = async (values: any, action: any) => {
    console.log(values);
    try {
      dispatch(setLoading(true));
      const response: UserType[] = await LoginPageService.login();
      if (response) {
        const checkUserResponse: CheckUserType = checkUser(
          response,
          values.username,
          values.password
        );
        if (checkUserResponse.result && checkUserResponse.currentUser) {
          dispatch(setCurrentUser(checkUserResponse.currentUser));
          localStorage.setItem(
            "currentUser",
            JSON.stringify(checkUserResponse.currentUser)
          );
          clear();
          navigate("/");
        } else {
          toast.error("Kullanıcı adı veya şifre hatalı ");
        }
      }
    } catch (error) {
      toast.error("Giriş yapılamadı , bir hata oluştu");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const { values, handleChange, handleSubmit, resetForm, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: LoginPageSchema,
      onSubmit: submit,
    });

  const clear = () => {
    resetForm();
  };

  return (
    <div className="login-page">
      <form className="login-form mt-20" onSubmit={handleSubmit}>
        {/* Kullanıcı Adı */}
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="username"
            name="username"
            label="Kullanıcı Adı"
            variant="standard"
            fullWidth
            value={values.username}
            onChange={handleChange}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
        </Box>

        {/* Şifre */}
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
          <LockPersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Şifre"
            variant="standard"
            fullWidth
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        </Box>

        {/* Aksiyonlar */}
        <div className="actions">
          <Button variant="contained" type="submit">
            Giriş Yap
          </Button>
          <p>
            Hesabınız yok mu? <Link to="/register">Kaydol</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
