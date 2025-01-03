import { Outlet } from "react-router-dom";
import Header from "../component/header/Header";
import Footer from "../component/Footer/Footer";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutClient;
