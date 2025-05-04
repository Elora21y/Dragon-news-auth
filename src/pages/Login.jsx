import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../routes/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-init";

const Login = () => {
  const { loginUser, logout } = use(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password)
    setErrorMsg("");
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        const user = result.user;

        if (!user.emailVerified) {
          setErrorMsg("Please verify your email first");
          logout();
          return;
        }
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential")
          return setErrorMsg("Incorrect email or password");
        if (error.code == "auth/invalid-email")
          return setErrorMsg("Please enter your email");
        if (error.code == "auth/missing-password")
          return setErrorMsg("Please enter your password");
        setErrorMsg("Something went wrong. Please try again.");
        // console.log(error.code);

        // switch(error.code) {
        //   case "auth/invalid-credential":
        //     setErrorMsg("Incorrect email or password");
        //     break;
        //   case "auth/missing-password":
        //     setErrorMsg("Please enter your password");
        //     break;
        //   case "auth/network-request-failed":
        //     setErrorMsg("Network error. Please check your internet connection.");
        //     break;
        //   default:
        //     setErrorMsg("Login failed. Please try again.");
        //     console.error(error);
        // }
      });
  };

  const handleForgetPass = () => {
    console.log(emailRef.current.value);
    const email = emailRef.current.value;

    if (!email) {
      setErrorMsg("Please enter your email to reset password.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => alert("Please check your email and reset your email"))
      .catch(() => {
        
          setErrorMsg("Failed to send reset email. Please try again.");
        
      });
  };

  // auth/too-many-requests - অনেকবার চেষ্টা করার পর অ্যাকাউন্ট temporarily blocked
  // User-Friendly Messages:
  // Email এবং password ভুল হলে একই message দেখানো ভাল (Incorrect email or password) যাতে hackers কে hints না দেওয়া হয়
  // Network error বা অন্য unexpected errors-এর জন্য generic message দেখানো ভাল

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div className="card bg-base-100 w-full max-w-fit shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-4xl font-semibold text-primary">
            Login your account
          </h2>
          <form onSubmit={handleLogin} className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              ref={emailRef}
            />
            {/* password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={`${showPass ? "text" : "password"}`}
                name="password"
                className="input"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute top-2 right-10 z-10 btn btn-xs btn-ghost"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <p className="text-red-500">{errorMsg}</p>
            <div>
              <a onClick={handleForgetPass} className="link link-hover">
                Forgot password?
              </a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <p>
            Dont’t Have An Account ? Please{" "}
            <Link
              className="text-secondary underline"
              to="/auth/register"
              state={location.state || "/"}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
