import Link from "next/link";
import styles from "../styles/nav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Props {
  toggleMobileNav: () => void;
}

const Nav = ({ toggleMobileNav }: Props) => {
  const [leftSideContent, setLeftSideContent] = useState<ReactElement>();
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("jwt");
    if (isLoggedIn) {
      setLeftSideContent(
        <div>
          <Link href="/profile/edit">
            <a>پروفایل</a>
          </Link>
        </div>
      );
    } else {
      setLeftSideContent(
        <div>
          <Link href="/login">
            <a>
              ورود <FontAwesomeIcon icon={faSignIn} />
            </a>
          </Link>
        </div>
      );
    }
  }, [router.pathname]);
  return (
    <nav className={styles.nav_global}>
      <div>
        <div>
          <Link href="/cart">
            <a>
              سبد خرید <FontAwesomeIcon icon={faShoppingCart} />
            </a>
          </Link>
        </div>
        <div>{leftSideContent}</div>
      </div>
      <div onClick={toggleMobileNav}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
          <Link href="/about-us">
            <a>درباره ی ما</a>
          </Link>
        </li>
        <li>
          <Link href="/contact-us">
            <a>تماس با ما</a>
          </Link>
        </li>
        <li>
          <Link href="/products">
            <a>محصولات</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
