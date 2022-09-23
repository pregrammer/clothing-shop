import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import MobileMenu from "./MobileMenu";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const toggleMobileNav = () => {
    setisMobileMenuOpen((prev) => !prev);
  };
  return (
    <>
      <Header toggleMobileNav={toggleMobileNav} />

      {/* <Loader /> */}
      {isMobileMenuOpen && <MobileMenu toggleMobileNav={toggleMobileNav} />}
      {children}

      <Footer />
    </>
  );
};

export default Layout;
