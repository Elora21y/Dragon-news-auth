import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../routes/AuthProvider";

const Register = () => {
    const {createUser} = use(AuthContext)

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value
    const photo = form.photo.value
    const email = form.email.value
    const password = form.password.value
    console.log(email, password, photo, name)

    createUser(email, password)
        .then(result => console.log(result.user))
        .catch(error => console.log(error.message))
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
            />
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
            />
            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
            <label className="label">
              <input type="checkbox"  className="checkbox" />
              Remember me
            </label>
            <button className="btn btn-neutral mt-4">SignUp</button>
          </form>
          <p>
            Already Have An Account ? Please{" "}
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
