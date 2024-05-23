"use client"
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Avatar, Button } from "antd";




export default function Navbar() {
    const [umenu, setUmenu] = useState("hidden");
    let { data: session } = useSession();
    const [namesInitial, setNamesInitial] = useState("AM")
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        url: ""
    })
    const [loading, setLoading] = useState(false)



    const signout = () => {
        setLoading(true)
        signOut()//nextauth signOut function
    }




    const handleUmenu = () => {

        umenu == "hidden" ? setUmenu("") : setUmenu("hidden");
    }




    return (
        <nav className="flex  bg-blue-500 text-cyan-50 justify-between w-screen left-0 right-0 top-0  z-50">
            <Link href={"/dashboard"}>

                <p className="flex text-5xl p-3 ">Sticker Saver</p>
            </Link>
            <div className="flex "> </div>
            <div className="flex ">

                {user && session &&
                    <div className="flex justify-center text-center mr-2">

                        <div className="relative z-50">
                            <div>

                                <div className=" flex justify-center m-3 border-white">
                                    {user?.url == "" && <Avatar size={60}>{namesInitial.toUpperCase()}</Avatar>}

                                    {user?.url && <Avatar size={60} src={user?.url} />}



                                </div>
                            </div>

                        </div>
                    </div>
                }

            </div>

        </nav >
    )
}