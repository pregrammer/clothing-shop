import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useLoading } from "../hooks/contexts/LoadingProvider";
import Loader from "./Loader";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { loading } = useLoading();
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const toggleMobileNav = () => {
    setisMobileMenuOpen((prev) => !prev);
  };
  return (
    <>
      <Header toggleMobileNav={toggleMobileNav} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading && <Loader />}
      {isMobileMenuOpen && <MobileMenu toggleMobileNav={toggleMobileNav} />}
      {children}

      <Footer />
    </>
  );
};

export default Layout;
