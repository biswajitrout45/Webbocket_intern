import React from "react";
import Header from "./Header";
import NavLinks from "./NavLinks";

const Navbar = (props) => (
  <div>
    <Header />
    <NavLinks {...props} />
  </div>
);

export default Navbar;
