import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-slate-600 text-white text-center">
      <p>Copyright &copy; {year}</p>
    </div>
  );
};

export default Footer;
