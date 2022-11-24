import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react'
import {auth} from "../utils/firebase";
import {useRouter} from "next/router"

export default function dashboard() {
    const [user,loading] =useAuthState(auth);
    const route = useRouter();
    if (loading) return <h1>Page Loading ...</h1>;
    if (!user) route.push('/auth/login');
    if(user)
        return (
            <div>
            <h1 className='px-10'>Welcome to your dashboard {user.displayName}</h1>
            <button className="py-2 px-4 text-lg bg-red-800 text-white rounded-lg font-medium ml-8 align-middle my-10" onClick={()=>auth.signOut()}>Logout</button>
            </div>
        )
}
