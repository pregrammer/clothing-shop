import Link from "next/link";
import { useRouter } from "next/router";

interface Iprop {
  asideIsOpen: boolean;
}

const ManagementAside = ({ asideIsOpen }: Iprop) => {
  const router = useRouter();
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
        <button>خروج</button>
      </div>
    </aside>
  );
};

export default ManagementAside;
