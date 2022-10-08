import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosPrivateFunction from "../helpers/useAxiosPrivateFunction";

const ProfileAside = () => {
  const router = useRouter();
  const [data, axiosFetch]: any = useAxiosPrivateFunction();
  const selectedTabStyle = { backgroundColor: "brown", color: "white" };
  const handleLogOut = () => {
    axiosFetch({
      method: "GET",
      url: "/auth/logout",
    });
  };
  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      localStorage.removeItem("jwt");
      router.replace("/");
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [data]);
  return (
    <aside>
      <div>
        <Link href="/profile/edit">
          <a style={router.asPath === "/profile/edit" ? selectedTabStyle : {}}>
            ویرایش مشخصات
          </a>
        </Link>
        <Link href="/profile/orders">
          <a
            style={router.asPath === "/profile/orders" ? selectedTabStyle : {}}
          >
            سفارشات من
          </a>
        </Link>
        <button onClick={handleLogOut}>خروج</button>
      </div>
    </aside>
  );
};

export default ProfileAside;
