import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../routes/AuthProvider";

const SocialLogin = () => {
    const {socialLogin, user, loading} = useContext(AuthContext)
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()
  return (
<>
{!user && !loading &&
    <div>
    <h2 className="font-bold mb-5">Login With</h2>
    <div className="space-y-3">
      <button 
      onClick={()=>socialLogin(googleProvider)}
      className="btn btn-secondary btn-outline w-full">
        <FcGoogle size={24} /> Login with Google
      </button>
      <button 
      onClick={()=> socialLogin(githubProvider)}
      className="btn btn-outline btn-primary w-full">
        <FaGithub size={24} /> Login with Github
      </button>
    </div>
  </div>
   }
</>
  );
};

export default SocialLogin;
