import "./css/signUp.css";
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import openLoadingModal from "../loading_screen/OpenLoadingModal";
import closeLoadingModal from "../loading_screen/CloseLoadingModal";
import UpdateLocalStorage from "../../functions/UpdateLocalStorage";

function SignUp({ closeSignUp, auth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [Lname, setLName] = useState("");

  const profilerCollectionRef = collection(db, "profiler");

  const register = async () => {
    if (password === passwordConfirm) {
      openLoadingModal();
      createUserWithEmailAndPassword(auth, email, password).then((auth) => {
        setName("");
        setLName("");
        setPassword("");
        setPasswordConfirm("");
        navigate("/gym");

        let Aid = auth.user.uid;

        addDoc(profilerCollectionRef, {
          email: email,
          Aid: Aid,
          name: name,
          lastName: Lname,
        });

        // =======================

        setLocalStorageAfterRegister(Aid);

        // ========================

        // UpdateLocalStorage(Aid)

        closeLoadingModal();
        alert("ditt konto har skapats");
      });
    } else {
      closeLoadingModal();
      alert("lösenorden matchar ej");
    }
  };

  const setLocalStorageAfterRegister = async (Aid) => {
    let profiler = [];
    const profilerCollectionRef = collection(db, "profiler");

    console.log(profiler);
    console.log(profilerCollectionRef);

    const data = await getDocs(profilerCollectionRef);
    profiler = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    console.log("profiler i updateLocalStorage: ", profiler);

    const updatedProfile = profiler.find((profil) => {
      return profil.Aid == Aid;
    });

    console.log(updatedProfile);

    localStorage.setItem("user", JSON.stringify(updatedProfile));
  };

  const [userAuth, loading, error] = useAuthState(auth);

  const [user, setUser] = useState(
    userAuth ? JSON.parse(localStorage.getItem("user")) : ""
  );

  // clearFields()

  // END: SPARAR I DATABASEN

  return (
    <article className="SignUpWrapper">
      <div className="SignUp">
        <GrClose
          className="cancel-button"
          onClick={() => {
            closeSignUp(false);
            document.body.style.overflow = "visible";
          }}
        />

        <>
          <section className="profile-wrapper">
            <article>
              <form className="login-form">
                <div className="LoginInput">
                  <label className="login-label">Namn</label>
                  <input
                    className="login-input"
                    id={"login-input-name"}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="off"
                    type="text"
                    name="name"
                  />
                  <label className="login-label">Efternamn</label>
                  <input
                    className="login-input"
                    id={"login-input-Lmane"}
                    onChange={(event) => setLName(event.target.value)}
                    autoComplete="off"
                    type="text"
                    name="Lname"
                  />
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

                  <label className="login-label">Confirm Password</label>
                  <input
                    className="login-input"
                    id={"login-input-3"}
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    autoComplete="off"
                    type="password"
                    name="password"
                  />
                </div>
              </form>

              <button
                onClick={register}
                className="register-button login-button"
              >
                Bli medlem
              </button>
            </article>
          </section>
        </>
      </div>
    </article>
  );
}

export default SignUp;

/*

    <>
      {openSignUp && <SignUp closeSignUp={setOpenSignUp} />}
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

 */
