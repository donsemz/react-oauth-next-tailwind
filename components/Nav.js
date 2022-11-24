import React from "react";
import Link from "next/link";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../utils/firebase"

const Nav = () => {

  const [user,loading] =useAuthState(auth);


  return (
    <nav className="px-10 flex justify-between py-10 items-center">
      <Link href={"/"}>NavLogo</Link>
      <ul>
        {!user && (<Link href={"/auth/login"} passHref legacyBehavior>
          <a className="py-2 px-4 text-lg bg-teal-800 text-white rounded-lg font-medium ml-8">
            Join Now
          </a>
        </Link>)}
        {user && (
          <div>
            <Link href={"/dashboard"}>
            <img src={user.photoURL} className="w-12 rounded-full" referrerPolicy="no-referrer" alt="Avatar"/>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
