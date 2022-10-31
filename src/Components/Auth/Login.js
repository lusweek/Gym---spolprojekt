import "./css/Login.css";
import "./LoginInput.css";
import { auth } from "../../firebase-config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
// import { BiLock } from "react-icons/bi";

import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  admin,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import SignUp from "./SignUp";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogedIn, setIsLogedIn] = useState();
  const [user, loading, error] = useAuthState(auth);
  const [openSignUp, setOpenSignUp] = useState(false);

  let redTextStyle = {color: 'red', marginLeft: '37px', display: 'none'}


  // ============ START: SET LOCAL STORAGE ============ //

  const profilerCollectionRef = collection(db, "profiler");
  const [profiler, setProfiler] = useState();
  const [inloggadUser, setInloggadUser] = useState();

  const clearFields = () => {
    document.querySelector("#login-input-1").value = "";
    document.querySelector("#login-input-2").value = "";
  };

  const getProfiler = async () => {
    const data = await getDocs(profilerCollectionRef);
    setProfiler(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const setLocalStorage = () => {
    const inloggadUser = profiler.find((item) => {
      return item.email == auth.currentUser.email;
    });
    setInloggadUser(inloggadUser);
    localStorage.setItem("user", JSON.stringify(inloggadUser));
  };

  // const Admin = () => {
  //   const adminUser = profiler.find((item) => {
  //     return item.admin;
  //   });
  //   Admin(adminUser);
  // };

  // ============ END: SET LOCAL STORAGE ============ //

  useEffect(() => {
    getProfiler();
  }, []);


  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {

        const inloggadUserLocal = profiler.find((item) => {
          return item.email == auth.currentUser.email;
        });
        setInloggadUser(inloggadUserLocal);
        localStorage.setItem("user", JSON.stringify(inloggadUserLocal));

        //LoggedInModal.style.set("block");
        clearFields();

        if (inloggadUserLocal.admin === true) {
          navigate("/admin");
        } else {
          navigate("/gym");
        }

        redTextStyle = {color: 'red', marginLeft: '37px', display: 'none'}

      })
      .catch((error) => errorMessage())
      
  };

  const errorMessage = () => {
    alert('Fel E-mail eller lösenord')
          
          // Funkar inte
    redTextStyle = {color: 'red', marginLeft: '37px', display: 'block'}
  }

  const signOutClick = () => {
    auth.signOut();
    localStorage.removeItem("user");
    navigate("/gym");
  };

  // HÄMTAR PROFILER FRÅN DATABASEN START
  // HÄMTAR PROFILER FRÅN DATABASEN END
  // LOGGA UT

  // CLEAR FEILDS

  let STYLE_LOGGED_IN_NONE = {};
  let STYLE_NOT_LOGGED_IN_FLEX = {};

  if (user) STYLE_LOGGED_IN_NONE = { display: "none" };
  if (!user) STYLE_NOT_LOGGED_IN_FLEX = { display: "none" };

  return (
    <>
      {openSignUp && <SignUp closeSignUp={setOpenSignUp} auth={auth}/>}
      <div className="Login">
        <h1 className="login-title">
          {user ? `Välkommen ${user.email}` : "Logga in?"}
        </h1>
        <form style={user ? STYLE_LOGGED_IN_NONE : null} className="login-form">
          <div className="LoginInput">
            <label className="login-label">E-mail</label>
            <input
              className="login-input"
              id={"login-input-1"}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="off"
              type="email"
              name="email"
            />
            <label className="login-label">Password</label>
            <input
              className="login-input"
              id={"login-input-2"}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              type="password"
              name="password"
            />
          </div>

          <p style={redTextStyle}>Fel lösenord eller email</p>

        </form>
        <div className="form-buttons">
          <div className="form-buttons-box">
            <button
              style={user ? STYLE_LOGGED_IN_NONE : null}
              className="login-button"
              onClick={signIn}
            >
              Logga in
            </button>
            <button
              style={user ? STYLE_LOGGED_IN_NONE : null}
              onClick={() => {
                setOpenSignUp(true);
                document.body.style.overflow = "hidden";
              }}
              className="register-button login-button"
            >
              Bli medlem
            </button>

            <>
              <br />
              <button
                style={user ? null : STYLE_NOT_LOGGED_IN_FLEX}
                onClick={signOutClick}
                className="register-button login-button"
              >
                Logga ut
              </button>
            </>
          </div>
          <p className="login-forgot-password"></p>
        </div>
      </div>
    </>
  );
}

export default Login;

/*
// import "./css/Login.css";
// import { useState, useEffect } from "react";
// import LoginInput from "./LoginInput";
// import { db } from "../../firebase-config";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import UpdateLocalStorage from "../../functions/UpdateLocalStorage";

    useEffect(() => {
        if (!localStorage.getItem('user')) setIsLogedIn(false)
        else setIsLogedIn(true)
    }, [])

//   useEffect(() => {
//     const getProfiler = async () => {
//       const data = await getDocs(profilerCollectionRef);
//       setProfiler(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };

//     getProfiler();
//   }, []);
//   // HÄMTAR PROFILER FRÅN DATABASEN END




//   let userProfile = [];

function Login({ setOpenSignUp, updateAfterLogin, darkText }) {

// HÄMTAR PROFILER FRÅN DATABASEN START
    const profilerCollectionRef = collection(db, "profiler")
    const [profiler, setProfiler] = useState([])

    useEffect(() => {

        const getProfiler = async () => {
          const data = await getDocs(profilerCollectionRef)
          setProfiler(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };
    
        getProfiler()
      }, [])
// HÄMTAR PROFILER FRÅN DATABASEN END

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Lösenord",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

    let userProfile = []

    const handleSubmit = (e) => {
        e.preventDefault();

        const profile = profiler.find((item) => {
            return item.email === values.email
        })

        if (!profile) {
            alert('Wrong email')
        } else {
            userProfile = profile
            checkPassword()
        }
    };

    const checkPassword = () => {
        if (userProfile.password == values.password) {
            alert('inloggad!')
            window.localStorage.setItem('user', JSON.stringify(userProfile))
            setIsLogedIn(true)
            updateAfterLogin()
            clearFields()

        } else {
            alert('fel lösenord')
        }
    }

//   // LOGGA UT
//   const [isLogedIn, setIsLogedIn] = useState();
//   const STYLE_NONE = { display: "none" };
//   const STYLE_WIDTH = { width: "100%" };
//   const STYLE_DARK = { color: "black" };

//   useEffect(() => {
//     if (!localStorage.getItem("user")) setIsLogedIn(false);
//     else setIsLogedIn(true);
//   }, []);

//   const logOut = () => {
//     window.confirm("Logga ut?");
//     localStorage.removeItem("user");
//     updateAfterLogin();
//     setIsLogedIn(false);
//   };

//   // CLEAR FEILDS

//   const clearFields = () => {
//     document.querySelector("#login-input-1").value = "";
//     document.querySelector("#login-input-2").value = "";
//   };

//   return (
//     <div className="Login">
//       <form className="login-form">
//         <h1 className="login-title" style={darkText}>
//           {isLogedIn ? "" : "Logga in"}
//         </h1>
//         {inputs.map((input, index) => (
//           <LoginInput
//             id={index}
//             key={input.id}
//             {...input}
//             value={values[inputs.name]}
//             onChange={onChange}
//             style={isLogedIn ? STYLE_NONE : null}
//           />
//         ))}
//       </form>
//       <div className="form-buttons">
//         <div className="form-buttons-box">
//           <button
//             className="login-button"
//             onClick={isLogedIn ? logOut : handleSubmit}
//             style={isLogedIn ? STYLE_WIDTH : null}
//           >
//             {isLogedIn ? "Logga ut" : "Logga in"}
//           </button>
//           <button
//             style={isLogedIn ? STYLE_NONE : null}
//             onClick={() => {
//               setOpenSignUp(true);
//             }}
//             className="register-button login-button"
//           >
//             Bli medlem
//           </button>
//         </div>
//         <p className="login-forgot-password" style={darkText}>
//           {isLogedIn ? "" : "Glömt lösenord?"}
//         </p>
//       </div>
//     </div>
//   );
// }
*/
