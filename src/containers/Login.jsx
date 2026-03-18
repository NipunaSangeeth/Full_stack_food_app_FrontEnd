import React, { useEffect, useState } from "react";
import { Logo, loginBg } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../context/action/userActions";
import { alertInfo, alertWarning } from "../context/action/alertAction";

const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true }); // if user manually type loging but it don't goto loging and automatically come MAin page
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailpass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      dispatch(alertInfo("Required filds should not be empty"));
    } else {
      if (password === confirm_password) {
        setuserEmail("");
        setconfirm_password("");
        setpassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  // console.log(data);
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        dispatch(alertWarning("Password does't match"));
      }
    }
  };

  // actions
  // reducer
  //store -> globalized
  //dispatch

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  // console.log(data);
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Password does't match"));
    }
  };
  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* Background Image */}
      <img
        src={loginBg}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt=""
      />

      {/* Content Box */}

      <div className="flex flex-col items-center bg-black-200 w-[80%] md:w-400 h-full z-10 backdrop-blur-md p-4 px-8 py-12 gap-6">
        {/* top logo section */}
        <div className="flex items-center justify-start gap-4 w-full mt-0 ">
          <img src={Logo} className="w-14 " alt="" />
          <p className="text-headingColour-300 font-bold text-2xl">
            SavorRadius
          </p>
        </div>

        {/* Welcome text */}
        <p className="text-5xl font-bold text-headingColour-400">
          Welcome Back
        </p>
        <p className="text-2xl text-textColor -mt-6">
          {isSignUp ? "Sign Up" : "Sing In"} with following{" "}
        </p>

        {/* input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-8 md:px-14 py-4">
          <LoginInput
            placeHolder={"Email Here"}
            icon={<FaEnvelope className="text-xl text-textColor " />}
            inputState={userEmail}
            inputStateFunc={setuserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeHolder={"Password Here"}
            icon={<FaLock className="text-xl text-textColor " />}
            inputState={password}
            inputStateFunc={setpassword}
            type="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeHolder={"Confirm password Here"}
              icon={<FaLock className="text-xl text-textColor " />}
              inputState={confirm_password}
              inputStateFunc={setconfirm_password}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Does't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-600 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                {" "}
                create one{" "}
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-600 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                {" "}
                sign-in here{" "}
              </motion.button>
            </p>
          )}

          {/* Button Section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-800 cursor-pointer text-white text-xl capitalize hover:bg-red-700 transition-all duration-150"
              onClick={signUpWithEmailpass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-red-800 cursor-pointer text-white text-xl capitalize hover:bg-red-700 transition-all duration-150"
            >
              Sign in
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-r-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-r-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center px-5 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColour">
            Signin with Google{" "}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
