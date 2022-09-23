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

const Profile_edit: NextPage = () => {
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
            <form>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <div className={styles.right_side_inputs} dir="rtl">
                    <Stack direction="column" spacing={4}>
                      <TextField
                        id="outlined-basic"
                        label="نام"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="نام خانوادگی"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="ایمیل"
                        variant="outlined"
                        type="email"
                      />
                      <TextField
                        id="outlined-basic"
                        label="آدرس دقیق"
                        variant="outlined"
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
                        id="outlined-basic"
                        label="کد پستی"
                        variant="outlined"
                        type="number"
                      />
                      <TextField
                        id="outlined-basic"
                        label="شماره همراه"
                        variant="outlined"
                        type="number"
                      />
                      <TextField
                        id="outlined-basic"
                        label="رمز عبور جدید"
                        variant="outlined"
                        type="password"
                      />
                      <TextField
                        id="outlined-basic"
                        label="تکرار رمز عبور جدید"
                        variant="outlined"
                        type="password"
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
