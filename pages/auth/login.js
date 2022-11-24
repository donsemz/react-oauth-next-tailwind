import React, {useEffect} from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { GoogleAuthProvider, FacebookAuthProvider, updateProfile, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import {useRouter} from "next/router"
import {useAuthState} from "react-firebase-hooks/auth";

export default function Login() {

  const route = useRouter();
  const [user,loading] =useAuthState(auth);

  // signin with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // signin with facebook
  const fbProvider = new FacebookAuthProvider();
  const FacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      // to get image icon to get access token first
      const credential = await FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      let photUrl = result.user.photoURL +'?height=500&access_token='+token;
      await updateProfile(auth.currentUser,{photoURL: photUrl})
      console.log(result.user);
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((()=>{
    if(user){
       route.push("/dashboard");
    }
    else{
        console.log("login page");
    }
  }),[user])
  return (
    <div className="shadow-xl mt-32 p-10 text-white-700 rounded-lg">
      <h2 className="text-3xl font-medium">Join Us Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the following</h3>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2"
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button>
        <button 
        onClick={FacebookLogin} className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2">
          <AiFillFacebook className="text-2xl text-blue-300" />
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}
