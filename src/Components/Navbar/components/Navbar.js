import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ListItem from "./ListItem";
import Login from "../../Auth/Login";
import "../css/Navbar.css";
import SignUp from "../../Auth/SignUp";
import { motion } from "framer-motion";
//Icons
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import { IoMdHome } from "@react-icons/all-files/io/IoMdHome";
import { IoIosCart } from "@react-icons/all-files/io/IoIosCart";
//import { GrYoga } from "react-icons/gr";
import { BsPerson } from "@react-icons/all-files/bs/BsPerson";
import { MdPeopleOutline } from "@react-icons/all-files/md/MdPeopleOutline";
import { GrYoga } from "@react-icons/all-files/gr/GrYoga";

//Routes

//installer följande:
//npm install react-icons --save
// npm install -S react-router-dom
//nmp install framer-motion

function NavBar({ closeNavbar, updateAfterLogin }) {
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <motion.div
      initial={{
        x: 100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="Navbar"
    >
      {openSignUp && <SignUp closeSignup={setOpenSignUp} />}
      <div className="navbar-header">
        <GrClose
          color="white"
          className="exit-button"
          onClick={() => {
            closeNavbar(false);
            document.body.style.overflow = "visible";
          }}
        />
      </div>
      <div className="navbar-list">
        <CustomLink
          to="/gym"
          onClick={() => {
            closeNavbar(false);
            document.body.style.overflow = "visible";
          }}
        >
          <ListItem name="Startsida" icon={<IoMdHome className="icon" />} />
        </CustomLink>
        <CustomLink
          to="/bookingpage"
          onClick={() => {
            closeNavbar(false);
            document.body.style.overflow = "visible";
          }}
        >
          <ListItem name="Boka pass" icon={<GrYoga className="icon" />} />
        </CustomLink>
        <CustomLink
          to="/myprofile"
          onClick={() => {
            closeNavbar(false);
            document.body.style.overflow = "visible";
          }}
        >
          <ListItem name="Mina sidor" icon={<BsPerson className="icon" />} />
        </CustomLink>
        <CustomLink
          to="/staff"
          onClick={() => {
            closeNavbar(false);
            document.body.style.overflow = "visible";
          }}
        >
          <ListItem
            name="Personal"
            icon={<MdPeopleOutline className="icon" />}
          />
        </CustomLink>
        <CustomLink
          to="/webshop"
          onClick={() => {
            closeNavbar(false);
            document.body.style.overflow = "visible";
          }}
        >
          <ListItem name="Webbshop" icon={<IoIosCart className="icon" />} />
        </CustomLink>
      </div>

      <div className="navbar-login">
        <Login
          setOpenSignUp={setOpenSignUp}
          updateAfterLogin={updateAfterLogin}
        />
      </div>
    </motion.div>
  );
}

export default NavBar;

function CustomLink({ to, ...props }) {
  return <Link to={to} {...props}></Link>;
}
