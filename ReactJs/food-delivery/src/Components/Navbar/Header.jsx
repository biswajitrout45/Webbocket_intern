import React from "react";
import { IoMailOpenSharp } from "react-icons/io5";
import { FaLocationDot, FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";

const Header = () => {
  return (
    <div className="hidden md:flex justify-between items-center bg-gray-300 px-10 lg:px-20 py-2 text-md">
      <div className="flex gap-4 items-center">
        <p className="flex gap-2 items-center">
          <IoMailOpenSharp />
          <a href="mailto:example@gmail.com">example@gmail.com</a>
        </p>
        <p className="flex gap-2 items-center">
          <FaLocationDot />
          <a href="https://maps.app.goo.gl/heBhp3945qqzSR158" target="_blank">
            Bhubaneswar
          </a>
        </p>
      </div>

      <div className="flex gap-4 text-xl    ">
        <a href="https://www.instagram.com" target="_blank">
          <RiInstagramFill />
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <FaFacebookSquare />
        </a>
        <a href="https://www.youtube.com" target="_blank">
          <FaYoutube />
        </a>
        <a href="https://www.twitter.com" target="_blank">
          <FaSquareXTwitter />
        </a>
      </div>
    </div>
  );
};

export default Header;
