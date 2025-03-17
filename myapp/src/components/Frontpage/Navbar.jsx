import React from "react";
import { Carousel } from "flowbite-react";
import first from "../../assets/first.jpg";
import second from "../../assets/second.jpg";
import third from "../../assets/third.jpg";
import fourth from "../../assets/fourth.jpg";

const Navbar = () => {
  return (
    <div className="  rounded-none bg-gradient-to-r from-indigo-500 to-purple-600 h-2/3 px-full sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src={first} alt="..." className="object-cover " />
        <img src={second} alt="..." className="object-cover  " />
        <img src={third} alt="..." className="object-cover" />
        <img src={fourth} alt="..." className="object-cover   " />
      </Carousel>
    </div>
  );
};

export default Navbar;
