import "../css/DesktopLogin.css";
import Login from "../../Auth/Login";
import { motion } from "framer-motion";

function DesktopLogin({ setOpenSignUp }) {
  return (
    <motion.div
      initial={{
        y: -50,
        opacity: -0.7,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="desktop-login"
    >
      <Login setOpenSignUp={setOpenSignUp} />
    </motion.div>
  );
}

export default DesktopLogin;
