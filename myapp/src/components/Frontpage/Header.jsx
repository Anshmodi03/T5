import React from "react";
import { Dropdown } from "flowbite-react";
import { Navbar } from "flowbite-react";
import { Button } from "flowbite-react";
import edu from "../../assets/learn.png";

const Header = () => {
  return (
    <div className="">
      <Navbar fluid rounded className="shadow-sm   ">
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            src={edu}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold ">
            E-Learning
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="text-center mt-4">
          <Navbar.Link href="#">
            <Dropdown label="Course" inline>
              <Dropdown.Item>Engineering</Dropdown.Item>
              <Dropdown.Item>Medical</Dropdown.Item>
            </Dropdown>
          </Navbar.Link>
          <Navbar.Link href="#">
            <Dropdown label="Exam" inline>
              <Dropdown.Item>JEE</Dropdown.Item>
              <Dropdown.Item>NEET</Dropdown.Item>
              <Dropdown.Item>CAT</Dropdown.Item>
            </Dropdown>
          </Navbar.Link>
          <Navbar.Link href="#">
            <Dropdown label="Teacher" inline>
              <Dropdown.Item>Alakh Pandey</Dropdown.Item>
              <Dropdown.Item>Vishal</Dropdown.Item>
              <Dropdown.Item>Rahul</Dropdown.Item>
            </Dropdown>
          </Navbar.Link>
          <Navbar.Link href="#">Explore More</Navbar.Link>
        </Navbar.Collapse>
        <div className="flex gap-2">
          <Button color="info">Login</Button>
          <Button color="info">SignUp</Button>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
