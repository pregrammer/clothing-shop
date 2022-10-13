import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosPrivateFunction from "../helpers/useAxiosPrivateFunction";

interface Iprop {
  asideIsOpen: boolean;
}

const ManagementAside = ({ asideIsOpen }: Iprop) => {
  const router = useRouter();
  const [data, axiosFetch]: any = useAxiosPrivateFunction();

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

  const selectedTabStyle = { backgroundColor: "brown", color: "white" };
  return (
    <aside style={asideIsOpen ? {} : { marginRight: "-50%" }}>
      <div>
        <Link href="/management/orders">
          <a
            style={
              router.asPath === "/management/orders" ? selectedTabStyle : {}
            }
          >
            سفارشات
          </a>
        </Link>
        <Link href="/management/products">
          <a
            style={
              router.asPath === "/management/products" ? selectedTabStyle : {}
            }
          >
            محصولات
          </a>
        </Link>
        <Link href="/management/users">
          <a
            style={
              router.asPath === "/management/users" ? selectedTabStyle : {}
            }
          >
            کاربران
          </a>
        </Link>
        <Link href="/management/side-prices">
          <a
            style={
              router.asPath === "/management/side-prices"
                ? selectedTabStyle
                : {}
            }
          >
            قیمت های جانبی
          </a>
        </Link>
        <button onClick={handleLogOut}>خروج</button>
      </div>
    </aside>
  );
};

export default ManagementAside;
