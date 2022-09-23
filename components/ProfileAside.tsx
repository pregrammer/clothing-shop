import Link from "next/link";
import { useRouter } from "next/router";

const ProfileAside = () => {
  const router = useRouter();
  const selectedTabStyle = { backgroundColor: "brown", color: "white" };
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
        <button>خروج</button>
      </div>
    </aside>
  );
};

export default ProfileAside;
