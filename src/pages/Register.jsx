import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../routes/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, logout } = use(AuthContext);
  const [passError, setPassError] = useState("");
  const [nameError, setNameError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [errorMsg, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location)

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const terms = form.terms.checked;
    // console.log(email, password, photo, name)

    setPassError("");
    setNameError("");
    setTermsError("");
    setError("")

    if (name.length < 5) return setNameError("Name at least 5 character");

    if (!terms) return setTermsError("Accept Our Terms Condition");

    if (!/(?=.*\d)/.test(password))
      return setPassError("Password must be one digit");

    if (!/(?=.*[a-z])/.test(password))
      return setPassError(" one lowercase letter");

    if (/(?=.*[A-Z])/.test(password) === false)
      return setPassError("One Uppercase letter");

    if (/.{6,}/.test(password) === false)
      return setPassError("Password at least 6 character");

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        const user = result.user

        const profile = {
          displayName : name,
          photoURL : photo
        }
        //update profile
        updateProfile(user , profile)
        .then(()=>{
          //verify send
          sendEmailVerification(user)
          .then(()=>{
              alert('Please Check Your Email and Verify it.')
              //logout
              logout().then(()=>{
                //redirect to login page
                navigate( "/auth/login");
              })
          })
        })
        .catch(error => setError(error.message))
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div className="card bg-base-100 w-full max-w-fit shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-4xl font-semibold text-primary">
            Register your account
          </h2>
          <form onSubmit={handleRegister} className="fieldset">
            {/* name */}
            <label className="label">User Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Your Name"
              required
            />
            <p className="text-secondary">{nameError}</p>
            {/* Photo */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input"
              placeholder="URL"
            />
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />
            {/* password */}
            <label className="label">Password</label>

            <div className="relative">
              <input
                type={`${showPass ? 'text' : "password"}`}
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <button 
              type="button"
              className="absolute top-2 right-23 z-10 btn btn-xs btn-ghost"
              onClick={()=> setShowPass(!showPass)}>
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <p className="text-secondary">{passError}</p>

            <label className="label">
              <input type="checkbox" name="terms" className="checkbox" />
              Accept Terms & Condition
            </label>
            <p className="text-secondary">{termsError}</p>
            <p>{errorMsg}</p>
            <button className="btn btn-neutral mt-4">SignUp</button>
          </form>
          <p>
            Already Have An Account ? Please
            <Link className="text-secondary underline" to="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
