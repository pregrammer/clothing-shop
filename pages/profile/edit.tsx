import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/profile.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Stack } from "@mui/material";
import ProfileAside from "../../components/ProfileAside";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosAuthFunction from "../../helpers/useAxiosAuthFunction";

const Profile_edit: NextPage = () => {
  const [data, axiosFetch]: any = useAxiosAuthFunction();
  const [userData, axiosFetchUser]: any = useAxiosAuthFunction();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmedPass: "",
  });

  // for make mui component rtl and change font.
  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "vazir",
    },
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  useEffect(() => {
    axiosFetchUser({
      method: "GET",
      url: "/users/user",
    });
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      setInputs({
        firstName: userData.user.firstName ? userData.user.firstName : "",
        lastName: userData.user.lastName ? userData.user.lastName : "",
        address: userData.user.address ? userData.user.address : "",
        postalCode: userData.user.postalCode ? userData.user.postalCode : "",
        phoneNumber: userData.user.phoneNumber ? userData.user.phoneNumber : "",
        email: userData.user.email,
        password: "",
        confirmedPass: "",
      });
    }
  }, [userData]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmedPass) {
      toast.error("رمز عبور با تکرار آن همخوانی ندارد", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    axiosFetch({
      method: "PUT",
      url: "/users",
      requestConfig: {
        data: {
          fullName: `${inputs.firstName} ${inputs.lastName}`,
          email: inputs.email,
          address: inputs.address,
          postalCode: inputs.postalCode,
          phoneNumber: inputs.phoneNumber,
          password: inputs.password,
        },
      },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setInputs((prev) => ({ ...prev, password: "", confirmedPass: "" }));
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | ویرایش مشخصات</title>
      </Head>

      <main className={styles.profile_page}>
        <div className={styles.header}>
          <h1>پروفایل کاربری</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <form onSubmit={handleSubmit}>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div className={styles.right_side_inputs} dir="rtl">
                    <Stack direction="column" spacing={4}>
                      <TextField
                        label="نام"
                        variant="outlined"
                        value={inputs.firstName}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                      />
                      <TextField
                        label="نام خانوادگی"
                        variant="outlined"
                        value={inputs.lastName}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                      />
                      <TextField
                        label="ایمیل"
                        variant="outlined"
                        type="email"
                        value={inputs.email}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                      <TextField
                        label="آدرس دقیق"
                        variant="outlined"
                        value={inputs.address}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        multiline
                        InputProps={{
                          rows: 3,
                        }}
                      />
                    </Stack>
                  </div>
                  <div className={styles.left_side_inputs} dir="rtl">
                    <Stack direction="column" spacing={4}>
                      <TextField
                        label="کد پستی"
                        variant="outlined"
                        type="number"
                        value={inputs.postalCode}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            postalCode: e.target.value,
                          }))
                        }
                      />
                      <TextField
                        label="شماره همراه"
                        variant="outlined"
                        type="number"
                        value={inputs.phoneNumber}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            phoneNumber: e.target.value,
                          }))
                        }
                      />
                      <TextField
                        label="رمز عبور جدید"
                        variant="outlined"
                        type="password"
                        value={inputs.password}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />
                      <TextField
                        label="تکرار رمز عبور جدید"
                        variant="outlined"
                        type="password"
                        value={inputs.confirmedPass}
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            confirmedPass: e.target.value,
                          }))
                        }
                      />
                      <Button variant="contained" type="submit">
                        ویرایش
                      </Button>
                    </Stack>
                  </div>
                </ThemeProvider>
              </CacheProvider>
            </form>
          </div>
          <ProfileAside />
        </div>
      </main>
    </>
  );
};

export default Profile_edit;
