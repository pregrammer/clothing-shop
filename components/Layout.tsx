import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import MobileMenu from "./MobileMenu";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />

      {/* <Loader /> */}
      {/* <MobileMenu /> */}
      {children}

      <Footer />
    </>
  );
};

export default Layout;
