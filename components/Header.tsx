import styles from "../styles/header.module.scss";
import Nav from "./Nav";

interface Props {
  toggleMobileNav: () => void;
}

const Header = ({ toggleMobileNav }: Props) => {
  return (
    <>
      <header className={styles.header_global}>
        <div className="header-imgage">
          <img
            src="/header-img.jpg"
            alt="clothes image"
            width="300"
            height="168"
          />
        </div>
        <p>بهترین کیفیت ، کمترین قیمت</p>
        <p>Best quality, cheapest price</p>
        <p>فروشگاه پوشاک ارائه دهنده ی انواع لباس برای تمامی سنین</p>
      </header>
      <Nav toggleMobileNav={toggleMobileNav} />
    </>
  );
};

export default Header;
