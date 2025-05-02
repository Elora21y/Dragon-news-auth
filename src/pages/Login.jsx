import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../routes/AuthProvider";

const Login = () => {
    const {loginUser} = use(AuthContext)
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)

        loginUser(email, password)
        .then(result => console.log(result.user))
        .catch(error => console.log(error.message))
    }
  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div className="card bg-base-100 w-full max-w-fit shrink-0 shadow-2xl">
        <div className="card-body">
            <h2 className="text-4xl font-semibold text-primary"> Login your account</h2>
          <form onSubmit={handleLogin} className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input type="email" name="email" className="input" placeholder="Email" />
            {/* password */}
            <label className="label">Password</label>
            <input type="password" name="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <p>Dont’t Have An Account ? Please <Link className="text-secondary underline" to='/auth/register'>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
