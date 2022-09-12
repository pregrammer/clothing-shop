import Link from "next/link";
import styles from "../styles/nav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <nav className={styles.nav_global}>
      <div>
        <div>
          <Link href="cart">
            <a>
              سبد خرید <FontAwesomeIcon icon={faShoppingCart} />
            </a>
          </Link>
        </div>
        <div>
          <div>
            <Link href="login">
              <a>
                ورود <FontAwesomeIcon icon={faSignIn} />
              </a>
            </Link>
          </div>
          {/* <Link href="profile">
            <a>پروفایل</a>
          </Link> */}
        </div>
      </div>
      <div>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
          <Link href="about-us">
            <a>درباره ی ما</a>
          </Link>
        </li>
        <li>
          <Link href="contact-us">
            <a>تماس با ما</a>
          </Link>
        </li>
        <li>
          <Link href="products">
            <a>محصولات</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
