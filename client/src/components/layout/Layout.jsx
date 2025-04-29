// import React from "react";
// import Hedaer from "./Hedaer";
// import Footer from "./Footer";

// const Layout = ({children}) => {
//   return (
//     <div>
//       <Hedaer />
//       <main style={{minHeight:"80vh"}}>{children}</main>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;
import React from "react";
import Header from "../layout/Hedaer"; // fix typo from "Hedaer"
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
